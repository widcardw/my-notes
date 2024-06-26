---
title: 第 4 章 公钥密码
---

## 4.1. 数学知识

### 4.1.1. 群 环 域

设 $\ast$ 是集合 $S$ 上的运算，若对 $\forall a,b \in S$，有 $a \ast b \in S$，则称 $S$ 对运算 $\ast$ 是封闭的。若 $\ast$ 是一元运算，对 $\forall a \in S$，有 $\ast a \in S$，则称 $S$ 对运算 $\ast$ 是封闭的。

若对 $\forall a, b, c \in S$，有 $(a \ast b) \ast c = a \ast (b \ast c)$，则称 $\ast$ 满足结合律。

> [!note] 定义 4-1
> 
> 设 $\langle\mathbb{G}, \ast\rangle$ 是一个代数系统，$\ast$ 满足
> 
> - 封闭性
> - 结合律
> 
> 则称 $\langle\mathbb{G}, \ast\rangle$ 是半群

> [!note] 定义 4-2
> 
> 设 $\langle\mathbb{G}, \ast\rangle$ 是一个代数系统，$\ast$ 满足
> 
> - 封闭性
> - 结合律
> - 存在元素 $e$，对 $\forall a \in \mathbb(G)$，有 $a \ast e = e \ast a = a$；$e$ 称为 $\langle\mathbb{G}, \ast\rangle$ 的单位元
> - 对 $\forall a \in \mathbb{G}$，存在元素 $a^{-1}$，使得 $a \ast a^{-1} = a^{-1} \ast a = e$，称 $a^{-1}$ 为 $a$ 的逆元
> 
> 则称 $\langle\mathbb{G}, \ast\rangle$ 是群，若其中的运算 $\ast$ 已明确，有时将其简记为 $\mathbb{G}$
> 
> 如果 $\mathbb{G}$ 是有限集合，则称 $\langle\mathbb{G}, \ast\rangle$ 是有限群，否则是无限群。有限群中，$\mathbb{G}$ 的元素个数称为群的阶数
> 
> 如果群 $\langle\mathbb{G}, \ast\rangle$ 中的运算 $\ast$ 还满足交换律，即对 $\forall a, b \in \mathbb{G}$，有 $a \ast b = b \ast a$，则称 $\langle\mathbb{G}, \ast\rangle$ 为交换群或 Abel 群

> [!note] 定义 4-3
> 
> 设 $\langle\mathbb{G}, \ast\rangle$ 是一个群，$I$ 是整数集合。如果存在一个元素 $g \in \mathbb{G}$，对于每一个元素 $a \in \mathbb{G}$，都有相应的 $i \in I$，能把 $a$ 表示成 $g^i$，则称 $\langle\mathbb{G}, \ast\rangle$ 是循环群，$g$ 称为循环群的生成元，记 $\mathbb{G} = \langle g \rangle = \{ g^i \mid i \in I \}$。称满足方程 $a^m = e$ 的最小正整数 $m$ 为 $a$ 的阶，记为 $|a|$

> [!note] 定义 4-4
> 
> 若代数系统 $\langle \mathbb{R}, +, \cdot, \rangle$ 的二元运算 $+$ 和 $\cdot$ 满足
> 
> - $\langle \mathbb{R}, + \rangle$ 是 Abel 群
> - $\langle \mathbb{R}, \cdot \rangle$ 是半群
> - 乘法 $\cdot$ 在加法 $+$ 上可分配
> 
> 则称 $\langle \mathbb{R}, +, \cdot, \rangle$ 是环

> [!note] 定义 4-5
> 
> 若代数系统 $\langle \mathbb{F}, +, \cdot \rangle$ 的二元运算 $+$ 和 $\cdot$ 满足
> 
> - $\langle \mathbb{F}, + \rangle$ 是 Abel 群
> - $\langle \mathbb{F} - \{ 0 \}, \cdot \rangle$ 是 Abel 群，其中 $0$ 是 $+$ 的单位元
> - 乘法 $\cdot$ 在加法 $+$ 上可分配
> 
> 则称 $\langle \mathbb{F}, +, \cdot \rangle$ 是域

