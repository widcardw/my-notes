# 概率论

## 概率 概率公式

### 条件概率

> [!tip] 事件 $A$ 发生的条件下 $B$ 发生的条件概率
> $$P(B \mid A)={P(AB) \over P(A)}$$

### 事件的独立性

> [!tip] 事件 $A,B$ 满足 $P(AB)=P(A)P(B)$，则两事件相互独立
> $A,B,C$ 三事件相互独立等价于
> 
> $$
> \begin{aligned}
> P(AB) &= P(A)P(B) \\
> P(AC) &= P(A)P(C) \\
> P(BC) &= P(B)P(C) \\
> P(ABC) &= P(A)P(B)P(C)
> \end{aligned}
> $$
> 
> 满足前三个称为两两独立
> 
> $n$ 个事件相互独立需要 $C_{n}^2+C_{n}^{3}+\cdots+C_{n}^{n}=2^{n}-n-1$ 个等式成立

> [!caution] 性质
> - $A$ 和 $B$ 独立 $\Leftrightarrow$ ==$A$ 与 $\overline{B}$ 独立== 或 ==$\overline{A}$ 与 $B$ 独立== 或 ==$\overline{A}$ 与 $\overline{B}$ 独立==
> - $0<P(A)<1$，$A$ 和 $B$ 独立等价于 $P(B \mid A)=P(B)$ 或 $P(B \mid A)=P(B \mid \overline{A})$
> - $n$ 个事件相互独立，则必两两独立；反之不成立、
> - $n$ 个事件相互独立时，它们的部分事件也是相互独立的

### 五大概率公式

> [!note] 加法公式 $P(A \cup B)=P(A)+P(B)-P(AB)$

> [!note] 减法公式 $P(A-B)=P(A)-P(AB)$

> [!note] 乘法公式
> - 当 $P(A)>0$，$P(AB)=P(A)P(B \mid A)$
> - 当 $P(A_{1}A_{2}\cdots A_{n})>0$ 时，
>   
>   $$P(A_{1}A_{2}\cdots A_{n})=P(A_{1})P(A_{1} \mid A_{2})\cdots P(A_{n} \mid A_{1}A_{2}\cdots A_{n-1})$$

> [!tip] 全概率公式
> 设 $B_{1},B_{2},\cdots,B_{n}$ 满足 $\displaystyle\bigcup_{i=1}^{n}B_{i}=\Omega,B_{i}B_{j} \ne \varnothing (i \ne j)$ 且 $P(B_{k}) > 0, k=1,2,\cdots,n$，则对任意事件 $A$ 有
> 
> $$
> P(A) = \sum\limits_{i=1}^{n}P(B_{i})P(A \mid B_{i})
> $$
> 
> 称满足 $\displaystyle\bigcup_{i=1}^{n}B_{i}=\Omega,B_{i}B_{j} \ne \varnothing (i \ne j)$ 的 $B_{1},B_{2},\cdots,B_{n}$  为 $\Omega$ 的一个完备事件组

> [!tip] 贝叶斯公式
> 设 $B_{1},B_{2},\cdots,B_{n}$ 满足 $\displaystyle\bigcup_{i=1}^{n}B_{i}=\Omega,B_{i}B_{j} \ne \varnothing (i \ne j)$ 且 $P(B_{k}) > 0, k=1,2,\cdots,n$，则
>
> $$
> P(B_{j} \mid A) = {P(B_{j}) P(A \mid B_{j)}\over \sum\limits_{i=1}^{n}P(B_{i})P(A \mid B_{i})}
> $$

#### 古典概型

$$
P(A) = {n_{A}\over n}
$$

#### 伯努力概型

- 独立重复实验
- $n$ 重伯努力实验

$$
X \sim B(n,p)
$$

$$
P(X=k) = C_{n}^{k}p^{k}(1-p)^{n-k}
$$

## 随机变量及其概率分布


### 离散

#### 概率分布

