---
title: 期中复习
---

## 0. 操作系统

[[undergraduate/os/1-1_intro#定义]]

操作系统中的基础抽象——进程抽象、虚存抽象和文件抽象。

## 1. 多道程序设计

多道程序设计是指，==允许多个作业同时进入计算机系统的内存，并启动交替计算的方法==。

从宏观上看是并行的，多道程序都处于运行过程中，但尚未运行结束。从微观上看是串行的，各道程序轮流占用 CPU 交替的执行。

### 1.1. 引入的目的

引入多道程序的目的在于充分利用 CPU，减少 CPU 等待时间。

- 提高了 CPU 的利用率
- 提高了主存和 I/O 设备的利用率
- 改进了系统的吞吐率
- 充分发挥了系统的并行性
- 延长了作业的周转时间

### 1.2. 需要解决的问题

- 存储保护与程序浮动
- 处理器的管理和调度
- 系统资源的管理和调度

### 1.3. 并行与并发

#### 1.3.1. 并行

老王约了小月，小美一起吃饭。

#### 1.3.2. 并发

在宏观上同时做，在微观上是交替发生的。

## 2. 操作系统提供的接口

### 2.1. 系统调用

==系统调用是应用程序获得操作系统服务的唯一途径。==内核的主体是系统调用的集合，内核可以看成是特殊的公共子程序。

系统调用的作用，一是内核可以基于权限和规则对资源访问进行裁决，保证系统的安全性；二是系统调用对资源进行抽象，提供一致性接口，避免用户在使用资源时发生错误，且使编程效率大大提高。

系统调用的实现要点

- 一是编写系统调用服务例程。
- 二是设计系统调用入口地址表，每个入口地址都指向一个系统调用的服务例程。
- 三是陷阱处理机制，需要开辟现场保护区，以保存发生系统调用时，应用程序的处理器现场。

#### 2.1.1. 分类

1. 进程和作业管理
2. 文件操作
3. 设备管理
4. 主存管理
5. 信息维护
6. 通信

#### 2.1.2. 实现要点

1. 编写系统调用处理程序
2. 设计一张系统调用入口地址表，每个入口地址都指向一个系统调用的处理程序，有的系统还包含系统调用自带参数的个数
3. 陷入处理机制需开辟现场保护区，以保存发生系统调用时的处理器现场

### 2.2. 操作系统分类

#### 2.2.1. 批处理系统

批处理操作系统是最先采用多道程序设计技术的系统，它根据预先设定的调度策略选择若干作业并发的执行。==系统资源利用率高，作业吞吐量大。==批处理操作系统的缺点是作业周转时间延长，不具备交互式计算能力，不利于程序的开发和调试。

#### 2.2.2 分时系统

- 同时性，即若干终端用户联机使用计算机，分时是指多个用户分享同一台计算机的 CPU 时间。
- 独立性，即终端用户彼此独立互不干扰，每个终端用户感觉好像独占整台计算机。
- 及时性，即终端用户没有大计算量的立即行请求能够在足够短时间内得到响应。
- 交互性，即人机交互，联机工作时用户直接控制程序运行，便于程序调试和排错。

#### 2.2.3 实时系统

==满足实时控制和实时信息处理的需要，提供及时响应和高可靠性。==当外部事件或数据产生时，能够对其予以接收并以足够快的速度进行处理，所得结果能够在规定的时间内控制生产过程或对控制对象作出快速响应，并控制所有实时任务协调运行的操作系统。

#### 2.2.4 嵌入式系统

## 3. 资源抽象

### 3.1. 资源复用

系统中相应的多个进程竞争使用资源，由于计算机系统得物理资源是宝贵和稀有的，操作系统让众多进程共享物理资源，这种共享成为资源复用。

### 3.2. 资源虚拟

虚拟的本质是对资源的转化、模拟或整合，把一个物理资源转变为多个逻辑上的对应物，也可以把多个物理资源变成单个逻辑上的对应物，即创建无需共享的多个独占资源的假象，或创建易用且多用于实际物理资源数量的虚拟资源假象，以达到多用户共享一套计算机物理资源的目的。

### 3.3. 资源抽象

通过创建软件来屏蔽硬件资源的物理特性和实现细节，简化对硬件资源的操作控制和使用，即不考虑物理细节，而对资源执行操作的技术。

## 4. 中断

### 4.1.  PSW

==操作系统将程序运行的一组动态信息汇聚在一起==，称为程序状态字 PSW。并存放在处理器的一组特殊寄存器里，以方便系统的控制和管理。

作用：指示程序运行状态，控制指令执行顺序，并且保留和指示与运行程序有关的各种信息，==实现程序状态的保护和恢复==。

### 4.2. 试分别从中断事件的性质、来源和实现角度对其进行分类

中断：指在程序执行过程中，遇到紧急处理的事件时，暂时中止现行程序。在 CPU 上的运行，转而执行相应的事件处理程序，待处理完成后再返回断点或调度其他程序执行过程。

[[undergraduate/os/1-1_intro#中断的分类]]

- 从中断事件的性质
  - 强迫性中断
  - 自愿性中断
- 从中断事件的来源和实现角度
  - 硬中断：由硬件产生的中断
    - 外中断（中断，异步中断）
    - 内中断（异常，同步中断）
  - 软中断：由内核或某个进程对某个进程发出的中断信号
    - 信号
    - 软件中断

## 5. 进程

进程是具有独立功能的程序，在某个数据集合上的一次运行活动，也是操作系统进行资源分配和保护的基本单位。

[[undergraduate/os/2-1_proc#1 定义]]

[[undergraduate/os/2-1_proc#4 进程的特征]]

### 5.1. 进程状态转换

中断暂停当前运行进程的执行，把处理器转换至内核态，内核态获得处理器控制权后，并把控制权交给另一个进程。

[[undergraduate/os/2-1_proc#2 进程状态的转换]]

#### 三态

- 运行态：进程占用处理器运行的状态
- 就绪态：具备运行条件，等待分配处理器，以便其运行的状态
- 等待态：不具备运行状态，正在等待某个事件完成的状态

#### 五态

- 新建态
- 终止态

#### 七态

- 挂起就绪态
- 挂起等待态

### 5.2. 引起转换的原因

- 运行态-等待态：运行进程等待某种资源或事件发生，如等待设备传输数据或人工干预。
- 等待态-就绪态：所需资源得到满足，或某事件已经完成，如设备传输数据结束或人工干预完成。
- 运行态-就绪态：运行时间片到或出现更高优先级的进程时，当前进程被迫让出处理器。
- 就绪态-运行态：当 CPU 空闲时，调度程序选中一个就绪进程执行。

### 5.3. 模式转换

从用户态到内核态，或者从内核态到用户态的转换。

发生模式切换可以不改变当前正处于运行态的进程的状态。发生进程切换时，一个正在执行的进程被中断，操作系统指定另一个进程为运行态。进程切换需要保存更多的状态信息。

### 5.4. 线程

引入线程的动机：解决资源共享性，刻画程序并发性。

- 快速线程切换
- 通信易于实现
- 减少管理开销
- 并发程度提高

[[undergraduate/os/2-1_proc#^multi-thread]]

### 5.5. 进程调度算法

- 先来先做 FCFS
- 短作业优先 SJF
- 抢占式短作业优先 SRTF
- 高响应比 HRRF
- 时间片轮转 RR
- 优先级调度算法

[[undergraduate/os/2-2_proc-sche#2 2 4 调度算法]]

### 5.6. 进程优先权

## 6. 互斥与同步

### 6.1. 互斥

[[undergraduate/os/3-1_proc-sync#1 2 进程互斥]]

### 6.2. 同步

[[undergraduate/os/3-1_proc-sync#1 1 进程同步]]

### 6.3. 信号量

[[undergraduate/os/3-1_proc-sync#2 3 4 信号量机制]]

### 6.4. 临界区

并发进程中与==共享变量有关的程序段==称为临界区。共享变量所代表的资源称为临界资源，即一次仅能供一个进程使用的资源。

当多个并发进程访问临界资源时，结果依赖于它们执行的相对速度，便出现了竞争条件。

### 6.5. 哲学家算法

[[undergraduate/os/3-2_proc-mul#6 五位哲学家就餐问题]]

### 6.6. 生产者消费者算法

[[undergraduate/os/3-2_proc-mul#2 多生产者和多消费者问题]]

### 6.7. 和尚挑水问题

某寺庙，有小和尚、老和尚若干。一水桶，有一水缸，由小和尚提水入缸供老和尚饮用。水缸可容 10 桶水，水取自同一井中。水井径窄，每次只能容一个水桶取水。水桶总数为 3。每次入、取缸水仅为一桶，且不可同时进行。试给出有关取水、入水的算法描述。

#### 分析

- 有两种进程：小和尚打水，老和尚喝水
  - 小和尚首先看水缸是否有空间，然后去获取桶，接着去打水，放水。
  - 老和尚先看水缸是否有水，然后获取桶，饮水
- 水缸的空闲资源 `empty=10`，水缸中的水资源 `full=0`，桶的资源 `bucket=3`
- 临界资源水缸需要一个互斥信号量 `s1=1`
- 临界资源水井需要一个互斥信号量 `s2=1`

```cpp
process young_monk() {
	P(empty);  
	P(bucket);
	P(s2);
	// 打水
	V(s2);
	P(s1);
	// 入水
	V(s1);
	V(bucket);
	V(full);
}
process old_monk() {
	P(full);
	P(bucket);
	P(s1);
	// 取水
	V(s1);
	V(bucket);
	V(empty);
}
```

## 7. 死锁

如果在一个进程集合中的每个进程都在等待==只能由该集合中的其他一个进程==才能引发的事件，则称一组进程或系统此时发生了死锁。

### 7.1. 产生死锁的条件

- 互斥条件：进程互斥使用资源
- 占有和等待条件：申请新资源时不释放已占有资源
- 不剥夺条件：一个进程不能抢夺其他进程占有的资源
- 环路条件：存在一组进程循环等待资源的

破坏任意一个条件即不会发生死锁。

### 7.2. 银行家算法（资源分配策略）

#### 问题描述

- 银行家拥有一笔周转资金
- 客户要求分期贷款，如果客户能够得到各期贷款，就一定能够归还贷款，否则就一定不能归还贷款
- 银行家应谨慎的贷款，防止出现坏帐

#### 数据结构

一个系统有 $n$ 个进程和 $m$ 种不同类型的资源,定义包含以下向量和矩阵的数据结构

1. 系统中每类资源总数向量 `Resource=[R1, R2, ..., Rm]`
2. 系统中每类资源当前可用数向量 `Available=[V1, V2, ..., Vm]`
3. 每个进程对各类资源的最大需求矩阵 `Claim[i,j]`
4. 每个进程已占有各类资源数量矩阵 `Allocation[i,j]`
5. 每个进程还需各类资源数量矩阵 `Need[i,j]`，有 $Need[i,j]=Claim[i,j]-Allocation[i,j]$
6. 每个进程==当前==申请各类资源数量矩阵 `Request[i,j]`

系统若要启动一个新进程工作，其对资源 `Resource[i]` 即 `Ri` 的需求应满足不等式

$$
R_i\geqslant Claim[(n+1),i]+\sum_{k=1}^{n}Claim[k,i],i=1,\cdots,m;k=1,\cdots,n
$$

系统安全性定义：在时刻 $T_0$ 是安全的，仅当存在一个进程序列 $P_1,\cdots,P_n$ 对进程 $P_k(k=1,\cdots,n)$ 满足以下公式，才被称为安全序列。

$$
Need[k,i]\leqslant Available[i]+\sum_{j=1}^{k-1}Allocation[j,i],i=1,\cdots,m;k=1,\cdots,n
$$

#### 算法描述

|   | 操作                                                                                                                                    | 是      | 否        |
| - | --------------------------------------------------------- | ------ | -------- |
| 1 | judge `Request[i,*]` $\leqslant$ `Need[i,*]`                                                                                            | goto 2 | 出错处理     |
| 2 | judge `Request[i,*]` $\leqslant$ `Available[i,*]`                                                                                       | goto 3 | 超过可分配，等待 |
| 3 | 试探性分配<br>`Allocation[i,*]=Allocation[i,*]+Request[i,*]`<br>`Available[*]=Available[*]-Request[i,*]`<br>`Need[*]=Need[*]-Request[i,*]` |        |          |
| 4 | `safe = goto5()`                                                                                                                      | 承认分配   | 恢复并等待    |
| 5 | 如下                                                                                                                                    |        |          |

```cpp
bool checkSafety() {
	vector Work[i]; bool possible; set rest;  // 定义工作向量、布尔标志、进程集合
	Work[*] = Available[*]; possible=true;    // 初始化
	rest.push(P1, P2, ..., Pn);  // 全部进程进入 rest
	while (1) {
		pk = find(rest, query(Need[k,*]<=Work[*]));  // 找出满足的进程 Pk
		if (pk == NULL) {  // 找不到
			possible = false;  // 置否
			return;  // 停止算法
		}
		else {
			free(pk.resource);  // 释放 Pk 所占用的资源
			Work[*] = Work[*] + Allocation[k,*];
			rest.remove(pk);  // 将 Pk 从进程集合中去掉
		}
	}
	if (rest.isEmpty())
		return true;
	else
		return false;
}
```

### 7.3. 导致饥饿现象的原因

在一个动态系统中，对于每类系统资源，操作系统需要确定一个分配策略，当多个进程同时申请某类资源时，由分配策略确定资源分配给进程的次序。有时资源分配策略可能是不公平的，即不能保证等待时间上界的存在。在这种情况下，即使系统没有发生死锁，某些进程也可能会长时间等待。
