---
title: 第 8 章 密码协议
---

## 8.1. 一些基本协议

### 8.1.3. 数字承诺协议

数字承诺协议是指==发送方暂时以隐藏的方式向接收方承诺一个值，承诺后不能再对该值做出任何修改==。

数字承诺协议通常有两步组成：

1. 承诺，发送方将一个消息锁进一盒中，再将该盒发送给接收方
2. 展示，发送方打开盒，以向接收方展示盒中内容

数字承诺协议必须满足以下两个性质：

- 隐藏性：第一步完成后，接收者无法获得发送者所承诺的值。如果接收者是概率多项式时间的，则称方案是计算上隐藏的。如果接收者有无穷的计算能力，则称方案是完备隐藏的。
- 捆绑性：上述第二步完成后，发送者只能向接收者展示一个值。类似于隐藏性，捆绑性也分为计算上的和完备的。

#### 1. 基于二次剩余的数字承诺

##### 公开参数

- $n$ 是两个大素数 $p, q$ 的乘积，即 $n=pq$
- $x \in \mathbb{Z}_n^\ast, \left({x \over n} \right)=1$，$x$ 是模 $n$ 的非二次剩余

##### 步骤

1. 发送者随机选 $r \leftarrow {}_R\mathbb{Z}^\ast _n$，计算 $c \equiv r^2 x^b \pmod n$，作为对 $b \in \{0, 1\}$ 的承诺
2. 为了展示承诺，发送者将 $(b,r)$ 发送给接收者，接收者验证 $r^2 x^b \pmod n \equiv c$ 是否成立。如果成立，则接受。

##### 性质

- 隐藏性：接收者若能从 $c$ 中得出 $b=0$，则可知 $c$ 是二次剩余；若能得出 $b=1$，则可知 $c$ 是非二次剩余。与判断 $c$ 是二次剩余还是非二次剩余的困难性矛盾。因此，方案是完备隐藏的。
- 捆绑性：如果发送者能将某一 $c$ 打开到两组不同值 $(b_1, r_1) \ne (b_2, r_2)$，必有 $b_1 \ne b_2, r_1 \ne r_2$。因此 $r_1^2 x^{b_1} \equiv r_2^2 x^{b_2} \bmod n$，$\left( {r_1 \over r_2} \right)^2 \equiv x ^{b_2 - b_1} \equiv x (\text{or } x^{-1}) \bmod n$，与 $x$ 是非二次剩余矛盾。

#### 2. Pedersen 数字承诺

Pedersen 数字承诺协议是基于离散对数困难性假设的。

##### 参数

- $p, q$ 是两个大素数，$q \mid p-1$
- $\mathbb{G}_q$ 是 $\mathbb{Z}_p^\ast$ 的阶为 $q$ 的子群
- $g, h$ 是 $\mathbb{G}_q$ 的生成元，但收发双方都不知道 $\log_g(h)$

##### 步骤

1. 发送者为做对 $x \in \mathbb{Z}_q$ 的承诺，随机选择 $r \leftarrow {}_R \mathbb{Z}_q$，计算 $c \equiv g^x h^r \bmod p$ 并发送给接收者
2. 为了展示承诺，发送者将 $(x,r)$ 发送给接收者，接收者验证 $g^x h^r \bmod p \equiv c$ 是否成立。如果成立，则接受。

##### 性质

- 隐藏性：已知承诺 $c$，每个 $x^\prime \in \mathbb{Z}_q$ 都可能是所承诺的值。即如果 $c \equiv g^x h^r \bmod p$，对任一 $x^\prime \in \mathbb{Z}_q$，由 $g^x h^r \equiv g^{x^\prime} h^{r^\prime} \bmod p$，得 $g^{x - x^\prime} \equiv h^{r^\prime - r} \bmod p$，$x - x^\prime \equiv (r^\prime - r) \log_g(h) \bmod q$，$r^\prime \equiv r + {x - x ^\prime \over \log_g(h) } \pmod{q}$，即存在 $r^\prime$ （虽然不知道 $\log_g(h)$ 而不能计算），满足 $c \equiv g^{x^\prime} h^{r^\prime} \bmod p$，即 $x^\prime$ 也是 $c$ 所承诺的值。所以由 $c$ 不能确定是对哪个 $x \in \mathbb{Z}_q$ 的承诺。
- 捆绑性：如果发送者能对两组不同的 $(x,r),(x^\prime, r^\prime)$ 承诺到同一值，则由 $g^x h^r \equiv g^{x^\prime} h^{r^\prime} \bmod p$，得 $\log_g(h) \equiv {x - x^\prime \over r^\prime - r } \bmod q$，即发送者能计算 $\log_g(h)$，矛盾。