$\langle Q, +, \cdot \rangle, \langle R, +, \cdot \rangle, \langle C, +, \cdot \rangle$ 都是域，分别代表有理数集、实数集、复数集

有限域是指域中元素个数有限的域，元素的个数称为域的阶。

### 4.1.2. 素数和互素数

#### 1. 因子

$a, b \in Z, b \ne 0$，若存在另一个整数 $m$，使得 $a=mb$，则称 $b$ 整除 $a$，记为 $b \mid a$

#### 2. 素数

称素数 $p(p>1)$ 是素数，如果 $p$ 的因子只有 $\pm 1$ 和 $\pm p$

任一整数 $a(a>1)$ 都能唯一的分解为以下形式

$$
a = p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_t^{\alpha_t}
$$

其中 $p_1 < p_2 < \cdots < p_t$ 是素数

#### 3. 互素数

$c$ 为 $a$ 和 $b$ 的最大公因子，$c=\gcd (a,b)$

> 要求最大公因子一般为正

> [!example] 辗转相除求最大公因子
> 
> ~~~python
> def gcd(a: int, b: int) -> int:
>     while b:
>         a, b = b, a % b
>     return a
> ~~~

若 $\gcd(a, b)=1$ 则称 $a$ 与 $b$ 互素

最小公倍数 $\text{lcm}(a,b)=\displaystyle \frac{ab}{\gcd(a, b)}$

### 4.1.3. 模运算

$$
a = q n + r,0 \leqslant r < n,q = \left\lfloor{a\over n}\right\rfloor
$$

其中 $a \equiv r \bmod n$

> 交换律、结合律、分配率、加法单位元 0 、乘法单位元 1 此处从略

#### 乘法逆元



记 $Z_n^\ast = \{ a \mid 0 < a < n, \gcd(a, n)=1 \}$ 

> [!note] 定理 4-1
> $Z_n^\ast$ 中每个元素都有乘法逆元

对 $1 \in Z_n^\ast$，存在 $x \in Z_n^\ast$，使得 $a \times x \equiv 1 \bmod n$，$x$ 为 $a$ 的乘法逆元，记为 $x = a^{-1}$

### 4.1.4. 模指数运算

对给定的正整数 $m, n$，计算 $a^m \bmod n$

**例 4-5** $a=7,n=19$，易求出 

$$
\begin{aligned}
7^1 & \equiv 7 \bmod {19}\\
7^2 & \equiv 11 \bmod {19}\\
7^3 & \equiv 1 \bmod {19}\\
\end{aligned}
$$

可以看出存在循环，循环周期为 3

> 称满足方程 $a^m \equiv 1 \bmod n$ 的最小正整数 $m$ 为模 $n$ 下 $a$ 的阶，记为 $\text{ord}_n(a)$

> [!note] 定理 4-2
> 
> 设 $\text{ord}_n(a)=m$，则 $a^k \equiv 1 \bmod n$ 的充要条件是 $k$ 为 $m$ 的倍数

### 4.1.5. 三个定理

#### 费尔马定理

> [!note] Fermat 定理
> 
> 若 $p$ 为素数，$a$ 是正整数且 $\gcd(a, p)=1$，则 $a^{p-1} \equiv 1 \bmod p$

#### 欧拉函数

设 $n$ 是一正整数，小于 $n$ 且与 $n$ 互素的正整数的个数称为 $n$ 的欧拉函数，记为 $\varphi (n)$

> [!note] 定理 4-4
> 
> - 若 $n$ 是素数，则 $\varphi (n)=n-1$
> - 若 $n$ 是两个素数 $p$ 和 $q$ 的乘积，则 $\varphi(n)=\varphi(p) \times \varphi(q)=(p-1)\times(q-1)$
> - 若 $n$ 有标准分解式 $n=p_1^{\alpha_1}p_2^{\alpha_2}\cdots p_t^{\alpha_t}$，则 $\varphi(n)=n \left(1 - \displaystyle {1\over p_1}\right) \left(1 - \displaystyle {1\over p_2}\right) \cdots \left(1 - \displaystyle {1\over p_t}\right)$

