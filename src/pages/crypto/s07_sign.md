---
title: 第 7 章 数字签名
layout: ~/layouts/MainLayout.astro
---

> 缩小范围，只考 DSA 和 ElGamal

## 7.2. 数字签名标准

数字签名标准 DSS (Digital Signature Standard) 是由美国 NIST 公布的联邦信息处理标准 FIPS PUB 186，其中采用了上一章介绍的 SHA 和一新的签名技术，称为 **DSA** (Digital Signature Algorithm)

### 7.2.1. DSS 的基本方式

首先将 DSS 与 RSA 的签名方式做一比较。RSA 算法既能用于加密和签名，又能用于密钥交换。与此不同，DSS 使用的算法只能提供数字签名功能。下图用于比较 RSA 签名和 DSS 签名的不同方式:

![[public/cypto/crypto18.svg]]

### 7.2.2. 数字签名算法 DSA

DSA 安全性基于求离散对数的困难性

算法描述如下

#### 全局公开参数

- $p$ 满足 $2^{L-1} < p < 2^L$ 的大素数，其中 $512 \leqslant L \leqslant 1024$ 且 $L$ 是 64 的倍数
- $q$ 为 $p-1$ 的素因子，满足 $2^{159} < q < 2^{160}$，即 $q$ 长为 160 比特
- $g$ 满足 $g \equiv h^{(p-1)/q} \bmod p$，其中 $h$ 是满足 $1 < h < p-1$ 且使得 $h ^{p-1}/q \bmod p > 1$ 的任一整数

#### 用户秘密钥 x

$x$ 是满足 $0 < x < q$ 的随机数或伪随机数

#### 用户公开钥 y

$$
y \equiv g^x \bmod p
$$

#### 用户为待签消息选取的秘密数 k

$k$ 是满足 $0 < k < q$ 的随机数或伪随机数

#### 签名过程

用户对 $M$ 的签名为 $(r,s)$，其中 $r \equiv g ^k \bmod p \bmod q$，$s \equiv k^{-1}(H(M)+xr) \bmod q$，$H(M)$ 是由 SHA 求出的哈希值。

签名 $\text{Sig}(m, k)=(r, s)$

#### 验证过程

设接收方收到的消息为 $M^\prime$，签名为 $(r^\prime, s^\prime)$，为书写简便，此处不加撇号

$$
\begin{aligned}
u_1 & \equiv H(M) s^{-1} \bmod q \\
u_2 & \equiv r s^{-1} \bmod q \\
v & \equiv (g^{u_1} y^{u_2}) \bmod p \bmod q
\end{aligned}
$$

检查 $v \overset{?}{=} r^\prime$，若相等，则认为签名有效

> [!example] 证明过程
> 
> $$
> \begin{aligned}
> g^{u_1} y^{u_2} & = g ^{H(M) s^{-1}} \cdot (g ^{x})^{r \cdot s ^{-1}} \\
> & = g^{H(M)s^{-1} + xr \cdot s^{-1}} \\
> & = g^{(H(M) + xr) \cdot s^{-1}} \\
> & \equiv g ^{sk \cdot s^{-1}} \bmod p \bmod q \\
> & = g^k \\
> & = r
> \end{aligned}
> $$

![[public/cypto/crypto19.svg]]

预计算: $r$ 的模指数运算 $r= g^k \bmod p \bmod q$，这一运算与待签的消息无关。

用户可以预先计算出很多 $r$ 和 $k^{-1}$ 以备以后的签名使用，可大大加快签名的速度。

**例** 如果 Bob 用同一个 $k$ 签名不同的消息，有何风险？