| $X$ | $x_{1}$ | $x_{2}$ | $\cdots$ | $x_{n}$ | $\cdots$ |
|:---:|:-------:|:-------:|:--------:|:-------:|:-------- |
| P   | $p_1$   | $p_{2}$ | $\cdots$ | $p_{n}$ | $\cdots$ | 


#### 分布函数

$$
F(x)=P\{X \leqslant x\}, -\infty < x < + \infty
$$

> [!tip] 分布函数的性质
> - $0 \leqslant F(x) \leqslant 1, F(- \infty)=0,F(+\infty)=1$
> - 单调不减
> - 右连续
> - 对任意 $x_{1}< x_{2}$，有 $P\{x_{1}< X \leqslant x_{2}\}=F(x_{2})-F(x_{1})$
> - 对任意 $x$，$P(X=x)=F(x) - F(x-0)$

### 连续

如果对随机变量 $X$ 的分布函数 $F(x)$，存在一个非负可积函数 $f(x)$，使得任意实数 $x$，有

$$F(x)=\int_{-\infty}^{x}f(t)\mathrm{d}t, -\infty < x < +\infty$$

称 $X$ 为连续型随机变量，$f(x)$ 称为 $X$ 的概率密度

> [!tip] 概率密度 $f(x)$ 的性质
> - $f(x) \geqslant 0$
> - $\displaystyle\int_{-\infty}^{+\infty}f(x)\mathrm{d}x=1$
> - 对 $x_{1}<x_{2}$，有 $P\{x_{1}<X \leqslant x_{2}\}=\displaystyle\int_{x_{1} }^{x_{2} }f(t)\mathrm{d}t$
> - 在 $f(x)$ 的连续点处有 $F'(x)=f(x)$

### 常用分布

#### 二项分布

| $X$ | 0     | 1   |
|:---:|:-----:|:---:|
| P   | $1-p$ | $p$    |

$$
X \sim B(1,p)
$$

#### 几何分布

酒鬼有放回的拿钥匙，试了前 $k-1$ 次都失败了，第 $k$ 次成功

$$
P\{X=k\}=pq^{k-1}
$$

#### 超几何分布

 $N$ 件产品中含有 $M$ 件次品，从中任意抽取 $n$ 件，$X$ 为抽取的产品中次品数量

$$
P\{X=k\}={C_{M}^{k} C_{N-M}^{n-k} \over C_{N}^{n} }, k=l_{1,}\cdots, l_{2}
$$

其中，$l_{1}=\max(0, n-N+M)$，$l_{2}=\min(M, n)$

#### 泊松分布

$$
X \sim P(\lambda)
$$

$$
P\{X=k\}={\lambda^{k} \over k!} e ^{-\lambda}
$$

##### 泊松定理

在伯努力实验中，$p_n$ 代表事件 $A$ 在一次实验中出现的概率，它与实验总数有关，且随 $n$ 增大，$p_n$ 减小，如果 $\displaystyle \lim_{n \to \infty} np_{n}=\lambda$，则出现 $k$ 次 $A$ 发生的概率为

$$
\lim_{n \to \infty}C_{n}^{k} p_{n}^{k}(1-p_{n})^{n-k} = {\lambda^{k} \over k!} e^{-\lambda}
$$

当 $n$ 较大，$p$ 较小，$np$ 不太大，这时有近似公式

$$
C_{n}^{k} p_{n}^{k}(1-p_{n})^{n-k} \approx {(np)^{k} \over k!} e^{-np}
$$

#### 均匀分布

$$
X \sim U[a, b]
$$

$$
f(x) =
\begin{cases}
\displaystyle{1 \over b-a}, & a \leqslant x \leqslant b  \\
0, & \text{else}
\end{cases}
$$

#### 指数分布

$\lambda > 0$

$$
X \sim e(\lambda)
$$

$$
\begin{aligned}
f(x) &=
\begin{cases}
\lambda e^{-\lambda x}, & x > 0 \\
0, & x \leqslant 0
\end{cases}
\\
F(x) &= 
\begin{cases}
1-e^{-\lambda x}, &x>0 \\
0, &x \leqslant 0
\end{cases}

