---
title: 空间解析几何
---

## 距离公式

### 两点之间

$A(x_{1},y_{1},z_{1}), B(x_{2},y_{2},z_{2})$ 两点之间的距离

$$
d = \sqrt{(x_{1}-x_{2})^{2} + (y_{1}-y_{2})^{2} + (z_{1}-z_{2})^{2} }
$$

### 点到平面

平面 $\Sigma: Ax+By+Cz+D=0$，点 $M(x_{0},y_{0},z_{0})$ 之间的距离

$$
d = { |Ax_{0}+By_{0}+Cz_{0}+D| \over \sqrt{A^{2} + B^{2} + C^{2} } }
$$

### 点到直线

直线 $L: \displaystyle{x-x_{0} \over m} = {y - y_{0} \over n} = {z - z_{0} \over p}$，点 $M_{1}(x_{1},y_{1},z_{1}) \not \in L$

令 $M_{0}(x_{0},y_{0},z_{0})$，$\vec s=\{m, n, p\}$，则点 $M_{1}$ 到 $L$ 的距离

$$
d = { \left|\overrightarrow{M_{0}M_{1} } \times \vec s \right| \over |\vec s| }
$$

## 球极坐标

### 变量如何转换

$$
\begin{cases}
x = r \sin \varphi \cos \theta  \\
y = r \sin \varphi \sin \theta  \\
z = r \cos \varphi
\end{cases}
$$

- $\varphi$ 为球上一点与原点连线和 $z$ 轴正方向的夹角，$\varphi \in [0, \pi]$
- $\theta$ 为球上一点所在的横截面上，半径与 $x$ 轴正方向的旋转角，$\theta \in [0, 2 \pi]$

$$
\mathrm{d} V = r^{2} \sin \varphi \mathrm{d} r \mathrm{d} \theta \mathrm{d} \varphi
$$

球极坐标积分

$$
\begin{aligned}
I & = \underset{\Omega} {\iiint} f(x,y,z) \mathrm {d} x \mathrm{d} y \mathrm{d} z \\
& = \int _{0}^{2\pi} \mathrm{d} \theta \int_{0}^{\pi} \mathrm{d} \varphi \int _{0}^{r} f(x,y,z) r^{2} \sin \varphi \mathrm{d} r
\end{aligned}
$$

## 单叶双曲面和双叶双曲面

### 单叶双曲面

$$
{x^{2} \over a^{2} } + {y^{2} \over b^{2} } - {z^{2} \over c^{2} } = 1
$$

### 双叶双曲面

$$
{x^{2} \over a^{2} } + {y^{2} \over b^{2} } - {z^{2} \over c^{2} } = -1
$$

## 旋转曲面表面积

### 参数方程形式

光滑参数曲线 $C$ 由参数方程

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x= x{\left( t\right)}\\ y= y{\left( t\right)}\\\end{matrix*}\right.}
$$

其中，$\displaystyle  t\in{\left[\alpha,\beta\right]}$，且 $\displaystyle  y{\left( t\right)}\ge 0$. 则曲线 $C$ 绕 $x$ 轴旋转所得的旋转曲面表面积为

$$
\displaystyle  S= 2\pi\int_{\alpha}^{\beta} y{\left( t\right)}\sqrt{ {\left. x^\prime\right.}^{2}{\left( t\right)}+{\left. y^\prime\right.}^{2}{\left( t\right)} }\text{d} t
$$

### 直角坐标形式

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x= x\\ y= y{\left( x\right)}\\\end{matrix*}\right.}
$$

曲线 $C$ 绕 $x$ 轴旋转所得旋转曲面的表面积为

$$
\displaystyle  S= 2\pi\int_{\alpha}^{\beta} y{\left( x\right)}\text{d} S= 2\pi\int_{\alpha}^{\beta} y{\left( x\right)}\sqrt{1+{\left. y^\prime\right.}^{2}{\left( x\right)} }{\left.\text{d} x\right.}
$$

绕 $y$ 轴旋转所得旋转曲面的表面积为

$$
\displaystyle  S= 2\pi\int_{\alpha}^{\beta} x{\left( y\right)}\text{d} S= 2\pi\int_{\alpha}^{\beta} x{\left( y\right)}\sqrt{1+{\left. x^\prime\right.}^{2}{\left( y\right)} }{\left.\text{d} x\right.}
$$

### 极坐标形式

由于用极坐标表示有

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x= r{\left(\theta\right)} \cos{\theta}\\ y= r{\left(\theta\right)} \sin{\theta}\\\end{matrix*}\right.}
$$

求导有

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x^\prime= r^\prime{\left(\theta\right)} \cos{\theta}- r{\left(\theta\right)} \sin{\theta}\\ y^\prime= r^\prime{\left(\theta\right)} \sin{\theta}+ r{\left(\theta\right)} \cos{\theta}\\\end{matrix*}\right.}
$$

则

$$
\displaystyle  S= 2\pi\int_{\theta_{1} }^{\theta_{2} } r{\left(\theta\right)} \sin{\theta}\sqrt{r^{2}{\left(\theta\right)}+{\left. r^\prime\right.}^{2}{\left(\theta\right)} }\text{d}\theta
$$

## 弧长公式

### 参数方程形式

光滑参数曲线 $C$ 由参数方程

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x= x{\left( t\right)}\\ y= y{\left( t\right)}\\\end{matrix*}\right.}
$$

其中 $\displaystyle  t\in{\left[\alpha,\beta\right]}$，其弧长为

$$
\displaystyle  s=\int_{\alpha}^{\beta}\sqrt{ {\left. x^\prime\right.}^{2}{\left( t\right)}+{\left. y^\prime\right.}^{2}{\left( t\right)} }\text{d} t
$$

### 直角坐标形式

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x= x\\ y= y{\left( x\right)}\\\end{matrix*}\right.}
$$

$$
\displaystyle  s=\int_{\alpha}^{\beta}\sqrt{1+{\left. y^\prime\right.}^{2}{\left( t\right)} }{\left.\text{d} x\right.}
$$

### 极坐标形式

由于用极坐标表示有

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x= r{\left(\theta\right)} \cos{\theta}\\ y= r{\left(\theta\right)} \sin{\theta}\\\end{matrix*}\right.}
$$

求导有

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] x^\prime= r^\prime{\left(\theta\right)} \cos{\theta}- r{\left(\theta\right)} \sin{\theta}\\ y^\prime= r^\prime{\left(\theta\right)} \sin{\theta}+ r{\left(\theta\right)} \cos{\theta}\\\end{matrix*}\right.}
$$

则

$$
\displaystyle  s=\int_{\theta_{1} }^{\theta_{2} }\sqrt{r^{2}{\left(\theta\right)}+{\left. r^\prime\right.}^{2}{\left(\theta\right)} }\text{d}\theta
$$


