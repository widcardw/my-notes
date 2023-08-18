---
title: 概率论-数理统计
layout: ~/layouts/MainLayout.astro
---

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

> [!note] 证明
>
> $$
> \begin{aligned}
> E \sum_{i=1}^n \left(X_i - \overline{X} \right)^2
> & = \sum_{i=1}^n \left( EX_i^2 - 2EX_i \overline{X} + E \overline{X}^2 \right) \\
> & = \sum_{i=1}^n EX_i^2 - 2 \overline{X} \sum_{i=1}^n EX_i + nE \overline{X}^2 \\
> & = \sum_{i=1}^n EX_i^2 - 2 \overline{X} \cdot n E \overline{X} + nE \overline{X}^2 \\
> & = \sum_{i=1}^n EX_i^2 - nE \overline{X}^2
> \end{aligned}
> $$


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