\end{aligned}
$$

指数分布具有无记忆性

#### 正~~太~~态分布

🤤🤤……正太我的正太……🤤🤤…正太我的🤤🤤正太……🤤🤤白白嫩嫩……🤤🤤的正太……🤤🤤

$$
X \sim N(\mu, \sigma^{2})
$$

$$
\begin{aligned}
f(x) &= {1 \over \sqrt{2 \pi} \sigma} e^{-{(x-\mu)^{2} \over 2 \sigma^{2} } }, -\infty < x < + \infty \\
F(x) &= {1 \over \sqrt{2 \pi} \sigma} \int _{-\infty} ^{x} e^{-{(t-\mu)^{2} \over 2 \sigma^{2} } } \mathrm{d} t,  -\infty < x < + \infty
\end{aligned}
$$


标准正态分布

$$
\begin{aligned}
\varphi(x) &= {1 \over \sqrt{2 \pi}} e^{-{x^2 \over 2 } }, -\infty < x < + \infty \\
\Phi(x) &= {1 \over \sqrt{2 \pi} } \int _{-\infty} ^{x} e^{-{t^{2} \over 2 } } \mathrm{d} t,  -\infty < x < + \infty
\end{aligned}
$$

### 随机变量函数的分布

$X$ 是随机变量，其函数 $Y=g(X)$ 也是随机变量

- 离散型运算时，只需两次代入即可
- 连续型，$X$ 的概率密度函数为 $f_{X}(x)$，$Y$ 也是连续型随机变量，其概率密度为 $f_{Y}(y)$，需要用以下两种方法运算

#### 公式法

$y=g(x)$ 是单调函数，导数不为零的可导函数，$h(y)$ 为它的反函数，则

$$
f_{Y}(y) = 

\begin{cases}
|h'(y)| f_{X}(h(y)), & \alpha < y < \beta \\
0, & \text{else}
\end{cases}
$$

#### 定义法

先求分布函数 $F_{Y}(y)$

$$
F_{Y}(y) =P(Y \leqslant y) = P(g(X) \leqslant y) =\underset{g(x)\leqslant y}{\int}f_{X}(x) \mathrm{d} x
$$

然后 $f_{Y}(y)=F'_{Y}(y)$

## 多维随机变量及其分布

### 二维随机变量

二维随机变量 $(X,Y)$，对任意实数 $x,y$，二元函数

$$
F(x,y)=P(X \leqslant x, Y \leqslant y), -\infty < x,y < +\infty
$$

称为二维随机变量 $(X,Y)$ 的分布函数，或称随机变量 $X$ 和 $Y$ 的联合分布

> [!tip] 性质
> - $0 \leqslant F(x,y) \leqslant 1$
> - $F(-\infty, y)=F(x,-\infty)=F(-\infty, -\infty)=0, F(+\infty, +\infty)=1$
> - 关于 $x,y$ 均单调不减
> - 关于 $x,y$ 均右连续
> - $P(a<X \leqslant b,c < Y \leqslant d)=F(b,d)+F(a,c)-F(b,c)-F(a,d)$

#### 边缘分布

$$
\begin{aligned}
F_{X}(x) & = P(X \leqslant x) = P(X \leqslant x, Y < +\infty)=F(x,+\infty) \\
F_{Y}(y) & = P(Y \leqslant y) = P(X < +\infty, Y \leqslant y)=F(+\infty, y)
\end{aligned}
$$

#### 条件概率

$$
\begin{aligned}
F_{X|Y}(x \mid y) & = P(X \leqslant x \mid Y=y) \\
& = \lim_{\varepsilon \to 0^{+} }P(X \leqslant x \mid y - \varepsilon < Y \leqslant y + \varepsilon) \\
& = \lim_{\varepsilon \to 0^{+} } {
P(X \leqslant x, y - \varepsilon < Y \leqslant y + \varepsilon)
\over 
P(y - \varepsilon < Y \leqslant y + \varepsilon)
}
\end{aligned}
$$

