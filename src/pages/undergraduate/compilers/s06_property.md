---
title: 第 6 章 属性文法
layout: ~/layouts/MainLayout.astro
---

## 6.1. 属性文法

### 6.1.1. 定义

属性文法也称属性翻译文法，是以==上下文无关文法==为基础的。

**定义 6.1** 对文法中的每一个符号（终结符和非终结符）指派若干表达语义的“值”，这些==值==就称为属性。它代表与文法符号相关的信息，如类型、值、代码序列、符号表等相关内容。

**定义 6.2** 同一条产生式规则中，符号的属性之间的计算法则，称为语义规则。对于文法的每一个产生式都配备了一组属性的==语义规则==，对属性进行计算和传递。

如对产生式规则 $E \to T + F$，从语义角度看，就是将表达式 $T$ 和 $F$ 的值相加，结果作为 $E$ 的值。这启发我们

1. 给这三个符号配备一个属性 v，用于表示表达式的值
2. 从语义的角度来看，三个符号的语义处理规则是 $E . \text{v} = T . \text{v} + F . \text{v}$

> [!warning]
> 语义规则表达了符号属性之间的一种计算或约束关系，并不总能用一个数学式子表达。更多的时候可能要用一段程序代码或伪代码表示。

**定义 6.3** 在上下文无关文法中配置上语义规则，这样的文法称为属性文法。

**定义 6.4** 设有一条产生式规则 $A \to X_1 X_2 \cdots X_n$，相应的语义规则是 $b=f(a_1, a_2,\cdots,a_k)$，如果 $b$ 是 $A$ 的一个属性，则称 $b$ 是 $A$ 的==综合属性==。如果 $b$ 是右部某个 $X_i$ 的属性，则称 $b$ 是 $X_i$ 的==继承属性==。

> 综合属性主要用于自下而上地传递语义信息。
> 继承属性主要用于自上而下地传递语义信息。

**例 6.1** 判断下列 $E . \text{v}$ 和 $L . \text{in}$ 是什么属性

1. $E \to T \ast F$，语义规则是 $E . \text{v} = T . \text{v} \ast F . \text{v}$
2. $D \to T L$，语义规则是 $L . \text{in} = T . \text{type}$

> [!example] 分析
> 
> 1. 由于 $E . \text{v}$ 属性 v 是属于左部符号的，是 $E$ 的综合属性
> 2. 由于 $L . \text{in}$ 属性 in 是属于右部符号 $L$ 的，是 $L$ 的继承属性

**例 6.2** 设有一个文法 $G[L]$

$$
\begin{aligned}
L & \to E \text{n}\\
E & \to E_1 + T \mid T\\
T & \to T_1 \ast F \mid F\\
F & \to (E) \mid \text{digit}
\end{aligned}
$$

> $\text{n}$ 表示输入的是换行符

由于是表达式求值，从语义角度上看，每一个符号都应该有一个表达式的值，所以指派属性 val

| 规则                 | 语义规则及含义                                          |
| -------------------- | ------------------------------------------------------- |
| $L \to E \text{n}$   | $\text{print}(E . \text{val})$                                 |
| $E \to E_1 + T$      | $E . \text{val} = E_1 . \text{val} + T . \text{val}$    |
| $E \to T$            | $E . \text{val} = T . \text{val}$                       |
| $T \to T_1 \ast F$   | $T . \text{val} = T_1 . \text{val} \ast F . \text{val}$ |
| $T \to F$            | $T . \text{val} = F . \text{val}$                       |
| $F \to (E)$          | $F . \text{val} = E . \text{val}$                       |
| $F \to \text{digit}$ | $F .\text{val} = \text{digit.lexval}$                                                      |

> 终结符的综合属性是由词法分析程序提供的，作为已知的值（相当于==初始值==）使用
> 非终结符可能既有综合属性，又有继承属性

### 6.1.2. 综合属性

综合属性用于==自下而上==的传递信息。

从语法规则的角度看，对于产生式规则 $E \to T + F$，有语义规则 $E . \text{val} := T . \text{val} + F . \text{val}$，即用==右部==的属性来计算==左部==被定义的符号的综合属性。

