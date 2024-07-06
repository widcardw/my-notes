---
title: 第六章 容斥原理
---

## 容斥原理

计数 $S$ 中不具有性质 $P_1$ 或 $P_2$ 的对象个数

- 首先计数 $S$ 中的所有对象
- 然后排除具有性质 $P_1$ 的所有对象
- 再排除具有性质 $P_2$ 的所有对象
- 再重新加入具有性质 $P_1$ 和 $P_2$ 的对象一次
	- 因为把这样的对象排除了两次

设 $A_1$ 是 $S$ 中具有性质 $P_1$ 的对象组成的子集，$A_2$ 是 $S$ 中具有性质 $P_2$ 的对象组成的子集，则

$$
abs(ol A_1 nn ol A_2) = |S| - |A_1| - |A_2| + |A_1 nn A_2|
$$

推广一下

$$
abs(ol A_1 nn ol A_2 nn ... ol A_m) &= |S| 

&- sum|A_i| + sum|A_i nn A_j| - ... 

&+(-1)^m sum |A_1 nn A_2 nn ... nn A_m|
$$

等式右边的总项数等于 $2^m$

### 推论 6.1.2

集合 $S$ 中至少具有性质 $P_1,...,P_m$ 之一的对象个数

$$
|A_1 uu A_2 uu ... uu A_m| &= sum |A_i|

& - sum |A_i nn A_j| + sum |A_i nn A_j nn A_k| - ...

& + (-1)^(m+1) sum |A_1 nn A_2 nn ... nn A_m|
$$

求 1 到 1000 之间不能被 5 整除，且不能被 6 整除，且不能被 8 整除的整数个数

$P_1, P_2, P_3$ 分别表示能被这三个数整除

$$
&|A_1| =1000/5=200, |A_2| =1000/6=166, |A_3| = 1000/8=125

&|A_1 nn A_2| = 1000/(lcm(5,6))=33

&|A_1 nn A_3| = 1000/(lcm(5,8))=25

&|A_2 nn A_3| = 1000/(lcm(6,8))=1000/24=41

&|A_1 nn A_2 nn A_3| = 1000/(lcm(5,6,8))=1000/120=8

&|ol A_1 nn ol A_2 nn ol A_3| = 1000 -(200+166+125)+(33+25+41)-8=600
$$


## 带重复的组合

已证明具有 $k$ 种不同对象且每种对象都有无限重数的多重集合的 $r$ 组合的个数等于

$$
(r+k-1) choose r
$$

确定多重集合 $T={3*a,4*b,5*c}$ 的 10 组合数目

- $S: T^** = {oo*a, oo*b,oo*c}$ 的所有 10 组合的集合
- $P_1,P_2,P_3:T^**$ 的 10 组合中 ${a}>3,{b}>4,{c}>5$ 次的性质

$|A_1| =(6+3-1)choose 6$ 含义为：由于 $a$ 至少出现 4 次，那么先把这 $4$ 次删了，组成一个 6 组合，从 $a,b,c$ 中任意选择，即得到上面的式子

$$
|ol A_1 nn ol A_2 nn ol A_3| &= |S| - (|A_1|+|A_2|+|A_3|)

&+(|A_1 nn A_2| + |A_1 nn A_3| + |A_2 nn A_3|)

&- |A_1 nn A_2 nn A_3|

&= (10+3-1) choose 10 

& - ((6+3-1)choose 6+(5+3-1)choose 5+(4+3-1)choose 4)

& + ((1+3-1)choose 1+(0+3-1)choose 0+0) -0

&= 6
$$

## 错位排列

在形成一个全排列的时候，任意一个数字 $i$ 所在的位置都不再第 $i$ 个上。

这样排列的数量为

$$
D_n = n!(1-1/1! + 1/2! - 1/3! +...+(-1)^n 1/n!)
$$

- $S$: 自然数 1 到 $n$ 的全部排列的集合
- $P_j$: 一个排列中 $j$ 不再他自然位置上的性质
- $|A_1| = |A_j| = (n-1)!$
- $|A_1 nn A_2| = |A_i nn A_j| = (n-2)!$
- ...
- $|A_1 nn A_2 nn ... nn A_k| = (n-k)!$

$$
D_n &= |ol A_1 nn ol A_2 nn ... ol A_n| 

&= n! - n choose 1 (n-1)! + n choose 2 (n-2)! - ... + (-1)^n n choose n 0!
$$

有性质：任意一个全排列中错位排列的概率为 $D_n / n! ~~ 1/e$

递推公式

$$
D_n = (n-1)(D_(n-1)+D_(n-2))
$$

$$
D_n = n D_(n-1) + (-1)^n
$$

## 带有禁止位置的排列

设 $X1, X2,..., Xn$ 是 ${1, 2,…, n}$ 的子集，用 $P(X1, X2,…, Xn)$ 表示 ${1, 2,…, n}$ 的所有排列 $i_1i_2…i_n$ 的集合：使得 $i_k$ 不在 $X_k$ 内。其数目用 $p(X1, X2,…, Xn)=|P(X1, X2,…, Xn)|$ 表示

