---
title: 泰勒公式
layout: ~/layouts/MainLayout.astro
---

## 泰勒公式

$$
f(x) = f(x_{0}) + f'(x_{0})(x-x_{0}) + {f''(x_{0}) \over 2!}(x-x_{0})^{2} + \cdots
+ {f^{(n)}(x_{0}) \over n!} (x-x_{0})^{n} + R_{n}(x)
$$

余项（即误差）

$$
R_{n} = {f^{(n+1)}(\xi) \over (n+1)!}(x-x_{0})^{n+1}
$$

$\xi$ 介于 $x_0$ 和 $x$ 之间。

## 麦克劳林公式

是泰勒公式的一种特殊情况，即 $x_{0}=0$

$$
f(x) = f(0) + f'(0)x + {f''(0) \over 2!}x^{2} + \cdots
+ {f^{(n)}(0) \over n!} x^{n} + R_{n}(x)
$$

误差 $|R_{n}(x)|$ 是当 $x \to 0$ 时比 $x^n$ 高阶的无穷小。

### 皮亚诺余项

$$
R_{n}(x) = o(x^{n})
$$

### 拉格朗日余项

$$
R_{n} = {f^{(n+1)}(\theta x) \over (n+1)!} x^{n+1}
$$

$f^{(n+1)}$ 是 $f$ 的 $n+1$ 阶导数，$\theta \in (0,1)$

## 常见初等函数带皮亚诺余项的麦克劳林公式

$$
\begin{aligned}
e^{x} & = 1 + x + {1 \over 2!} x^{2} + {1 \over 3!} x^{3} + \cdots + {1 \over n!} x^{n} + o(x^{n}) \\
\cos x & = 1 - {1 \over 2!} x^{2} + {1 \over 4!} x^{4} - \cdots + {(-1)^{n} \over (2n)!}x^{2n} + o(x^{2n}) \\
\sin x & = x - {1 \over 3!} x^{3} + {1 \over 5!} x^{5} - \cdots + {(-1)^{n-1} \over (2n-1)!}x^{2n-1} + o(x^{2n-1}) \\
\ln(1+x) & = x - {1\over 2} x^{2} + {1 \over 3} x^{3} - \cdots + {(-1)^{n-1} \over n} x^{n} + o(x^{n}) \\
(1+x)^{\alpha} & = 1 + \alpha x + {\alpha (\alpha - 1) \over 2!} x^{2} + \cdots + {\alpha (\alpha - 1) \cdots (\alpha -n + 1) \over n!} x^{n} + o(x^{n}) \\
\tan x & = x + {1 \over 3} x^{3} + {2 \over 15} x^{5}+ \cdots, x \in \left( -{\pi \over 2}, {\pi \over 2} \right)
\end{aligned}
$$

## 中值定理

### 罗尔定理

$f(x)$ 在 $[a,b]$ 连续，在 $(a,b)$ 可导，$f(a)=f(b)$，则 $\exists \xi \in (a,b)$，使得 $f'(\xi) = 0$

### 拉格朗日中值定理

$f(x)$ 在 $[a,b]$ 连续，在 $(a,b)$ 可导，则 $\exists \xi \in (a,b)$，使得

$$
{f(b) - f(a) \over b - a} = f'(\xi)
$$

也可写作

$$
f(b)-f(a) = f'(\xi) (b-a)
$$

### 柯西中值定理

$f(x),g(x)$ 在 $[a,b]$ 连续，在 $(a,b)$ 可导，对任意 $x \in (a,b)$，$g(x) \ne 0$，则至少存在一点 $\xi \in (a,b)$，使得

$$
{f(b) - f(a) \over g(b) - g(a)} = {f'(\xi) \over g'(\xi)}
$$

### 积分中值定理

$f(x)$ 在 $[a,b]$ 上连续，则至少存在一点 $\xi \in [a,b]$，使得

$$
\int _a^b f(x) \mathrm{d} x = f(\xi) (b-a)
$$

