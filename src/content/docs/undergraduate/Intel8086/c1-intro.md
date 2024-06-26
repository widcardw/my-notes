---
title: 第 1 章 概述
---

## 一. IA-32 结构的发展

### 1. 发展历史

- 1971 Intel 4004 4 位微处理器，是世界上第一款商用微型处理器
- 1972 Intel 8008 8 位微处理器，首次采用了处理器的指令技术
- 1982 Intel 公司推出了最后一块 16 位处理器 80286
- 1985 Intel 公司推出了第一代 32 位处理器：80386

### 2. 计算机发展规律

- 摩尔定律
- 安迪—比尔定律
- 反摩尔定律

### 3. CPU架构

#### 3.1. 定义

CPU 厂商给属于同一系列的 CPU 产品定的一个==规范==，主要的目的是为了区分不同类型 CPU 的重要标示

CPU 架构规定了 CPU ==接受和处理信号的方式==，及其内部元件的组织方式

#### 3.2. 涉及范围

- 指令系统
- 内部寄存器组织
- 内存段页组织，内存保护，虚拟内存
- 总线访问组织

### 4. 8086 (8088) CPU

#### 4.1. 功能分类

从功能上分两部分：

- 总线接口单元 BIU
- 执行单元 EU

#### 4.2. 寻址空间

20 根地址线，1M 字节寻址空间

### 5. IA-32 处理器

#### 5.1. 寻址空间

32 根地址线， 4G 字节寻址空间，最多 64G 字节物理存储器

#### 5.2. 16 个基本的程序执行寄存器

- 通用寄存器
  - `EAX` `EBX` `ECX` `EDX` `ESI` `EDI` `EBP` `ESP`
- 段寄存器
  - `CS` `DS` `SS` `ES` `FS` `GS`
- 程序状态和控制寄存器
  - `EFLAGS`
- 指令指针
  - `EIP`

## 二. 计算机基本结构

### 1. 五大部件

- 运算器
- 控制器
- 存储器
- 输入设备
- 输出设备

### 2. 微型计算机系统

#### 2.1. 差异

- 微处理器
  - 由一片或几片大规模集成电路芯片组成的中央处理器
- 微型计算机
  - 以微处理器为基础配以==内存储器==以及==输入输出接口电路和相应的辅助电路==而构成的==裸机==
- 微型计算机系统
  - 微型计算机配以相应的==外围设备==和其他专用电器、电源、面板、机架以及足够的软件而构成的==系统==

#### 2.2. 结构

- 微型计算机系统
  - 硬件
    - 微型计算机
      - 微处理器
        - 运算器
        - 控制器
        - 寄存器组
      - 内存储器
      - 输入输出接口
    - 输入输出设备及外存储器
  - 软件
    - 系统软件
    - 应用软件
  - 电源、面板和机架等

## 三. 总线

微型计算机的外部结构

![](./wj8086/01/wj0101.png)

总线是各部件之间信息传输的==公共通路==

### 1. 逻辑分类

#### 1.1. 地址总线

微处理器向内存储器和 I/O 接口传送地址信息的通路，是==单向总线==，只能从微处理器向外传送

通常为 32 位，即 $A_{31}\sim A_0$，因此，可寻址的内存单元为 $2^{32}=4\,\mathrm{GB}$。I/O 接口也是通过地址总线来寻址的，它可寻址 64KB 的外设端口

#### 1.2. 数据总线

是从==微处理器向内存储器或 I/O 接口==传送数据的通路，也是从==内存储器或 I/O 接口向微处理器==传送数据的通路，可以在两个方向上往返传送数据，称为==双向总线==

通常为 32 位，即 $D_{31}\sim D_0$

#### 1.3. 控制总线

微处理器向内存储器和 I/O 接口传送==命令信号==以及外界向微处理器传送==状态信号==等信息的通路

- 读信号 : `RD`
- 写信号 : `WR`
- 8086 中的 `READY`

### 2. 物理分类

#### 2.1. 片内总线

位于微处理器==芯片的内部==，用于算术逻辑单元 ALU 与各种寄存器或其他功能单元之间的相互连接

#### 2.2. 片总线

是一台单板计算机或一个插件板的板内总线，用于各==芯片之间的连接==

#### 2.3. 内总线

又称为微型计算机总线或==系统总线==，用于微型计算机系统各插件板之间的连接

#### 2.4. 外总线

又称通信总线，用于系统之间的连接，如微机系统之间，微机系统与仪器等等

### 3. 总线作用

早期的计算机，输入/输出是通过运算器进行的，在输入和输出设备之间没有信号的直接联系。在微机系统中采用了总线结构，可以在==存储器和外设设备之间直接进行信息传输==，扩大了==数据传送的灵活性==，减少了连线。另一方面，总线可以==实现标准化==，==易于兼容和工业化的生产==。

## 四. 计算机基础

### 1. 常用名词术语

#### 1.1. 位

一个二进制位

#### 1.2. 字节

8 个二进制位

#### 1.3. 字和字长

“字”是计算机内部进行数据传递处理的基本单位。

一个字所包含的二进制位数称为字长。常见的微型计算机的字长，有 8 位、16 位、32 位和 64 位之分。

#### 1.4. 数字编码 BCD

BCD码（Binary Coded Decimal 码）是十进制数的编码。0~~9 数字的 BCD 码分别对应 0000~~1001 编码。

计算机常用一个字节存放2位BCD码（压缩BCD码）。

#### 1.5. 字符编码 ASCII

计算机的文字符号的信息编码。用 7 位编码，可表示 128 个字符。