从语法树角度来看，是根据子节点属性和父节点自身属性计算父节点的综合属性。从算术表达式 $3 * 5 + 4$ 可以得到以下的语法树。

![[public/compile/s06_image_1.svg]]

**定义 6.5** 在语法分析树中标记出各个节点的属性值，这种语法分析树被称为注释分析树。

根据自底向上的语法分析，按照从左到右、从叶到根的计算次序，在语法分析的同时，可以将所有的属性值全都计算出来。

### 6.1.3. 继承属性

继承属性主要用于==自上而下==地传递语义信息。

主要反映的情形：在语法分析树中，一个节点的继承属性值由其==父节点的属性值或兄弟节点的属性值==来确定。主要用于表达上下文的==依赖性==。

| 规则                  | 语义规则                                                          |
| --------------------- | ----------------------------------------------------------------- |
| $D \to T L$           | $L . \text{in} = T . \text{type}$                                 |
| $T \to \text{int}$    | $T . \text{type=int}$                                             |
| $T \to \text{float}$  | $T . \text{type=float}$                                           |
| $L \to L_1,\text{id}$ | $L_1 . \text{in} = L . \text{in; addType(id.entry}, L \text{.in)}$ |
| $L \to \text{id}$     | $\text{addType(id.entry},L \text{.in)}$                                                                  |

> 第一条含义： $L$ 的继承属性 in 存放 $T$ 的综合属性 type。因为 $T . \text{type}$ 存有变量定义的数据类型信息。这个上下文信息要通过 $L . \text{in}$ 往下传
> 第四条含义：$L_1$ 的继承属性由左边 $L$ 的继承属性得到，即向下传递。`addType` 函数会在符号表中找到 id 的入口，并将类型信息设置为 $L. \text{in}$。

考虑变量声明语句 `int i1, i2, i3`，有下面的语法分析树

![[public/compile/s06_image_2.svg]]

### 6.1.3* 补充

#### 属性依赖

对应于每个产生式 $A \to \alpha$ 都有一套与之相关联的语义规则，每条规则的形式为（$f$ 是一个函数）

$$
b=f(c_1,c_2,\cdots,c_k)
$$

那么我们说，属性 $b$ ==依赖于==属性 $c_1, c_2, \cdots, c_k$，有两种情况

- $b$ 是 $A$ 的一个==综合属性==并且 $c_1, c_2, \cdots, c_k$ 是产生式右边文法符号的属性（例如算术表达式中的加法）
- $b$ 是产生式右边某个文法符号的一个==继承属性==，并且 $c_1, c_2, \cdots, c_k$ 是 $A$ 或产生式右边任何文法符号的属性（例如 $D \to TL$ 和 $L \to \text{id}$）

终结符没有子节点，只有==综合属性==，由词法分析器提供，例如 $F \to \text{digit}$ 中，digit 的属性 lexval 由词法分析器提供。

非终结符既可有==综合属性==也可有==继承属性==，文法开始符号的所有继承属性作为属性计算前的初始值（例 6.2）。

#### 语义规则

对于出现在==产生式右边的继承属性==和出现在==产生式左边的综合属性==都必须提供一个计算规则。属性计算规则中只能使用相应产生式中的文法符号的属性。例如

- $E \to T + F$，$E . \text{val} := T . \text{val} + F . \text{val}$（产生式左边的综合属性）
- $D \to TL$，$L . \text{in} = T . \text{type}$（产生式右边的继承属性）

出现在==产生式左边的继承属性==和出现在==产生式右边的综合属性== **不由** 所给的产生式的属性计算规则进行计算，而是由其他产生式的属性规则计算或由属性计算器的参数提供。

- $L \to \text{id}$，$\text{addType(id.entry},L \text{.in)}$（$L$ 的继承属性依赖于它的兄弟节点和父节点，$L$ 是由 $D \to TL$ 算得的）

语义规则所描述的工作可以包括属性计算、静态语义检查、符号表操作、代码生成等。

**选择题** 考虑非终结符 $A, B, C$，其中，$A$ 有继承属性 a 和综合属性 b，$B$ 有综合属性 c，$C$ 有继承属性 d。产生式 $A \to BC$ 不可能有规则（？）