### 二维离散型随机变量

分布律——画二维表

### 二维连续型随机变量

$$
F(x,y)=\int_{-\infty}^{x}\int_{-\infty}^{y}f(u,v) \mathrm{d}u \mathrm{d}v
$$

$$
\int_{-\infty}^{+\infty}\int_{-\infty}^{+\infty}f(x,y) \mathrm{d}x \mathrm{d}y=1
$$

$$
P((X,Y) \in D) = \iint_{D}f(x,y) \mathrm{d} x \mathrm{d} y
$$

#### 边缘密度

$$
\begin{aligned}
f_{X}(x) & = \int _{-\infty} ^{+\infty} f(x,y) \mathrm{d} y \\
f_{Y}(y) & = \int _{-\infty} ^{+\infty} f(x,y) \mathrm{d} x \\
\end{aligned}
$$

#### 条件密度

条件分布

$$
F_{X|Y}(x \mid y) = \int _{-\infty} ^{x} {f(s,y) \over f_{Y} (y)} \mathrm{d} s
$$

在条件 $Y=y$ 下的条件密度

$$
f_{X|Y}(x \mid y) = {f(x,y) \over f_{Y}(y)}, f_{Y}(y) > 0
$$

### 随机变量的独立性

> [!note] 定义
> 如果对任意 $x,y$ 都有
> 
> $$
> \begin{aligned}
> P\{X \leqslant x, Y \leqslant y\} &= P\{ X \leqslant x\}P{Y \leqslant y} \\
> F(x,y)&=F_{X}(x)F_{Y}(y)
> \end{aligned}
> $$
>
> 则称随机变量 $X,Y$ 相互独立

> [!note] 离散型随机变量 $X$ 和 $Y$ 相互独立的充要条件
> 对任意 $i, j=1,2,\cdots$ 成立
> 
> $$P\{X=x_{i},Y=y_{j}\}=P\{X=x_{i}\}P\{Y=y_{j}\}$$
> 
> 即 $p_{ij}=p_{i}p_{j}$，表现为表格==行的边缘概率==与==列的边缘概率==乘积等于行列所在的==单元格的概率==

### 二维均匀分布和二维正态分布

> [!note] 定义
> 如果二维连续型随机变量 $(X,Y)$ 的概率密度为
> 
> $$f(x,y)=\begin{cases}{1\over A}, &(x,y)\in G \\ 0, & \text{else}\end{cases}$$
> 
> 其中 $A$  是平面有界区域 $G$ 的面积，则称 $(X,Y)$ 服从区域 $G$ 熵的均匀分布

> [!note] 二维正态分布
> $$(X,Y) \sim N(\mu_{1},\mu_{2};\sigma_{1},\sigma_{2}; \rho)$$
> 
> 其中 $\mu_{1},\mu_{2},\sigma_{1}>0, \sigma_{2}>0, -1 < \rho < 1$. 对于满足二维正态分布的随机变量 $(X,Y)$，有
> 
> - $X \sim N(\mu_{1},\sigma_{1}^{2}), Y \sim N(\mu_{2}, \sigma_{2}^{2})$
> - $X$ 和 $Y$ 相互独立的充要条件是 $\rho=0$
> - $aX+bY \sim N(a\mu_{1}+b\mu_{2}, a^{2}\sigma_{1}^{2}+2ab\sigma_{1}\sigma_{2}\rho +b^{2}\sigma_{2}^{2})$
> - 当 $ab-bc \ne 0$ 时，$(aX+bY, cX+dY)$ 也一定是二维正态分布

### 两个随机变量函数 $Z=g(X,Y)$ 的分布

#### 均为离散型

和一维离散型类似

#### 均为连续型

$$
F_{Z}(z) = P(Z \leqslant z) = P(g(X,Y) \leqslant z) = \underset{g(x,y)\leqslant z}{\iint}f(x,y) \mathrm{d} x \mathrm{d} y
$$

##### $Z=X+Y$