计算机常用一个字节存放一个ASCII码（ D7 位恒为 0 ）

### 2. 指令程序和指令系统

#### 2.1. 指令系统

计算机所能执行的**全部指令**就是计算机的指令系统。

#### 2.2. 源程序

用户为解决自己的问题所编写的程序（==指令的集合==）

指令分为操作码（Operation code, Opcode）和操作数（Operand）。操作码表示计算机==执行什么样的操作==；操作数指明==参加操作的数==的本身或操作数==所在的地址==。

#### 2.3. 机器码

计算机能识别的==二进制数码==。

例如从存储区取数至累加器 AL 中的指令编码为 `8A04H`。

#### 2.4. 助记符

便于人们记忆、并能描述指令功能和指令操作数的符号。一般采用表明指令功能的英文缩写。

例如 8086 中数的传送指令用助记符 MOV，加法用 ADD。

#### 2.5. 程序计数器

程序中的指令是一条条==顺序执行==的，计算机在执行时需要将对应的指令一条条取出来，这就要求必须有一个电路能追踪指令所在的地址。

程序计数器（Program Counter, ==PC==）在程序开始执行时被赋予第一条指令所在的地址，然后每取出一条指令，PC 的内容就加 1，指向下一条指令，这样就保证程序的顺序执行。

调用子程序或者遇到中断，==PC会将控制转到需要的地方==。

### 3. 初级计算机

微型计算机

![](./wj8086/01/wj0102.png)

#### 3.1. CPU 的结构

![](./wj8086/01/wj0103.png)

- ALU : 执行算数和逻辑运算
- F : Flag 标志寄存器
- PC : 程序计数器
- AR : 地址寄存器
- AB : 地址总线
- DB : 数据总线
- ID : 指令译码器
- IR : 指令寄存器

#### 3.2. 存储器

![](./wj8086/01/wj0104.png)

每个单元可以存放 8 位二进制信息。地址总线传送的 8 位地址通过地址译码器可以获得对应于 256 个单元的地址号，之后就可以对这个单元进行读写操作。

##### 3.2.1. 读数据流程

AR 给出地址号，CPU 发出读的控制命令，数据从对应存储单元取出放到 DB 上，传送到 DR。

##### 3.2.2. 写数据流程

AR 给出地址号，DR 寄存器中的内容经 DB 送给存储器，CPU 发出写的控制命令，将数据写入存储器。

### 4. 简单程序举例

#### 4.1. 程序执行过程

| Address | Content   | Comment     |
| ------- | --------- | ----------- |
| 00      | 1011 0000 | `MOV AL, n` |
| 01      | 0000 0111 | `n=7`       |
| 02      | 0000 0100 | `ADD AL, n` |
| 03      | 0000 1010 | `n=10`      |
| 04      | 1111 0100 | `HLT`       |

![](./wj8086/01/wj0105.png)

1. 将 PC 中的内容 `00H` 送至地址寄存器 AR
2. PC 中的内容成功发送到 AR 之后，PC 中的内容加 1 变成 `01H`
3. 将AR中的地址号 `00H` 通过地址总线送至存储器，经地址译码器译码之后选中存储其中 00 号单元
4. CPU 给出读操作的控制命令
5. 将存储器中 `00H` 单元的内容 `B0H` 读至数据总线 DB 上
6. 读出的内容 `B0H` 经数据总线 DB 传送到数据寄存器 DR
7. DR 将指令传送至指令寄存器 IR，然后经过译码发出执行指令的控制命令

## 五. 寻址方式

### 1. 立即寻址

==操作数就包含在指令中==，这种规定操作数的方式，称为立即寻址

指令中的操作数称为立即数

eg. `MOV AL, 08H` 意为将数 `08H` 存入 AL 寄存器

### 2. 寄存器寻址

==操作数在某一寄存器中==，这种寻址方式称为寄存器寻址

eg. `MOV AL, BL` 意为将寄存器 BL 中的数存入 AL 中

### 3. 直接寻址

指令中包含操作数的==直接地址==

eg. `MOV AL, [n]` 意为将地址 n 指向的存储器内的数，存入 AL 寄存器

### 4. 寄存器间接寻址

操作数的地址并不直接在指令中，而是==在某一寄存器中==。用对应寄存器中的内容作为操作数的地址。

eg. `MOV AL, [BL]` 意为将寄存器 BL 中的数作为地址，从存储器中取出该地址的数，存入 AL 寄存器

| 指令名称 | 寻 址 方 式 | 助 记 符          | 操作码     | 说 明         |
| ---- | ------- | -------------- | ------- | ----------- |
| 取数指令 | 立即寻址    | `MOV AL, n`    | `B0 n`  | `AL ← n`    |
| ^^   | 寄存器寻址   | `MOV AL, BL`   | `8A C3` | `AL ← BL`   |
| ^^   | 寄存器间接寻址 | `MOV AL, [BL]` | `8A 07` | `AL ← [BL]` |
| ^^   | 直接寻址    | `MOV AL, [n]`  | `A0 n`  | `AL ← [n]`  |
| 存数指令 | 直接寻址    | `MOV [n], AL`  | `A2 n`  | `[n] ← AL`  |
| ^^   | 寄存器间接寻址 | `MOV [BL], AL` | `88 07` | `[BL] ← AL` |
| 加法指令 | 立即寻址    | `ADD AL, n`    | `04 n`  | `AL ← AL+n` |
| ^^   | 寄存器寻址   | `ADD AL, BL`   | `02 C3` | ^^          |
| ^^   | 寄存器间接寻址 | `ADD AL, [BL]` | `02 07` | ^^          |
