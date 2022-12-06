# 一些公式

## 格林公式

平面上沿闭曲线 $L$ 对坐标的曲线积分与曲线 $L$ 所围成闭区域 $D$ 上的二重积分之间的

$$
\displaystyle \oint_{L} P{\left.\text{d} x\right.}+ Q{\left.\text{d} y\right.}=\underset{D}{\iint}{\left(\frac{\partial Q}{\partial x}-\frac{\partial P}{\partial y}\right)}{\left.\text{d} x\right.}{\left.\text{d} y\right.}
$$

若曲线积分与路径无关，则积分的结果为 0. 一般通过 $\displaystyle \frac{\partial Q}{\partial x}\overset{?}{=}\frac{\partial P}{\partial y}$ 来判断曲线积分是否与路径无关。

## 高斯公式

设空间有界闭合区域 $\Omega$ ，其边界 $\Sigma$ 为分片光滑闭曲面。函数 $P, Q, R$ 及其一阶偏导数在 $\Omega$ 上连续，那么

$$
\begin{aligned}
{\bigcirc}\kern-11.5pt{\int}\kern-6.5pt{\int}_\Sigma P{\left.\text{d} y\right.}{\left.\text{d} z\right.}+ Q{\left.\text{d} x\right.}{\left.\text{d} z\right.}+ R{\left.\text{d} x\right.}{\left.\text{d} y\right.} & ={\bigcirc}\kern-11.5pt{\int}\kern-6.5pt{\int}_{\Sigma}{\left( P \cos{\alpha}+ Q \cos{\beta}+ R \cos{\gamma}\right)}\text{d} S \\
& = {\bigcirc}\kern-11.5pt{\int}\kern-6.5pt{\int}_{\Sigma}{\left( P, Q, R\right)}\cdot \boldsymbol{n} \text{d} S
\\
& =\underset{\Omega}{\iiint}{\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)}\text{d} V

\end{aligned}
$$

其中，$\displaystyle  \cos{\alpha}, \cos{\beta}, \cos{\gamma}$ 为在曲面上某一点处的方向余弦。

若曲面积分与曲面形状位置无关，则高斯积分结果为 0. 经典例子是磁通量。

另外，可以使用下面的方法来将两种类型的曲面相互转换

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] \cos{\alpha}\text{d} S={\left.\text{d} y\right.}{\left.\text{d} z\right.}\\ \cos{\beta}\text{d} S={\left.\text{d} x\right.}{\left.\text{d} z\right.}\\ \cos{\gamma}\text{d} S={\left.\text{d} x\right.}{\left.\text{d} y\right.}\\\end{matrix*}\right.}
$$

(1) 式与 (3) 式相比，(2) 式与 (3) 式相比，得

$$
\begin{aligned}\displaystyle \frac{ {\left.\text{d} y\right.}{\left.\text{d} z\right.} }{ {\left.\text{d} x\right.}{\left.\text{d} y\right.} }=\frac{\cos{\alpha} }{\cos{\gamma} }&\implies{\left.\text{d} y\right.}{\left.\text{d} z\right.}=\frac{\cos{\alpha} }{\cos{\gamma} }{\left.\text{d} x\right.}{\left.\text{d} y\right.} \\ \displaystyle \frac{ {\left.\text{d} x\right.}{\left.\text{d} z\right.} }{ {\left.\text{d} x\right.}{\left.\text{d} y\right.} }=\frac{\cos{\beta} }{\cos{\gamma} }&\implies{\left.\text{d} x\right.}{\left.\text{d} z\right.}=\frac{\cos{\beta} }{\cos{\gamma} }{\left.\text{d} x\right.}{\left.\text{d} y\right.}\end{aligned}
$$

这样就可以将积分转换为投影到 $\displaystyle  D_{x y}$ 上的二重积分了。

## 斯托克斯公式

