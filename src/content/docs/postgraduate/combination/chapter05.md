---
title: 第五章 二项式系数
---

## 5.1 帕斯卡三角形

帕斯卡恒等式

```am
n choose k = (n-1)choose k + (n-1)choose(k-1)
```

```am
n choose 0 + n choose 1 + ... + n choose n = 2^n
```

## 5.2 二项式定理

```am
(x+y)^n & = n choose 0 x^n + n choose 1 x^n-1 y + ... n choose n y^n

& = sum_(k = 0)^n n choose k x^(n-k) y^k
```

证明
```am
1 n choose 1 + 2 n choose 2 + ... + n n choose n = n 2^(n-1)
```

由于

```am
k n choose k = n (n-1) choose (k-1)
```

所以

```am
1 n choose 1 + ... + n n choose n = n (n-1) choose 0 + ... n (n-1) choose (n-1) = n 2^(n-1)
```

### 范德蒙卷积公式

```am
sum_(k=0)^n {: n choose k :}^2 = (2n) choose n
```

- 从 $2n$ 个物体中选出 $n$ 个，有 $(2n)choose n$ 种选择的方法
- 分为奇偶两个集合，从奇数集合中选 $k$ 个，从偶数集合中选 $n-k$ 个，两者独立，因此有 $n choose k n choose(n-k)$ 种方法，$k$ 取 $0~n$，因此等式两边相等

设 $r$ 是实数，$k$ 是整数，定义二项式系数 $r choose k$ 为

```am
r choose k = { (r(r-1)...(r-k+1)) / k!, k >= 1;
1, k = 0;
0, k <= -1:}
```

```am
r choose 0 + (r+1) choose 1 + ... (r+k) choose k = (r+k+1) choose k
```

## 5.3 二项式系数的单峰性

对于正整数 $n$，二项式系数 $n choose i$ 中的最大者为 $n choose floor(n/2) = n choose ceil(n/2)$

### 反链

$n$ 元素集合 $S$ 的一个反链是 $S$ 的一个子集的一个集合 $cc A$，其中 $ccA$ 中的子集不互相包含

- $S ={a,b,c,d}, ccA = {{a,b},{b,c,d},{a,d},{a,c}}$ 是一个反链
- $S$ 的所有 $k$ 子集的集合 $ccA_k$ 是 $S$ 的一个反链
	- 用这种方法构造的反链最长为 $n choose floor(n/2)$ 
- 反链最多包含 $n choose floor(n/2)$ 个集合

### 链

$S$ 的子集的集合 $C$ 是一条链，只要对于 $C$ 中的每一对子集，总有一个包含在另一个之中。$A_1, A_2 in C, A_1 != A_2 => A_1 sub A_2 or A_2 sub A_1$

- $S ={1,2,3,4,5}$
- ${O/, {2}, {2,3}, {1,2,3,5}}$ 是一个链

链和反链的交至多只有一个成员

### 最大链

包含 $S$ 各种可能大小的子集各一个，在这个链中不可能再加入更多的子集

一般地，如果 $S ={1,2,...,n}$，最大链为

```am
A_0 = O/ sub A_1 sub A_2 sub ... sub A_n = S
```

最大链的数目等于 $n!$，实际上是选择 ${1,2,...,n}$ 的一个全排列的过程

$S$ 的一个子集 $A$，假设 $A$ 的长度为 $k$，包含 $A$ 的最大链 $C$ 个数为 $k!(n-k)!$

### Sperner 定理

证明 $S$ 是一个 $n$ 元素集合，$S$ 上的一个反链至多包含 $n choose floor(n/2)$ 个集合

设 $ccA$ 是一个反链，用两种不同的方法计算有序对 $(A,C)$ 的数目 $beta$，其中 $A$ 在 $ccA$ 中，$C$ 是包含 $A$ 的最大链，有

```am
beta = |{(A,C):A in ccA, A in C}|
```

- $beta$ 至多等于最大链的个数，即 $beta <= n!$
	- 每个最大链最多只能包含 $ccA$ 中的一个子集，因此最多只能是最大链的个数
- 设 $a_k=abs({A:A in ccA, absA=k})$，表示反链 $ccA$ 中大小为 $k$ 的子集个数
	- 如果 $|A| =k$，则包含 $A$ 的最大链 $C$ 个数为 $k!(n-k)!$
	- 由乘法原理，所有 $|A| = k$ 的 $(A,C)$ 对数目为 $a_k k!(n-k)!$
	- 由加法原理，$beta=sum_(k=0)^n a_k k!(n-k)!$

故

```am
sum_(k=0)^n a_k k!(n-k)! & <= n!

sum_(k=0)^n a_k / (n choose k) & <= 1
```

为什么能推出

```am
|ccA| <= sum_(k=0)^n a_k <= n choose floor(n/2)
```

## 多项式定理

```am
(x_1+x_2+...x_t)^n = sum (n!)/(n_1 !n_2 !...n_t !) x_1^(n_1) x_2^(n_2) ... x_t^(n_t)
```

其中求和是对 $sum_(i=1)^t n_i = n$ 的所有非负整数解 $n_1,n_2,...,n_t$ 进行的

项 $x_1^(n_1) x_2^(n_2) ... x_t^(n_t)$ 出现的次数等于 $n choose n_1 (n-n_1)choose n_2 ... (n-n_1-...-n_(t-1)) choose n_t$，等价于在 $n_1+n_2+...+n_t=n$ 这个方程中找非负整数解

多项式系数

```am
n choose (n_1, n_2, ..., n_t) = n! / (n_1 !n_2 !...n_t !)
```