### 8.1.4. 不经意传输协议

设 A 有一个秘密，想以 1/2 的概率传递给 B ，即 B 有 50% 的机会收到这个秘密，另外 50% 的机会什么也没有收到，协议执行完后，B 知道自己是否收到了这个秘密，但 A 却不知 B 是否收到了这个秘密。这种协议就称为不经意传输协议。

#### 1. 基于大数分解问题的不经意传输协议

设 A 想通过不经意传输协议传递给 B 的秘密是整数 $n$ (为两个大素数之积)的因数分解。这个问题具有普遍意义，因为任何秘密都可通过 RSA 加密，得到 $n$ 的因数分解就可得到这个秘密。

协议基于如下事实：已知某数在模 $n$ 下两个不同的平方根，就可分解 $n$。

1. B 随机选一数 $x$，将 $x^2 \bmod n$ 发送给 A
2. A (掌握 $n=pq$ 的分解) 计算 $x^2 \bmod n$ 的四个平方根 $\pm x, \pm y$ ，并将其中之一发送给 B 。由于 A 只知道 $x^2 \bmod n$ ，并不知道四个平方根中哪一个是 B 选的 $x$
3. B 检查第二步收到的数是否与 $\pm x$ 在模 $n$ 下同余，如果是，则 B 没有得到任何新信息;否则 B 就掌握了 $x^2 \bmod n$ 的两个不同的平方根，从而能够分解 $n$。而 A 却不知究竟是哪种情况

显然，B 得到 $n$ 的分解的概率为 $1/2$


## 8.2. 零知识证明

它指的是==证明者==能够在不向==验证者==提供任何有用的信息的情况下，使验证者相信某个论断是正确的 

零知识证明实质上是一种涉及两方或更多方的协议，即两方或更多方完成一项任务所需采取的一系列步骤。证明者向验证者证明并使其相信自己知道或拥有某一消息，==但证明过程不能向验证者泄漏任何关于被证明消息的信息==。

> [!note] 例子
> 
> A 要向 B 证明自己拥有某个房间的钥匙，假设该房间只能用钥匙打开锁，而其他任何方法都打不开。这时有 2 个方法
> 
> - A 把钥匙==出示==给 B，B 用这把钥匙打开该房间的锁，从而证明 A 拥有该房间的正确的钥匙。  
> - B 确定该房间内有某一物体，A 用自己拥有的钥匙打开该房间的门，然后==把物体拿出来出示给 B== ，==从而证明==自己确实拥有该房间的钥匙。

第二种方法属于==零知识证明==。好处在于：在整个证明的过程中，B 始终不能看到钥匙的样子，从而避免了钥匙的泄露。

### 8.2.1. 交互证明系统

交互证明系统由两方参与，分别称为证明者 Prover 和验证者 Verifier ，其中 $\mathcal{P}$ 知道某一秘密，$\mathcal{P}$ 希望 $\mathcal{V}$ 相信自己的确掌握这一秘密。

交互证明由若干轮组成，在某一轮，$\mathcal{P}$ 和 $\mathcal{V}$ 可能==需根据从对方收到的消息==和==自己计算的某个结果==决定向对方发送的消息。比较经典的方式是在==每轮 $\mathcal{V}$ 都向 $\mathcal{P}$ 发出一询问==， ==$\mathcal{P}$ 向 $\mathcal{V}$ 做出一应答==。所有轮执行完后， $\mathcal{V}$ 根据 $\mathcal{P}$ 是否在每一轮对自己发出的询问都能正确应答，以决定是否接受 $\mathcal{P}$ 的证明。

> [!tip] 交互证明与数学证明的区别
> 
> - 数学证明的证明者可自己独立地完成证明，相当于笔试
> - 交互证明是由 $\mathcal{P}$ 一步一步地产生证明、 $\mathcal{V}$ 一步一步地验证证明的有效性来实现，相当于口试，因此双方之间通过某种信道的通信是必需的。
> 
> 交互证明系统需满足以下要求
> 
> - 完备性:如果 $\mathcal{P}$ 知道某一秘密， $\mathcal{V}$ 将接受 $\mathcal{P}$
> - 可靠性:如果 $\mathcal{P}$ 能以一定的概率使 $\mathcal{V}$ 相信的证明，则 $\mathcal{P}$ 知道相应的秘密。

