---
title: 概率论-参数估计
layout: ~/layouts/MainLayout.astro
---

## 参数估计

### 点估计

用样本 $X_{1},X_{2},\cdots, X_{n}$ 构造的统计量 $\hat \theta (X_{1},X_{2},\cdots, X_{n})$ 来估计未知参数 $\theta$ 称为点估计，统计量 $\hat \theta (X_{1},X_{2},\cdots, X_{n})$ 称为估计量

设 $\hat\theta$ 是 $\theta$ 的估计量，如果 $E(\hat\theta)=\theta$，则称 $\hat\theta= \hat \theta (X_{1},X_{2},\cdots, X_{n})$ 是未知参数 $\theta$ 的无偏估计量

设 $\hat\theta_{1}$ 和 $\hat\theta_{2}$ 都是 $\theta$ 的无偏估计量，且 $D(\hat\theta_{1}) \leqslant D(\hat\theta_{2})$，则称 $\hat\theta_{1}$ 比 $\hat\theta_{2}$ 更有效

设 $\hat\theta(X_{1},X_{2},\cdots,X_{n})$ 是 $\theta$ 的估计，如果 $\hat\theta$ 依概率收敛于 $\theta$，则称 $\hat\theta(X_{1},X_{2},\cdots,X_{n})$ 是 $\theta$ 的一致估计量

与切比雪夫不等式相关的表示形式：对任意 $\displaystyle \varepsilon> 0$

$$
\displaystyle \lim_{n\to\infty} P{\left\lbrace{\left|\hat{\theta}-\theta\right|}\geqslant\varepsilon\right\rbrace}= 0
$$

一致估计的一个等价条件（可以作为证明方法）

$$
\displaystyle {\left\lbrace\begin{matrix*}[l] E\hat{\theta}=\theta\\ D\hat{\theta}= 0\\\end{matrix*}\right.}
$$

### 估计量的求法和区间估计

#### 矩估计法

设总体 $X$ 的分布含有未知参数 $\theta_{1},\theta_{2},\cdots, \theta_{k}$，$\alpha_{l}=E(X^{l})$ 存在，显然它是 $\theta_{1},\theta_{2},\cdots, \theta_{k}$ 的函数，记作 $\alpha_{l}(\theta_{1},\theta_{2},\cdots, \theta_{k}),l=1,2,\cdots,k$，样本的 $l$ 阶原点矩为 

$$
A={1 \over n} \sum\limits_{i=1}^{n}X_{i}^{l}
$$

令 $\alpha_{l}(\theta_{1},\theta_{2},\cdots, \theta_{k})=A_{l},l=1,2,\cdots,k$，从这 $k$ 个方程组中，可以解得 $\theta_{1},\theta_{2},\cdots, \theta_{k}$



#### 最大似然估计法

对于离散型总体 $X$，其概率分布为 $P\{ X=a_{i} \}=p(a_{i},\theta),i=1,2,\cdots$，称函数

$$
L(\theta)=L(x_{1},x_{2},\cdots, x_{n};\theta)= \prod_{i=1}^{n}p(x_{i};\theta)
$$

为参数 $\theta$ 的似然函数

对于连续型总体 $X$，概率密度为 $f(x;\theta)$，则称函数

$$
L(\theta)=L(x_{1},x_{2},\cdots, x_{n};\theta)= \prod_{i=1}^{n}f(x_{i};\theta)
$$

为参数 $\theta$ 的似然函数

对于给定样本值 $(x_{1},x_{2},\cdots,x_n)$，使似然函数 $L$ 达到最大值的参数值 $\hat\theta=\hat\theta(x_{1},x_{2},\cdots,x_n)$ 称为参数 $\theta$ 的最大似然估计值，对应的使似然函数 $L(X_{1},X_{2},\cdots, X_{n};\theta)$ 达到最大值的参数值 $\hat\theta=\hat\theta(X_{1},X_{2},\cdots, X_{n})$ 称为 $\theta$ 的最大似然估计量

通常可以通过