> [!example] 解答
> 
> $$
> \begin{aligned}
> r & \equiv g^k \bmod q \bmod q \\
> s_1 & \equiv k^{-1}(H(M_1)+xr) \bmod q \\
> s_2 & \equiv k^{-1}(H(M_2)+xr) \bmod q \\
> \end{aligned}
> $$
> 
> 可得
> 
> $$
> \begin{aligned}
> s_1 k \equiv H(M_1) + xr \pmod q \\
> s_2 k \equiv H(M_2) + xr \pmod q \\
> \end{aligned}
> $$
> 
> 两式相减得
> 
> $$
> \begin{aligned}
> (s_1 - s_2)k \equiv H(M_1) -H(M_2) \pmod q
> \end{aligned}
> $$
> 
> 该方程是一元一次同余方程，其中只有 $k$ 未知，因此 $k$ 可以求出。进而私钥 $x$ 也可求出。


## 7.3. 其他签名体制

### 7.3.1. 基于离散对数问题的数字签名体制

#### 2. ElGamal 签名体制

##### 体制参数

- $p$ : 大素数
- $g$ : $\mathbb{Z}^\ast_p$ 的一个生成元
- $x$ : 用户 A 的秘密钥，$x \in {}_R\mathbb{Z}^\ast_p$
- $y$ : 用户 A 的公开钥，$y \equiv g^x \pmod p$

##### 签名的产生过程

对于待签名的消息 $m$，A 执行以下步骤

- 计算 $m$ 的哈希值 $H(m)$
- 选择随机数 $k: k \leftarrow {}_R\mathbb{Z}^\ast_{p-1}$，计算 $r \equiv g^k \pmod p$
- 计算 $s \equiv (H(m)-xr)k^{-1} \pmod {p-1}$

签名 $\text{Sig}(m, k)=(r, s)$

##### 验证过程

$$
\begin{aligned}
y^r r^s \equiv g^{H(m)} \bmod p
\end{aligned}
$$

当上式成立时，即有 $\text{Ver}(y, (r,s), H(m))=\text{True}$

##### k 泄露的威胁

由 $s \equiv k^{-1}(H(m)-xr) \pmod{p-1}$ 方程变成一元一次同余方程，私钥 $x$ 即可求出，攻击者可以由此伪造任意消息和签名。

### 7.3.3. 基于身份的数字签名体制

#### 1. ElGamal 签名体制

##### 体制参数

- $q$ 为大素数
- $\mathbb{G}_1, \mathbb{G}_2$ 分别是阶为 $q$ 的加法群和乘法群
- $\hat{e}: \mathbb{G}_1 \times \mathbb{G}_1 \to \mathbb{G}_2$ 是一个双线性映射
- $H_1: \{0, 1\}^\ast \to \mathbb{G}_1 ^\ast$ 和 $H_2 : \mathbb{G}_2 \to \{0, 1\} ^n$ 是两个哈希函数
- $s \leftarrow {}_R\mathbb{Z}^\ast_q$ 是系统的主密钥
- $P$ 是 $\mathbb{G}_1$ 的一个生成元
- 用户 ID 的公开钥 $Q_{ID}=H_1(ID) \in \mathbb{G}_1 ^\ast$，$P_{pub}=sP$
- 秘密钥 $d_{ID}=sQ_{ID}$

##### 签名产生过程

对于待签名的消息 $m$，A 执行以下步骤

1. 选择随机数 $k: k \leftarrow {}_R\mathbb{Z}^\ast_q$
2. 计算 $R=kP\overset{\text{to be} }{=}(x_R,y_R)$
3. 计算 $S \equiv (H_2(m)P+x_R d_{ID})k^{-1}$

以 $(R,S)$ 作为产生的数字签名

##### 签名验证过程

接收方在收到消息 $m$ 和数字签名 $(R,S)$ 后，先计算 $H_2(m)$，并按下式验证：

$$
\begin{aligned}
& \text{Ver}(Q_{ID}, (R,S), H_2(m)) = \text{True}  \\\Leftrightarrow & \hat{e} (R,S)=\hat{e}(P,P)^{H_2(m)} \hat{e}(P_{pub}, Q_{ID})^{x_R}
\end{aligned}
$$



