---
title: 构造辅助函数的方法
---

## 一般地

看到 $f'(\xi) + f(\xi)g(\xi)$，应该想到 $f(x)e^{\int g(x) \mathrm{d}x}$，因为

$$
\left[f(x)e^{\int g(x) \mathrm{d}x}\right]'=[\underline{f'(x)+f(x)g(x)}]e^{\int g(x) \mathrm{d}x}
$$

## 具体地

1. 看到 $mf(\xi)+n f'(\xi)$，应该想到 $f(x)e^{ {m\over n}x}$，因为

$$
\left[ f(x)e^{ {m \over n}x} \right]'=\left[ f'(x)+{m \over n}f(x) \right]e^{ {m \over n}x} = {1 \over n} [\underline{m f(x) + n f'(x)}]e^{ {m \over n}x }
$$

2. 看到 $mf(\xi)+n f'(\xi)$，应该想到 $x^{m} f^{n} (x)$，因为

$$
[x^{m}f^{n}(x)]'=[\underline{mf(x)+nxf'(x)}]x^{m-1}f^{n-1} (x)
$$

3. 看到 $mf(\xi)-n\xi f'(\xi)$，应该想到 $\displaystyle {f^{n}(x)\over x^{m} }$ 或 $\displaystyle {x^{m} \over f^{n} (x)}$，因为

$$
\left[ {f^{n}(x) \over x^{m} } \right]' = {f^{n-1}(x) \over x^{m+1}} [\underline{nxf'(x)-mf(x)}]
$$

$$
\left[{ x^{m} \over f^{n} (x) }\right]' = {x ^ {m-1} \over f^{n+1} (x)}[\underline{mf(x)-nxf'(x)}]
$$

4. 看到 $nf'(\xi)f(1-\xi)-mf(\xi)f'(1-\xi)$，应该想到 $f^{n}(x)f^{m}(1-x)$，因为

$$
\left [nf'(\xi)f(1-\xi)-mf(\xi)f'(1-\xi) \right]' = [\underline{ nf'(x)(1-x) - mf(x)f'(1-x) }]f^{n-1}(x)f^{m-1}(1-x)
$$

5. 看到 $mf'(x)g(x)+nf(x)g'(x)$，应该想到 $f^{m}(x)g^{n}(x)$，因为

$$
\left[f^{m}(x)g^{n}(x)\right]' = [\underline{mf'(x)g(x)+nf(x)g'(x)}]f^{m-1}(x)g^{n-1}(x)
$$

6. 看到 $mf'(x)g(x)-nf(x)g'(x)$，应该想到 $\displaystyle {f^{m}(x) \over g^{n}(x)}$，因为

$$
\left[ {f^{m}(x) \over g^{n}(x)} \right]' = {f^{m-1}(x) \over g^{n+1}(x)} [\underline{ mf'(x)g(x)-nf(x)g'(x) }]
$$

7. 看到 $f(\xi)g''(\xi)-g(\xi)f''(\xi)$，应该想到 $f'(x)g(x)-f(x)g'(x)$，因为

$$
[f'(x)g(x)-f(x)g'(x)]' = \underline{ f(x)g''(x)-g(x)f''(x) }
$$


## 伽马函数

$$
\displaystyle \Gamma{\left( r\right)}=\int_{0}^{+\infty} x^{r- 1}\text{e}^{- x}\text{d} x, r> 0
$$

特别的

$$
\displaystyle \Gamma{\left(\frac{1}{2}\right)}=\sqrt{\pi}
$$

递归性质有

$$
\displaystyle \Gamma{\left( x+ 1\right)}= x\Gamma{\left( x\right)}
$$

它是阶乘的一个延拓

$$
\displaystyle \Gamma{\left( n+ 1\right)}={n!}
$$

如果令 $\displaystyle \sqrt{x}= t$，则

$$
\begin{aligned}\displaystyle \Gamma{\left( r\right)}&=\int_{0}^{+\infty} t^{2 r- 2}\text{e}^{- t^{2} }\text{d}{\left( t^{2}\right)} \\ \displaystyle &= 2\int_{0}^{+\infty} t^{2 r- 1}\text{e}^{- t^{2} }\text{d} t\end{aligned}
$$

特别的

$$
\begin{aligned}\displaystyle \Gamma{\left( 1\right)}&= 2\int_{0}^{+\infty} t\text{e}^{- t^{2} }\text{d} t= 1 \\ \displaystyle \Gamma{\left( 2\right)}&= 2\int_{0}^{+\infty} t^{3}\text{e}^{- t^{2} }\text{d} t= 1\end{aligned}
$$

