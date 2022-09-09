# 微分方程

## 1. 一阶微分方程

### 1.1. 概念

- 含有未知数、位置函数的导函数与自变量之间的关系的方程，称为 **微分方程**
- 未知函数导函数的最高阶数称为 **该微分方程的阶**
- 未知函数是医院函数的微分方程称为 **常微分方程**

$$
y^{(n)} = f\left(x,y,y',\cdots,y^{(n-1)}\right)
$$

设 $y=\varphi(x)$ 在区间 $(a.b)$ 上连续且有直到 $n$ 阶的导数，使得

$$
\varphi ^{(n)} (x) \equiv f\left(x,\varphi (x), \varphi '(x), \cdots, \varphi ^{(n-1)}\right)
$$

则称 $y=\varphi(x)$ 为该微分方程在区间 $(a,b)$ 上的一个解

如果含有 $n$ 个独立的任意常数的函数

$$
y=\varphi(x,C_{1},\cdots,C_{n}),a<x<b
$$

是 $n$ 阶微分方程的解，则称它为该微分方程的 **通解**，不含任意常数的解称为 **特解**，条件

$$
\begin{aligned}
y(x_{0}) &=y_{0} \\
y'(x_{0}) &=y_{0}' \\
& \cdots \\
y^{(n-1)}(x_{0})&= y_{0}^{(n-1)}
\end{aligned}
$$

称为 $n$ 阶微分方程的初始条件，其中 $y_{0},y_{0}',\cdots$ 为 $n$ 个给定的数，一般，由初始条件确定解中任意常数就得到相应的一个特解

## 1.2. 几种特殊类型的解法

#### 1.2.1. 可分离变量

$$
{ \mathrm{d}y \over \mathrm{d} x } = h(x)g(y)
$$

可化为

$$
{ \mathrm{d} y \over g(y)} = h(x) \mathrm{d} x
$$

两边积分

$$
\int { \mathrm{d} y \over g(y)} = \int h(x) \mathrm{d} x + C
$$

其中，$C$ 为任意常数

#### 1.2.2. 齐次

$$
\begin{aligned}
{ \mathrm{d}y \over \mathrm{d} x } = f(x,y) && (3)
\end{aligned}
$$


中的 $f(x,y)$，若令 $y=ux$，当 $x \ne 0$ 时，可化为

$$
f(x,y)=f(x,ux)=\varphi(u)
$$

以新的未知函数 $u$ 代替 $y$，得

$$
u + x { \mathrm{d} u \over \mathrm{d} x} = \varphi(u)
$$

即可分离变量

### 1.3. 一阶线性微分方程

$$
y' + p(x)y = q(x)
$$

通解是

$$
y=\mathrm{e}^{-\int p(x) \mathrm{d}x}\left[\int q(x) \mathrm{e} ^{\int p(x) \mathrm{d} x} + C \right]
$$

### 1.4. 伯努力方程

$$
y' + p(x)y = q(x)y^{n}
$$

化为

$$
y^{-n} {\mathrm {d} y \over \mathrm{d} x} + p(x) y^{1-n}=q(x)
$$

令 $z=y^{1-n}$，有

$$
{\mathrm {d} z \over \mathrm{d} x} = {\mathrm {d} (y^{1-n}) \over \mathrm{d} x} = (1-n)y^{-n} {\mathrm {d} y \over \mathrm{d} x}
$$

得

$$
{1 \over 1-n} {\mathrm {d} z \over \mathrm{d} x} + p(x)z = q(x)
$$

代入线性微分方程的通解公式，然后代回 $y$，得到原解

### 1.5. 全微分方程

若存在二元函数 $u(x,y)$，使

$$
\mathrm{d} u(x,y) = P(x,y) \mathrm{d} x + Q(x,y) \mathrm{d} y
$$

则称微分方程

$$
\begin{aligned}
P(x,y) \mathrm{d} x + Q(x,y) \mathrm{d} y = 0 && (4)
\end{aligned}
$$


为全微分方程，通解为

$$
u(x,y) =C
$$

由曲线积分中有关的定理，有下述定理

设 $D$ 为平面上的一个但连通区域，$P(x,y)$ 与 $Q(x,y)$ 在 $D$ 上连续且有连续的一阶偏导数，则方程 (4) 为全微分方程的充要条件为

$$
{\partial P \over \partial y} = { \partial Q \over \partial x}, (x,y) \in D
$$

可以由观察法找 $u(x,y)$，或者在路径无关条件下找 $u(x,y)$，或者区域 $D$ 为边平行于坐标轴的矩形条件下，由折线法找 $u(x,y)$

## 2. 二阶及高阶线性微分方程

### 2.1. 线性微分方程

> [!note] 定义
> 
> $$
> \begin{aligned}
> y^{(n)} + a_{1}(x)y^{(n-1)} + \cdots + a_{n-1}(x)y'+a_{n}(x)y=f(x),f(x) \not\equiv 0 && (1)
> \end{aligned}
> $$
> 
> 其中系数 $a_{i}(x)$ 为已知函数，称为 $n$ 阶线性非齐次微分方程，$f(x)$ 为自由项，方程
> 
> $$
> \begin{aligned}
> y^{(n)} + a_{1}(x)y^{(n-1)} + \cdots + a_{n-1}(x)y'+a_{n}(x)y=0 && (2)
> \end{aligned}
> $$
> 
> 为 $n$ 阶线性齐次微分方程

> [!note] 定义
> 
> 设 $y_{1}(x), \cdots, y_{m}(x)$ 是定义在区间 $(a,b)$ 内的 $m$ 个函数，如果存在不全为零的 $m$ 个常数 $k_1,\cdots,k_m$，使得
> 
> $$
> \begin{aligned}
> k_{1}y_{1}(x) + \cdots k_{m}y_{m}(x) \equiv 0 && (3)
> \end{aligned}
> $$
> 
> 成立，则称这 $m$ 个函数在该区间内 **线性相关**，否则称 **线性无关**

### 2.2. 线性微分方程解的性质

#### 定理

1. 设 $y^{\ast}(x)$ 为 (1) 的一个解，$Y(x)$ 为 (1) 所对应的 (2) 的一个解，则 $y=Y(x)+ y^{\ast}(x)$ 为 (1) 的解
2. 设 $y_{1}^{\ast}(x)$ 与 $y_{2}^{\ast}(x)$ 为 (1) 的两个解，则 $y=y_{1}^{\ast}(x)-y_{2}^{\ast}(x)$ 为 (1) 所对应的 (2) 的解

#### 齐次线性方程的解的叠加

设 $y_{1}(x), \cdots, y_{m}(x)$ 是齐次线性方程 (2) 的 $m$ 个解，则他们的线性组合

$$
y=\sum\limits_{i=1}^{m}C_{i}y_{i}
$$

也是 (2) 的解，其中 $C_{i}(i=1,\cdots,m)$ 为常数

#### 齐次线性方程的通解结构

设 $y_{i}(x)(i=1,2,\cdots,n)$ 为 $n$ 阶齐次线性方程 (2) 的 $n$ 个线性无关的解，$C_{i}(i=1,2,\cdots,n)$ 为常数，则

$$
y=\sum\limits_{i=1}^{n}C_{i}y_{i}(x)
$$

为 (2) 的解

#### 非其次线性方程的通解结构
设 $y^{\ast}(x)$ 为 (1) 的一个解，$Y(x)$ 为 (1) 对应的 (2) 的通解，则

$$
y=Y(x) + y^{\ast}(x)
$$

为 (1) 的通解

#### 自由项为 $f(x)=f_{1}(x)+f_{2}(x)$ 的解的叠加原理
设 $y_{i}^{\ast}$ 为

$$
y^{(n)}+a_{1}(x)y^{(n-1)} + \cdots + a_{n-1}(x)y' +a_{n}(x)y=f_{i}(x)
$$

的解 $(i=1,2)$，则 $y_{1}^{\ast}(x)+y_{2}^{\ast}(x)$ 为

$$
y^{(n)}+a_{1}(x)y^{(n-1)} + \cdots + a_{n-1}(x)y' +a_{n}(x)y=f_{1}(x) +f_{2}(x)
$$

的解

#### 二阶常系数线性其次方程的通解求法及公式
 
 二阶常系数线性齐次微分方程可写成
 
 $$
 \begin{aligned}
 y'' + py'+qy=0 && (4)
 \end{aligned}
 $$
 
 其中，$p,q$ 为常数，方程
 
 $$
 \begin{aligned}
 r^{2}+pr+q=0 && (5)
 \end{aligned}
 $$
 
 为方程 (4) 对应的 **特征方程**，它的根 $r$ 称为 **特征根**。按不同情况，通解如下表
 
 | 特征方程 $r^{2}+pr+q=0$ 的根                     | 微分方程 $y'' + py'+qy=0$ 的通解     |
 | ------------------------------------------------ | ------------------------------------ |
 | 一对不等的实根 $r_{1}\ne r_{2}$                    | $y=C_{1}e^{r_{1} x}+C_{2}e^{r_{2}x}$ |
 | 一对相等的实根 $r_{1}=r_{2}$                     | $y=(C_{1}+ C_{2}x)e^{rx}$            |
 | 一对共轭复根 $r_{1,2}=\alpha \pm \beta i, \beta>0$ | $y=e^{\alpha x}(C_{1} \cos \beta x + C_{2}\sin \beta x)$                                     |

#### 由 2 阶推广到 $n$ 阶

$n$ 阶常系数线性其次微分方程

$$
y^{(n)} + a_{1}y^{(n-1)} + \cdots + a_{n-1}y' + a_{n}y=0
$$

对应特征方程

$$
r^{n}+a_{1}r^{n-1}+\cdots+a_{n-1}r+a_{n}=0
$$

关系如下表

| 特征方程的根                              | 微分方程通解中对应的项                                          |
| ----------------------------------------- | --------------------------------------------------------------- |
| 单重实根 $r$                              | 对应一项 $Ce^{rx}$                                              |
| $k$ 重实根 $r$                            | 对应 $k$ 项 $(C_{1}+C_{2}x + \cdots C_{k}x^{k-1})e^{rx}$        |
| 单重复数根 $r_{1,2}=\alpha \pm \beta i$   | 对应两项 $e^{\alpha x}(C_{1}\cos \beta x + C_{2} \sin \beta x)$ |
| $k$ 重复数根 $r_{1,2}=\alpha \pm \beta i$ | 对应 $2k$ 项 $e^{\alpha x}[(A_{1}+A_{2}x+\cdots +A_{k}x^{k-1})\cos\beta x +(B_{1}+ B_{2}x+\cdots+B_{k}x^{k-1})\sin \beta x]$                                                                |

#### 某些特殊自由项的二阶常系数线性非齐次微分方程的解法

##### 类型 1

$$
y'' + py'+qy = P_{m}(x)e^{\alpha x}
$$

- 求对应齐次方程的通解 $Y(x)$
- 求该非其次方程的特解 $y^{\ast}(x)$

$$
y^{\ast}(x) = x^{k}Q_{m}(x)e^{\alpha x}
$$

其中

$$
k=
\begin{cases}
0 & \text{case } a \ne \lambda_{1} \text{ and } a \ne \lambda_{2} \\
1 & \text{case } a = \lambda_{1} \text{ xor } a =\lambda_{2} \\
2 & \text{case } a = \lambda_{1}  = \lambda_{2}
\end{cases}
$$

##### 类型 2

$$
\begin{aligned}
y''+py'+qy&=P_{m}(x)e^{ax} \cos bx + Q_{n}(x)e^{ax} \sin bx
\end{aligned}
$$

- 求对应齐次方程的通解 $Y(x)$
- 令非齐次微分方程的特解为

$$
y^{\ast}(x)=x^{k}\left( R_{l}(x) e^{ax} \cos bx + S_{l}(x) e^{ax} \sin bx \right)
$$

其中

$$
k=
\begin{cases}
0 & \text{case } a\pm{\rm i}b \text{ is {\color{red}not} the characteristic root}  \\
1 & \text{case } a\pm{\rm i}b \text{ is a {\color{red}singlet} characteristic root}
\end{cases}
$$

$$
l=\max\{m, n\}
$$

#### 可降阶方程的解法

##### 1. $y''=f(x)$

做两次积分即可

##### 2. $y''=f(x,y')$ 缺 $y$ 型

令 $p=y'$，$y''=\displaystyle{\mathrm {d} p \over \mathrm{d} x}$，从而有

$$
{\mathrm {d} p \over \mathrm{d} x}=f(x,p)
$$

可解得 $p=\varphi(x, C_{1})$，原方程的通解为 $y=\displaystyle\int \varphi(x,C_{1}) + C_{2}$

##### 3. $y''=f(y,y')$ 缺 $x$ 型

令 $p=y', y''=\displaystyle {\mathrm {d} p \over \mathrm{d} x}={\mathrm {d} p \over \mathrm{d} y} \cdot {\mathrm {d} y \over \mathrm{d} x} = p {\mathrm {d} p \over \mathrm{d} y}$，从而有

$$
p {\mathrm {d} p \over \mathrm{d} y}=f(y,p)
$$

解出 $p=\psi(y,C_{1})$，再由 $p=\displaystyle{\mathrm {d} y \over \mathrm{d} x}$ 代入，得

$$
\int {\mathrm {d}y \over \psi(y,C_{1})}=\int \mathrm{d}x+C_{2}= x+C_{2}
$$

做出左边积分，得到原微分方程的解

##### 欧拉方程

$$
x^{2} {\mathrm {d}^{2} y \over \mathrm{d} x^{2} }+a_{1}x {\mathrm {d} y \over \mathrm{d} x} + a_{2}y=f(x)
$$

若 $x>0$，令 $x=e^t$ 作变量代换，有 $t=\ln x$，从而 $\displaystyle {\mathrm {d} t \over \mathrm{d} x}={1 \over x}$

$$
\begin{aligned}
{\mathrm {d} y \over \mathrm{d} x} & = {\mathrm {d} y \over \mathrm{d} t} \cdot {\mathrm {d} t \over \mathrm{d} x} = {1 \over x} {\mathrm {d} y \over \mathrm{d} t} \\
{\mathrm {d}^{2} y \over \mathrm{d} x^{2} } &= {\mathrm {d} \over \mathrm{d} x} \left( {1 \over x} {\mathrm {d} y \over \mathrm{d} t} \right) = - {1 \over x^{2} } {\mathrm {d} y \over \mathrm{d} t} + {1 \over x} {\mathrm {d} \over \mathrm{d} x} \left( {\mathrm {d} y \over \mathrm{d} t} \right) \\
& = - {1 \over x^{2} } {\mathrm {d} y \over \mathrm{d} t} + {1 \over x}{ \color{red} {\mathrm {d} \over \mathrm{d} t} } \left( {\mathrm {d} y \over \mathrm{d} t} \right) 
{ \color{red} {\mathrm {d} t \over \mathrm{d} x} } \\
& = - {1 \over x^{2} } {\mathrm {d} y \over \mathrm{d} t} + {1 \over x^{2} } {\mathrm {d}^{2} y \over \mathrm{d} t^{2} }
\end{aligned}
$$

原方程化为

$$
{\mathrm {d}^{2} y \over \mathrm{d} t^{2} }+ (a_{1} - 1) {\mathrm {d} y \over \mathrm{d} t} +a_{2} y = f(e ^ {t})
$$

是常系数线性微分方程，解答后还原为 $x$ 即可

而对于 $x<0$ 的情况，令 $x=-e^{t}$ 同理

## 3. 微分算子法求二阶常系数线性非齐次微分方程

### 3.1. 概念

#### 微分

$$
y'={\mathrm {d} y \over \mathrm{d} x} = {\color{red} {\mathrm {d} \over \mathrm{d} x} } y
$$

#### 算子

$$
{\rm D} := {\mathrm {d} \over \mathrm{d} x}
$$

- ${\rm D} x^2=2x$
- ${\rm D} \sec x = \sec x \tan x$

而 $\displaystyle{1 \over{\rm D} }$ 代表着微分的逆运算：积分

- $\displaystyle{1 \over {\rm D} } \cos x=\sin x$
- $\displaystyle{1 \over {\rm D} } x^{2}={1 \over 3} x^{3}$


#### 推导

由 $n$ 阶的一般式

$$
a_{n}y^{(n)}+a_{n-1}(x)y^{(n-1)} + \cdots + a_{1}(x)y' +a_{0}(x)y=f(x)
$$

将算子提取

$$
a_{n} {\color{blue} {\rm D}^{n} }y+a_{n-1} {\color{blue}{\rm D}^{n-1} }y + \cdots + a_{1}{\color{blue}{\rm D} }y +a_{0}y=f(x)
$$

于是上式有公因子 $y$

$$
(a_{n} {\color{blue} {\rm D}^{n} }+a_{n-1} {\color{blue}{\rm D}^{n-1} } + \cdots + a_{1}{\color{blue}{\rm D} } +a_{0}){\color{red}y}=f(x)
$$

括号内即为关于微分算子 $\rm D$ 的多项式，即微分算子式

令 $F({\rm D}) y=f(x)$，有

$$
y^{\ast} = {\color{blue}{1 \over F({\rm D})} }f(x)
$$

$y^{\ast}$ 即为 ${1 \over F({\rm D})}$ 作用于 $f(x)$ 的结果

### 3.2. $f(x)$ 形如 $e^{kx}$ 类

> [!example] $3y''-2y'+5y=e^{2x}$
> 
> $$
> \begin{aligned}
> F({\rm D}) & = 3 {\rm D}^{2}-2{\rm D} + 5 \\
> y^{\ast} & = { \color{blue}{ 1 \over 3 {\rm D}^{2}-2{\rm D} + 5} } e^{ {\color{red}2 }x} \\
> & = {1 \over 13} e^{2x}
> \end{aligned}
> $$
> 
> 将 $e$ 的指数直接代入 $\rm D$