#### 欧拉定理

> [!note] 欧拉定理
> 
> 若 $a$ 和 $n$ 互素，则 $a^{\varphi(n)} \equiv 1 \bmod n$

**推论** $\text{ord}_n(a) \mid \varphi(n)$

推论说明，$\text{ord}_n(a)$ 是 $\varphi(n)$ 的因子，则称 $a$ 为 $n$ 的==本原根==。如果 $a$ 是 $n$ 的本原根，则 $a, a^2, \cdots, a^{\varphi(n)}$ 在 $\bmod n$ 下互不相同且与 $n$ 互素。 

#### 卡米歇尔定理

对满足 $\gcd (a,n)=1$ 的所有 $a$，使得 $a^m \equiv 1 \bmod n$ 同时成立的最小正整数 $m$，称为 $n$ 的卡米歇尔函数，记为 $\lambda(n)$

> 似乎没说要考

### 4.1.6. 素性检验

#### 爱拉托斯尼筛法

用于求一定范围内的所有素数，每次筛去某一个小于 $\sqrt{n}$ 的素数的超过 1 的整数倍。

对于 $n$ 很大时，不可行。

#### Miller-Rabin 概率检测法

> 懒，不想写

### 4.1.7. 欧几里得算法

#### 1. 求最大公因子

```python
def gcd(a: int, b: int) -> int:
    while b != 0:
        a, b = b, a % b
    return a
```

#### 2. 求乘法逆元

如果 $(a,b)=1$，则 $b$ 在 $\bmod a$ 下有乘法逆元（不妨设 $b<a$），即存在一个 $x(x<a)$，使得 $bx \equiv 1 \bmod a$。推广的欧几里得算法先求出 $(a,b)$，当 $(a,b)=1$ 时，则返回 $b$ 的逆元。

```python
# 扩展欧几里得算法
def extended_euclid(a, b):
    x, y, u, v = 0, 1, 1, 0
    while b != 0:
        q, r = divmod(a, b)
        a, b = b, r
        x, u = u, x - q * u
        y, v = v, y - q * v
    return x, y, a

# 求出乘法逆元
def inverse(a, m):
    x, y, q = extended_euclid(a, m)
    if x < 0:
        x += m
    return x
```
### 4.1.8. 中国剩余定理

- 如果已知某个数关于一些两两互素的数的同余类集，就可重构这个数
- 可将大数用小数表示、大数的运算通过小数实现

> [!note] 中国剩余定理
> 
> 设 $m_1, m_2, \cdots, m_k$ 是两两互素的正整数，$M = \displaystyle \prod_{i=1}^{k}m_i$，则一次同余方程组
> 
> $$
> \begin{cases}
> x \equiv a_1 \pmod{m_1}   \\
> x \equiv a_2 \pmod{m_2}   \\
> \cdots \\
> x \equiv a_k \pmod{m_k}  
> \end{cases}
> $$
> 
> 令 $m_iM_i=M$，即 $M_i = {M \over m_i}$；令 $M_i^\prime M_i \equiv 1 \pmod {m_i}$，即 $M_i^\prime$ 为 $M_i$ 模 $m_i$ 的乘法逆元
> 
> 对模 $M$ 有唯一解：
> 
> $$
> x \equiv \left( M_1^\prime M_1 a_1 + M_2^\prime M_2 a_2 + \cdots + M_k^\prime M_k a_k \right) \pmod{M}
> $$

中国剩余定理提供了一个非常有用的特性，即在模 $M$ 下可将大数 $A$ 由一组小数 $(a_1, a_2, \cdots, a_k)$ 来表达，且大数的运算可以通过小数实现。表示为：

$$
A \leftrightarrow (a_1, a_2, \cdots, a_k)
$$

其中 $a_i = A \bmod m_i$，则有以下推论：