1. $C . \text{d}=B . \text{c} + 1$
2. $A . \text{b} = B . \text{c} + C . \text{d}$
3. $B . \text{c} = A . \text{a}$

> [!example] 答案
> 
> 3 选项。选项为对 $B$ 的综合属性做计算，而对于出现在==产生式右边的综合属性==不由所给的产生式的属性计算规则给出。$B$ 的综合属性应当依赖于其子节点，而非父节点或兄弟节点。

### 6.1.4. 属性计算

语义规则的计算所完成的任务

- 产生代码
- 在符号表中存放信息
- 给出错误信息
- 执行任何其他动作

对输入串的==翻译==就是根据==语义规则==进行==计算==

由源程序的语法结构所驱动的处理办法就是==语法制导翻译法==

- 输入串 → 语法树 → 按照语义规则计算属性

#### 依赖图

在一颗语法树中的节点的继承属性和综合属性之间的相互依赖关系，可由依赖图来描述。

为每一个包含过程调用的语义规则引入一个==虚拟综合属性 b==，这样把每一个语义规则都写成

$$
b:=f(c_1,c_2,\cdots,c_k)
$$

这样就统一了语义规则的形式。

依赖图中为每一个属性设置一个节点，如果有属性 b 依赖于属性 c，则有一条有向边为 $c \to b$，若有 $A . \text{b} = f(X . \text{x}, Y . \text{y})$，则有 $X . \text{x} \to A . \text{b}$ 和 $Y . \text{y} \to A . \text{b}$ 两条边。

**例** 对算术表达式文法进行分析

![[public/compile/s06_image_3.svg]]

对变量声明语句进行分析

![[public/compile/s06_image_4.svg]]

一个依赖图的任何拓扑排序都给出一个语法树中节点语义规则计算的有效顺序。

### 6.1.5. 属性文法的计算顺序

- 基础文法用于建立输入符号串的语法分析树
- 根据语义规则建立依赖图
- 根据依赖图的拓扑排序，得到计算语义规则的顺序

输入串 → 语法树 → 依赖图 → 语义规则计算次序

**例** 对变量声明语句进行分析

- $T . \text{type}$ 的值为 int
- 由 $L . \text{in} = T . \text{type}$ 得到 $L . \text{in} = \text{int}$
- 由 $L \to L_1, \text{id}$，观察⑤子树
    - ⑥的 in 属性值依赖于⑤的属性值，因此⑥的 in 值为 int
    - ⑦需要引用⑤和⑥，addType 在符号表中，找到 id3 的入口，填上属性值 int
- ……

最终有

| name | type |
| ---- | ---- |
| id3  | int  |
| id2  | int  |
| id1  | int     |

#### 树遍历的属性计算方法

##### 通过树遍历的方法计算属性的值

- 假设语法树已经建立，且书中已带有开始符号的继承属性和终结符的综合属性
- 以某种次序遍历语法树，直至计算出所有属性
- ==深度优先，从左到右的遍历==

计算思维的典型方法：递归

```ts
while (!allComputed()) {  // 如果还有未被计算的属性
    calNode(S)  // S 是开始符号
}

function calNode(n: Node) {
    // n 是一个非终结符
    if (nonTerminators.includes(n)) {
        // 假设其产生式为 N → X1 X2...Xm
        for (let i = 0; i < m; i++) {
            // Xi 是一个非终结符
            if (nonTerminators.includes(X[i])) {
                // 计算 Xi 的所有能够计算的继承属性
                calInherit(X[i])
                // 递归调用，访问子树
                calNode(X[i])
            }
        }
        // 计算 n 的所有能够计算的综合属性
        calComprehensive(n)
    }
}
```

这样可能需要执行许多次。树遍历方法计算属性值最坏情况下是 $O(n^2)$， 实际应用中希望语法分析的同时计算属性值，不希望构造语法分析数之后再去计算属性值，因为一遍扫描时性能最好。

##### 一遍扫描的处理办法

在语法分析的同时计算属性值

- 与所采用的语法分析方法相关，将属性计算穿插在分析过程中

所谓语法制导翻译法，直观上说就是为文法中每个产生式配上一组语义规则，并且在语法分析的同时执行这些语义规则。

语义规则被计算的时机