设 $\Gamma$ 为空间的一条分段光滑的有向曲线，$\Sigma$ 是以 $\Gamma$ 为边界的分片光滑的有向曲面，$\Gamma$ 的正向与$\Sigma$ 的侧符合右手法则。函数 $P,Q,R$ 在曲面 $\Sigma$ (连同边界 $\Gamma$)上具有连续的一阶偏导数，则

$$
\displaystyle \oint_{\Gamma} P{\left.\text{d} x\right.}+ Q{\left.\text{d} y\right.}+ R{\left.\text{d} z\right.}=\underset{\Sigma}{\iint}{\left|\begin{matrix}{\left.\text{d} y\right.}{\left.\text{d} z\right.}&{\left.\text{d} x\right.}{\left.\text{d} z\right.}&{\left.\text{d} x\right.}{\left.\text{d} y\right.}\\\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\ P& Q& R\\\end{matrix}\right|}\text{d} s
$$

利用两类曲面积分间的联系，可得斯托克斯公式的另一种形式

$$
\displaystyle \oint_{\Gamma} P{\left.\text{d} x\right.}+ Q{\left.\text{d} y\right.}+ R{\left.\text{d} z\right.}=\underset{\Sigma}{\iint}{\left|\begin{matrix} \cos{\alpha}& \cos{\beta}& \cos{\gamma}\\\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\ P& Q& R\\\end{matrix}\right|}\text{d} s
$$

其中 $\vec{e_n}=\{\cos\alpha, \cos\beta, \cos\gamma\}$ 为有向曲面 $\Sigma$ 的单位法向量

## 区间再现公式

$$
\displaystyle \int_{a}^{b} f{\left( x\right)}{\left.\text{d} x\right.}=\int_{a}^{b} f{\left( a+ b- x\right)}{\left.\text{d} x\right.}
$$

即，积分区域面积可以沿着 $\displaystyle  x=\frac{a+ b}{2}$ 翻转，得到的结果是一样的。

## 特殊极限

$$
\displaystyle \sum_{n= 2}^{+\infty}\frac{1}{n^{p}{\left( \ln{n}\right)}^{q} }{\left\lbrace\begin{matrix*}[l] p> 1& 敛\\ p< 1& 散\\ p= 1{\left\lbrace\begin{matrix*}[l] q> 1& 敛\\ q\le 1& 散\\\end{matrix*}\right.}\\\end{matrix*}\right.}
$$

## 曲率半径

对于平面上的光滑曲线，做一个尽可能与它吻合的圆，这小段曲线的长度趋近于 0 时，这个圆可以唯一确定。这个圆称为**密切圆**，其半径称为曲线在该点的**曲率半径**，常记为 $\rho$. 曲率半径的倒数 $\displaystyle  1{/}\rho$ 为**曲率**。

![[public/math/curvat_1.svg]]

半径为 $R$ 的圆上有一段小圆弧 $\Delta l$，做该弧两端的切线，它们的夹角为 $\displaystyle \Delta\theta$，那么有

$$
\displaystyle  R\Delta\theta=\Delta l
$$

分别做两端处的垂线，垂线的交点即为圆心，得到

$$
\displaystyle \rho=\lim_{\Delta l\to 0}\frac{\Delta l}{\Delta\theta}
$$

对于直角坐标系中 $y(x)$ 在 $(x,y)$ 处的曲率半径，有

$$
\displaystyle \rho=\frac{ {\left( 1+\dot{y}\right)}^{3{/} 2} }{\ddot{y} }
$$