$$
{\partial L(\theta) \over \partial \theta} \text{ or } {\partial \ln F(\theta) \over \partial \theta}
$$

求解得到 $\hat\theta$，有时不一定是驻点，这时不能用这个方程求解。

> [!example] $X \sim N(\mu, \sigma^{2})$，从总体中取样本 $X_{1},X_{2},\cdots, X_{n}$，求 (1) $\mu,\sigma^{2}$ 的矩估计 (2) 极大似然估计
> 
> (1) 计算一阶和二阶矩
> $$
> \begin{aligned}
> E(X) & = \mu \\
> E(X^{2}) & = D(X) + (EX)^{2} = \sigma^{2}+\mu^{2}\\
> \end{aligned}
> $$
> 
> $$
> \begin{cases}
> \mu = \overline{X}  \\
> \sigma^{2}+\mu^{2}=\displaystyle {1 \over n} \sum\limits_{i=1}^{n}X_{i}^{2}
> \end{cases}
> $$
> 
> 得到
> 
> $$
> \begin{aligned}
> \hat\mu & = \overline{X} \\
> \hat {\sigma^{2} } &= {1 \over n} \sum\limits_{i=1}^{n} X_{i}^{2}-\overline{X} ^ {2} = {1 \over n} \left( \sum\limits_{i=1}^{n}X_{i}^{2}-n\overline{X}^{2} \right) \\
> &= {1 \over n}\sum\limits_{i=1}^{n}(X_{i}-\overline{X})^{2}
> \end{aligned}
> $$
> 
> 
> (2) $X$ 的概率密度分布
> 
> $$
> f(x) = {1 \over \sqrt {2\pi} \sigma } e^{-{ (x-\mu)^{2} \over 2 \sigma^2}  }
> $$
> 
> $$
> \begin{aligned}
> L(\mu, \sigma^{2}) & = \left( {1 \over \sqrt{2\pi} \sigma }  \right)^{2} \exp \left\{ 
>  -{1 \over 2 \sigma^{2} }  \sum\limits_{i=1}^{n} (X_{i}-\mu)^{2}  \right\}  \\
> \ln L(\mu, \sigma^{2}) & = -{n\over 2} \ln(2 \pi)-{n\over 2} \ln(\sigma^{2}) - {1 \over 2 \sigma^{2} } \sum\limits_{i=1}^{n}(X_{i}-\mu)^{2} \\
> \end{aligned}
> $$
> 
> $$
> \begin{cases}
> \displaystyle{\partial \ln L \over \partial \mu } = {1 \over \sigma^{2} } \sum\limits_{i=1}^{n} (X_{i}-\mu)=0 \\
> \displaystyle{\partial \ln L \over \partial \sigma^{2} } = - {n \over 2 }{1 \over \sigma^{2} } + {1 \over 2 (\sigma^{2} ) ^ {2} } \sum\limits_{i=1}^{n}(X_{i}-\mu)^{2}=0
> \end{cases}
> $$
> 
> 解得
> 
> $$
> 
> \begin{cases}
> \hat\mu =\overline{X}  \\
> \hat{\sigma^{2} } = \displaystyle{1 \over n} \sum\limits_{i=1}^{n}(X_{i}-\overline{X})^{2}
> \end{cases}
> 
> $$

#### 一致估计量

设 $\displaystyle \hat{\theta}$ 是 $\displaystyle \theta$ 的估计量，若对 $\displaystyle \forall\varepsilon> 0$，有 $\displaystyle \lim_{n\to\infty} P{\left({\left|\hat{\theta}-\theta\right|}<\varepsilon\right)}= 1$，或 $\displaystyle \lim_{n\to\infty} P{\left({\left|\hat{\theta}-\theta\right|}\ge\varepsilon\right)}= 0$，则 $\displaystyle \hat{\theta}$ 是 $\displaystyle \theta$ 的一致估计量。

证明方法

$$
\displaystyle {\left\lbrace\begin{matrix*}[l]\underset{n\to\infty}{\lim} E\hat{\theta}=\theta\\\underset{n\to\infty}{\lim} D\hat{\theta}= 0\\\end{matrix*}\right.}
$$