**推论** 如果

$$
A \leftrightarrow (a_1, a_2, \cdots, a_k), B \leftrightarrow (b_1, b_2, \cdots, b_k),
$$

那么

$$
\begin{aligned}
(A+B) \bmod M \leftrightarrow ((a_1+b_1) \bmod{m_1}, \cdots, (a_k+b_k) \bmod{m_k})\\
(A-B) \bmod M \leftrightarrow ((a_1-b_1) \bmod{m_1}, \cdots, (a_k-b_k) \bmod{m_k})\\
(A \times B) \bmod M \leftrightarrow ((a_1 \times b_1) \bmod{m_1}, \cdots, (a_k \times b_k) \bmod{m_k})\\
\end{aligned}
$$

**例题** 有下面的同余方程组，求 $x$

$$
\begin{cases}
x \equiv 1 \bmod 2 \\
x \equiv 2 \bmod 3 \\
x \equiv 3 \bmod 5 \\
x \equiv 5 \bmod 7
\end{cases}
$$

> [!example] 解答
> 
> $$
> \begin{aligned}
> M & = 2 \times 3 \times 5 \times 7 = 210 \\
> M_1 & = 105 \\ M_2 & = 70 \\ M_3 & = 42 \\ M_4 & = 30 \\
> e_1 & \equiv M_1^{-1} \bmod 2 \equiv 1 \\
> e_2 & \equiv M_2^{-1} \bmod 3 \equiv 1 \\
> e_3 & \equiv M_3^{-1} \bmod 5 \equiv 3 \\
> e_4 & \equiv M_4^{-1} \bmod 7 \equiv 4 \\
> x & \equiv (105 \times 1 \times 1 + 70 \times 1 \times2 + 42 \times 3 \times 3 + 30 \times 4 \times 5) \bmod{210} \\ 
> & \equiv 173 \bmod{210}
> \end{aligned}
> $$

### 4.1.9. 离散对数

#### 1. 指标

设 $p$ 是一素数，$a$ 是 $p$ 的本原根，则 $a, a^2, \cdots, a^{p-1}$ 产生出 $1 \sim p-1$ 之间的所有值，且每一值只出现一次。因此对任意 $b \in \{1, \cdots, p - 1\}$，都存在唯一的 $i(1 \leqslant i \leqslant p - 1)$，使得 $b \equiv a^i \bmod p$。称 $i$ 为模 $p$ 下以 $a$ 为底 $b$ 的指标，记为 $i=\text{ind}_{a, p}(b)$。指标有以下性质：

- $\text{ind}_{a, p}(1)=0$ 即 $a^0 \bmod p =1 \bmod p = 1$
- $\text{ind}_{a, p}(a)=1$ 即 $a^1 \bmod p = a$

> [!note] 定理 4-10
> 
> 若 $a^z \equiv a^q \bmod p$，其中 $p$ 为素数，$a$ 是 $p$ 的本原根，则有 $z \equiv q \bmod {\varphi (p)}$

> [!example] 证明
> 
> 因 $a$ 和 $p$ 互素，所以 $a$ 在模 $p$ 下存在逆元 $a^{-1}$，在 $a^z \equiv a^q \bmod p$ 两边同乘 $(a^{-1})^q$ 得 $a^{z-q} \equiv 1 \bmod p$。因 $a$ 是 $p$ 的本原根，$a$ 的阶为 $\varphi (p)$，所以存在整数 $k$，使得 $z-q \equiv k \varphi (p)$，所以 $z \equiv q \bmod {\varphi (p)}$

又有两条性质

- $\text{ind}_{a, p}(xy)=[\text{ind}_{a,p}(x) + \text{ind}_{a,p}(y)] \bmod \varphi (p)$
- $\text{ind}_{a, p}(y^r)=[r \times \text{ind}_{a, p}(y)] \bmod \varphi p$

#### 2. 离散对数

