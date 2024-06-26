---
title: 第三章 鸽巢原理
---

## 3.1 鸽巢原理

### 定理 3.1.1

如果要将 $n+1$ 个物体放进 $n$ 个盒子，那么至少有一个盒子包含两个或更多的物体

### 题 1

给定 $m$ 个整数 $a_1,a_2,...a_m$，存在 $0<=k<l<=m$ 的整数 $k, l$，使得 $sum_(i=k+1)^l a_i$  能够被 $m$ 整除。

> [!example] 证
> 考虑 $m$ 个前序和 $S_k=sum_(i=1)^k a_i$，如果和中任意一个能被 $m$ 整除，则结论成立。
> 
> 假设这些和中的每个除以 $m$ 都有一个非零余数，则余数为 $1,2,...,m-1$. 而实际上，余数有 $m-1$ 种选择，但和有 $m$ 个，所以必然有两个不同的和，它们的余数相等，假设这两个和分别为 $S_k, S_l, k<l$，则 $S_l-S_k$ 除以 $m$ 的余数为 0.

### 题 3.1.2

柯洁有 11 周时间备战比赛，每天至少下一盘棋，但每周不超过 12 盘，证明存在若干天，这期间恰好下了 21 盘

第 $i$ 天下 $a_i$ 盘，$a_1, …, a_77$，要证 $EE sum_(i=m)^n a_i = 21$

> [!example] 证
> 
> 设 $S_i=sum_(k=1)^i a_i$，要证 $EE S_j - S_i = 21$，有条件
> 
> $$
> 1 <= S_1 < S_2 < … < S_77 <= 132
> $$
> 
> $$
> 22 <= S_1 + 21 < S_2 + 21 < … < S_77 <= 153
> $$
> 
> 那么这两个不等式的 154 项在 1~153 之间，那么就有两个 $X = S_i, Y = S_j + 21$ 两者相等，即 $S_i - S_j = 21$


> [!example] 另证
> 
> 三周内最多下 36 盘棋，有 $1 <= S_1 < S_2 < … < S_21 <= 36$
> 
> - 若 $EE S_i -= 0 mod 21,1 <= S_i = 21 * p <= 36,p=1$
> - 若 $AA S_i !-= 0 mod 21,S_i - S_j -= 0 mod 21,S_i - S_j = 21 * p <= 35,p=1$

### 题 3.1.3

从整数 1~200 中选 101 个数，证在所选的数中存在两个数，一个可以被另一个整除

证：将集合划分为奇数和偶数，每个数都能表示为 $a_i = 2^(p_i) * q_i$，其中 $q$ 为奇数

由于取了 101 个数，则必存在两个数 $a_i = 2^(p_i) * q_i, a_j = 2^(p_j) * q_j$，其奇数部分相同，不妨设 $p_i < p_j$，则 $a_j / a_j = 2^(p_j-p_i)$

### 中国剩余定理

$m$ 和 $n$ 是互质的正整数，设 $a,b$ 为整数，其中 $0<=a <= m-1$ 且 $0<= b <=n-1$，于是存在正整数 $x$ 使得 $x -= a (mod m), x -= b (mod n)$

- 考虑 $n$ 个整数 $a,m+a,2m+a,...,(n-1)m+a$，这些整数中的每一个除以 $m$ 都余 $a$
- 这 $n$ 个数中的每一个数除以 $n$ 都有不同的余数
	- 设其中两个除以一$n$ 有相同的余数 $r$，令这两个数为 $im+a,jm+a$，其中 $0<=i<j<=n-1$，于是存在两个整数 $q_i, q_j$ 使得 $im+a=q_i n+r$ 且 $jm+a=q_j n+r$
	- 两式相减得 $(j-i)m=(q_i-q_j)n$，即 $n$ 是 $j-i$ 的因子，矛盾
- 根据鸽巢原理，$n$ 个数 $0, 1,..., n-1$ 中的每一个都要作为余数出现，特别是 $b$ 也是如此

