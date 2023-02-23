---
title: Linear Algebra Done Outrageously Wrong
layout: ~/layouts/MainLayout.astro
---

## 向量

### 向量的秩 矩阵的秩

#### 矩阵的秩

> [!note] 定义
> 在 $m\times n$ 的矩阵 $\mathbf{A}$ 中，任取 $k$ 行与 $k$ 列，位于这些行与列的交叉点上的 $k^2$ 个元素按其在原来矩阵 $\mathbf{A}$ 中的次序可构成一个 $k$ 阶行列式，称其为矩阵 $\mathbf{A}$ 的一个 $k$ 阶子式

> [!note] 定义
> 设 $\mathbf{A}$ 是 $m\times n$ 矩阵，若 $\mathbf{A}$ 中存在 $r$ 阶子式不等于 0，$r$ 阶以上子式均等于 0，则称矩阵 $\mathbf{A}$ 的秩为 $r$，记为 $r(\mathbf{A})$，零矩阵的秩规定为 0.

若 $\mathbf{A}$ 是 $n$ 阶矩阵

- $r(\mathbf{A})=n \Leftrightarrow |\mathbf{A}| \ne 0$
- $r(\mathbf{A})<n \Leftrightarrow |\mathbf{A}| = 0$

若 $\mathbf{A}$ 是 $m \times n$ 矩阵，则 $r(\mathbf{A}) \leqslant \min(m, n)$

##### 公式

- $r(\mathbf{A}) = r(\mathbf{A}^{\mathrm{T} })$
- $r(\mathbf{A}^{\mathrm{T} }\mathbf{A})=r(\mathbf{A})$
- $k \ne 0, r(k \mathbf{A})=r(\mathbf{A})$
- $r(\mathbf{A} + \mathbf{B}) \leqslant r(\mathbf{A}) + r(\mathbf{B})$
- $r(\mathbf{AB}) \leqslant \min(r(\mathbf{A}),r(\mathbf{B}))$
- $\max(r(\mathbf{A}),r(\mathbf{B})) \leqslant r(\mathbf{A} + \mathbf{B}) \leqslant r(\mathbf{A}) + r(\mathbf{B})$
- $\mathbf{A}$ 可逆，则 $r(\mathbf{AB}) = r(\mathbf{B}), r(\mathbf{BA}) = r(\mathbf{B})$
- 若 $\mathbf{A}_{m \times n},\mathbf{B}_{n \times s}, \mathbf{AB}=\mathbf{O}$，则 $r(\mathbf{A} \mathbf{B}) \leqslant n$
- $\displaystyle {\mathbf{A} }_{n\times n},{\mathbf{B} }_{n\times n}$，$\displaystyle {\mathbf{A} }{\mathbf{B} }={\mathbf{O} }$，则 $\displaystyle  r{\left({\mathbf{A} }\right)}+ r{\left({\mathbf{B} }\right)}\leqslant n$

$$
r(A^{*})=
\begin{cases}
n, & r(A)=n \\
1, & r(A)=n-1 \\
0, & r(A)<n-1
\end{cases}
$$

### 正交规范化 正交矩阵

#### 内积

> [!note] 定义
> 设有 $n$ 维向量 $\vec{\alpha}=(a_{1},a_{2},\cdots, a_{n})^{\mathrm{T} }, \vec{\beta}=(b_{1},b_{2},\cdots, b_{n})^{\mathrm{T} }$，内积为
> 
> $$(\vec{\alpha},\vec{\beta})=\vec{\alpha} ^ {\mathrm{T} } \vec{\beta}=\sum\limits_{i=1}^{n} a_{i}b_{i}$$

- 正定性：$(\vec\alpha, \vec\alpha) \geqslant 0$，等号成立当且仅当 $\vec\alpha = \vec 0$
- 对称性
- 线性性