设 $p$ 是一素数，$a$ 是 $p$ 的本原根，则 $a, a^2, \cdots, a^{p-1}$ 产生出 $1 \sim p-1$ 之间的所有值，且每一值只出现一次。因此对任意 $\forall b \in \{1, \cdots, p - 1\}$，都存在唯一的 $i(1 \leqslant i \leqslant p - 1)$，使得 $b \equiv a^i \bmod p$。称 $i$ 为模 $p$ 下以 $a$ 为底 $b$ 的离散对数，记为 $i \equiv \log_a(b) \bmod p$

当 $a, p, i$ 已知，用快速指数算法可以比较容易算出 $b$，但如果已知 $a, b, p$，求 $i$ 则十分困难。

## 4.2. 公钥密码体制的基本概念

### 4.2.1. 公钥密码体制的原理

采用两个相关密钥将加密和解密能力分开。一个密钥公开，用于加密数据；一个密钥为用户专用，是保密的，用于解密。

算法的特性：==已知密码算法和加密密钥，求解解密密钥在计算上是不可行的==

![](./assets/crypto02.svg)

$$
\begin{aligned}
c & = \mathcal{E}_{PK_B}[m]\\
m & = \mathcal{D}_{SK_B}[c]
\end{aligned}
$$

公钥密码体制的认证、保密框图

![](./assets/crypto03.svg)

$$
\begin{aligned}
c &= \mathcal{E}_{PK_B}[\mathcal{E}_{SK_A}[m]]\\
m &= \mathcal{D}_{PK_A}[\mathcal{D}_{SK_B}[c]]
\end{aligned}
$$

### 4.2.2. 公钥密码算法应满足的要求

1. 接收方 B 产生密钥对（公钥 $PK_B$ 和私钥 $SK_B$）是计算上容易的
2. 发方 A 用收方的公开钥对消息 $m$ 加密以产生密文 $c$，即 $c = \mathcal{E}_{PK_B}[m]$ 在计算上是容易的
3. 收方 B 用自己的秘密钥对 $c$ 解密，即 $m=\mathcal{D}_{SK_B}[C]$ 在计算上是容易的
4. 敌手由 B 的公开钥 $PK_B$ 求秘密钥 $SK_B$ 在计算上是不可行的
5. 敌手由密文 $c$ 和 B 的公开钥 $PK_B$ 恢复明文 $m$ 在计算上是不可行的
6. 加解密次序可对换，即 $\mathcal{E}_{PK_B}[\mathcal{D}_{SK_B}[m]]=\mathcal{D}_{SK_B}[\mathcal{E}_{PK_B}[m]]$

## 4.3. RSA 算法

> 做过实验，基本上不考了

### 4.3.2. 安全性

- 加密算法是确定性算法

## 4.5. ElGamal 密码体制

### 4.5.1. 加解密算法

#### 1. 密钥产生过程

选择一素数 $p$ 以及小于 $p$ 的随机数 $x$，$g$ 是 $p$ 的原根，计算 $y \equiv g^x \bmod p$

$y$ 作为公开钥，$x$ 作为秘密钥

#### 2. 加密过程

明文消息 $M$ 随机选一整数 $k<p-1$，计算 $C_1 \equiv g^k \bmod p, C_2 \equiv y^kM \bmod p$，密文为 $C=(C_1, C_2)$

#### 3. 解密过程

$$
M = {C_2 \over C_1^x} \bmod p\\
$$

$$
{C_2 \over C_1^x} \bmod p={y^kM \over g^{kx} } \bmod p={y^kM \over y^k} \bmod p = M \bmod p
$$

### 4.5.2. 安全性

- 安全性基于有限域上的离散对数难解性
- 加密算法是概率算法
- 不能抵御选择密文攻击

## 4.7. 椭圆曲线密码体制

### 4.7.5.椭圆曲线上的密码

#### 1. Diffie-Hellman 密钥交换

首先取一个素数 $p \approx 2^{180}$ 和两个参数 $a, b$，则得方程 