设 $n=5, X_1={1, 4}, X_2={3}, X_3=O/, X_4={1, 5}, X_5={2, 5}$。则$P(X1, X2,..., Xn)$ 中的排列与下图所示的在棋盘上有禁止位置的 5 个非攻击型车的放置一一对应

|  x  |     |     |  x  |     |
| :-: | :-: | :-: | :-: | :-: |
|     |     |  x  |     |     |
|     |     |     |     |     |
|  x  |     |     |     |  x  |
|     |  x  |     |     |  x  |

将 _n_ 个非攻击型不可区分的车放到带有禁止放置位置的 _n_ 行 _n_ 列棋盘上的放置方法数等于

$$
n! - r_1 (n-1)! + r_2 (n-2)! - ... + (-1)^k r_k (n-k)! + ... + (-1)^n r_n
$$

- _S_: _n_ 个非攻击型车在 _n_ 行 _n_ 列棋盘上的所有放置方法的集合
- $P_j$: 在第 _j_ 行上的车是在属于 $X_j$ 的列上
- $|A_1| = |X_1|(n-1)!, |A_i| = |X_i|(n-1)!$
- $Sigma |A_i| = r_1(n-1)!$，$r_1$ 等于棋盘上禁止放车的格子数
- $Sigma |A_i nn A_j| =r_2(n-2)!$，$r_2$ 等于把两个非攻击型车放到棋盘禁止位置上的方法数
- $Sigma |A_(i_1) nn A_(i_2)nn ... nn A_(i_k)| = r_k (n-k)!$，$r_k$ 等于把 _k_ 个非攻击型车放到棋盘禁止位置上的方法数

|  x  |     |     |     |     |     |
| :-: | :-: | :-: | :-: | :-: | :-: |
|  x  |  x  |     |     |     |     |
|     |     |  x  |  x  |     |     |
|     |     |  x  |  x  |     |     |
|     |     |     |     |     |     |
|     |     |     |     |     |     |

- $r_1=7$
- $r_2$ 共 $C_4^2$ 种行选项中来选，共 15 种
	- 1, 2: 1 种
	- 1, 3: 2 种
	- 1, 4: 2 种
	- 2, 3: 4 种
	- 2, 4: 4 种
	- 3, 4: 2 种
- $r_3$ 共 $C_4^3$ 种行选项种来选，共 10 种
	- 1, 2, 3: 2 种
	- 1, 2, 4: 2 种
	- 1, 3, 4: 2 种
	- 2, 3, 4: 2x2=4 种
- $r_4 = 2$
- $r_5=r_6=0$

总方法数为 $6!-7xx5!+15xx4!-10xx3!+2xx2! =184$

## 另一个禁止位置问题

第二天排队，前面的人与第一天不同。即不出现 12, 23, ... 这种连续的排列

- $|A_1| = |A_j| = (n-1)!$
- $|A_1 nn A_2| = |A_i nn A_j| = (n-2)!$
- $Q_n = |ol A_1 nn ol A_2 nn ... nn ol A_m| = D_n + D_(n-1)$

## 莫比乌斯反演

- $X_n={1,2,...,n}$，偏序集 $(ccP(X_n), sube)$
- $F: ccP(X_n) -> RR$ 是定义在 $ccP(X_n)$ 上的实值函数
- 使用 $F$ 定义一个新函数 $G: ccP(X_n)->RR$，其中 $G(K)=sum_(L sube K) F(L)$，$K sube X_n$
- 莫比乌斯反演可将上式反解 $F(K)=sum_(L sube K) (-1)^(|K| - |L|) G(L)$

## 群

代数结构的判定，循环群的计算

### 子群

$$
<G, @>, <H, @>
$$

$$
H sube G, H != O/, <H, @> " is Group"
$$

判定定理

设 $G$ 是群，$H sube G, H != O/$，$H$ 是 $G$ 的子群当且仅当 $AA x,y in H, xy^-1 in H$

充分性：设 $G$ 是群，$H sube G, H != O/$，$H$ 是 $G$ 的子群

- 封闭性
- 结合率
- 幺元 $e in H$，取 $y = x, x x^-1 = e in H$
- 全员可逆

必要性


$$
scr F(X) = {f: X xx X -> RR | AA x,y in X, x cancel -<= y -> f(x, y)=0 }
$$

$$
h(x,y) = {limits(sum)_{z: x -<= z -<= y} f(x,z) g(z, y), x -<= y; 0, otherwise :}
$$


$$
h = f ** g
$$

$$
f, g in (: scr F, ** :)
$$

- 封闭？✅
- 结合率？✅
- 幺元？$e(x,y) = {1, x = y; 0, otherwise :}$，$AA f in scr F, e ** f = f**e=f$
- 全员可逆？