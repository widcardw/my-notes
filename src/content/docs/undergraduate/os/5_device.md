---
title: 5. 设备管理
layout: ~/layouts/WithMermaid.astro
---

## 0. 设备管理

### 功能

- 设备中断处理
- 缓冲区处理
- 设备分配和去配
- 设备驱动调度
- 实现虚拟设备

## 1. I/O 工作原理

### 1.1. I/O 系统

#### 1.1.1. 定义

I/O 设备及其接口线路、控制部件、通道和管理软件合称为 I/O 系统

![](./assets/s5_01.svg)

#### 1.1.2. 设备分类

##### 按信息交换单位

- 字符设备：键盘——无结构类型，传输速率低、不可寻址，常采用中断 I/O 方式
- 块设备：硬盘——传输速率较高、可寻址

##### 按存储功能

- 顺序存取：磁带
- 直接存取：磁盘

### 1.2. I/O 控制方式

#### 1.2.1. 轮询方式

[[undergraduate/Intel8086/c7-io#2 2 查询传送方式]]

需要 CPU 执行轮询软件的代码，例如自制键盘

![](./assets/s5_02.svg)

#### 1.2.2. 中断方式

[[undergraduate/Intel8086/c7-io#2 3 中断传送方式]]

![](./assets/s5_03.svg)

#### 1.2.3. DMA 方式

[[undergraduate/Intel8086/c7-io#2 4 直接数据通道传送方式（DMA）]]

![](./assets/s5_04.svg)

- 基本单位是数据块
- 所传送的数据，是从设备直接送入内存的，或者相反
- 仅在传送一个或多个数据块的开始和结束时，才需要 CPU 干预，整块数据的传送是在 DMA 控制器的控制下完成的

DMA 控制器中需设置下面 4 类寄存器

- 命令/状态寄存器 CR
- 内存地址寄存器 MAR
- 数据寄存器 DR
- 数据计数器 DC

#### 1.2.4. -通道方式

![](./assets/s5_05.svg)

### 1.3. 设备控制器

I/O 端口地址与主存地址编址方式 [[undergraduate/Intel8086/c7-io#1 5 I O 端口的寻址方式]]

- 独立编址 Intel
- 统一编址

### 设备分配与回收

#### 分类

- 独占设备
- 分时式共享式设备
- 以 SPOOLing 方式使用外部设备

#### 设备分配的数据结构

- 设备控制表 DCT
	- 一个表就表征一个设备，表项就是设备的各个属性
- 控制器控制表 COCT
- 通道控制表 CHCT
- 系统设备表 SDT
	- 整个系统只有一张 SDT，记录已连接到系统中的所有物理设备的情况，每个物理设备占一个表目

#### 分配策略

- 设备分配原则
	- 根据设备特性、用户要求、系统配置情况
	- 充分发挥设备的使用效率，避免造成死锁，将用户程序和具体设备隔离开
- 设备分配方式
	- 静态分配
		- 在用户作业开始执行前，由系统一次性分配该作业所要求的全部设备、控制器。
		- 一旦分配，这些设备、控制器就一直为该作业所占用，直到该作业被撤销。
		- 不会出现死锁，但设备的使用效率低
	- 动态分配
		- 根据执行需要进行
		- 当进程需要设备时，通过系统调用命令向系统提出设备请求，由系统按某种策略给进程分配所需要的设备、控制器，一旦用完，立即释放
		- 有利于提高设备利用率，但若分配算法使用不当，则有可能造成进程死锁
- 设备分配算法
	- 先请求先分配
	- 优先级高者优先

#### 设备分配的安全性

- 安全分配方式
	- 每当进程发出 I/O 请求后便进入阻塞态，直到其 I/O 操作完成时才被唤醒
- 不安全分配方式
	- 仅当进程所请求的设备已被另一进程占用时，才进入阻塞态
	- 可能造成死锁

#### 逻辑设备名到物理设备名的映射

为了提高设备分配的灵活性和设备的利用率，方便实现 I/O 重定向，引入了设备独立性。设备独立性是指应用程序独立于具体使用的物理设备。

为实现设备独立性，在应用程序中使用逻辑设备名来请求使用某类设备，在系统中设置一张逻辑设备表 LUT，用于将逻辑设备名映射为物理设备名。

LUT 表项保存逻辑设备名、物理设备名和设备驱动程序入口地址；当进程用逻辑设备名来请求分配设备时，系统为它分配一台响应的物理设备，并在 LUT 中建立一个表目，当以后进程再利用该逻辑设备名请求 I/O 操作时，系统通过查找 LUT 来寻找对应的物理设备和驱动程序。

- 整个系统只设置一张 LUT 表，不允许 LUT 表中有相同的逻辑设备名，主要适用于单用户系统。
- 为每个用户设置一张 LUT。每当用户登录时，系统便为该用户建立一个进程，同时也为之建立一张 LUT，并将该表放入进程的 PCB 中。

## 2. I/O 软件原理

### 2.1. 设计目标和原则

- 设备无关性
- 出错处理
- 同步/异步传输
- 缓冲技术

### 2.2. I/O 软件层次

#### 2.2.1. I/O 中断处理程序

位于操作系统的底层，是与硬件密切相关的软件，它与系统的其余部分尽可能少地发生关系。OS 需要管理所有的硬件。

![](./assets/s1_01.svg)

#### 2.2.2. 设备驱动程序

设备驱动程序，包括与设备密切相关的所有代码，其任务是把用户提交的逻辑 I/O 请求转换为物理 I/O 操作的启动和执行。如设备名转化为端口地址，逻辑记录转化为物理记录，逻辑操作转换为物理操作等。三个功能

- 设备初始化
- 执行设备驱动例程
- 调用和执行中断处理程序

> [!note] I/O 软件层次结构
> 
> - 用户层 I/O 软件
> - 设备独立性软件
> - 设备驱动程序
> - 中断处理程序

#### 2.2.3. 与设备无关的 I/O 软件

##### 设备命名和设备保护

对于操作系统而言，设备都被看作文件，它与磁盘文件一样，通过路径名来寻址。每个设备都具有文件名、inode、文件所有者、权限位等属性。设备不仅具有文件名，且支持与文件相关的所有系统调用，如 `open()` `close()` `read()` `write()` 以及 `lseek()` 等。

设备保护需要检查用户是否有权访问所申请的设备。在多数大中型计算机系统中，用户进程对 I/O 设备的直接访问是绝对禁止的，I/O指令定义为==特权指令==，通过==系统调用==方式间接的供用户使用。

![](./assets/s5_11.svg)

##### 提供与设备无关的块尺寸

当创建文件并向其输入数据时，此文件必须被分配新的磁盘块。为了完成这种分配工作，操作系统需要为每个磁盘都配置一张记录空闲块表或==位示图==。分配空闲块的算法是独立于设备的，可在高于设备驱动程序的层次处理。

Windows：逻辑块 “簇”

##### 缓冲技术

通常在内核空间开辟缓冲区，数据在缓冲区中缓冲后，再在用户缓冲区和设备之间传输。

![](./assets/s5_11.svg)

> [!caution]
> Linux 中 `cout << "xxx" << ...` 可以向缓冲区插入字节流，在最后加上 `endl` 时才能加上==换行符==并==清空缓冲==，此时字节流才能输出到屏幕上。

##### 设备分配和状态追踪

当用户发出设备使用请求时，要求操作系统检查相应设备的使用状态，并根据其忙闲状况来决定接受或拒绝这一请求。

##### 错误处理和报告

错误应尽可能在接近硬件的地方加以处理。如果控制器发现错误，应设法纠正和加以解决。如果未能处理错误，再交给设备驱动程序。

在许多情况下错误恢复，可由低层软件透明的得到解决，而高层软件甚至不知道错误存在。

#### 2.2.4. 用户空间的 I/O 软件

##### 库函数

```
       逻辑层面        |   物理层面
printf() ---> write() ---> int 0x80
```

##### SPOOLing 软件

SPOOLing 就是在内核外运行的系统 I/O 软件，它采用预输入、缓输出和井管理技术，是多道程序设计系统中==处理独占型设备==的一种方法，创建守护进程和特殊目录，解决独占型设备的空占问题。

## 3. 缓冲技术

为了解决 CPU 与设备之间速度不匹配的矛盾，及协调逻辑记录大小与物理记录大小不一致的问题，提高 CPU 和设备的并行性，减少 I/O 操作对 CPU 的中断次数，放宽对 CPU 中断响应时间的要求。

### 3.1. 单缓冲

每当应用进程发出 I/O 请求时，操作系统在内存的系统区中开设一个缓冲区。

```mermaid
graph LR
A[进程]-->B[buffer]-->C[设备]
```

```mermaid
graph RL
A[设备]-->B[buffer]-->C[进程]
```


### 3.2. 双缓冲

![](./assets/s5_12.svg)

### 3.3. 循环缓冲

包含多个大小相等的缓冲区，每个缓冲区有一个链接指针指向下一个缓冲区，最后一个缓冲区指针指向第一个缓冲区，多个缓冲区构成一个环形。

循环缓冲用于输入输出时，还需要由于两个指针 in 和 out 。输入时，从设备接受数据到缓冲区，in 指针指向可以输入数据的第一个空缓冲区；当运行进程需要数据时，从循环缓冲区中取一个装满数据的缓冲区，并从此缓冲区中提取数据，out 指针指向可以提取数据的第一个满缓冲区。

### 3.4. 缓冲池

由多个系统公用的缓冲区组成，缓冲区按其使用状况可以形成三个队列：空缓冲队列、装满输入数据的缓冲队列（输入队列）、装满输出数据的缓冲队列（输出队列）。还应具有 4 种缓冲区

- 用户收容输入数据的工作缓冲区
- 用于提取输入数据的工作缓冲区
- 用于收容输出数据的工作缓冲区
- 用于提取输出数据的工作缓冲区

![](./assets/os_huanchongchi.png)

#### Cache 与 buffer 的对比

相同点：都介于高速设备和低速设备之间

|          | 高速缓存                                                                                           | 缓冲区                                                                     |
| -------- | -------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------- |
| 存放数据 | 存放的是低速设备上的某些数据的复制品，即高速缓存上有的，低速设备上必然有                           | 存放的是低速设备传递给高速设备的数据（或相反），在彼方不一定有备份，       |
| 目的     | 存放的是高速设备经常要访问的数据，若高速设备要访问的数据不在高速缓存中，则高速设备需要访问低速设备 | 高速设备和低速设备的通信都要经过缓冲区，高速设备永远不会直接去访问低速设备 | 

## 4. 磁盘管理

### 4.1. 磁盘

磁盘是一类高速大容量旋转型存储设备，是一种直接存取存储设备又称随机存取存储设备，他的每条物理记录都有确定位置和唯一地址。

![](./assets/disk.jpg)

#### 4.1.0. 引入

##### 磁盘初始化

在磁盘可以存储数据之前，必须将它分成扇区，一遍磁盘控制器能够进行读写操作，这个过程称为低级格式化（物理格式化）。

##### 分区

在可以使用磁盘存储文件之前，操作系统还要将自己的数据结构记录到磁盘上，分为两步

- 将磁盘分为由一个或多个柱面组成的分区，每个分区的起始扇区和大小都记录在磁盘主引导记录的分区表中
- 对物理分区进行逻辑格式化（创建文件系统），操作系统将初始的文件系统数据结构存储到磁盘上，这些数据结构包括空闲空间和已分配的空间以及一个初始为空的目录

扇区单位太小，为了提高效率，操作系统将多个相邻的扇区组合在一起，形成==一簇==。为了更高效的管理磁盘，一簇只能存放一个文件的内容，文件所占用的空间只能是簇的整数倍。

##### 引导块

计算机启动时需要运行一个初始化程序（自举程序），它初始化 CPU、寄存器、设备控制器和内存等，接着启动操作系统。自举程序找到磁盘上的操作系统内核，将它加载到内存，并转到起始地址，从而开始操作系统运行。

具有启动分区的磁盘称为启动磁盘或系统磁盘。

##### 坏块

由于磁盘有移动部件且容错能力弱，因此容易导致一个或多个扇区损坏。

对于简单的磁盘，如采用 IDE 控制器的磁盘，坏块可以手动处理，如 MS-DOS 的 Format 命令执行逻辑格式化时会扫描磁盘以检查坏块。坏块在 FAT 表上会标明。

对于复杂的磁盘，控制器维护磁盘内的坏块列表。这个列表在出厂低级格式化时就已经初始化，并在磁盘的使用过程中不断更新。低级格式化将一些块保留做备用，操作系统看不到这些块。控制器可以用备用块来逻辑替换坏块。



#### 4.1.1. 基本要素

- 磁道（柱面） ==Cylinder== 从 0 编号
- 磁头 ==Header== 从 0 编号
- 扇区 ==Sector== 从 1 编号，每个扇区存储数据量一样（尽管由于半径大小的原因，外侧的扇区大，内侧的扇区小）

##### 扩展

###### 交叉码

由于磁盘的读写如果按照顺序逐一编号，性能可能会较差，即：如果目标地址在较远处，则需要等待磁盘旋转，才能得到目标数据。

交叉码规定了交叉因子：每两个连续逻辑扇区之间所间隔的物理扇区数。这样就使得磁盘编号间隔编排，能够在一定程度上提高搜索速度。

![](./assets/s5_13.svg)

#### 4.1.2. 物理扇区与逻辑扇区

##### 物理扇区

由 C, H, S 决定，因此有 “0 道 0 头 1 扇区”的说法

##### 逻辑扇区 LS

从 0 开始编号，与物理扇区一一对应，存在换算公式，其中，$a, b, c$ 分别表示柱面号，磁头号和扇区号

$$
LS=a*H*S+b*S+c-1
$$

某磁盘有 80 个柱面，2 个磁头，每个柱面有 16 个磁道，下表为其对应关系

|  C  |  H  |  S  |  LS  |
|:---:|:---:|:---:|:----:|
|  0  |  0  |  1  |  0   |
|  0  |  0  |  2  |  1   |
| ... | ... | ... | ...  |
|  0  |  0  | 16  |  15  |
|  0  |  1  |  1  |  16  |
|  0  |  1  |  2  |  17  |
| ... | ... | ... | ...  |
|  0  |  1  | 16  |  31  |
|  1  |  0  |  1  |  32  |
| ... | ... | ... | ...  |
|  1  |  0  | 16  |  47  |
|  1  |  1  |  1  |  48  |
| ... | ... | ... | ...  |
|  1  |  1  | 16  |  63  |
|  2  |  0  |  1  |  64  |
| ... | ... | ... | ...  |
| 79  |  1  | 16  | 2559 |

### 4.2. FAT 文件系统

不考，暂时放着

### 4.3. 搜查定位

磁盘存在旋转延迟和寻道延迟。该部分穿插寻道时间的计算。

#### FCFS 先来先服务算法

找到距离自己最近的磁道进行移动。会导致在磁道之间反复横跳。

#### SSTF 最短查找时间算法

考虑 I/O 请求之间的区别，总是==先执行查找时间最短==的请求（找最近的）。此算法存在饥饿现象，随着靠近当前磁头位置读写请求的不断到来，使得到来时间早但距离当前磁头位置较远的 I/O 请求服务被无限期地推迟。

#### 电梯调度算法 EA

电梯上行时，逐个处理电梯所在位置上方的请求，而不管电梯下方的请求。电梯下行时，逐个处理电梯所在位置下方的请求，而不管电梯上方的请求。

#### 扫描算法 SCAN

与电梯调度算法稍有不同，区别在于：电梯处理过==请求层数最高==的就直接下行，而==不会再去顶层==。扫描算法会==持续的扫到顶层或底层==，无论顶层或底层有无请求。

#### 循环扫描算法

磁臂总是从 0 号柱面开始扫描到最大号柱面，然后直接回到 0 号柱面重复进行。

### 4.4. 虚拟设备

#### 4.4.1. 问题的提出

对于卡片机打印机之类的设备，采用静态分配不利于提高系统效率。

#### 4.4.2. SPOOLing 设计与实现

##### 虚拟化

SPOOLing 技术是用于将 I/O 设备进行虚拟化的技术，这个技术可不像 CPU 的虚拟化能欺骗我们人类，它是专门用于<mark style="background: #BBFABBA6;">欺骗进程</mark>的。

假设我有一台打印机，我现在打开了两个 pdf 文档，看作是两个进程在工作，想要打印这两个文档的内容，这两个进程就都认为自己有一台打印机，而通过<mark style="background: #ABF7F7A6;">虚拟化</mark>的技术欺骗了进程。

##### 技术实现

1.  SPOOLing 技术首先需要提供<mark style="background: #BBFABBA6;">统一的调用接口</mark>，每一个进程都可以调用该接口，这样在进程看了自己是拥有该设备的。
2.  需要将磁盘设备和内存作为缓冲区，磁盘设备上的缓冲区称作<mark style="background: #ABF7F7A6;">井</mark>，而内存上的缓存区被称作<mark style="background: #ABF7F7A6;">缓冲区</mark>。
3.  需要一个专门的输入输出进程来实现对 I/O 设备的读写数据。

![](./assets/spooling-io.excalidraw.png)

当用户进程请求打印输出时，SPOOLing 系统同意为它打印输出， 但<mark style="background: #FFB86CA6;">并不真正立即</mark>把打印机分配给该用户进程，而只为它做两件事

1. 由输出进程在输出井中为之<mark style="background: #ABF7F7A6;">申请一个空闲磁盘块区</mark>，并将要打印的数据送入其中
2. 输出进程再为用户进程申请一张空白的用户请求打印表，并将用户的打印要求填入其中，再将该表挂到请求打印队列上。

如果还有进程要求打印输出，系统仍可接受该请求，也同样为该进程做上述两件事。