$$
\begin{aligned}
F_{Z}(z) & = P(X+Y \leqslant z) = \underset{x+y \leqslant z}{\iint} f(x,y) \mathrm{d} x \mathrm{d} y \\
& = \int_{-\infty}^{+\infty} \mathrm{d} x \int_{-\infty}^{z-x}f(x,y) \mathrm{d} y 
= \int_{-\infty}^{+\infty} \mathrm{d} y \int_{-\infty}^{z-y}f(x,y) \mathrm{d} x
\end{aligned}
$$

由此得到 $Z=X+Y$ 的概率密度为

$$
\begin{aligned}
f_{Z}(z) & =\int_{-\infty}^{+\infty}f(x, z-x) \mathrm{d} x \\
f_{Z}(z) & =\int_{-\infty}^{+\infty}f(z-y, y) \mathrm{d} y
\end{aligned}
$$

特别的，当 $X$ 与 $Y$ 相互独立时，$f(x,y)=f_{X}(x)f_{Y}(y)$，则有卷积公式

$$
\begin{aligned}
f_{Z}(z) & =\int_{-\infty}^{+\infty}f_{X}(x)f_{Y}(z-x) \mathrm{d} x \\
f_{Z}(z) & =\int_{-\infty}^{+\infty}f_{X}(z-y)f_{Y}(y) \mathrm{d} y
\end{aligned}
$$

#### $X$ 为离散型，$Y$ 为连续型

| $X$ | $x_{1}$ | $x_{2}$ | $\cdots$ | $x_{i}$ | $\cdots$ |
|:---:|:-------:|:-------:|:--------:|:-------:|:--------:|
| $P$ | $p_{1}$ | $p_{2}$ | $\cdots$ | $p_{i}$ | $\cdots$ | 

$$
\begin{aligned}
F_{Z}(z) &= P(Z \leqslant z)=P(g(X,Y) \leqslant z) \\
& = \sum\limits_{i}P(X=x_{i}) P(g(X,Y) \leqslant z \mid X=x_{i}) \\
& = \sum\limits_{i}p_{i}P(g(X,Y) \leqslant z \mid X=x_{i})
\end{aligned}
$$

##### $Z = \max \{X,Y\}$

$X,Y$ 独立，有

$$
\begin{aligned}
P(Z \leqslant z) &=P(X \leqslant z, Y \leqslant z) \\
F_{Z}(z) &=P(Z \leqslant z) = P(X \leqslant z, Y \leqslant z) \\
& = P(X \leqslant z)P(Y \leqslant z) = F_{X}(x)F_{Y}(y)
\end{aligned}
$$

##### $Z = \min \{X,Y\}$

$X,Y$ 独立，有

$$
\begin{aligned}
F_{Z}(z) &= P(Z \leqslant z) = 1 - P(Z > z) \\
& = 1 - P(X > z, Y > z) = 1 - P(X > z)P(Y>z) \\
&= 1-(1-F_{X}(x))(1-F_{Y}(y))
\end{aligned}
$$

## 随机变量的数字特征

### 期望

#### 离散型

随机变量 $X$ 的概率分布为

$$
P\{X=x_{k}\}=p_{k},k=1,2,\cdots
$$

如果级数 $\sum\limits_{k=1}^{+\infty}x_{k}p_{k}$ 绝对收敛，则称此级数为随机变量 $X$ 的数学期望或均值，记作 $E(X)$

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
> 定理表明，当 $n$ 充分大时，服从 $B(n,p)$ 的随机变量 $X_{n}$ 经标准化后得到 $X_{n} - np \over \sqrt{np(1-p)}$ 近似服从标准正太分布 $N(0,1)$，或者说 $X_{n} \overset{\cdot}{\sim}N(np, np(1-p))$

## 数理统计

### 总体 & 样本 & 统计量 & 样本数字特征

> [!note] 总体
> 数理统计中所研究对象的某项数量指标 $X$ 的全体

