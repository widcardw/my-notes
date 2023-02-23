---
title: 例题
layout: ~/layouts/MainLayout.astro
---

## 概率论

### 证明独立

$\displaystyle  X_{1}, X_{2}$ 相互独立，均服从标准正态分布，证明 $\displaystyle {\left( X_{1}+ X_{2}\right)}^{2}$ 和 $\displaystyle {\left( X_{1}- X_{2}\right)}^{2}$ 独立

由于样本均值和样本方差相互独立，有

$$
\begin{aligned}\displaystyle \overline{X}&=\frac{1}{n}\sum_{i= 0}^{n} X_{i}=\frac{1}{2}{\left( X_{1}+ X_{2}\right)} \\ \displaystyle  S^{2}&=\frac{1}{n- 1}\sum_{i= 0}^{n}{\left( X_{i}-\overline{X}\right)}^{2}={\left( X_{1}-\overline{X}\right)}^{2}+{\left( X_{2}-\overline{X}\right)}^{2} \\ \displaystyle &=\frac{1}{2}{\left( X_{1}- X_{2}\right)}^{2}\end{aligned}
$$

由于 $\displaystyle \overline{X}$ 和 $\displaystyle  S^{2}$ 独立，即 $\displaystyle {\left( X_{1}+ X_{2}\right)}$ 和 $\displaystyle {\left( X_{1}- X_{2}\right)}^{2}$，进一步得到 $\displaystyle {\left( X_{1}+ X_{2}\right)}^{2}$ 和 $\displaystyle {\left( X_{1}- X_{2}\right)}^{2}$ 独立

### 卡方 2 和参数为 1/2 的指数分布是同分布

设 $\displaystyle  X, Y$ 均服从标准正态分布，相互独立，有

$$
\begin{aligned}\displaystyle {f}_{X}{\left( x\right)}&=\frac{1}{\sqrt{2\pi} }\text{e}^{-\frac{x^{2} }{2} } \\ \displaystyle {f}_{Y}{\left( y\right)}&=\frac{1}{\sqrt{2\pi} }\text{e}^{-\frac{y^{2} }{2} } \\ \displaystyle  f{\left( x, y\right)}&=\frac{1}{2\pi}\text{e}^{-\frac{x^{2}+ y^{2} }{2} }\end{aligned}
$$

令

$$
\displaystyle  Z= X^{2}+ Y^{2}
$$

对于 $\displaystyle  z< 0$，有

$$
\displaystyle  P{\left( Z< z\right)}= 0
$$

对于 $\displaystyle  z\ge 0$，有

$$
\begin{aligned}\displaystyle  P{\left( Z\le z\right)}&= P{\left( X^{2}+ Y^{2}\le z\right)} \\ \displaystyle &=\underset{x^{2}+ y^{2}\le z}{\iint}\frac{1}{2\pi}\text{e}^{-\frac{x^{2}+ y^{2} }{2} }{\left.\text{d} x\right.}{\left.\text{d} y\right.} \\ \displaystyle &=\int_{0}^{2\pi}\text{d}\theta\int_{0}^{\sqrt{z} }\frac{1}{2\pi}\text{e}^{-\frac{r^{2} }{2} } r\text{d} r \\ \displaystyle &=\int_{0}^{\sqrt{z} }\text{e}^{-\frac{r^{2} }{2} }\text{d}{\left(\frac{r^{2} }{2}\right)} \\ \displaystyle &= 1-\text{e}^{-\frac{z}{2} }\end{aligned}
$$

故

$$
\displaystyle  F_{Z}{\left( z\right)}={\left\lbrace\begin{matrix*}[l] 1-\text{e}^{-\frac{z}{2} }&\quad\text{if}\quad z\ge 0\\ 0&\quad\text{otherwise}\quad\\\end{matrix*}\right.}
$$

同时，有

$$
\displaystyle {f}_{Z}{\left( z\right)}={\left\lbrace\begin{matrix*}[l]\frac{1}{2}\text{e}^{-\frac{z}{2} }& z\ge 0\\ 0&\text{otherwise}\quad\\\end{matrix*}\right.}
$$

因此，$\displaystyle \chi^{2}{\left( 2\right)}$ 和参数为 $\displaystyle \frac{1}{2}$ 的指数分布同分布。

## 最大值和最小值的等价转换

$$
\begin{aligned}\displaystyle \max{\left\lbrace X_{1}, X_{2}\right\rbrace}&=\frac{X_{1}+ X_{2}+{\left| X_{1}- X_{2}\right|} }{2} \\ \displaystyle \min{\left\lbrace X_{1}, X_{2}\right\rbrace}&=\frac{X_{1}+ X_{2}-{\left| X_{1}- X_{2}\right|} }{2}\end{aligned}
$$

令 $\displaystyle  X=\max{\left\lbrace X_{1}, X_{2}\right\rbrace}, Y=\min{\left\lbrace X_{1}, X_{2}\right\rbrace}$，有

$$
\begin{aligned}\displaystyle  X+ Y&= X_{1}+ X_{2} \\ \displaystyle  X- Y&={\left| X_{1}- X_{2}\right|}\end{aligned}
$$