- 自上而下分析，一个产生式匹配输入串成功时，执行相应的语义规则
- 自下而上分析，一个产生式被用于进行归约时，执行相应的语义规则

**例** 建立抽象语法树的语义规则

| 产生式            | 语义规则                                                            |
| ----------------- | ------------------------------------------------------------------- |
| $E \to E_1 + T$   | $E \text{.nptr}:=\text{mknode}(+,E_1 \text{.nptr}, T \text{.nptr})$ |
| $E \to E_1 - T$   | $E \text{.nptr}:=\text{mknode}(-,E_1 \text{.nptr}, T \text{.nptr})$ |
| $E \to T$         | $E \text{.nptr}:=T \text{.nptr}$                                    |
| $T \to (E)$       | $T \text{.nptr}:=E \text{.nptr}$                                    |
| $T \to \text{id}$ | $T \text{.nptr}:=\text{mkleaf(id, id.entry)}$                       |
|            $T \to \text{num}$                |   $T \text{.nptr}:=\text{mkleaf(num, num.val)}$                                                                  |

对于算术表达式 $a-4+c$，进行一遍扫描

![[public/compile/s06_image_5.svg]]
## 6.2. S-属性定义及其自底向上的计算

S-属性文法==只含有综合属性==，该方法在自下而上的分析器分析输入符号串的同时计算==综合属性==

- 分析栈中保存语法符号和有关的==综合属性==值
- 每当进行归约时，新的语法符号的属性值就由栈中正在归约的产生式有变符号的属性值来计算

在分析栈中增加==附加域==存放综合属性值

假设产生式 $A \to XYZ$ 对应的语义规则为 $A \text{.a}:=f(X \text{.x},Y \text{.y}, Z \text{.z})$

![[public/compile/s06_image_6.svg]]

**例6.5** 用 SLR(1) 分析器实现算术表达式的 S-属性定义

| 规则                 | 语义规则                                                | SLR(1) 实现代码                 |
| -------------------- | ------------------------------------------------------- | ------------------------------- |
| $L \to E \text{n}$   | $\text{print}(E . \text{val})$                          | `print(val[top-1])`             |
| $E \to E_1 + T$      | $E . \text{val} = E_1 . \text{val} + T . \text{val}$    | `val[ntop]=val[top-2]+val[top]` |
| $E \to T$            | $E . \text{val} = T . \text{val}$                       | 处于同一个位置，无需代码        |
| $T \to T_1 \ast F$   | $T . \text{val} = T_1 . \text{val} \ast F . \text{val}$ | `val[ntop]=val[top-2]*val[top]` |
| $T \to F$            | $T . \text{val} = F . \text{val}$                       | 处于同一个位置，无需代码        |
| $F \to (E)$          | $F . \text{val} = E . \text{val}$                       | `val[ntop]=val[top-1]`          |
| $F \to \text{digit}$ | $F .\text{val} = \text{digit.lexval}$                   | 处于同一个位置，无需代码        | 

对于给定句子 $\#3 \ast 5 + 4 \text{ n} \#$，有 SLR(1) 制导的语义翻译过程表

| 输入     | 符号栈      | 属性栈   | 归约规则             |
| -------- | ----------- | -------- | -------------------- |
| 3\*5+4n# | #           | ␣        |                      |
| \*5+4n#  | # digit     | ␣ 3      |                      |
| \*5+4n#  | # F         | ␣ 3      | $F \to \text{digit}$ |
| \*5+4n#  | # T         | ␣ 3      | $T \to F$            |
| 5+4n#    | # T *       | ␣ 3 ␣    |                      |
| +4n#     | # T * digit | ␣ 3 ␣ 5  |                      |
| +4n#     | # T * F     | ␣ 3 ␣ 5  | $T \to F$            |
| +4n#     | # T         | ␣ 15     | $T \to T \ast F$     |
| +4n#     | # E         | ␣ 15     | $E \to T$            |
| 4n#      | # E +       | ␣ 15 ␣   |                      |
| n#       | # E + digit | ␣ 15 ␣ 4 |                      |
| n#       | # E + F     | ␣ 15 ␣ 4 | $F \to \text{digit}$ |
| n#       | # E + T     | ␣ 15 ␣ 4 | $T \to F$            |
| n#       | # E         | ␣ 19     | $E \to E + T$        |
| #        | # E n       | ␣ 19 ␣   |                      |
| #        | # L         | ␣ 19     | $L \to E \text{n}$   | 