#### 区间估计

##### 置信区间

设 $\theta$ 是总体 $X$ 的未知参数，$X_{1},X_{2},\cdots,X_{n}$ 是来自总体 $X$ 的样本，对于给定的 $\alpha(0<\alpha<1)$，如果两个统计量 $\theta_{1},\theta_{2}$ 满足

$$
P(\theta_{1}< \theta < \theta_{2}) = 1-\alpha
$$

则称随机区间 $(\theta_{1},\theta_{2})$ 为参数 $\theta$ 的置信水平为 $1-\alpha$ 的置信区间。

##### 一个正态总体参数的区间估计

设总体 $X \sim N(\mu, \sigma^{2})$，$X_{i}$ 是来自 $X$ 的样本，$\overline{X}$ 是样本均值，$S^2$ 为样本方差

|  未知参数  |      条件       |                                                          $1-\alpha$ 置信区间                                                           |
|:----------:|:---------------:|:--------------------------------------------------------------------------------------------------------------------------------------:|
|   $\mu$    | $\sigma^2$ 已知 |      $\displaystyle\left(\overline{X}-u_{\alpha/2}{\sigma\over\sqrt{n} },\overline{X}+u_{\alpha/2}{\sigma\over\sqrt{n} }\right)$       |
|   $\mu$    | $\sigma^2$ 未知 | $\displaystyle\left( \overline{X} - t_{\alpha/2}(n-1){S \over \sqrt{n} } , \overline{X}+t_{\alpha/2}(n-1){S \over \sqrt{n} }  \right)$ |
| $\sigma^2$ |                 | $\displaystyle \left( {(n-1) S^{2} \over \chi _{\alpha/2}^{2}(n-1) },{(n-1) S^{2} \over \chi _{1-\alpha/2}^{2}(n-1) }  \right)$                                                                                                                                       |

##### 两个正态总体参数的区间估计

$X\sim N(\mu_{1},\sigma_{1}^{2}),Y\sim N(\mu_{2},\sigma_{2}^{2})$

$$
S_{w}=\sqrt {(n_{1}-1)S_{1}^{2} + (n_{2}-1)S_{2}^{2} \over n_{1}+n_{2}-2}
$$

|             未知参数              |                        条件                         |                                                                                                                            $1-\alpha$ 置信区间                                                                                                                             |
|:---------------------------------:|:---------------------------------------------------:|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------:|
|         $\mu_{1}-\mu_{2}$         |        $\sigma_{1}^{2},\sigma_{2}^{2}$ 已知         |    $\displaystyle\left( \overline{X} - \overline{Y} -u_{\alpha/2} \sqrt{ {\sigma_{1}^{2} \over n_{1} } +  {\sigma_{2}^{2} \over n_{1} }  } ,\overline{X} - \overline{Y} +u_{\alpha/2} \sqrt{ {\sigma_{1}^{2} \over n_{1} } +  {\sigma_{2}^{2} \over n_{1} }  } \right)$    |
|         $\mu_{1}-\mu_{2}$         | $\sigma^{2}$ 未知但 $\sigma_{1}^{2}=\sigma_{2}^{2}$ | $\begin{aligned}\left(\overline{X} - \overline{Y}-t_{\alpha/2} (n_{1}+n_{2}-2)S_{w}\sqrt{ {1\over n_{1} } +{1\over n_{2} } } ,\right.\\ \left.\overline{X} - \overline{Y}+t_{\alpha/2} (n_{1}+n_{2}-2)S_{w}\sqrt{ {1\over n_{1} } +{1\over n_{2} } } \right)\end{aligned}$ |
| $\sigma_{1}^{2} / \sigma_{2}^{2}$ |                                                     |                                                                 $\left( {S_{1}^{2}\over S_{2}^{2} } F_{1-\alpha/2} (n_{1}-1,n_{2}-1), {S_{1}^{2}\over S_{2}^{2} } F_{\alpha/2} (n_{1}-1,n_{2}-1)  \right)$                                                                 |