> [!note] 样本
> 随机变量 $X_{1},X_{2},\cdots, X_{n}$ 相互独立且与总体同分布，称 $X_{1},X_{2},\cdots, X_{n}$ 为来自总体的简单随机样本

> [!tip]
> - 样本均值 $\displaystyle\overline{X}={1\over n} \sum\limits_{i=1}^{n}X_{i}$
> - 样本方差 $\displaystyle S^{2}={1 \over n-1} \sum\limits_{i=1}^{n}(X_{i}-\overline{X})^{2}$
> - 样本 $k$ 阶原点矩 $\displaystyle A_{k}={1\over n} \sum\limits_{i=1}^{n}X_{i}^{k}, k=1,2, A_{1}=\overline{X}$
> - 样本 $k$ 阶中心矩 $\displaystyle B_{k}={1 \over n} \sum\limits_{i=1}^{n}(X_{i}-\overline{X})^{k},k=1,2, B_{2}={n-1 \over n} S^{2}$

> [!summary] 性质
> - 如果总体 $X$ 具有数学期望 $E(X)=\mu$，则 $E(\overline{X})=\mu$
> - 如果总体 $X$ 具有方差 $D(X)=\sigma^{2}$，则 $\displaystyle D(\overline{X})={\sigma^{2} \over n}, E(S^{2})=D(X)=\sigma^2$
> - 如果总体 $X$ 的 $k$ 阶原点矩 $E(X^{k})=\mu_{k}, k=1,2,\cdots$ 存在，则当 $n \to \infty$ 时，$\displaystyle {1\over n} \sum\limits_{i=1}^{n}X_{i}^{k} \xrightarrow{P} \mu_{k}, k=1,2,\cdots$

### 常用统计抽样分布

### $\chi^{2}$ 分布


设随机变量 $X_{1}, X_{2}, \cdots, X_{n}$ 相互独立且均服从标准正态分布 $N(0,1)$，则称随机变量

$$
\chi^{2}=X_{1}^{2}+X_{2}^{2}+\cdots + X_{n}^{2}
$$

服从自由度为 $n$ 的 $\chi^{2}$ 分布，记作 $\chi^{2}\sim \chi^{2}(n)$

> [!tip] 设 $\chi^{2}\sim\chi^2(n)$
> - 对给定的 $\alpha(0 < \alpha < 1)$，称满足条件 $P\{\chi^{2}>\chi^{2}_{\alpha}(n)\}=\displaystyle\int_{\chi_{\alpha}^{2}(n)}^{+\infty}f(x) \mathrm{d} x=\alpha$ 的点 $\chi_{\alpha}^{2}(n)$ 为 $\chi^{2}(n)$ 分布上 $\alpha$ 分位点。对不同的 $\alpha$ 和 $n$，通常查表得到
> - $E(\chi^{2})=n,D(\chi^{2})=2n$
> - $\chi_{1}^{2}\sim \chi^{2}(n_{1}), \chi_{2}^{2}\sim \chi^{2}(n_{2})$，且 $\chi_{1}^{2}$ 和 $\chi_{2}^{2}$ 相互独立，则 $\chi_{1}^{2}+\chi_{2}^{2}\sim \chi^{2}(n_{1}+ n_{2})$

![[public/math/math-prob-chi2.png]]

### $t$ 分布

设随机变量 $X$ 和 $Y$ 相互独立，$X \sim N(0,1),Y\sim\chi^{2}(n)$，则称随机变量

$$
T = {X \over \sqrt{Y/n} }
$$

服从自由度为 $n$ 的 $t$ 分布，记作 $T\sim t(n)$

> [!tip] 性质
> - $t$ 分布的概率密度函数是偶函数
> - 设 $T\sim t(n)$，对给定的 $\alpha(0<\alpha < 1)$，称满足条件 $\displaystyle P\{T > t_{\alpha}(n)\}=\int_{t_{\alpha}(n)}^{+\infty}f(x) \mathrm{d}x=\alpha$ 的点 $t_{\alpha}(n)$ 为 $t$ 分布上 $\alpha$ 分位点
> - 由于概率密度为偶函数，可知 $t$ 分布的双侧 $\alpha$ 分位点 $t_{\alpha/2}(n)$，即 $P\{|T|>t_{\alpha/2}(n) \}=\alpha$，显然 $t_{1-\alpha}(n)=-t_{\alpha}(n)$