## 6.3. L-属性定义及其自顶向下的计算

按照深度优先遍历语法树，计算其所有的属性值。与 LL(1) 自上而下分析法结合

- 深度优先建立语法树
- 按照语义规则计算属性

一个属性文法称为 ==L-属性文法==，则有：如果对以每个产生式 $A \to X_1X_2\cdots X_n$ 其每个语义规则中的每个属性，有两种情况

- 是==综合属性且仅依赖于==产生式中 $X_i$ 左边符号 $X_1, X_2,\cdots,X_{i-1}$ 的属性
- 是 $X_i$ 的一个==继承属性且这个继承属性仅依赖于== $A$ 的继承属性

S-属性文法一定是 L-属性文法。


### 翻译方案

**定义 6.8** 将语义动作（语义规则中的某种实现代码）放在 `{}` 内，并插入在文法规则右部的任何合适位置，这样的文法称为翻译方案。

**例 6.7** 中缀表达式翻译为后缀表达式的翻译方案

$$
\begin{aligned}
E & \to T R\\
R & \to \text{op}\; T\{ \text{print(op.lexval)} \} R_1\\
R & \to \varepsilon \\
T & \to \text{num} \{ \text{print(num.lexval)} \}
\end{aligned}
$$

对于输入串 $1-2+3$ 有

![[public/compile/s06_image_7.svg]]

输出有 $1\,2-3+$

#### 建立翻译方案

设计翻译模式时，必须保证当某个动作引用一个属性时，它必须是有定义的

- L-属性文法本身就能保证每个动作不会引用尚未计算出来的属性

当只需要==综合属性==时：为每个语义规则建立一个包含赋值的动作，==并把这个动作放在相应产生式右边的末尾==

> [!example] 例子
> 
> 对于产生式 $T \to T_1 + F$ 和语义规则 $T \text{.val} := T_1 \text{.val} + F \text{.val}$，设计产生式和语义动作
> 
> $$
> T \to T_1 + F \; \{ T \text{.val} := T_1 \text{.val} + F \text{.val} \}
> $$
> 

如果既有综合属性又有继承属性，在建立翻译模式时就必须保证：

> [!warning] 三个原则
> 
> - 产生式右边的符号的==继承属性==必须在这个符号以前的动作中计算出来
> - 一个动作不能引用这个动作右边符号的==综合属性==。也就是说，一个动作要放在这样一个位置上，此时它所引用的所有属性都已计算出来，随时可用。
> - 产生式左边非终结符的==综合属性==只有在它所引用的所有属性都计算出来后才能计算。计算这种属性的动作通常可放在产生式右端的末尾。
> 

设有文法的翻译方案

$$
\begin{aligned}
S & \to A_1A_2 \; \{ A_1 \text{.in} := 1; A_2 \text{.in} := 2 \}\\
A & \to a \; \{ \text{print}(A \text{.in}) \}
\end{aligned}
$$

此时对句子 $ab$ 有分析树

![[public/compile/s06_image_8.svg]]


现在对它进行改进

$$
\begin{aligned}
S & \to \{ A_1 \text{.in} := 1; A_2 \text{.in} := 2 \} \; A_1A_2\\
A & \to a \; \{ \text{print}(A \text{.in}) \}
\end{aligned}
$$

![[public/compile/s06_image_9.svg]]


此时是一个合法的翻译

#### 消除左递归

语义动作是在相同位置上的符号被展开（匹配成功）时执行的。为了构造不带回溯的自顶向下语法分析，必须==消除文法中的左递归==。

当消除一个翻译模式的基本文法的左递归时同时考虑==属性计算==（适合带==综合属性==的翻译模式）

**例** 对加减法文法消除左递归，构造新的翻译模式