## 假设检验

假设分为原假设和备择假设

> [!tip] 显著性检验
> - 根据问题提出原假设 $H_{0}$
> - 给出显著性水平 $\alpha(0<\alpha<1)$
> - 确定检验统计量及拒绝域形式
> - 按犯第一类错误的概率等于 $\alpha$ 求出拒绝域 $W$
> - 根据样本值计算检验统计量 $T$ 的观测值 $t$，当 $t \in W$ 时，拒绝原假设；否则，接受原假设

|            | $H_0$ 正确 | $H_0$ 错误 |
|:----------:|:----------:|:----------:|
| 拒绝 $H_0$ | 第一类错误 |    正确    |
| 接受 $H_0$ |    正确    | 第二类错误 |

#### 检验 $\mu$

##### $\sigma^{2}$ 已知，$H_{0}:\mu=\mu_{0}$

$$
U={\overline{X} -\mu_{0} \over \sigma/ \sqrt{n} }
$$

$H_0$ 为真时检验统计量的分布 $N(0,1)$

##### $\sigma^{2}$ 未知，$H_{0}:\mu=\mu_{0}$

$$
T={\overline{X}-\mu_{0}\over S/ \sqrt n }
$$

$H_0$ 为真时检验统计量的分布 $N(0,1)$


#### 检验 $\sigma^{2}$

##### $\mu$ 已知，$H_{0}:\sigma^2=\sigma_0^2$

$$
\chi^{2} = {\sum\limits_{i=1}^{n}(X_{i}-\mu)^{2} \over \sigma_{0}^{2} }
$$

$H_0$ 为真时检验统计量的分布 $\chi^2(n)$

##### $\mu$ 未知，$H_0:\sigma^2=\sigma_0^2$

$$
\chi^{2}={(n-1)S^{2} \over \sigma_{0}^{2} }
$$

$H_0$ 为真时检验统计量的分布 $\chi^2(n-1)$

#### 检验 $\mu_1-\mu_2$

##### $\sigma_1^2,\sigma_2^2$ 已知，$H_{0}:\mu_1-\mu_2=\mu_0$

$$
U={\overline{X} -\overline{Y} - \mu_{0} \over \sqrt{ {\sigma_{1}^{2} \over n_{1} } + {\sigma_{2}^{2} \over n_{2} } }  }
$$

$H_0$ 为真时检验统计量的分布 $N(0,1)$

##### $\sigma_{1}^{2},\sigma_{2}^{2}$ 未知，但 $\sigma_{1}^{2}=\sigma_{2}^{2}$，$H_{0}:\mu_{1}-\mu_{2}=\mu_{0}$

$$
T={ \overline{X} -\overline{Y} -\mu_{0} \over S_{w}\sqrt{ {1 \over n_{1} } + {1 \over n_{2} } }  }, S_{w}=\sqrt {(n_{1}-1)S_{1}^{2} + (n_{2}-1)S_{2}^{2} \over n_{1}+n_{2}-2}
$$

$H_0$ 为真时检验统计量的分布 $t(n_{1}+ n_{2}-2)$

#### 检验 $\sigma_{1}^{2}-\sigma_{2}^{2}$

##### $\mu_{1},\mu_{2}$ 已知，$H_{0}:\sigma_{1}^{2}=\sigma_{2}^{2}$

$$
F = {\sum\limits_{i=1}^{n_{1} } (X_{i}-\mu_{1})^{2} \over n_{1} }  /{\sum\limits_{j=1}^{n_{2} } (X_{j}-\mu_{2})^{2} \over n_{2} }  
$$

$H_0$ 为真时检验统计量的分布 $F(n_{1},n_{2})$

##### $\sigma_{1}^{2},\sigma_{2}^{2}$ 未知，$H_{0}:\sigma_{1}^{2}=\sigma_{2}^{2}$

$$
F={S_{1}^{2}\over S_{2}^{2} }
$$

$H_0$ 为真时检验统计量的分布 $F(n_{1}-1,n_{2}-1)$