![[public/math/math-probe-t.png]]

### $F$ 分布

设随机变量 $X,Y$ 相互独立，且 $X \sim \chi^{2}(n_{1}), Y\sim \chi^{2}(n_{2})$，则称随机变量

$$
F={X/n_{1} \over Y/n_2 }
$$

服从自由度为 $(n_{1},n_{2})$ 的 $F$ 分布，其中两个自由度分别称为第一自由度和第二自由度。

> [!tip] 性质
> 对给定的 $\alpha(0<\alpha<1)$，称满足条件 $P\{ F > F_{\alpha}(n_{1},n_{2}) \}=\displaystyle\int_{F_{\alpha}(n_{1}, n_{2})}^{+\infty}f(x)\mathrm{d}x=\alpha$ 的点 $F_{\alpha}(n_{1},n_{2})$ 为 $F(n_{1},n_{2})$ 分布上的 $\alpha$ 分位点
> 如果 $F\sim F(n_{1},n_{2})$，则 $\displaystyle{1\over F} \sim F(n_{2},n_{1})$，且 $\displaystyle F_{1-\alpha}(n_{1},n_{2})={1\over F_{\alpha}(n_{2},n_{1})}$

### 正态总体的抽样分布

#### 一个正态总体

$X \sim N(\mu, \sigma^{2}), X_{1},X_{2},\cdots,X_n$ 是来自总体的样本，样本均值为 $\overline{X}$，样本方差为 $S^{2}$，则有

- $\displaystyle \overline{X}\sim N\left(\mu, {\sigma^{2}\over n}\right), U={\overline{X} - \mu \over \sigma /\sqrt{n} }\sim N(0,1)$
- $\overline{X}$ 和 $S^{2}$ 相互独立，且 $\displaystyle \chi^{2} = {(n-1)S^{2} \over \sigma^{2} } \sim \chi^{2}(n-1)$
- $\displaystyle T={ \overline{X} -\mu \over S / \sqrt{n}  }\sim t(n-1)$
- $\chi^{2}= \displaystyle{1 \over \sigma^{2} } \sum\limits_{i=1}^{n}(X_{i}-\mu)^{2}\sim \chi^{2}(n)$

#### 两个正态总体

$X \sim N(\mu_{1}, \sigma_{1}^{2}),Y\sim N(\mu_{2}, \sigma_{2}^{2})$，$X_{i}$ 和 $Y_{j}$ 分别来自总体 $X$ 和 $Y$ 且相互独立

- $\displaystyle\overline{X}-\overline{Y} \sim N\left( \mu_{1}-\mu_{2}, {\sigma_{1}^{2} \over n_{1} } + {\sigma_{2}^{2} \over n_{2} } \right)$，$\displaystyle U={(\overline{X} - \overline{Y}) - (\mu_{1}-\mu_{2}) \over\sqrt{ {\sigma_{1}^{2} \over n_{1} } + {\sigma_{2}^{2} \over n_{2} } } } \sim N(0,1)$
- 如果 $\sigma_{1}^{2}=\sigma_{2}^{2}$，则

$$
T={(\overline{X} - \overline{Y}) - (\mu_{1}-\mu_{2}) \over S_{\omega} \sqrt{ { 1 \over n_{1} } + {1 \over n_{2} } } }, S_{\omega}^{2}={(n_{1}-1)S_{1}^{2} + (n_{2}-1)S_{2}^{2} \over n_{1}+n_{2}-2}
$$

- $F=\displaystyle { S_{1}^{2} / \sigma_{1}^{2} \over S_{2}^{2}/ \sigma_{2}^{2} }\sim F(n_{1}-1,n_{2}-1)$

