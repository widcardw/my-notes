---
title: 零拷贝
---

## 传统 NIO 的数据传输

```java
File f = new File("hello.txt");
RandomAccessFile file = new RandomAccessFile(file, "r");
// Java 本身是不具备 IO 能力的，实际上调用的是操作系统的方法
byte[] buffer = new byte[(int) f.length()];
file.read(buffer);  // 将文件写到 byte 数组中

Socket socket = ...;
socket.getOutputStream().write(buffer);  // 从 byte 数组写到网络
```
内部工作流程如下

![](./assets/zero_copy_00.svg)

在此过程中，总共进行了 4 次拷贝，3 次用户态与内核态的切换。

1. Java 本身并不具备 IO 读写能力，因此 `read` 方法调用后，要从 Java 程序的**用户态**切换至**内核态**，去调用操作系统 (Kernel) 的读能力，将数据读入**内核缓冲区**。这期间用户线程阻塞，操作系统使用 DMA 来实现文件读，期间也不会使用 CPU
2. 从**内核态**切换回**用户态**，将数据从**内核缓冲区**读入**用户缓冲区**（即 `byte[] buffer`），这期间 CPU 会参与拷贝，无法利用 DMA
3. 调用 `write` 方法，这时将数据从**用户数据区**写入 **socket 缓冲区**，CPU 会参与拷贝
4. 向网卡中写数据，这项能力 Java 不具备，因此又需要从**用户态**切换至**内核态**，调用操作系统的写功能，使用 DMA 将 **socket 缓冲区**的数据写入网卡，不会使用 CPU

## NIO 优化

通过 DirectByteBuffer

- `ByteBuffer.allocate(10) -> HeapByteBuffer` 使用的是 Java 内存
- `ByteBuffer.allocateDirect(10) -> DirectByteBuffer` 使用的是操作系统内存，但是 Java 也可以访问

![](./assets/zero_copy_01.svg)

Java 可以使用 DirectByteBuf 将堆外内存映射到 jvm 内存中来直接访问使用

- 这块内存不受 jvm 垃圾回收机制影响，因此内存地址固定，有助于 IO 读写
- Java 中的 DirectByteBuf 对象仅维护了此内存的虚引用，内存回收分两部
    - DirectByteBuf 对象被垃圾回收，将虚引用加入引用队列
    - 通过专门线程访问引用队列，根据虚引用释放堆外内存
- 减少了一次数据拷贝，用户态与内核态的切换次数没有减少

## 进一步优化

底层采用 Linux 2.1 后提供的 sendFile 方法，Java 中对应着两个 channel 调用 transferTo/transferFrom 方法进行拷贝

![](./assets/zero_copy_02.svg)

只发生了一次用户态与内核态的切换

1. Java 调用 transferTo 方法后，要从 Java 程序的**用户态**切换至**内核态**，使用 DMA 将数据读入**内和缓冲区**，不会使用 CPU
2. 数据从**内核缓冲区**传输到 **socket 缓冲区**，CPU 参与拷贝
3. 最后使用 DMA 将 **socket 缓冲区**的数据写入网卡，不会使用 CPU

## 进一步优化（Linux 2.4）

![](./assets/zeor_copy_03.svg)

1. Java 调用 transferTo 方法后，要从 Java 程序的**用户态**切换至**内核态**，使用 DMA 将数据读入**内核缓冲区**，不会使用 CPU
2. 只会将一些 offset 和 length 信息拷贝到 **Socket 缓冲区**，几乎无消耗
3. 使用 DMA 将**内核缓冲区**的数据写入网卡，不会使用 CPU

整个过程仅发生一次模式切换，数据拷贝了 2 次。所谓的「零拷贝」，并不是真正的无拷贝，而是不会拷贝冲去数据到 jvm 内存中。

- 优点
    - 更少的模式切换
    - 不利用 CPU 计算，减少 CPU 缓存伪共享
    - 零拷贝适合小文件传输（大文件会占用内核缓冲区较大的空间）