## 3.2 加强版

> [!note] 定理 3.2.1
> 设 $q_1, q_2, ... q_n$ 是正整数，如果将 $q_1+...+q_n -n+1$ 个物体放入 $n$ 个盒子内，则第 1 个盒子至少含有 $q_1$ 个物体，或者 2 至少含有 $q_2$ 个物体，…，或者 $n$ 至少含有 $q_n$ 个物体。

证明：反证法，假设其反命题为真，即使得第一个盒子少于 $q_1$ 个物体，且……，且第 $n$ 个盒子少于 $q_n$ 个物体。该情况下最多有 $sum_(i=1)^n q_i -n$ 个物体，与上述条件矛盾。

### 推论 3.2.2

设 $n$ 和 $r$ 都是正整数，如果把 $n(r-1)+1$ 个物体分配到 $n$ 个格子中，那么至少有一个盒子含有 $r$ 个或更多的物体。

### 平均原理

如果 $n$ 个非负整数 $m_1,...,m_n$ 的平均数大于 $r-1$，即 $1/n sum_(i=1)^n m_i > r-1$，那么至少有一个整数大于或等于 $r$.

如果 $n$ 个非负整数 $m_1,...,m_n$ 的平均数小于 $r+1$，即 $1/n sum_(i=1)^n m_i < r+1$，那么至少有一个整数小于 $r$.

### 题 3.2.2

由 $n^2+1$ 个不同的实数构成的序列一定含有长度为 $n+1$ 的单调子序列

> [!example] 证明

假设 $a_1, a_2, ..., a_(n^2+1)$ 的增序列长度不超过 $n$，去找长度为 $n+1$ 的降序列

设 $m_k$ 为从 $a_k$ 开始的最长递增子序列的长度，$k=1,2,...,n^2+1$

$1<=m_k<=n$，$m_1,...m_(n^2+1)$ 是 1 和 $n$ 之间的 $n^2+1$ 个整数，因此其中至少有 $n+1$ 个数是相等的。

令 $m_(k_1)=m_(k_2)=...=m_(k_(n+!))$，其中 $1<=k_1<k_2<...<k_(n+1)<=n^2+1$

$a_(k_i)>=a_(k_(i+1))$，$a_(k_1),a_(k_2),...,a_(k_(n+1))$ 是长度为 $n+1$ 的递减子序列

## 3.3 Ramsey 定理

6 个节点的完全图，使用两种颜色来染边，要么存在红色三角形，要么存在蓝色三角形 $K_6 -> K_3, K_3$

点 A 为起始节点， BCDEF 边一定有三条是同色的，选出这三条同色边，不妨是 AB, AC，假设 BC 为红边，则存在红色三角形。假设 BC 为蓝边，则 BCD 可以尝试去构造一个蓝色三角形。

### 定理 3.3.1

如果 $m >=2, n>=2$ 是两个整数，则存在正整数 $p$，使得 $K_p -> K_m, K_n$

证明 $K_p -> K_m, K_n$ 与 $K_p -> K_n, K_m$ 等价

设染色空间 $|C| =2^(p choose 2)$，将原先 $C$ 中的任意边 $c$ 蓝边变为红边，原先的红边变为蓝边，这个映射 $f: C -> C$ 是单射，也是满射，所以是双射，有 $AA c in C$ 且 $AA f(c) in C$.

$r(2, n)=r(n,2)=n$

$p=r(m-1, n)+r(m, n-1)$，下证 $K_p -> K_m,K_n$

以某个点 $x$ 为起始，有 $p-1$ 条出边。将 $p-1$ 边分为两类，即蓝边和红边，表示为 $|R_x|+|B_x| =p-1$，$|R_x|+|B_x| =r(m-1,n)+r(m,n-1)-2+1$，由鸽巢原理加强版，要么 $|R_x|$ ……或者 $|B_x|$ ……