**例** 证明者 $\mathcal{P}$ 有两个同构图 $G,H$，向验证者证明 $G \cong H$，即从 $G$ 的顶点集到 $H$ 的顶点集存在一个==一一映射==， $\mathcal{P}$ 只须向 $\mathcal{V}$ 出示这个映射。

> [!example] 样例
> 
> 
> ~~~mermaid
> graph LR 
> 
> subgraph G
>     e --- b --- a --- c --- d --- e
>     b --- c
> end
> 
> subgraph H
>     x --- y --- z --- u --- v --- x
>     y --- u
> end
> ~~~
> 
> $$
> \pi=\{ (x,e), (y,b), (z,a), (u,c), (v,d) \}
> $$
> 

### 8.2.3. 交互证明系统的零知识性

零知识证明起源于==最小泄露证明==。

在交互系统中，设 $\mathcal{P}$ 知道某一秘密，并向 $\mathcal{V}$ 证明自己掌握这一秘密，但又==不向 $\mathcal{V}$ 泄露这一秘密==，这就是最小泄露证明。

进一步，如果 $\mathcal{V}$ 除了知道 $\mathcal{P}$ 能证明某一事实外，==不能得到其他任何信息==，则称 $\mathcal{P}$ 实现了==零知识证明==，相应的协议称为零知识证明协议。

**例** 一个简单的迷宫，C D 之间有一道门，需要知道秘密口令才能将其打开。 $\mathcal{P}$ 向 $\mathcal{V}$ 证明自己能打开这道门，但又不愿意向 $\mathcal{V}$ 泄露秘密口令。

![](./assets/crypto0804345.png)

> [!example] 可采用的协议
> 
> 1. $\mathcal{V}$ 开始时停留在 A
> 2. $\mathcal{P}$ 一直走到迷宫深处，随机选择位置 C 或 D
> 3. $\mathcal{P}$ “消失”后， $\mathcal{V}$ 走到 B 处，命令 $\mathcal{P}$ 从某个出口返回 B
> 4. $\mathcal{P}$ 服从 $\mathcal{V}$ 的命令，必要时利用秘密口令打开 C 与 D 之间的门
> 5. 重复以上过程 $n$ 次
> 
> 协议中，如果 $\mathcal{P}$ 不知道秘密口令，就只能原路返回，不能呢个走另一条路。 $\mathcal{P}$ 每次猜对 $\mathcal{V}$ 要求走哪的概率是 $1/2$，因此每轮能欺骗的概率为 $1/2$。假定 $n=16$，则 $\mathcal{P}$ 欺骗 $\mathcal{V}$ 的概率为 $1 /2 ^{16}$。如果每次 $\mathcal{P}$ 都能按 $\mathcal{V}$ 的要求返回， $\mathcal{V}$ 即能证明 $\mathcal{P}$ 确实知道秘密口令。
> 
> 同时 $\mathcal{V}$ 无法获取丝毫关于 $\mathcal{P}$ 秘密口令的信息，所以这是一个零知识证明。

### 8.2.4. 非交互式证明系统

在上述交互式证明系统中，如果 $\mathcal{P}$ 和 $\mathcal{V}$ ==不进行交互==，证明由 $\mathcal{P}$ 产生后==直接==给 $\mathcal{V}$ ， $\mathcal{V}$ 对证明直接进行验证，这种证明系统称为非交互式证明系统

Non-Interactive Zero-Knowledge

### 8.2.8. 知识证明

知识证明指证明者 $\mathcal{P}$ 向验证者 $\mathcal{V}$ 证明自己掌握一知识，但又不出示这个知识。例如 $\mathcal{P}$ 向 $\mathcal{V}$ 证明自己掌握一口令，但不向 $\mathcal{V}$ 出示这个口令。又如已知一公开钥 $PK$， $\mathcal{P}$ 向 $\mathcal{V}$ 证明自己知道与 $PK$ 对应的秘密钥 $SK$。