$$
\begin{aligned}
E \to &\, T \; \{ R\text{.i}=T\text{.val} \} \\ 
&\, R \; \{ E\text{.val}=R\text{.s} \} \\
R \to &\, {\color{red}+ }\\ 
&\, {\color{red}T} \; \{ R_1\text{.i}=R\text{.i}+T\text{.val} \} \\
&\, {\color{red}R_1} \; \{ R\text{.s}=R_1\text{.s} \} \\
R \to &\, {\color{red}-} \\
&\, {\color{red}T} \; \{ R_1\text{.i}=R\text{.i}=-T\text{.val} \} \\
&\, {\color{red}R_1} \; \{ R\text{.s}=R_1\text{.s} \} \\
R \to &\, \varepsilon \; \{ R\text{.s}=R\text{.i} \} \\
T \to &\, (E) \; \{ T\text{.val} = E\text{.val} \} \\
T \to &\, \text{num} \; \{ T\text{.val=num.lexval} \}
\end{aligned}
$$

其中 $R \text{.i}$ 表示 $R$ 前面表达式的值（继承属性），$R \text{.s}$ 表示分析完 $R$ 时子表达式的值（综合属性）


![[public/compile/s06_image_10.svg]]

> [!note] 总结
> 
> 假设有翻译模式
> 
> $$
> \begin{aligned}
> A & \to A_1 Y \; \{ A\text{.a} = g(A_1\text{.a}, Y\text{.y}) \}\\
> A & \to X \; \{ A\text{.a} = f(X\text{.x}) \}
> \end{aligned}
> $$
> 
> 它的每个文法符号都有一个综合属性，用小写字母表示，$g$ 和 $f$ 表示任意函数。消除左递归，有这样的翻译模式：
> 
> $$
> \begin{aligned}
> A \to & \, X \{ R\text{.i} = f(X \text{.x}) \} \\
> & \; R \, \{ A \text{.a} = R \text{.s} \} \\
> R \to & \, Y \{ R_1 \text{.i} = g(R \text{.i}, Y \text{.y}) \} \\
> & \, R_1 \{ R \text{.s} = R_1 \text{.s} \} \\
> R \to & \, \varepsilon \{ R \text{.s} = R \text{.i} \}
> \end{aligned}
> $$
> 
> 同时，我们发现==继承属性 i== 相当于时函数的传入参数，而==综合属性 s== 相当于函数的返回值。

#### 递归下降翻译器的设计

- 对每个非终结符 $A$ 构造一个函数过程
- $A$ 的属性实现为参数和变量
    - 继承属性：对 $A$ 的每个==继承属性==设置为函数的一个==形式参数==
    - 综合属性：实现为函数的==返回值==
        - 若有多个综合属性，打包成作为结构或记录返回
        - 为了简单，我们假设每个非终结符只有一个综合属性
    - $A$ 的产生式中每个文法符号的每一个==属性==：实现为 $A$ 对应函数过程中的==局部变量==
- 按照产生式右部从左到右，对于单词符号（==终结符==）、==非终结符==、==语义动作==，分别实现
    - 对于带有综合属性 x 的==终结符 $X$==，把 x 的值存入为 $X\text{.x}$ 设置的变量中。然后产生一个匹配 $X$ 的调用，并继续读入下一个符号
    - 对于每个==非终结符 $B$==，产生式右部带有函数调用的赋值语句 $\text{c} = B({\text{b}_1, \text{b}_2, \cdots, \text{b}_k})$，其中 $\text{b}_i$ 为 $B$ 的==继承属性==设置的变量，$\text{c}$ 是 $B$ 的==综合属性==设置的变量
    - 对于语义动作，把动作的代码抄进分析器中，用代表属性的变量来代替对属性的每一次==引用==


## 6.4. 自底向上计算继承属性

### 6.4.1. 删除翻译方案中嵌入的动作

在自顶向下语法分析时，需要消除==左递归==。语义动作不同的执行时机给语法分析器带来了困难。

对于加减法的文法，消除左递归后有翻译，但是其执行时机没有统一。`print('+')` 和 `print('-')` 发生在 T 归约后，R 归约前，而 `print(num.val)` 发生在 T 归约后最后，它们的时机不统一。

$$
\begin{aligned}
E & \to TR\\
R & \to + T \; \{ \text{print}('+') \} \; R \\
R & \to - T \; \{ \text{print}('-') \} \; R \\
R & \to \varepsilon \\
T & \to \text{num} \; \{ \text{print(num.val)} \}
\end{aligned}
$$