> [!note] 推导
> 
> 通过导数计算曲线上某点处的切线与 $x$ 轴的夹角
> 
> $$
> \displaystyle \dot{y}=\frac{\left.\text{d} y\right.}{\left.\text{d} x\right.}= \tan{\theta}\qquad{\left( 1\right)}
> $$
> 
> 曲线长度的微分为
> 
> $$
> \displaystyle \text{d} l=\frac{\left.\text{d} x\right.}{\cos{\theta} }
> $$
> 
> 其中
> 
> $$
> \displaystyle  \cos{\theta}=\frac{1}{\sqrt{1+{\tan}^{2}\theta} }=\frac{1}{\sqrt{1+\dot{y}^{2} } }
> $$
> 
> 对 (1) 式左右两边取微分，得
> 
> $$
> \displaystyle \ddot{y}{\left.\text{d} x\right.}=\frac{1}{ {\cos}^{2}\theta}\text{d}\theta
> $$
> 
> 其中 $\displaystyle \text{d}\theta$ 就是 $\displaystyle {\left.\text{d} x\right.}$ 对应的一小段曲线两端切线的夹角，所以曲率半径为
> 
> $$
> \displaystyle \rho=\frac{\text{d} l}{\text{d}\theta}=\frac{1}{\ddot{y}{\cos}^{3}\theta}=\frac{ {\left( 1+\dot{y}^{2}\right)}^{3{/} 2} }{\ddot{y} }
> $$

对于极坐标系中 $r(\theta)$ 在 $(r, \theta)$ 处的曲率半径，有

$$
\displaystyle \rho=\frac{ {\left( r^{2}+\dot{r}^{2}\right)}^{3{/} 2} }{r^{2}+ 2\dot{r}^{2}- r\ddot{r} }
$$

## 表格积分法

例 1

$$
\displaystyle \int x^{3}\text{e}^{2 x}{\left.\text{d} x\right.}
$$

![[public/math/table-integral.excalidraw.png]]

$$
\begin{aligned}\displaystyle \int x^{3}\text{e}^{2 x}{\left.\text{d} x\right.}&=\frac{1}{2} x^{3}\text{e}^{2 x}-\frac{3}{4} x^{2}\text{e}^{2 x}+\frac{3}{4} x\text{e}^{2 x}-\frac{3}{8}\text{e}^{2 x}+ C \\ \displaystyle &={\left(\frac{1}{2} x^{3}-\frac{3}{4} x^{2}+\frac{3}{4} x-\frac{3}{8}\right)}\text{e}^{2 x}+ C\end{aligned}
$$

例 2

$$
\displaystyle \int x^{2} \cos{2} x{\left.\text{d} x\right.}
$$

![[public/math/table-integral-2.excalidraw.png]]

$$
\displaystyle \int x^{2} \cos{2} x{\left.\text{d} x\right.}=\frac{1}{2} x \sin{2} x+\frac{1}{2} x \cos{2} x-\frac{1}{4} \sin{2} x+ C
$$

例 3

$$
\displaystyle \int\text{e}^{2 x} \cos{x}{\left.\text{d} x\right.}
$$

![[public/math/table-inge-3.excalidraw.png]]

$$
\begin{aligned}\displaystyle \int\text{e}^{2 x} \cos{x}{\left.\text{d} x\right.}&=\frac{1}{2}\text{e}^{2 x} \cos{x}+\frac{1}{4}\text{e}^{2 x} \sin{x}-\frac{1}{4}\int\text{e}^{2 x} \cos{x}{\left.\text{d} x\right.} \\ \displaystyle \int\text{e}^{2 x} \cos{x}{\left.\text{d} x\right.}&=\frac{4}{5}{\left(\frac{1}{2}\text{e}^{2 x} \cos{x}+\frac{1}{4}\text{e}^{2 x} \sin{x}\right)}+ C\end{aligned}
$$

## 变限积分

- `$f(x)$` 为偶函数，则 `$F(x) = int_0 ^x f(t) "d"t$` 为奇函数，注意，必须满足 `$F(0)=0$`
- `$f(x)$` 为奇函数，则 `$F(x)=int_a ^x f(t) "d"t$` 为偶函数，没有上面的限制，因此下限可以是 `$a$`


```am
I = underset (Sigma)(iint)  (2x^2) / sqrt(4x^4 + (x^2 + y^2) ^2) "d"S
```
