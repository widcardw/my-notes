---
title: 期末习题
layout: ~/layouts/MainLayout.astro
---

#### 问答

- 简述 L-属性文法的定义；
- 简述 S-属性文法的定义；
- 简述句型的定义；
- 简述文法 $G[Z]$ 所定义的语言的含义；
- 简述素短语的定义。

#### 文法

##### 化简文法
$$
\begin{aligned}
S & \to a ABS \mid cCACd \\
A & \to bAB \mid cSA \mid cCC \\
B & \to bAB \mid cSB \\
C & \to cS \mid c \\
D & \to eA \\
E & \to fA \mid g
\end{aligned}
$$

> [!example] 解答
> 
> - 没有推导式可以推导出 $D,E$，因此删除包含 $D,E$ 的产生式规则
> - $B$ 会陷入无限递归，没有终止条件，将所有含有 $B$ 的式子都删去
> 
> $$
> \begin{aligned}
> S & \to cCACd \\
> A & \to cSA \mid cCC \\
> C & \to cS \mid c
> \end{aligned}
> $$


##### 试写出下列满足要求或产生下列语言的文法

1. $\{a^nb^m,n>0,m>0\}$
2. $\{0^n111^n,n \geqslant 1\}$

> [!example] 解答
> 
> 第一题
> 
> $$
> \begin{aligned}
> S & \to AB \\
> A & \to aA \mid a \\
> B & \to bB \mid b
> \end{aligned}
> $$
> 
> 第二题（已修改）
> 
> $$
> \begin{aligned}
> S & \to AB \\
> A & \to 0A1 \mid 01 \\
> B & \to 11
> \end{aligned}
> $$
> 

##### 试给出语言 $L=\{ W | W \in (0\mid1)^*$, 且 $W$ 不含两个相邻的 $1 \}$ 的 LL(1) 文法


