---
title: 第 5 章 自底向上的语法分析 SLR(1)
---

### 5.4.3. SLR(1) 分析技术

LR(0) 不向前看下一个符号，不利用下一个符号的信息，增加了冲突的机会。

> 其表现为：在填写 $r_j$ 类型动作时，在 ACTION 子表的状态 $j$ 所在的行全填上 $r_j$，这增加了冲突机会

设有 LR(0) 项目集 $I_k=\{A \to \alpha \bullet b \beta, B \to \gamma \bullet, C \to \xi \bullet\}$。这个项目集存在“移进-归约”冲突和“归约-归约”冲突。

设下一个要读入的符号为 $x$，假设此时==允许==使用 $B \to \gamma$ 归约，那么归约后，符号 $x$ 就紧跟在 $B$ 之后，也就是 $x\in \text{Follow}(B)$。SLR(1) 正是==使用 Follow 集==来提高分析能力的。

对于上述 $I_k$，若 $\text{Follow}(B) \cap \text{Follow}(C)=\varnothing$，且终结符号 $b\notin \text{Follow}, b\notin \text{Follow}(C)$，则上述冲突全部消失。此时，SLR(1) 采用的“移进-归约”方式：

1. 如果下一个符号 $x=b$，则使用 $A \to \alpha \bullet b \beta$ 项目移进 $b$
2. 如果下一个符号 $x \in \text{Follow}(B)$，则使用 $B \to \gamma \bullet$ 项目进行归约
3. 如果下一个符号 $x \in \text{Follow}(C)$，则使用 $C \to \xi \bullet$ 项目进行归约
4. 其他情况报错

> [!note] SLR(1) 与 LR(0) 的区别
> LR(0) 会将项目集 $I_k=\{B \to \gamma \bullet \bigcirc \!\!\!\! p\,\}$ 对应的分析报第 $k$ 行全部填上 $r_p$；而 SLR(1) 分析则会对其进行限制：只有当下一个符号（终结符）$x \in \text{Follow}(B)$ 时，才会在此单元格写上 $r_p$. 由此，SLR(1) 分析的动作填写更加精确，减少了冲突发生的机会。

**定义 5.17** 若文法 G 的 SLR(1) 分析表中没有多重定义项，则该文法是 SLR(1) 文法。

### 5.4.4. LR(1) 分析技术

LR(1) 是 LR 系列分析技术中功能最强的。SLR(1) 向前查看下一个符号，并利用 FOLLOW 集进行识别，但这样仍然不准确，仍会导致冲突。

> [!example] 存在问题
> 
> SLR 只是==简单地考察下一个输入符号== $b$ 是否属于归纳项目 $A \to \alpha$ 相关联的 $\text{Follow}(A)$，但 $b \in \text{Follow}(A)$ 只是归约 $\alpha$ 的一个==必要条件==，而==非充分条件==，即 $b$ 在 Follow 集中不能确保一定能归约。

例如文法 $G[S^\prime]$

$$
\begin{aligned}
S^\prime & \to S\\
S & \to L = R \mid R \\
L &\to \ast R \mid i\\
R & \to L
\end{aligned}
$$

其前三个状态如下

$$
\begin{aligned}
I_0 & = \{ S^{\prime} \to \bullet S, S \to \bullet L=R, S \to \bullet R, L\to \bullet i,  R \to \bullet L \}\\
I_1 & = \{ S^\prime \to S \bullet \}\\
I_2 & = \{ S \to L \bullet = R, R \to L \bullet \}
\end{aligned}
$$