$$
\begin{aligned}
y^2=x^3 + a x + b \pmod{p} \\
a,b \in GF(p), 4 a^3 + 27 b^2 \ne 0 \pmod{p}
\end{aligned}
$$

表达的椭圆曲线及其上面的点构成的 Abel 群 $E_p(a, b)$。第二步，取 $E_p(a,b)$ 的一个生成元 $G(x_1,y_1)$，要求 $G$ 的阶为一个非常大的素数，$G$ 的阶是满足 $nG=O$ 的最小正整数 $n$。$E_p(a,b)$ 和 $G$ 作为公开参数。

两用户 A 和 B 之间的密钥交换如下运行：

1. A 选一个小于 $n$ 的整数 $n_A$ 作为秘密钥，并由 $P_A=n_AG$ 产生 $E_p(a,b)$ 上的一点作为公开钥
2. B 类似地选取自己的秘密钥 $n_B$ 和公开钥 $P_B$
3. A, B 分别由 $K=n_AP_B$ 和 $K=n_BP_A$ 产生双方共享的秘密钥

这是因为 $K=n_AP_B=n_A(n_BG)=n_B(n_AG)=n_BP_A$

攻击者若想获取 $K$，则必须由 $P_A$ 和 $G$ 求出 $n_A$，或由 $P_B$ 和 $G$ 求出 $n_B$，即需要求椭圆曲线上的离散对数，因此是不可行的。

- 已知 $n$ 和 $P$ 求 $K$ 是简单的
- 已知 $P$ 和 $K$ 求 $n$ 在计算上是不可行的

![](./assets/crypto04.svg)

##### 中间人攻击


![](./assets/crypto05.svg)


#### 2. ElGamal 密码体制

##### 原理


选择一素数 $p$ 以及小于 $p$ 的随机数 $x$，$g$ 是 $p$ 的原根，计算 $y \equiv g^x \bmod p$。$(y, g, p)$ 作为公开钥，$x$ 作为秘密钥。

**加密过程** 明文消息 $M$ 随机选一整数 $k<p-1$，计算 $C_1 \equiv g^k \bmod p, C_2 \equiv y^kM \bmod p$，密文为 $C=(C_1, C_2)$

**解密过程**

$$
M = {C_2 \over C_1^x} \bmod p\\
$$

$$
{C_2 \over C_1^x} \bmod p={y^kM \over g^{kx} } \bmod p={y^kM \over y^k} \bmod p = M \bmod p
$$

##### 利用椭圆曲线实现 ElGamal 密码体制

首先选取一条椭圆曲线，并得 $E_p(a,b)$ ，将明文消息 $m$ 通过编码嵌入到曲线上得点 $P_m$，再对点 $P_m$ 做加密变换。

取 $E_p(a,b)$ 的一个点 $G$，$E_p(a,b)$ 和 $G$ 作为公开参数。

用户 A 选 $n_A$ 作为秘密钥，并以 $P_A=n_AG$ 作为公开钥。任一用户 B 若想向 A 发送消息 $P_m$，可选取一随机正整数 $k$，产生以下点对作为密文

$$
C_m = \{ k G, P_m + k P_A\}
$$

A 解密时，以密文点对中的第二个点减去用自己的秘密钥与第一个点的倍乘，即

$$
P_m + k P_A - n_A k G = P_m + k (n_A G) - n_A k G = P_m
$$

攻击者若由 $C_m$ 得到 $P_m$，就必须知道 $k$。而要得到 $k$，只有通过椭圆曲线上的两个已知点 $G$ 和 $kG$，这意味着必须求椭圆曲线上的离散对数，因此不可行。


> [!example] 技术蛋老师对椭圆曲线上密码的理解
> 
> 椭圆曲线已知 $n, G$，求出 $P=nG$ 在计算上是容易的；而已知 $G,P$ 求出 $n$ 是困难的。
> 
> 就像是让一个小朋友在一个大房间踢球，我们知道球的初始位置，一小时后我们回到房间，我们知道了球的终止位置，但是如果我们想知道小朋友在这一个小时一共踢了多少次，这是一个困难的问题。