于是我们需要==把所有的语义动作都放在产生式的末尾==，使得语义动作的执行时机统一。

转换方法

- 加入新产生式 $M \to \varepsilon$
- 把嵌入在产生式中的每个语义动作不同的非终结符 $M$ 代替，并把这个动作放在产生式 $M \to \varepsilon$ 末尾

$$
\begin{aligned}
E & \to TR \\
R & \to +T { \color{red} M } R \mid -T { \color{red} N } R \mid \varepsilon\\
T & \to \text{num} \; \{ \text{print(num.val)} \} \\
{\color{red}M} & \to \varepsilon \; \{ \text{print}('+') \} \\
{\color{red}N }& \to \varepsilon \; \{ \text{print}('-') \}
\end{aligned}
$$

### 6.4.2. 分析栈中的继承属性

更一般的情况下，并不都能通过 6.4.1 的方法完成继承属性的计算。

对于翻译方案

$$
\begin{aligned}
D & \to T \{ L \text{.in} = T \text{.type} \} L \\
T & \to \text{int} \{ T \text{.type} = \text{int} \} \\
T & \to \text{float} \{ T \text{.type} = \text{float} \} \\
L & \to \{ L_1 \text{.in} = L \text{.in} \} L_1 , \text{id} \{ \text{addType(id.entry}, L \text{.in} )) \}  \\
L & \to \text{id} \{ \text{addType(id.entry}, L \text{.in}) \}
\end{aligned}
$$

给定句子 `int a,b,c` 如果使用 SLR(1) 进行自底向上的分析

| 序号 | 输入       | 符号栈    | 属性栈      | 归约规则               | 注 |
| ---- | ---------- | --------- | ----------- | ---------------------- | ---- |
| 1    | int a,b,c# | #         | ␣           |                        |      |
| 2    | a,b,c#     | # int     | ␣ int       |                        |      |
| 3    | a,b,c#     | # T       | ␣ int       | $T \to \text{int}$     |      |
| 4    | ,b,c#      | # T a     | ␣ int a     |                        |      |
| 5    | ,b,c#      | # T L     | ␣ int a     | $L \to \text{id}$      |    需要 L.in  |
| 6    | b,c#       | # T L ,   | ␣ int a ␣   |                        |      |
| 7    | ,c#        | # T L , b | ␣ int a ␣   |                        |      |
| 8    | ,c#        | # T L     | ␣ int a     | $L \to L_1, \text{id}$ |  需要 L.in    |
| 9    | c#         | # T L ,   | ␣ int a ␣   |                        |      |
| 10   | #          | # T L , c | ␣ int a ␣ c |                        |      |
| 11   | #          | # T L     | ␣ int a     | $L \to L_1, \text{id}$ |   需要 L.in   |
| 12   | #          | # D       | ␣ int       | $D \to TL$             |      |

第 5 行当用 $L \to \text{id}$ 对第 4 行内容进行归约前，要归约的规则左部符号 $L$ 未在分析栈中，分析栈中的语义动作就已经要引用 $L$ 的继承属性 in 了，这就是问题所在。==继承属性总是在符号之前先被计算，归约动作是在继承属性计算之后才会发生==。只有发生归约，符号才会进栈。因此，符号还没进栈就需要使用它在属性栈中的继承属性。

为此，我们不能指望在对应符号 $L$ 的属性栈中保存 L.in 这个继承属性。而事实上，对应符号 $L$ 的属性栈中存放的是 $L$ 的==综合属性==，而不是继承属性。

由于在自底向上的分析法中，==所有属性都只能通过属性栈访问==，因而问题变为：虽然 $L$ 没有进栈，但属性栈中哪个符号的==综合属性==与 L.in 保持相等？

**定义 6.9** 设 $Y \text{.y}$ 是继承属性，$X \text{.s}$ 是综合属性，且有 $Y \text{.y} = X \text{.s}$（将后者赋值给前者），则称 $Y \text{.y} = X \text{.s}$ 为复写规则。