> [!example] 解答（已修改）
> 
> $$
> \begin{aligned}
> S & \to 0 S \mid 1A \mid \varepsilon \\
> A & \to 0S \mid \varepsilon
> \end{aligned}
> $$
> 
> |     |       First 集        | Follow 集 |
> |:---:|:---------------------:|:---------:|
> |  S  | {0, 1, $\varepsilon$} |    {#}    |
> |  A  |  {0, $\varepsilon$}   |    {#}    |
> 
> | 预测分析表 | 0          | 1          | #                   |
> | ---------- | ---------- | ---------- | ------------------- |
> | S          | $S \to 0S$ | $S \to 1A$ | $S \to \varepsilon$ |
> | A          | $A \to 0S$ |            | $A \to \varepsilon$ | 
> 
> 没有冲突，是 LL(1) 文法
> 
> 终态 $Y \notin V_\mathrm{N}$，有限自动机 $M$ 中
> 
> $$
> \begin{aligned}
> \delta(S, 0)=S && \delta(S, 1)=A && \delta(S, \varepsilon)=Y \\
> \delta(A, 0)=S && \delta(A, \varepsilon)=Y
> \end{aligned}
> $$
> 
> ![[public/compile/compx667gyiio.svg]]
> 
> |                                               |  0  |  1  |
> |:---------------------------------------------:|:---:|:---:|
> | $\varepsilon \text{-Closure}(\{S\})=\{S, Y\}$ | {S, Y} | {A, Y} |
> |                      {A, Y}                      | {S, Y} | $\varnothing$    |
> 
> ![[public/compile/compx87hghfh51.svg]]
> 


#### DFA

设计一个 DFA ，识别出所有的由 0、1 所成的串，要求：每一个 1 后边必须跟至少一个 0 。如： 0 是合法的。 010 也是合法的。但 01 是不合法的。

> [!example] 解答（已修改）
> 
> 给出相应文法
> 
> $$
> \begin{aligned}
> Z & \to 0Z \mid 1A \mid 0 \\
> A & \to 0Z \mid 0
> \end{aligned}
> $$
> 
> 终态 $Y \notin V_\mathrm{N}$，有限自动机 $M$，其中
> 
> $$
> \begin{aligned}
> \delta (Z, 0)=Z && \delta (Z, 1)= A && \delta (Z, 0)=Y \\
> \delta (A, 0)=Z && \delta (A, 1)= \varnothing && \delta (A, 0)=Y
> \end{aligned}
> $$
> 
> ![[public/compile/compxvbb.svg]]
> 
> |                                      | 0      | 1             |
> | ------------------------------------ | ------ | ------------- |
> | $\varepsilon \text{-Closure}(\{Z\})$ | {Z, Y} | {A}           |
> | {Z, Y}                               | {Z, Y} | {A}           |
> | {A}                                  | {Z, Y} | $\varnothing$ |
> 
> ![[public/compile/compxbghfg.svg]]
> 

##### 将下面的有限自动机确定并最小化

![[public/compile/compx56765gj.svg]]

> [!example] 解答
> 
> 
> |                                        | a             | b      |
> | -------------------------------------- | ------------- | ------ |
> | $\varepsilon \text{-Closure}(\{0\})=\{0\}$ | {0, 1}        | {1}    |
> | {0, 1}                                 | {0, 1}        | {0, 1} |
> | {1}                                    | $\varnothing$ | {0}       |
> 
> ![[public/compile/compxtuhfu.svg]]
> 
> 上图已经是确定化的最小有限自动机
> 

#### LL(1)

##### 有文法 $G[S]$

$$
\begin{aligned}
S & \to SaSb \\
S & \to bS \\
S & \to \varepsilon
\end{aligned}
$$

试给出 LL(1) 分析表，说明它是不是 LL(1) 文法

> [!example] 解答
> 
> |     | First 集  | Follow 集 |
> |:---:|:---------:|:---------:|
> | S   | {a, b, ε} | {a, b, #} |
> 
> |  LL(1) 分析表   | a   | b   | #   |
> |:---:|:---:|:---:|:---:|
> | S   | $S \to SaSb$ <br> $S \to \varepsilon$    |  $S \to bS$ <br> $S \to SaSb$ <br> $S \to \varepsilon$   | $S \to \varepsilon$    |
> 
> 不是 LL(1) 文法




##### 有文法 $G[Z]$

$$
\begin{aligned}
Z & \to BA \\
A & \to aA \mid \varepsilon \\
B & \to bB \mid \varepsilon
\end{aligned}
$$

构造 LL(1) 分析表，写出句子 `baa#` 的分析过程

> [!example] 解答（已修改）
> 
> |     | First 集  | Follow 集 |
> |:---:|:---------:|:---------:|
> |  Z  | {b, a, ε} |    {#}    |
> |  A  |  {a, ε}   |  {#}   |
> |  B  | {b, ε} |    {#, a}    |
> 
> | LL(1) 分析表 |          a          |     b      |          #          |
> |:------------:|:-------------------:|:----------:|:-------------------:|
> |      Z       |     $Z \to BA$      | $Z \to BA$ |     $Z \to BA$      |
> |      A       |     $A \to aA$      |            | $A \to \varepsilon$ |
> |      B       | $B \to \varepsilon$ | $B \to bB$ | $B \to \varepsilon$ |
> 
> | 步骤 | 栈      | 输入 |        输出         |
> |:----:|:------- | ----:|:-------------------:|
> |  1   | # Z     | baa# |                     |
> |  2   | # A B   | baa# |     $Z \to BA$      |
> |  3   | # A B b | baa# |     $B \to bB$      |
> |  4   | # A B   | aa#  |                     |
> |  5   | # A     | aa#  | $B \to \varepsilon$ |
> |  6   | # A a   | aa#  |     $A \to aA$      |
> |  7   | # A     |  a#  |                     |
> |  8   | # A a   |  a#  |     $A \to aA$      |
> |  9   | # A     |  #   |                     |
> |  10  | #       |  #   | $A \to \varepsilon$ |
> 

##### 有文法 $G[E]$

$$
\begin{aligned}
E \to EE \mid (E) \mid ()
\end{aligned}
$$

证明该文法是二义性文法

> [!example] 解答
> 
> 对于表达式 $()()()$ 有不同的语法树
> 
> ~~~mermaid
> graph TD
> e1((E1)) --- e2((E2))
> e1 --- e3((E3))
> e2 --- e4((E4))
> e2 --- e5((E5))
> e3 --- k1["("]
> e3 --- k2[")"]
> e4 --- k3["("]
> e4 --- k4[")"]
> e5 --- k5["("]
> e5 --- k6[")"]
> 
> ea((E1)) --- eb((E2))
> ea --- ec((E3))
> eb --- ka["("]
> eb --- kb[")"]
> ec --- ed((E4))
> ec --- ee((E5))
> ed --- kc["("]
> ed --- kd[")"]
> ee --- ke["("]
> ee --- kf[")"]
> ~~~
> 
> 因此该文法是二义性文法


#### SLR(1)

##### 有文法 $G[S]$

$$
\begin{aligned}
S & \to S + S \\
S & \to a \\
S & \to \varepsilon
\end{aligned}
$$

给出文法的 SLR(1) 分析表，说明它是不是 SLR(1) 文法


> [!example] 解答（已修改）
> 
> ![[public/compile/compx9876h.svg]]
> 
> Follow(S) = {+, #}
> 
> | 状态 |  ACTION   |       |     | GOTO |
> |:----:|:---------:|:-----:|:---:|:----:|
> |  ^^  |     a     |   +   |  #  |  S   |
> |  0   |    s3     |       |     |  1   |
> |  1   |           | s2 | acc  |      |
> |  2   | s3/~~r4~~ |  r4   | r4  |  3   |
> |  3   |           |  r2/s2   | r2  |      |
> |  4   |           |  r3   | r3  |      |
> 
> 其中有单元格出现冲突，不是 SLR(1) 文法

##### 有文法 $G[S]$

$$
\begin{aligned}
S & \to a S \\
S & \to b S \\
S & \to \varepsilon
\end{aligned}
$$

给出文法的 SLR(1) 分析表，说明它是不是 SLR(1) 文法


> [!example] 解答
> 
> ![[public/compile/comp987yhj.svg]]
> 
> Follow(S) = {#}
> 
> | 状态 |  ACTION   |           |     | GOTO |
> |:----:|:---------:|:---------:|:---:|:----:|
> |  ^^  |     a     |     b     |  #  |  S   |
> |  0   | s2/~~r4~~ | s4/~~r4~~ | r4  |  1   |
> |  1   |           |           | acc |      |
> |  2   | s2/~~r4~~ | s3/~~r4~~ | r4  |  3   |
> |  3   |           |           | r2  |      |
> |  4   | s2/~~r4~~ | s3/~~r4~~ | r4  |  5   |
> |  5   |           |           | r3  |      |
> 
> 是 SLR(1) 文法

#### 算符优先文法

##### 有文法 $G[S]$

$$
\begin{aligned}
S & \to L, (S) \\
L & \to S \mid i
\end{aligned}
$$

给出算符优先关系表，说明该文法是不是算符优先文法。给出算符优先函数。


> [!example] 解答
> 
> 
> |     | FirstVT(X) | LastVT(X) |
> |:---:|:----------:|:---------:|
> | S   | `,` `i`        | `)`         |
> | L   | `i` `,`        | `i` `)`       | 
> 
> 1. 第一条产生式规则
> 	- 由 $(S)$ 可知 ==`(` $\doteq$ `)`==
> 	- 由 $,($ 可知 ==`,` $\doteq$ `(`==
> 	- 由 $(S)$ 可知 `(` $\lessdot \text{FirstVT}(S)$，即 ==`(` $\lessdot$ `,`== 和 ==`(` $\lessdot$  `i`==；同时 $\text{LastVT}(S) \gtrdot$ `)`，即 ==`)` $\gtrdot$ `)`==
> 	- 由 $L,$ 可知 $\text{LastVT}(L) \gtrdot$ `,`，即 ==`i` $\gtrdot$ `,`== 和 ==`)` $\gtrdot$ `,`==
> 2. 第二条产生式规则
> 	- 似乎没有什么推得出来的了
> 
> |     | (        | )         | ,          | i          |
> | --- | -------- | --------- | ---------- | ---------- |
> | (   |          | $\doteq$  | $\lessdot$ | $\lessdot$ |
> | )   |          | $\gtrdot$ | $\gtrdot$  |            |
> | ,   | $\doteq$ |           |            |            |
> | i   |          |           | $\gtrdot$  |            |
> 
> 由 [[undergraduate/compilers/s05_downtop#3 Martin 算法]] ，画图，可以得到下面的结果
> 
> ![[public/compile/comxhjfyujkp.svg]]
> 

#### LR(1)

##### 有文法 $G[S^\prime]$

$$
\begin{aligned}
S^\prime & \to S \\
S & \to L=R \\
S & \to R \\
L & \to \ast R \\
L & \to i \\
R & \to L
\end{aligned}
$$

给出项目集 $I_0$ 和 $I_0$ 接受 $L$ 推导出的 $I_2$

> [!example] 解答
> 
> ![[public/compile/compile050404fgsdfg.svg]]
> 

#### 语义 语法

##### 有数组定义

```c
int a[5][10];
```

设数组按行存放，每个 int 占 4 字节，现有语句

```c
while (i < 10) 
{
    if (i < 5) 
    {
        i = a[i + 1][i * 2];
    }
    else
    {
        i = i + 1;
    }
}
```

写出该语句翻译成的目标代码（三地址代码或四地址代码）。若目标代码是四元式序列，则请从 100 号单元开始。

> [!example] 解答
> 
> ~~~asm
> Lwb:
>         if (i < 10) goto Lwy
>         goto Lwn
> Lwy:    
>         if (i < 5) goto Liy
>         goto Lin
> Liy:    
>         T1 := i + 1
>         T2 := 10 * T1
>         T3 := i * 2
>         T4 := T2 + T3
>         T5 := T4 * 4
>         T6 := a[T5]
>         i := T6
>         goto Linext
> Lin:
>         T7 := i + 1
>         i := T7
> Linext:
>         goto Lwb
> Lwn:
> ~~~


##### 设有数组定义

```c
int a[5][5];
```

设数组按行存放，每个 int 占 4 字节，现有语句

```c
if (!a)
{
    while (i < 10 && j > 0)
    {
        b = a[i + 1][j * 2];
    }
}
b = b * 2;
```

写出该语句翻译成的目标代码（三地址代码或四地址代码）。若目标代码是四元式序列，则请从 100 号单元开始。

> [!example] 解答
> 
> ~~~asm
>         if (a == 0) goto Liy
>         goto Lin
> Liy:
> Lwb:
>         if (i < 10) goto L2
>         goto Lwnext
> L2:     if (j > 0) goto Lwy
>         goto Lwnext
> Lwy:    
>         T1 := i + 1
>         T2 := 5 * T1
>         T3 := j * 2
>         T4 := T2 + T3
>         T5 := T4 * 4
>         T6 := a[T5]
>         b := T6
>         goto Lwb
> Lwnext:
> Lin:
>         Tk := b * 2
>         b := Tk
> ~~~

#### 翻译

##### 设有文法 $G[S]$

$$
\begin{aligned}
S & \to (A, (A)) \\
A & \to (A) \\
A & \to \varepsilon
\end{aligned}
$$

给文法配上语义规则，计算并打印出括号嵌套的最大深度。

> [!example] 不知道对不对
> 
> $$
> \begin{aligned}
> S ^{\prime} \to \; & S && { \color{blue} \{ \text{print}(S \text{.s}) \} } \\
> S \to \; & (A,L) && { \color{blue} \{ S \text{.s}= \max(A \text{.s}, L \text{.s})+1 \} } \\
> L \to \; & (A) && { \color{blue} \{ L \text{.s} = A \text{.s} + 1 \} } \\
> A \to \; & (A_{1}) && { \color{blue} \{ A \text{.s} = A_1 \text{.s} + 1 \} }  \\
> A \to \; & \varepsilon && { \color{blue} \{ A \text{.s}=0 \} } \\
> \end{aligned}
> $$


#### 属性文法

写出 for 循环和 do...while 循环的属性文法

> [!example] for 循环
> 
> 
> $$
> \begin{aligned}
> S & \to \text{for(i=}E_1 \text{; } {\color{red}M} \text{i<}E_2 \text{; } {\color{red}N} \text{i++)} \{ {\color{red}W} S \} \\
> M & \to \varepsilon \\
> N & \to \varepsilon \\
> W & \to \varepsilon \\
> \end{aligned}
> $$
> 
> ~~~js
> M.label = newLabel
> N.label = newLabel
> W.label = newLabel
> S.code = E1.code
>        + gen(`${i} = ${E1.place}`)
>        + gen(`${M.label}:`)
>        + E2.code
>        + gen(`if ${i} < ${E2.place} goto ${W.label}`)
>        + gen(`goto ${S.next}`)
>        + gen(`${N.label}:`)
>        + gen(`${i} = ${i} + 1`)
>        + gen(`goto ${M.label}`)
>        + gen(`${W.label}:`)
>        + S1.code
>        + gen(`goto ${N.label}`)
>        + gen(`${S.next}:`)
> ~~~
> 
> ~~~asm
>         E1.code
>         i := E1.place
> M.label:
>         E2.code
>         if (i < E2.place) goto W.label
>         goto S.next
> N.label:
>         i := i + 1
>         goto M.label
> W.label:
>         S1.code
>         goto N.label
> S.next:
> ~~~

> [!example] do-while 循环
> 
> $$
> \begin{aligned}
> S & \to \text{do } \{ {\color{red}M}S_{1} \} \text{ while}({\color{red}N}E) {\color{red}W}
> \end{aligned}
> $$
> 
> ~~~js
> M.label = newLabel
> N.label = newLabel
> ~~~
> 
> > N 标签用于 `continue` 语句的跳转
> 
> ~~~asm
> M.label:
>         S1.code
> N.label:
>         if (E.place) goto M.label
>         goto W.label
> W.label:
> ~~~
> 

#### 运行时状态

##### 设 C 语言函数的活动记录结构如下，运行栈自底向上增长

| 6   | 其他     |
| --- | -------- |
| 5   | 临时变量 |
| 4   | 局部变量 |
| 3   | 老 SP    |
| 2   | 返回地址 |
| 1   | 形式参数 | 

现有 C 程序如下

```c
int f(int n, int m) {
	int k;
	if (n + m <= 0)
		k = 0;
	else
		k = n * m + f(n - 1, m - 2);
	return k;
}
void main() {
	int p;
	p = f(5, 4);
	// 其他语句
} // 1
```

1. 设采用标识符栈来登记标识符的作用域及其他的信息。而且该标识符表的内容需要留到以后阶段使用。当编译到 1 处时，画出标识符栈中的内容。
2. 运行时当第二次（递归）进入 `f` 后，即 `main() -> f(5, 4) -> f(4, 2)` 时，给出整个运行栈的内容。

> [!example] 解答
> 
> ![[public/compile/compxtjhgfhu.svg]]
> 
> | 地址 | 内容       | 从属范围 |
> | ---- | ---------- | -------- |
> | 88   | k          | f(4, 2)  | 
> | 89   | 老 BP = 94 | f(4, 2)  |
> | 90   | 返回地址   | f(4, 2)  |
> | 91   | 4          | f(4, 2)  |
> | 92   | 2          | f(4, 2)  |
> | 93   | k          | f(5, 4)  |
> | 94   | 老 BP = 99 | f(5, 4)  |
> | 95   | 返回地址   | f(5, 4)  |
> | 96   | 5          | f(5, 4)  |
> | 97   | 4          | f(5, 4)  |
> | 98   | p          | main     |
> | 99   | 老 BP      | main     |
> | 100  | 返回地址   | main     |
> 


