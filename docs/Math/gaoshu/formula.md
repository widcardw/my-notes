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
{\bigcirc}\kern-11.5pt{\int}\kern-6.5pt{\int}_\Sigma P{\left.\text{d} y\right.}{\left.\text{d} z\right.}+ Q{\left.\text{d} x\right.}{\left.\text{d} z\right.}+ R{\left.\text{d} x\right.}{\left.\text{d} y\right.}=\underset{\Omega}{\iiint}{\left(\frac{\partial P}{\partial x}+\frac{\partial Q}{\partial y}+\frac{\partial R}{\partial z}\right)}\text{d} V
$$

若曲面积分与曲面形状位置无关，则高斯积分结果为 0. 经典例子是磁通量。

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