> [!note] 定义
> 两个向量 $\vec\alpha, \vec\beta$ 夹角的余弦
> 
> $$\cos (\widehat{\vec\alpha,\vec\beta})={(\vec\alpha,\vec\beta) \over |\vec\alpha| |\vec\beta|}$$
> 
> 当 $(\vec\alpha,\vec\beta)=0$ 时，$\vec\alpha,\vec\beta$ 正交

#### Schmidt 正交化

设向量组 $\vec\alpha_{1},\vec\alpha_{2},\vec\alpha_{3}$ 线性无关，则正交化方法

$$
\begin{aligned}
\vec\beta_{1} & = \vec\alpha_{1} \\
\vec\beta_{2} & = \vec\alpha_{2} - {(\vec\alpha_{2},\vec\beta_{1}) \over (\vec\beta_{1},\vec\beta_{1})}\vec\beta_{1} \\
\vec\beta_{3} & = \vec\alpha_{3} - {(\vec\alpha_{3},\vec\beta_{1}) \over (\vec\beta_{1},\vec\beta_{1})}\vec\beta_{1} - {(\vec\alpha_{3},\vec\beta_{2}) \over (\vec\beta_{2},\vec\beta_{2})}\vec\beta_{2}
\end{aligned}
$$

$\vec\beta_{1},\vec\beta_{2},\vec\beta_{3}$ 为正交向量组。将它们单位化，即可得到标准正交向量组 $\vec\eta_{1},\vec\eta_{2},\vec\eta_{3}$，有 

$$(\vec\eta_{i},\vec\eta_{j})=
\begin{cases}
0 & i \ne j \\
1 & i = j
\end{cases}
$$

#### 正交矩阵

> [!note] 设 $\mathbf{A}$ 为 $n$ 阶矩阵，若 $\mathbf{AA}^{\mathrm{T} }=\mathbf{A}^{\mathrm{T} }\mathbf{A}=\mathbf{E}$，则称 $\mathbf{A}$ 为正交矩阵
> $\mathbf{A}$ 是正交矩阵 $\Leftrightarrow \mathbf{A}^{\mathrm{T} }=\mathbf{A}^{-1}$

## 特征向量与特征值

### 相似矩阵

> [!note] 设 $\mathbf{A,B}$ 都是 $n$ 阶矩阵，若存在可逆矩阵 $\mathbf{P}$ 使得 $\mathbf{P}^{-1}\mathbf{A}\mathbf{P}=\mathbf{B}$ 则称 $\mathbf{A} \sim \mathbf{B}$
> 若 $\mathbf{A} \sim \mathbf{\Lambda}$，其中 $\mathbf{\Lambda}$ 是对角阵，则称 $\mathbf{A}$ 可以相似对角化，$\mathbf{\Lambda}$ 是 $\mathbf{A}$ 的相似标准形
> 
> $\mathbf{A} \sim \mathbf{B}$ 可以推出
> 
> - 特征多项式相同，即 $|\lambda \mathbf{E} - \mathbf{A}|=|\lambda \mathbf{E} - \mathbf{B}|$
> - $\mathbf{A},\mathbf{B}$ 有相同的特征值
> - $r(\mathbf{A})=r(\mathbf{B})$
> - $|\mathbf{A}|=|\mathbf{B}|=\displaystyle\prod_{i=1}^{n}\lambda _{i}$
> - $\displaystyle\sum\limits_{i=1}^{n} a_{ii}=\sum\limits_{i=1}^{n} b _{ii}=\sum\limits_{i=1}^{n}\lambda _{i}$
> - $\mathbf{A}^{n} \sim \mathbf{B}^{n},\mathbf{A}^{-1} \sim \mathbf{B}^{-1}$
> - $\mathbf{A} +k \mathbf{E} \sim \mathbf{B} +k \mathbf{E}$

$n$ 阶方阵可相似对角化的 ==充要条件== 是它有 $n$ 个线性无关的特征向量

