# 傅里叶级数

## 1. 傅里叶系数与傅里叶级数

设函数 $f(x)$ 是周期为 $2\pi$ 的周期函数，且在 $[-\pi,\pi]$ 上可积，则称

$$
\begin{aligned}
a_{n} & = {1 \over \pi} \int_{-\pi}^{\pi} f(x) \cos nx \mathrm{d} x & n=0,1,2,\cdots \\
b_{n} & = {1 \over \pi} \int_{-\pi}^{\pi} f(x) \sin nx \mathrm{d} x & n=1,2,3,\cdots
\end{aligned}
$$

为 $f(x)$ 的傅里叶系数；称

$$
{a_{0} \over 2} + \sum\limits_{n=1}^{\infty}(a_{n} \cos nx + b_{n} \sin nx)
$$

为 $f(x)$ 以  $2\pi$ 为周期的形式傅里叶级数，记作

$$
f(x) \sim {a_{0} \over 2} + \sum\limits_{n=1}^{\infty}(a_{n} \cos nx + b_{n} \sin nx)
$$

## 2. 傅里叶级数的收敛性（狄利克雷收敛定理）

设 $f(x)$ 是周期为 $2\pi$ 的可积函数，且满足

1. $f(x)$ 在 $[-\pi,\pi]$ 上连续或只有有限个第一类间断点
2. $f(x)$ 在 $[-\pi, \pi]$ 上只有有限个单调区间

则 $f(x)$ 的以 $2\pi$ 为周期的傅里叶级数收敛，且

$$
S(x) = {a_{0} \over 2} + \sum\limits_{n=1}^{\infty}(a_{n} \cos nx + b_{n} \sin nx) = {1 \over 2} \left(f(x^{+}) + f(x^-)\right)
$$

## 3. 周期为 $2\pi$ 的函数的展开

### 3.1. $[-\pi, \pi]$ 上展开

$$
\begin{aligned}
a_{n} & = {1 \over \pi} \int_{-\pi}^{\pi}f(x) \cos nx \mathrm{d} x & n=0,1,2,\cdots \\
b_{n} & = {1 \over \pi} \int_{-\pi}^{\pi}f(x) \sin nx \mathrm{d} x & n=1,2,3,\cdots
\end{aligned}
$$

### 3.2. $[-\pi, \pi]$ 上奇偶函数的展开

#### $f(x)$ 为奇函数

$$
\begin{aligned}
a_{n}&=0 &n=0,1,2,\cdots \\
b_{n}&={2 \over \pi} \int_{0}^{\pi}f(x) \sin nx \mathrm{d} x &n=1,2,3,\cdots
\end{aligned}
$$

#### $f(x)$ 为偶函数

$$
\begin{aligned}
a_{n}&= {2 \over \pi} \int_{0}^{\pi}f(x) \cos nx \mathrm{d} x &n=0,1,2,\cdots \\
b_{n}&= 0 &n=1,2,3,\cdots
\end{aligned}
$$

#### 在 $[0,\pi]$ 上展为正弦或展为余弦

##### 展为正弦

$$
\begin{aligned}
a_{n}&=0 &n=0,1,2,\cdots \\
b_{n}&={2 \over \pi} \int_{0}^{\pi}f(x) \sin nx \mathrm{d} x &n=1,2,3,\cdots
\end{aligned}
$$


##### 展为余弦

$$
\begin{aligned}
a_{n}&= {2 \over \pi} \int_{0}^{\pi}f(x) \cos nx \mathrm{d} x &n=0,1,2,\cdots \\
b_{n}&= 0 &n=1,2,3,\cdots
\end{aligned}
$$

## 4. 周期为 $2l$ 的函数的展开

### 4.1. $[-l,l]$ 上展开

$$
\begin{aligned}
a_{n}&= {1 \over l} \int_{-l}^{l}f(x)\cos {n \pi x \over l} \mathrm{d} x & n=0,1,2,\cdots \\
b_{n}&= {1 \over l} \int_{-l}^{l}f(x)\sin {n \pi x \over l} \mathrm{d} x & n=0,1,2,\cdots
\end{aligned}
$$

### 4.2. $[-l,l]$ 上奇偶函数的展开

#### $f(x)$ 为奇函数

$$
\begin{aligned}
a_{n} &= 0 & n=0,1,2,\cdots \\
b_{n} &= {2 \over l} \int_{0}^{l} f(x) \sin {n \pi x \over l} \mathrm{d} x & n=1,2,3,\cdots
\end{aligned}
$$

#### $f(x)$ 为偶函数


$$
\begin{aligned}
a_{n} &= {2 \over l} \int_{0}^{l} f(x) \cos {n \pi x \over l} \mathrm{d} x & n=0,1,2,\cdots \\
b_{n} &= 0 & n=1,2,3,\cdots
\end{aligned}
$$

### 4.3. 在 $[0,l]$ 上展为正弦或展为余弦

#### 展为正弦

$$
\begin{aligned}
a_{n} &= 0 & n=0,1,2,\cdots \\
b_{n} &= {2 \over l} \int_{0}^{l} f(x) \sin {n \pi x \over l} \mathrm{d} x & n=1,2,3,\cdots
\end{aligned}
$$

#### 展为余弦

$$
\begin{aligned}
a_{n} &= {2 \over l} \int_{0}^{l} f(x) \cos {n \pi x \over l} \mathrm{d} x & n=0,1,2,\cdots \\
b_{n} &= 0 & n=1,2,3,\cdots
\end{aligned}
$$


