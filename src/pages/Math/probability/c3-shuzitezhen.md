---
title: 概率论-随机变量数字特征
layout: ~/layouts/MainLayout.astro
---

## 随机变量的数字特征

### 期望

#### 离散型

随机变量 $X$ 的概率分布为

$$
P\{X=x_{k}\}=p_{k},k=1,2,\cdots
$$

如果级数 $\displaystyle \sum_{k= 1}^{+\infty} x_{k} p_{k}$ 绝对收敛，则称此级数为随机变量 $X$ 的数学期望或均值，记作 $E(X)$

#### 连续型

设随机变量 $X$ 的概率密度为 $f(x)$，如果积分 $\displaystyle\int_{-\infty}^{+\infty}xf(x) \mathrm{d} x$ 绝对收敛，则称此积分为随机变量 $X$ 的数学期望或均值，记作 $E(X)$

> [!tip] 性质
> - 常数 $C$ 有 $E(C)=C$
> - $E(CX)=CE(X)$
> - $E(X \pm Y)=E(X) \pm E(Y)$
> - $X,Y$ 相互独立，有 $E(XY)=E(X)E(Y)$

### 方差

设 $X$ 是随机变量，如果 $E(X-EX)^{2}$ 存在，则称之为 $X$ 的方差，记作 $D(X)$，而 $\sqrt{D(X)}$ 称为标准差

> [!tip] 性质
> - 常数 $C$ 有 $D(C)=0$
> - $D(aX+b)=a^{2}D(X)$
> - $X,Y$ 相互独立，$D(X\pm Y)=D(X)+D(Y)$

方差公式

$$
D(X)=EX^{2} - (EX)^{2}
$$

由于 $D(X) \geqslant 0$，故

$$
EX^{2} \geqslant (EX)^{2}
$$

| 分布                        | 均值         | 方差           |
|:---------------------------:|:------------:|:--------------:|
| 0-1 分布                    | $p$          | $p(1-p)$       |
| $X \sim B(n,p)$             | $np$         | $np(1-p)$      |
| $X\sim P(\lambda)$          | $\lambda$    | $\lambda$      |
| $P(X=k)=p(1-p)^{k-1}$       | $1/p$        | $(1-p)/p^2$    |
| $X\sim U(a,b)$              | $(a+b)/2$    | $(b-a)^{2}/12$ |
| $X\sim e(\lambda)$          | $1 /\lambda$ | $1/\lambda^2$  |
| $X \sim N(\mu, \sigma^{2})$ | $\mu$        | $\sigma^{2}$               |


### 矩 & 协方差 & 相关系数

#### 矩

- $X$ 的 $k$ 阶原点矩 $E(X^{k}),k=1,2,\cdots$
- $X$ 的 $k$ 阶中心矩 $E(X-E(X^{k})),k=1,2,\cdots$
- $X$ 和 $Y$ 的 $k+l$ 阶混合矩 $E(X^{k}Y^{l}),k,l=1,2,\cdots$
- $X$ 和 $Y$ 的 $k+l$ 阶混合中心矩 $E[(X-EX)^{k}(Y-EY)^{l}], k,l=1,2,\cdots$

#### 协方差

$$
\text{Cov}(X,Y)=E[(X-EX)(Y-EY)]
$$

协方差为零，可以得到 $X,Y$ 不相关

> [!tip] 性质
> - $\text{Cov}(X,Y)=EXY-EXEY$
> - $D(X \pm Y)=DX+DY \pm 2 \text{Cov}(X,Y)$
> - $\text{Cov}(X,Y)=\text{Cov}(Y,X)$
> - $\text{Cov}(aX,bY)=ab \text{Cov}(X,Y)$
> - $\text{Cov}(X_{1}+X_{2},Y)=\text{Cov}(X_{1},Y)+\text{Cov}(X_{2},Y)$

#### 相关系数

随机变量 $X,Y$，如果 $D(X)D(Y) \ne 0$，则

$$
\rho_{XY} = {\text{Cov}(X,Y) \over \sqrt{D(X)D(Y))}}
$$

称为相关系数。如果 $D(X)D(Y)=0$，则 $\rho_{XY}=0$. 如果 $\rho_{XY}=0$，则称 $X$ 和 $Y$ 不相关

> [!tip] 性质
> - $|\rho_{XY}| \leqslant 1$
> - $|\rho_{XY}|=1$ 充要条件是存在常数 $a,b$，其中 $a \ne 0$，使得 $P(Y=aX+b)=1$

- 独立可以推出不相关
- ==不相关不能推出独立==
- 二维正态分布的独立和不相关等价

## 大数定律和中心极限定理

### 切比雪夫不等式

设随机变量 $X$ 的数学期望 $E(X)$ 和方差 $D(X)$ 存在，则对任意 $\varepsilon > 0$，总有

$$
P\{|X -EX| \geqslant \varepsilon \} \leqslant {D(X) \over \varepsilon^{2} }
$$

设 $X_{1},X_{2},\cdots,X_{n},\cdots$ 是一个随机变量序列，$A$ 是常数，如果对任意 $\varepsilon >0$，有

$$
\lim_{n \to \infty} P\{|X_{n} - A | < \varepsilon \} = 1
$$

则称随机变量序列依概率收敛于常数 $A$，记作 $X_{n} \xrightarrow{\quad P\quad} A$

### 切比雪夫大数定律

设 $X_{1},X_{2},\cdots,X_{n},\cdots$ 为两两不相关的随机变量序列，存在常数 $C$，使 $D(X_{i}) \leqslant C (i=1,2,\cdots)$，则对任意 $\varepsilon > 0$，有

$$
\lim_{n \to \infty} P\left\{ \left| {1 \over n} \sum\limits_{i=1}^{n}X_{i}- {1 \over n}\sum\limits_{i=1}^{n}E(X_{i}) \right| < \varepsilon \right\}=1
$$

### 伯努力大数定律

设随机变量 $X_{n} \sim B(n,p), n=1,2,\cdots$，则对于任意 $\varepsilon > 0$，有

$$
\lim_{n \to \infty} P \left\{ \left| {X_{n} \over n} -p \right| <\varepsilon \right\}=1
$$

### 辛钦大数定律

设随机变量 $X_{1},X_{2},\cdots,X_{n},\cdots$ 独立同分布，具有数学期望 $E(X_{i})=\mu$，则对任意 $\varepsilon > 0$ 有

$$
\lim_{n \to \infty} P \left\{ \left| {1 \over n} \sum\limits_{i=1}^{n}X_{i}-\mu  \right| < \varepsilon \right\}=1
$$

### 棣莫弗——拉普拉斯中心极限定理

设随机变量 $X_{n} \sim B(n,p),n=1,2,\cdots$，则对于任意实数 $x$ 有

$$
\lim_{n \to \infty}P \left\{ { X_{n} - np \over \sqrt{np(1-p)} } \leqslant x \right\} = {\it\Phi}(x)
$$

其中， ${\it \Phi} (x)$ 是标准正态的分布函数

> [!caution]
> 定理表明，当 $n$ 充分大时，服从 $B(n,p)$ 的随机变量 $X_{n}$ 经标准化后得到 $\displaystyle \frac{X_{n}- n p}{\sqrt{n p{\left( 1- p\right)} } }$ 近似服从标准正态分布 $N(0,1)$，或者说 $X_{n} \overset{\cdot}{\sim}N(np, np(1-p))$