> [!summary] 求可逆矩阵 $\mathbf{P}$ 使 $\mathbf{P}^{-1} \mathbf{A} \mathbf{P} = \mathbf{\Lambda}$ 解题步骤
> - 求出 $\mathbf{A}$ 的特征值 $\lambda_{i}$
> - 求出线性无关的特征向量 $\vec\alpha_{i}$
> - 构造矩阵 $\mathbf{P}=(\vec\alpha_{1},\vec\alpha_{2},\cdots, \vec\alpha_{n})$，则有 $\mathbf{P}^{-1} \mathbf{A} \mathbf{P} = \mathbf{\Lambda}=\mathrm{diag}(\lambda_{i},\lambda_2,\cdots,\lambda_{n})$
> 

### 实对称矩阵

- 必可相似对角化
- 属于不同特征值对应的特征向量相互正交
- 若 $\mathbf{A}$ 为 $n$ 阶实对称，则必存在正交阵 $\mathbf{Q}$，使得 $\mathbf{Q}^{-1} \mathbf{A} \mathbf{Q}=\mathbf{Q}^{\mathrm{T} }\mathbf{A}\mathbf{Q}=\mathbf{\Lambda}$

> [!summary] 实对称矩阵用正交矩阵相似对角化解题步骤
> - 求特征值
> - 求对应的特征向量
> - 改造特征向量
> 	- 特征值不同，特征向量已正交，只需单位化
> 	- 特征值有重根，先判断特征向量是否正交
> 		- 正交，则只需单位化
> 		- 不正交，则需要正交化处理
> - 把上述变换后的特征向量构成正交矩阵

## 二次型

### 二次型及其标准型

令 $a_{ij}=a_{ji},i<j$，则 $2a_{ij}x_{i}x_{j}=a_{ij}x_{i}x_{j}+a_{ji} x_{j}x_{i}$，可以把二次型写为矩阵形式

$$
\begin{aligned}
f(x_{1},x_{2},\cdots,x_{n})&=\sum\limits_{i=1}^{n}\sum\limits_{j=1}^{n}a_{ij}x_{i}x_{j} \\
&= [x_{1},x_{2},\cdots,x_{n}] 

\begin{bmatrix}
a_{11}  & a_{12}  & \cdots  & a_{1n} \\
a_{11}  & a_{22}  & \cdots  & a_{2n} \\
\vdots  & \vdots  & \ddots  & \vdots \\
a_{n1}  & a_{n2} & \cdots  & a_{nn}
\end{bmatrix}

\begin{bmatrix}
x_{1} \\
x_{2} \\
\vdots \\
x_{n}
\end{bmatrix} \\

&= \vec x^{\mathrm{T} } \mathbf{A} \vec x

\end{aligned}
$$

其中 $\mathbf{A}$ 为对称矩阵，称为二次型 $f$ 的对应矩阵

> [!note] 若二次型 $f(x_{1},x_{2}, \cdots, x_{n})$ 只有平方项，没有混合项，则称二次型为 **标准形**
> $$f(x_{1},x_{2}, \cdots, x_{n})=\vec x^{\mathrm{T} } \mathbf{A} \vec x=a_{1}x_{1}^{2}+a_{2}x_{2}^{2}+\cdots + a_{n}x_{n}^{2}$$

> [!note] 在二次型的标准形中，若平方项系数 $a_{i}$ 只是 $-1, 1, 0$，则称为二次型的 **规范型**
> $$f(x_{1},x_{2}, \cdots, x_{n})=\vec x^{\mathrm{T} } \mathbf{A} \vec x= x_{1}^{2}+x_{2}^{2}+\cdots + x_{p}^{2}-x_{p+1}^{2}-\cdots -x_{p+q}^2$$
> 
> - 正平方项个数 $p$ 称为正惯性指数
> - 负平方项个数 $q$ 称为负惯性指数

> [!note] **合同**
> 设 $\mathbf{A},\mathbf{B}$ 是两个 $n$ 阶方阵，若存在可逆阵 $\mathbf{C}$ 使得 $\mathbf{C}^{\mathrm{T} } \mathbf{A} \mathbf{C} = \mathbf{B}$，则称 $\mathbf{A} \simeq \mathbf{B}$
> 
> 充要条件：秩和正负惯性指数相同

