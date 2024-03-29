---
title: 梯度 散度 旋度
---
> 转自[知乎](https://zhuanlan.zhihu.com/p/336928427)

## 1. 算子

向量算子

$$
grad = bb(tex(grad)) = pp{::}x vec(e_x) + pp{::}y vec(e_y) + pp{::}z vec(e_z)
$$

其中，$\vec{e_x}, \vec{e_y}, \vec{e_z}$ 分别是 $X,Y,Z$ 方向上的单位向量。使用向量方式书写有

$$
grad = bb(tex(grad)) = [pp{::}x,pp{::}y,pp{::}z]^"T"
$$

## 2. 梯度

首先说明，梯度是一个==向量==，它表示函数在某个点处往哪个方向走，变化最快，即梯度等于方向导数的最大值。对于一个标量函数 $\psi$ 中，定义它的梯度为

$$
grad psi &= [pp{::}x, pp{::}y, pp{::}z]^"T" varphi

&= [pp psi x, pp psi y, pp psi z]^"T"
$$

> 只有标量函数才有梯度

## 3. 散度

散度是一个标量，它表示一个闭合曲面内单位体积的通量。散度的作用对象是一个矢量函数，对于一个矢量函数 $\vec f=[f_x,f_y,f_z]^{\rm T}$，散度的定义为

$$
grad * f &= grad^"T" f = [pp{::}x,pp{::}y,pp{::}z][f_x;f_y;f_z]

&= pp(f_x)x+pp(f_y)y+pp(f_z)z
$$

为了方便记忆，可以将散度类比于线性代数中的==向量内积==，两个向量的内积是一个标量，而散度的结果也是一个==标量==。

## 4. 旋度

旋度是一个向量，它表示单位面积的环量，即环量面密度。旋度的作用对象是一个矢量函数，对于一个矢量函数 $\vec f=[f_x,f_y,f_z]^{\rm T}$，旋度的定义为

$$
grad xx vec f = | vec(e_x), vec(e_y), vec(e_z); pp{::}x, pp{::}y, pp{::}z; f_x, f_y, f_z|
$$

## 5. 对标量场的梯度求散度

$$
grad * (grad psi) & = grad^"T"(grad psi)

& = [pp{::}x, pp{::}y, pp{::}z][pp psi x;pp psi y; pp psi z]

& = pp^2 psi x + pp^2 psi y + pp^2 psi z
$$

## 6. 对标量场的梯度求旋度

$$
\begin{aligned}
\nabla \times \nabla \psi & = \begin{vmatrix}
 \vec{e_x} & \vec{e_y}  & \vec{e_z}  \\
{ \partial \over \partial x} & { \partial \over \partial y} & { \partial \over \partial z} \\
{ \partial \psi \over \partial x} & { \partial \psi \over \partial y} & { \partial \psi \over \partial z}
\end{vmatrix} \\
& = \vec{e_x} \left( {\partial^2 \psi \over \partial y \partial z } - {\partial^2 \psi \over \partial z \partial y }\right) - \vec{e_y} \left( {\partial^2 \psi \over \partial x \partial z } - {\partial^2 \psi \over \partial z \partial x }\right) + \vec{e_z} \left( {\partial^2 \psi \over \partial x \partial y } - {\partial^2 \psi \over \partial y \partial x }\right)  \\
& = \mathbf{0}
\end{aligned}
$$

$$
\begin{aligned}\displaystyle \nabla\times\nabla\psi&={\left|\begin{matrix}\vec{e_{x} }&\vec{e_{y} }&\vec{e_{z} }\\\frac{\partial}{\partial x}&\frac{\partial}{\partial y}&\frac{\partial}{\partial z}\\\frac{\partial\psi}{\partial x}&\frac{\partial\psi}{\partial y}&\frac{\partial\psi}{\partial z}\\\end{matrix}\right|} \\ \displaystyle &=\vec{e_{x} }{\left(\frac{\partial^{2}\psi}{\partial y\partial z}-\frac{\partial^{2}\psi}{\partial z\partial y}\right)}-\vec{e_{y} }{\left(\frac{\partial^{2}\psi}{\partial x\partial z}-\frac{\partial^{2}\psi}{\partial z\partial x}\right)}+\vec{e_{z} }{\left(\frac{\partial^{2}\psi}{\partial x\partial y}-\frac{\partial^{2}\psi}{\partial y\partial x}\right)} \\ \displaystyle &={\mathbf{0} }\end{aligned}
$$

梯度的旋度恒为 0

## 7. 对旋度求散度

$$
\begin{aligned}
\nabla \cdot \left(\nabla \times \vec f \right) & = \nabla ^{\rm T} \left(\nabla \times \vec f \right) \\
& = \left[ { \partial \over \partial x},{ \partial \over \partial y}, { \partial \over \partial z} \right]
\begin{bmatrix}
{\partial f_z \over \partial y} - {\partial f_y \over \partial z} \\
{\partial f_x \over \partial z} - {\partial f_z \over \partial x} \\
{\partial f_y \over \partial x} - {\partial f_x \over \partial y} 
\end{bmatrix} \\
& = {\partial^2 f_z \over \partial y \partial x} 
- {\partial^2 f_y \over \partial z \partial x} 
+ {\partial^2 f_x \over \partial z \partial y}
- {\partial^2 f_z \over \partial x \partial y}
+ {\partial^2 f_y \over \partial x \partial z}
- {\partial^2 f_x \over \partial y \partial z} \\
& = 0
\end{aligned}
$$

旋度的散度恒为 0

> [!note] 梯无旋，旋无散。

## 8. 方向导数

定义

$$
pp f bm l = lim_(phi -> 0) (f(x+Delta x, y+Delta y,z+Delta z)-f(x,y,z)) / rho
$$

其中，$\rho = \sqrt{(\Delta x)^{2} + (\Delta y)^{2} + (\Delta z)^{2} }$ 且 $P'(x+ \Delta x, y + \Delta y, z + \Delta z)$ 为 $\boldsymbol l$ 上的点

$f(x,y,z)$ 在 $P(x_{0},y_{0},z_{0})$ 可微，与方向 $\vec l$ 同方向的单位向量 $\vec{e_{l} } = \{\cos \alpha, \cos \beta, \cos \gamma\}$，则


$$
pp f bm l &= (ppfx, ppfy, ppfz) * vec e_l

&= f_x' * cos alpha + f_y' * cos beta + f_z' * cos gamma

&= grad f * vec e_l

&= |grad f| * |vec e_l| * cos theta

&= sqrt((ppfx)^2+(ppfy)^2+(ppfz)^2) * cos theta

&<= sqrt((ppfx)^2+(ppfy)^2+(ppfz)^2)
$$