$X \text{.s}$ 是已经计算出来的综合属性，放在属性栈中，依据此规则，可==在需要 $Y \text{.y}$ 处引用 $X \text{.s}$==

对于上表，由于有 $L \text{.in} = T \text{.type}$，可以在需要 $L \text{.in}$ 处引用 $T \text{.type}$，只要能够正确找出综合属性 $T \text{.type}$ 每次归约时在属性栈中的位置即可。

翻译方案在 SLR(1) 中的实现代码

| 产生式规则             | 翻译方案                                                                                                   | SLR(1) 中的实现代码             |
| ---------------------- | ---------------------------------------------------------------------------------------------------------- | ------------------------------- |
| $D \to TL$             | $D \to T \{ L \text{.in} = T \text{.type} \}$                                                              |                                 |
| $T \to \text{int}$     | $T \to \text{int} \{ T \text{.type} = \text{int} \}$                                                       |                                 |
| $T \to \text{float}$   | $T \to \text{float} \{ T \text{.type} = \text{float} \}$                                                   |                                 |
| $L \to L_1, \text{id}$ | $L \to \{ L_1 \text{.in} = L \text{.in} \} L_1 , \text{id} \{ \text{addType(id.entry}, L \text{.in} )) \}$ | `addType(val[top], val[top-3])` | 
| $L \to \text{id}$      | $L \to \text{id} \{ \text{addType(id.entry}, L \text{.in}) \}$                                             | `addType(val[top], val[top-1])` |

![[public/compile/s06_image_11.svg]]

### 6.4.3. 模拟继承属性的计算

上述继承属性是复写规则型，而且属性栈中综合属性的位置在每次归约时都是固定的。如每次使用产生式规则 $L \to \text{id}$ 归约时，综合属性位置总是固定在 `val[top-1]` 处。而每次使用产生式规则 $L \to L_1, \text{id}$ 时，综合属性的位置固定在 `val[top-3]` 处。

但综合属性的位置不可能总是这样固定的，因此需要改造文法，使得综合属性的位置固定。

**例** 设有文法 $G$

$$
\begin{aligned}
S & \to aAC & C \text{.i} =A \text{.s} \\
S & \to bABC & C \text{.i} =A \text{.s} \\
C & \to c & C \text{.s} = g(C \text{.i})
\end{aligned}
$$

继承属性 C.i 通过复写规则继承综合属性 A.s 的值。当用 $C \to c$ 归约时，C.i 值对应的 A.s 可能在 `val[top-1]`（按 $S \to aAC$ 推导），也可能在 `val[top-2]`（按 $S \to bABC$ 推导）

文法改造为

$$
\begin{aligned}
S & \to aAC && C \text{.i} =A \text{.s} \\
S & \to bABMC && M \text{.i} =A \text{.s}; C \text{.i} = M \text{.s} \\
C & \to c && C \text{.s} = g(C \text{.i})  \\
M & \to \varepsilon && M \text{.s} = M \text{.i}
\end{aligned}
$$

M.i 继承属性是复写规则型继承 A.s，每次用 $M \to \varepsilon$ 归约时，M.i 中对应的 A.s 总是处于 `val[top-1]` 处（$M \to \varepsilon$ 右部是空的，归约之前 top 指向 B），这样 $M$ 的综合属性 M.s 通过 M.i 这个继承属性间接的得到了 A.s 的值（M.s=M.i）

除了位置不固定的情形外，还有可能继承属性不是复写规则型

如对 $S \to aAC$ 的语义规则 $C \text{.i} = f(A \text{.s})$，其继承属性 C.i 不是复写型，而是对 A.s 计算后再赋值，这时必须将计算部分改造成综合属性方式来计算：

$$
\begin{aligned}
S & \to aANC && N \text{.i} = A \text{.s}; C \text{.i} = N \text{.s} \\
N & \to \varepsilon && N \text{.s} = f(N \text{.i})
\end{aligned}
$$

这样当用 $N \to \varepsilon$ 归约时，继承属性 N.i 对应综合属性 A.s 总是处于 `val[top]` 处（$N \to \varepsilon$ 右部为空，归约之前 top 指向 A）。当用 $C \to c$ 归约时，C.i 对应的综合属性 N.s 总在 `val[top-1]` 处。