对于三元二次型 $f(x_{1},x_{2},x_{3})=\vec x^{\mathrm{T} } \mathbf{A} \vec x$，如果

$$

\begin{cases}
x_{1}=c_{11}y_{1}+ c_{12}y_{2}+ c_{13}y_{3} \\
x_{2}=c_{21}y_{1}+c_{22}y_{2}+c_{32}y_{3} \\
x_{3}=c_{31}y_{1}+c_{32}y_{2}+c_{33}y_{3}
\end{cases}
$$

满足 $|\mathbf{C}|\ne 0$，则称上方程组是由 $\vec x$ 到 $\vec y$ 的坐标变换，即 $\vec x =\mathbf{C} \vec y$

> [!note] 对任意一个 $n$ 元二次型 $f=\vec x^{\mathrm{T} } \mathbf{A} \vec x$，必存在正交变换 $\vec x=\mathbf{Q}\vec y$，其中 $\mathbf{Q}$ 是正交阵，化二次型为标准型
> $$f(x_{1},x_{2},\cdots,x_{n})=\vec x^{\mathrm{T} } \mathbf{A} \vec x \xlongequal{\vec x = \mathbf{Q} \vec y}\vec y ^ {\mathrm{T} }\mathbf{Q}^ {\mathrm{T} } \mathbf{A} \mathbf{Q} \vec y = \lambda_{1}y_{1}^{2}+\lambda_{2}y_{2}^{2}+\cdots + \lambda_{n}y_{n}^{2}$$

> [!note] 用矩阵语言表述
> 对任意一个实对称阵 $\mathbf{A}$，必存在正交阵 $\mathbf{Q}$，使得
> 
> $$\mathbf{Q}^ {-1} \mathbf{A} \mathbf{Q}=\mathbf{Q}^ {\mathrm{T} } \mathbf{A} \mathbf{Q}=\mathbf{\Lambda}$$
> 
> $\mathbf{A}$ 必相似又合同于对角阵 $\mathbf{\Lambda}$

> [!summary] 等价、合同、相似的关系
> 从左到右，矩阵的关系越发亲密
> 
> ```mermaid
> graph LR
> a["等价<br>秩相等"] --> b["合同<br>秩和正负惯性指数相等"] 
> b --> c["相似<br>秩、正负惯性指数<br>和特征值均相等"]
> ```


### 正定二次型

> [!note] 正定
> 若对于任意的非零向量 $\vec x=(x_{1},x_{2},\cdots, x_{n})^\mathrm{T}$，恒有
> 
> $$
> f(x_{1},x_{2},\cdots, x_{n})=\vec x^{\mathrm{T} } \mathbf{A} \vec x>0
> $$
> 
> 则称二次型 $f$ 为正定二次型，对应矩阵称为正定矩阵

> [!success] $\displaystyle \forall{\mathbf{x}}\ne{\mathbf{0}},{f}> 0$

> [!note] 可逆线性变换不改变二次型的正定性

> [!tip] $f=\vec x^{\mathrm{T} } \mathbf{A} \vec x$ 正定的充要条件
> - $\mathbf{A}$ 的正惯性指数 $p=n$
> - $\mathbf{A} \simeq \mathbf{E}$，即存在可逆矩阵 $\mathbf{C}$，使得 $\mathbf{C}^{\mathrm{T} } \mathbf{A} \mathbf{C} = \mathbf{E}$
> - $\mathbf{A} = \mathbf{D}^{\mathrm{T} } \mathbf{D}$，其中 $\mathbf{D}$ 可逆
> - $\mathbf{A}$ 的全部特征值大于 0
> - $\mathbf{A}$ 的全部顺序主子式大于零

> [!caution] $f=\vec x^{\mathrm{T} } \mathbf{A} \vec x$ 正定的必要条件
> - $\mathbf{A}$ 的主对角线元素 $a_{ii}>0$
> - $|\mathbf{A}|>0$

