---
title: Index Concurrency Control
---

> [!note] Agenda
> - Latches
> - Hash Table Latching
> - B+Tree Latching
> - Leaf Node Scans

> Redis 是一个单进程单线程的数据库，所以不需要并发控制。

## Locks vs. Latches

- Locks (Transactions)
	- 是一种比较高级的原语
	- 保护数据库的逻辑内容，例如元组，数据库，表等
	- 事务的持续时间内持有 lock
	- 需要一些机制保证没有死锁
	- 需要实现回滚
- Latches (Workers/Threads/Processes)
	- 是一种比较低级的原语
	- 保护数据结构中的临界区
	- Latch 的生命周期会很短
	- 不需要回滚

## Latch Modes

- Read
	- 同一时间可以有多个读线程同时读取
- Write
	- 同一时间只有一个写线程能写入

|       | Read | Write |
| ----- | ---- | ----- |
| Read  | ✅    | ❌     |
| Write | ❌    | ❌     |

## 实现 Latch 的准则

- 低内存占用
- 没有争用时，能尽快获取数据
- 每个 latch 不需要设计一个队列去追踪哪些线程在等待这个 latch

### 一些实现方式

- TAS (Test-and-set Spin Latch) 缺点是会使 CPU 一直在检测
    ```cpp
    std::atomic_flag latch;
    while (latch.test_and_set(...)) {
        // Retry? Yield? Abort?
    }
	```
- Blocking OS Mutex 涉及到操作系统接管所有权，内核态切换
    ```cpp
    std::mutex m;
    m.lock();
    // Do something special
    m.unlock();
	```
- Reader-write Latches 通常是在用户态的，维护了正在等待的线程队列

## Hash Table Latching

相对来说比较容易实现，因为一个 key 只能对应一个 value

- 一次只访问一个值或一页
- 没有死锁

### 实现方式

- Page Latch
	- 每一页需要有一个 latch
	- 线程在访问这个页之前先获取 read or write latch
		- 非常类似操作系统课程中的“锁”，只要将页看作是 atom，读写的时候需要先查看这个页的读写 latch
- Slot Latch
	- 每个 slot 都有 latch（这里的 slot 在 PPT 中的呈现似乎就是存储数据的那个单元的内存，而不是整个页）
	- 如果两个查询访问的是同一页，不同的 slot，那么它们是不需要等待的
	- 只有两个查询访问同一个 slot，才需要检测读写 latch

## B+Tree Concurrency Control

在多线程情况下，线程 A 需要查找 41，线程 B 需要删除 44，而在删除过程中出现了 Rebalance 的情况，导致子树的结构发生了变化，线程 A 找到的 41 是假的，会引发较大的问题。此时就需要引入 latch 来解决这个问题。

### Latch Crabbing/Coupling

允许多个线程同时修改 B+树的协议

- Get latch for parent
- Get latch for child
- Release latch for parent if "safe"