在知识的证明过程中，如果 $\mathcal{P}$ 没有再泄露其他额外的信息，则称该知识证明是==零知识的==

**例** $A$ 为公钥

已知循环群 $\mathbb{G} =\langle g \rangle = \langle h \rangle, A=g^x h^y$， $\mathcal{P}$ 向 $\mathcal{V}$ 证明知道 $x,y$

> [!example] 协议
> 
> 1. $\mathcal{P}$ 随机选取 $r_1,r_2 \leftarrow {}_R \mathbb{Z}_q$，计算 $t \equiv g^{r_1} h^{r_2} \bmod q$，将 $t$ 发送给 $\mathcal{V}$
> 2. $\mathcal{V}$ 随机选 $c \leftarrow {}_R \mathbb{Z}_q$，将 $c$ 发送给 $\mathcal{P}$
> 3. $\mathcal{P}$ 计算 $s_1 \equiv xc+r_1 \pmod q, s_2 \equiv yc+r_2 \pmod q$，将 $(s_1, s_2)$ 发送给 $\mathcal{V}$
> 4. $\mathcal{V}$ 检查 $g^{s_1} h^{s_2} = A^ct$ 是否成立，成立则接受 $\mathcal{P}$ 的证明，否则拒绝
> 
> $$
> \begin{aligned}
> g^{s_1} h^{s_2} & = g^{xc + r_1} h^{yc + r_2} \\
> & = g^{xc} g^{r_1} h^{yc} h^{r_2} \\
> & = (g^x h^y)^c g^{r_1} h^{r_2} \\
> & \equiv A^c t \pmod q
> \end{aligned}
> $$

**例** $PK \{ A=g^\alpha , B=h^\alpha \}$

已知循环群 $\mathbb{G} =\langle g \rangle = \langle h \rangle, A=g^x, B=h^x$， $\mathcal{P}$ 向 $\mathcal{V}$ 证明知道 $x$ 且 $(g,h,A,B)$ 形成 DDH 元组（判定 Diffie-Hellman 问题）即 $A,B$ 有相同指数 $x$

> [!example] 协议
> 
> 1. $\mathcal{P}$ 随机选 $r \leftarrow {}_R\mathbb{Z}_q$，计算 $t_1 \equiv g^r \bmod q, t_2 \equiv h^r \bmod q$，将 $t_1, t_2$ 发送给 $\mathcal{V}$
> 2. $\mathcal{V}$ 随机选 $c \leftarrow {}_R\mathbb{Z}_q$，将 $c$ 发送给 $\mathcal{P}$
> 3. $\mathcal{P}$ 计算 $s \equiv xc+r \pmod q$，将 $s$ 发送给 $\mathcal{V}$
> 4. $\mathcal{V}$ 检查 $g^s = A^c t_1, h^s = B^c t_2$ 是否成立，若成立则接受 $\mathcal{P}$ 的证明
> 

> DDH 问题：给定四元组 $g, g^\mu, g^\nu, g^\kappa \in \mathbb{G}$，如果 $\kappa = \mu \nu$，则输出真，否则输出假

协议证明了 $\mathcal{P}$ 知道 $x$，是否也证明了 $(g,h,A,B)$ 形成 DDH 元组？

> [!example] 解答
> 
> 若 $A = g^x, B = h^{x ^\prime}, x \ne x^\prime$， $\mathcal{P}$ 选择 $r_1,r_2 \leftarrow {}_R \mathbb{Z}_q, r_1 \ne r_2$
> 
> > 若 $r_1 = r_2$，则由 $g^s = A^c t_1$ 和 $h^s = B^c t_2$ 得 $s \equiv xc+r_1 \pmod q, s \equiv x^\prime c+r_2 \pmod q$，与 $x \ne x^\prime$ 矛盾
> 
> 计算 $t_1 \equiv g^{r_1} \bmod q, t_2 \equiv h^{r_2} \bmod q$，协议其他部分保持不变。$g^s = A^c t_1, h^s = B^c t_2$ 成立，仅当 $xc+r_1 \equiv x^\prime c + r_2 \pmod q$，即 $c = {r_1-r_2 \over x^\prime - x} \pmod q$ 时，验证方程成立。
> 
> 而 $\mathcal{V}$ 选到这个特定值 $c$ 的概率是可以忽略的，所以 $\mathcal{P}$ 欺骗成功的概率是可忽略的。
> 






