# 概率论-多维随机变量

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