在项目集 $I_2$ 中，由于 $\text{Follow}(R)=\{=, \#\}$，其中含有等号，在 SLR(1) 中存在“移进-归约冲突”。

但进一步分析归约项目 $R \to L \bullet$，若 $L$ 归约为 $R$，那么 $R$ 后面不可能跟随着 $=$ 符号，只有 $\ast R$ 中的 $R$ 后面可以接着 $=$ 符号。但 $I_2$ 中的 $R$ 前面是不存在 $\ast$ 符号的。这一区别是 FOLLOW 集不能区分的。LR(1) 分析技术改造了 LR(0) 项目，==对每个项目，精确指明面临哪些符号时才能归约==。

> [!example] LR(1) 分析法的提出
> 
> 对于产生式 $A \to \alpha$ 的归约，在不同位置，$A$ 会要求不同的后继符号。对于上面的文法，有下面的表格
> 
> | X   | Follow(X) |
> |:---:|:---------:|
> | S   | #         |
> | L   | =, #      |
> | R   | =, #      | 
> 
> 语法分析树有
> 
> ![](./assets/compile050404jkui.svg)
> 
> 在特定位置，AA 的后继符号集合==是 Follow(A) 的一个子集==，而 SLR 直接将 Follow 集作为判断的依据，扩大了限定的范围。
> 
> 而对它进行修改，当有归约项目 $R \to L \bullet$ 时，只有面临的输入符号为 `#` 时，才能执行 $R \to L$ 的归约


**定义 5.18** $[A \to \alpha \bullet \beta, x]$ 称为 LR(1) 项目，终结符 $x$ 称为该 LR(1) 项目的==搜索符==。

其中，有 LR(0) 项目 $A \to \alpha \bullet \beta$ 和终结符号 $x$，它明确指出，当 $A \to \alpha \bullet \beta$ 到达归约项目 $A \to \alpha \beta \bullet$ 时，==只有面临下一个终结符是 $x$ 时，才能进行归约==。

> 在形如 $[A \to \alpha \bullet \beta, a]$ 且 $\beta \ne \varepsilon$ 时，搜索符 $a$ 没有==实际意义==。
> 但是形如 $[A \to \alpha \bullet, a]$ 的项，==只有在下一个输入符号为 $a$ 时==才可以按照这条产生式规则归约。

> 对于仅仅是搜索符不同的 LR(1) 项目，可以将他们合并，如 $[A \to \alpha \bullet \beta, a/b/c]$

现在问题的核心是：这些搜索符是如何计算的

首先，对于开始项目，有 $[S^\prime \to \bullet S, \#]$，于是我们需要从开始项目计算出其他的 LR(1) 项目中的搜索符。

**定义 5.19** 如果存在推导 $S \overset{\ast}{\Rightarrow} \delta A \eta \Rightarrow \delta \alpha \beta \eta$，其中：

- $\omega = \delta \alpha$
- $x$ 是 $\eta$ 的一个符号或者 $\eta=\varepsilon$ 时，$x=\#$，则称 LR(1) 项目 $[A \to \alpha \bullet \beta, x]$ 对活前缀 $\omega$ 是有效的

LR(1) 分析中关于搜索符问题的描述：若 LR(1) 项目 $[A \to \alpha \bullet B \beta, x]$ 对活前缀 $\omega=\delta \alpha$ 有效，对于任何规则 $B \to \xi$，要求其 LR(1) 项目 $[B \to \bullet \xi, ?]$ 对活前缀 $\omega=\delta \alpha$ 保持有效，那么项目中的搜索符是什么？

因为 LR(1) 项目 $[A \to \alpha \bullet B \beta, x]$ 对活前缀 $\omega$ 有效，则有 $S \overset{\ast}{\Rightarrow} \delta A \eta$，因为 $x$ 是 $\eta$ 的第一个符号，因而将 $\eta$ 写成 $x \rho$，即有 $S \overset{\ast}{\Rightarrow} \delta A \eta \Rightarrow \delta A x \rho \Rightarrow \delta \alpha B \beta x \rho \Rightarrow \delta \alpha \xi \beta x \rho$。这个推导说明

- LR(1) 项目 $[B \to \bullet \xi, ?]$ 对 $\omega$ 保持有效
- LR(1) 项目 $[B \to \bullet \xi, ?]$ 中搜索符 "?" 代表的符号是 $\beta x \rho$ 的第一个符号，==即为 $\text{First}(\beta x \rho)$==，而我们还知道，$x$ 为终结符，由计算规则可得 $\text{First}(\beta x \rho) = \text{First}(\beta x)$

因此，若有 LR(1) 项目 $[A \to \alpha \bullet B \beta, x]$，则对任何规则 $B \to \xi$，可产生新的 LR(1) 项目 $[B \to \bullet \xi, \text{First}(\beta x)]$。搜索符是由 LR(1) 项目 $[A \to \alpha \bullet B \beta, x]$ 中 $B$ 之后的==串 $\beta$ 与搜索符 $x$ 连接之后的 First 集==，其暗示搜索符==可能不止一个==。

构造 LR(1) 项目集规范族同样依赖于 LR(1) 项目集闭包和 GO 状态变迁函数。LR(1) 项目集闭包的计算与 LR(0) 几乎相同。

设有 LR(1) 项目集 $I$，计算 $\text{CLOSURE}(I)$ 的步骤如下

1. 将 $I$ 中的任何项目全部加入 $\text{CLOSURE}(I)$
2. 若项目 $[A \to \alpha \bullet B \beta, x] \in \text{CLOSURE}(I)$，则对任何规则 $B \to \xi$，将项目 $[B \to \bullet \xi, \text{First}(\beta x)]$ 加入到 $\text{CLOSURE}(I)$
3. 反复执行 2，直到 $\text{CLOSURE}(I)$ 不再加入新项目为止

**定义 5.19** 状态集 $I$ 与符号 $X$ 的状态变迁函数 $\text{GO}(I,X)=\text{CLOSURE}(J)$。其中 $J$ 是 $I$ 经过 $X$ 的后继项目集，即 $J=\{ [A \to \alpha X \bullet \beta, a]\mid [A \to \alpha \bullet X \beta, a] \in I \}$

利用 CLOSURE 和 GO，可以构造出 LR(1) 的项目集规范族

```typescript
// state_set 是由 LR(1) 项目集闭包组成的集合
let state_set: Set = [...CLOSURE(["S' → S", '#'])];

let added: boolean = true;
while (added) {
    added = false;
    for (let [I, X] of state_set) {
        let go = GO(I, X);  // 后继项目集闭包
        if (go.length !== 0 && !state_set.contains(go)) {
            state_set.add(go);
            added = true;
        }
    }
}
```

**例 5.15** 已知文法 $G$，试给出 LR(1) 项目集规范族

$$
\begin{aligned}
S^\prime & \to S & (1) \\
S & \to L=R & (2) \\
S & \to R & (3) \\
L & \to \ast R & (4) \\
L &\to i & (5) \\
R & \to L & (6)
\end{aligned}
$$

![](./assets/compile050404fgsdfg.svg)

此时再看状态集 $I_2$，项目 $[R \to L \bullet, \#]$ 精确的指明了只有面临 `#` 时才能进行归约，若面临 `=`，则立即报错。这比 FOLLOW 集判断要精确的多。

如何构造 LR(1) 分析表

1. 若移进项目 $[A \to \alpha \bullet a \beta, x] \in I_k$ 且 $\text{GO}(I_k, a)=I_j$，则令 $\text{ACTION}[k][a]=s_j$，即 $I_k \underset{\text{shift} }{\xrightarrow{a} } I_j$
2. 若归约项目 $[A \to \beta \bullet, a]\in I_k$，规则 $A \to \beta$ 编号为 $p$，则令 $\text{ACTION}[k][a]=r_p$，即按照 $A \to \beta$ 归约
3. 若接收项目 $[S^\prime \to S, \#]\in I_k$，则令 $\text{ACTION}[k][\#]=acc$，表示成功接收
4. 若 $\text{GO}(I_k, A)=I_p$，其中 $A$ 为非终结符，则令 $\text{GO}[k][A]=p$，表示状态 $k$ 下若识别出非终结符 $A$，状态将变为 $p$
5. 分析表中不能用以上规则的全部填写报错标记


> [!example] 构造例 5.15 中的 LR(1) 自动机和分析表
> 
> ![](./assets/compile050404fdsdfv.svg)
> 
> |  状态 | ACTION |  |  |  | GOTO |     |     |
> |:----:|:------:|:---:|:---:|:---:|:----:|:---:|:---:|
> | ^^   | *      | i   | =   | #   | S    | L   | R   |
> | 0    | s4     | s5  |     |     | 1    | 2   | 3   |
> | 1    |        |     |     | acc |      |     |     |
> | 2    |        |     | s6  | s5  |      |     |     |
> | 3    |        |     |     | r2  |      |     |     |
> | 4    | s4     | s5  |     |     |      | 8   | 7   |
> | 5    |        |     | r4  | r4  |      |     |     |
> | 6    | s11    | s12 |     |     |      | 10  | 9   |
> | 7    |        |     | r3  | r3  |      |     |     |
> | 8    |        |     | r5  | r5  |      |     |     |
> | 9    |        |     |     | r1  |      |     |     |
> | 10   |        |     |     | r5  |      |     |     |
> | 11   | s11    | s12 |     |     |      | 10  | 13  |
> | 12   |        |     |     | r4  |      |     |     |
> | 13   |        |     |     | r3    |      |     |     |

### 5.4.5. LALR(1) 分析技术

LR(1) 分析技术的状态相较 LR(0) 多了很多，虽然分析能力提升很多，但状态数多，状态分析表过大，因此设计 LALR(1) 分析技术来减少一些相似的状态。

例如，对于上面的状态 8 和状态 10，它们的动作是不冲突的，即两个归约项目都是由 $L$ 归约到 $R$，这样我们将两个状态进行合并；同样，状态 4 和状态 11 也没有冲突，因此也可以合并；状态 5 和状态 12 合并；状态 7 和状态 13 合并。

**LALR(1) 的基本思想**：将 LR(1) 项目集规范族中的所有同心状态集合并，合并时，对应项目的搜索符也会合并。在合并同心项目时，原先各自接收的有向边，都改为由合并后的项目集接收；原先各自发出的有向边，都改为由合并后的项目集发出。

**合并同心项目集时可能会产生“归约-归约”冲突**，但不会发生“移进-归约”冲突，最多只是推迟错误的识别。

**特点**

- 形式上与 LR(1) 相同
- 大小上与 SLR(1)/LR(0) 相当
- 分析能力介于 SLR(1) 与 LR(1) 之间

## 5.5. 二义性文法的应用

==任何二义性文法都不是 LR 系列文法==。某些类型的二义性文法在语言描述和实现上很有用（更简单、更自然）

例如算术表达式文法

$$
\begin{aligned}
E&\to E+T\mid T\\
T&\to T\ast F\mid F\\
F&\to (E)\mid i
\end{aligned}
$$

用二义性文法可以表达为

$$
G[E]: E \to E + E \mid E \ast E \mid (E) \mid i
$$

然而，使用二义性文法来构造自动机和分析表，会发现存在冲突。但如果在这里我们==引入算符优先级==，就可以避免这种冲突了。采用相同的思路，也可对 if-else 进行类似的分析，对于有冲突的分支语句，采用最近匹配原则即可消解其冲突。

注意：应该保守地使用二义性文法，并且必须在严格控制之下使用，因为稍有不慎就会导致语法分析器所识别的语言出现偏差。
