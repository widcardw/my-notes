---
title: 第 4 章 自顶向下的语法分析
layout: ~/layouts/WithMermaid.astro
---

## 4.1. 语法分析器的功能

以词法分析器生成的==单词符号序列==作为输入，在分析过程中验证这个==单词符号序列==是否是==该程序设计语言的文法的一个句子==。

自顶向下的语法分析是从==顶部==（树根）来构建语法分析树，即构造一个==最左推导==，面对当前输入的单词符号和当前被替换的非终结符，选择这个非终结符的某个产生式规则进行替换。

## 4.2. 不确定的自顶向下的分析方法

对给定的单词符号串 w，从文法的开始符号出发， 试图构造一个最左推导，或自顶向下的为 w 建立一棵语法分析树。 若成功地为 w 构造一个相应的推导序列或一棵语法分析树，则 w 为相应文法的合法句子。这种分析过程本质上是一种==穷举==，试探过程是反复使用不同规则，寻求匹配输入串的过程。

**例 4.1** 设有文法 $G[Z]$

$$
\begin{aligned}
Z&\to aBC\\
B&\to ib\mid b\\
C&\to d\mid e
\end{aligned}
$$

若输入的符号串为 $w=abe$，是否合法？

```mermaid
graph TD
Z[Z]-->a((a))
Z-->B[B]-->ib((ib))
B-->b((b))
Z-->C[C]-->d((d))
C-->e((e))

class a suc
class d err;
class b suc;
class ib err;
class e suc;

classDef err fill:#ff0000;
classDef suc fill:#4ABF8A;
```

构造语法树可以得知，该符号串合法。

## 4.3. LL(1) 分析方法

### 4.3.1. 回溯的判别条件与 LL(1) 文法

**定义 4.1** 设 $G[Z]=\{V_\mathrm{N}, V_\mathrm{T}, P, Z\},\alpha\in(V_\mathrm{N}\cup V_\mathrm{T})^\ast$，符号串 $\alpha$ 的首符号集合定义为

$$
\mathrm{First}(\alpha)=\{a\mid \alpha\overset{\ast}{\Rightarrow}a\cdots,a\in V_\mathrm{T}\}
$$

若 $\alpha\overset{\ast}{\Rightarrow}\varepsilon$，则规定 $\varepsilon\in\mathrm{First}(\alpha)$。也就是说，$\mathrm{First}(\alpha)$ 是从 $\alpha$ 可推导出的==所有首终结符==或==可能的 $\varepsilon$==

> 例如 $a$ 为终结符，$\alpha$ 经过若干步推导后得到了 $aXXX$，那么 $a\in\mathrm{First}(\alpha)$ 

**定义 4.2** 设 $G[Z]=\{V_\mathrm{N}, V_\mathrm{T}, P, Z\},A\in V_\mathrm{N}$，非终结符 $A$ 的后继符号的集合的定义为

$$
\mathrm{Follow}(A)=\{a\mid Z\overset{\ast}{\Rightarrow}\cdots Aa\cdots,a\in V_{\mathrm{T}}\}
$$

若 $Z\overset{\ast}{\Rightarrow}\cdots A$，则规定 $\#\in\mathrm{Follow}(A)$。也就是说，$\mathrm{Follow}(A)$ 是文法 $G$ 的所有句型中==紧跟在 $A$ 之后出现的终结符==或==输入串的结束符 $\#$==

> 例如 $a$ 为终结符，$Z$ 经过若干步推导后可以得到 $\cdots A\cdots$，那么 ==紧跟在 $A$ 之后的**终结符**== 就属于 $\mathrm{Follow}(A)$

**定理 4.1** 对一个上下文无关文法 $G[Z]$，对某个产生式规则

$$
A\to \alpha_1\mid \alpha_2\mid \cdots\mid \alpha_n
$$

若存在 $a\in V_\mathrm{T}$，使得 ==$a\in\mathrm{First}(\alpha_i)\cap\mathrm{First}(\alpha_j),(1\leqslant i,j\leqslant n,i\ne j)$== 或 ==$a\in\mathrm{First}(\alpha_i)\cap\mathrm{Follow}(A),(1\leqslant i\leqslant n,A\overset{\ast}{\Rightarrow}\varepsilon)$== 或 ==$\alpha_i\overset{\ast}{\Rightarrow}\varepsilon$ 且 $\alpha_j\overset{\ast}{\Rightarrow}\varepsilon,(1\leqslant i,j\leqslant n,i\ne j)$==，则对应于文法 $G$ 的自顶向下分析需要回溯。

**LL(1) 文法** 若一个文法 $G[Z]$ 满足以下条件，则称为 LL(1) 文法

1. 文法不含左递归，即不含 $Z\to Za$ 类似的形式
2. 对某个非终结符 $A$，若其对应的产生式规则为 $A\to \alpha_1\mid \alpha_2\mid \cdots\mid \alpha_n$，则 $\mathrm{First}(\alpha_i)\cap\mathrm{First}(\alpha_j)=\varnothing$，$1\leqslant i,j\leqslant n,i\ne j$
3. 对文法中每一个非终结符 $A$，若 $A\overset{\ast}{\Rightarrow}\varepsilon$，则 $\mathrm{First}(\alpha_i)\cap\mathrm{Follow}(A)=\varnothing$，$1\leqslant i\leqslant n$

**例** 对于文法 $Z\to Za\mid b$，求 2 中的集合

$$
\begin{aligned}
\alpha_1&=Za\\
\alpha_2&=b\\
\text{First}(Za)&=\{b\}\\
\text{First}(b)&=\{b\}\\
\text{First}(Za)\cap\text{First}(b)&=\{b\}\ne\varnothing
\end{aligned}
$$

**例** 对于文法 $Z\to Za\mid\varepsilon$，求 3 中的集合

$$
\begin{aligned}
\text{First}(Za)&=\{a,\#\}\\
\text{Follow}(Z)&=\{a\}\\
\text{First}(Za)\cap\text{Follow}(Z)&=\{a\}\ne\varnothing
\end{aligned}
$$

> 空串 $\varepsilon$ 不可能属于 $\text{Follow}$ 集

### 4.3.2. 左递归文法的改造

具有左递归文法的自顶向下分析需要回溯，只有遇到错误时才能回溯，因此可能会造成无穷循环。消除左递归需要进行两方面的讨论

#### 1. 消除直接左递归

若某个文法的非终结符 $A$ 的产生式规则是直接左递归：$A\to A\alpha\mid\beta$，其中 $\alpha,\beta\in(V_N\cup V_T)^\ast$。若 $\beta$ 不以 $A$ 打头，可以改写为：

$$
\begin{aligned}
A&\to \beta A^\prime\\
A^\prime&\to\alpha A^\prime\mid\varepsilon
\end{aligned}
$$

式中， $A^\prime$ 是新增的非终结符号。

一般地，若 $A$ 的全部产生式规则为

$$
A\to A\alpha_1\mid A\alpha_2\mid\cdots\mid A\alpha_m\mid\beta_1\mid\beta_2\mid\cdots\mid\beta_n
$$

式中，$\beta_i$ 不以 $A$ 开头，且 $\alpha_i\ne\varepsilon$，则可改写为

$$
\begin{aligned}
A&\to\beta_1 A^\prime\mid\beta_2 A^\prime\mid\cdots\mid\beta_n A^\prime\\
A^\prime&\to\alpha_1 A^\prime\mid\alpha_2 A^\prime\mid\cdots\mid\alpha_m A^\prime\mid\varepsilon
\end{aligned}
$$

**例 4.2** 设有文法 $G[E]$

$$
\begin{aligned}
E&\to E+T\mid E-T\mid T\\
T&\to T\ast F\mid T / F\mid F\\
F&\to (E)\mid i
\end{aligned}
$$

消除直接左递归有

$$
\begin{aligned}
&E\to E\alpha_1\mid E\alpha_2\mid\beta && \Rightarrow && E\to TE^\prime\\
& & & & &E^\prime\to+TE^\prime\mid -TE^\prime\mid \varepsilon\\
&T\to T\alpha_3\mid T\alpha_4\mid \beta && \Rightarrow && T\to FT^\prime\\
& & & & &T^\prime \to \ast F T^\prime\mid /F T^\prime\mid \varepsilon\\
& & & & & F\to (E)\mid i
\end{aligned}
$$


#### 2. 消除间接左递归

> 要求文法中不存在环路，即不存在 $A\overset{+}{\Rightarrow}A$，同时要求文法无 $\varepsilon\text{-}$ 产生式规则

消除间接左递归的步骤

1. 将文法 $G$ 的非终结符号按任意一种顺序排列成 $A_1,A_2,\cdots,A_n$
2. 依次对各个非终结符号的产生式进行左递归的消除（相当于选择排序）
    ```cpp
    for (j = 1; j <= n; j++) {
        for (k = 1; k <= j - 1; k++) {
            // 把每个形如 Aj -> Ak α 的规则改成
            //   Aj -> δ1 α | δ2 α | ... | δm α
            // 其中，Ak -> δ1 | δ2 | ... | δm 是关于当前 Ak 的产生式规则
            // 消除关于产生式规则 Aj 的直接左递归
        }
    }
    ```
3. 进一步化简消除左递归之后的新文法，即删除多余的产生式规则

**例** 设有文法 $G[S]$

$$
\begin{aligned}
S&\to Sa\mid Tbc\mid Td\\
T&\to Se\mid gh
\end{aligned}
$$

1. 将非终结符号排序为 $S,T$
2. 消除 $S$ 左递归，有
    $$
    \begin{aligned}
    S&\to(Tbc\mid Td)S_1\\
    S_1&\to aS_1\mid\varepsilon
    \end{aligned}
    $$
3. 对 $T\to Se$ 将 $S$ 展开代入得
    $$T\to(Tbc\mid Td)S_1e\mid gh=T(bc\mid d)S_1e\mid gh$$
    即 
      $$
    \begin{aligned}
    T&\to ghT_1\\
    T_1&\to(bc\mid d)S_1eT_1\mid\varepsilon
    \end{aligned}
    $$

### 4.3.3. 回溯的消除

定理 4.1 给出了回溯的原因，即在文法中某个非终结符号有多个候选产生式规则可用，对应于左递归文法的自顶向下分析法一定是回溯的。因此，消除回溯需要对文法进行改造，改造的主要方法：

1. 提取左因子。若有 $A\to\alpha\beta_1\mid\alpha\beta_2\mid\cdots\mid\alpha\beta_n\mid\gamma$，则可替换为 $A\to\alpha A^\prime\mid\gamma, A^\prime\to\beta_1\mid\beta_2\mid\cdots\mid\beta_n$
2. 消除左递归

## 4.4. 构造递归下降分析法

在对一个文法进行改造并消除回溯后，就可以构造一个不带回溯的自顶向下分析程序了，该分析程序由一组递归函数或过程组成，每个函数或过程对应文法的一个非终结符。这样的分析程序称为递归向下分析器。每个函数或过程的功能是识别由该非终结符所表示的语法成分。

构造递归下降分析程序时，每个函数名是相应的非终结符，函数体则根据产生式规则右部符号串的结构编写，其基本思路：

1. 当遇到终结符 $a$ 时，编写语句
    ```python
    if symbol == 'a':
        symbol = getSymbol()
    ```
2. 当遇到非终结符 $A$ 时，则编写语句调用 $A()$
3. 当遇到 $A\to\varepsilon$ 产生式规则时，编写语句
    ```python
    if symbol not in Follow(A):
        raise Error
    ```
4. 当某个非终结符有多个候选产生式规则时
    1. 情况 1
        ```python
        if symbol in First(αi):
            A -> αi
        ```
    2. 情况 2
        ```python
        if symbol in Follow(A) and αi=*=>ε:
            A -> αi
        ```

**对于其中步骤的一些理解**

> 对于步骤 3，例如当前推导至 $xxxxA$，前面的项均为终结符，所以当读入的字符不在 $\mathrm{Follow}(A)$ 中，那么就需要 ==$A$ 所推导出来的表达式==来匹配输入的符号，即父债子偿。若 $A\to\varepsilon$，那么这条规则就不满足，导致程序结束。
> 对于步骤 4.2，相当于有 $A\xrightarrow{\ast}\varepsilon$，那么和步骤 3 类似，如果有这个条件，那么程序终将在推导到 $\varepsilon$ 时结束。

## 4.5. 非递归的预测分析方法

### 4.5.1. 预测分析程序工作原理

一个预测分析表包括

- 一张预测分析表 $M$，也称 LL(1) 分析表
- 一个栈（栈底符号为 `#`）
- 一个预测分析控制程序
- 一个输入缓冲区
- 一个输出流

> 预测分析表是一个二维表，横行为非终结符，列为终结符，其元素形式为 $M[S,a]$，含义是当前栈顶 $S$ 面对当前向前看符号 $a$ 应当采取的动作，即选择 $S$ 的那一条产生式规则进行推导或进行出错处理

![](./assets/compile040501.svg)

预测分析控制程序流程

![](./assets/compile040502.svg)

1. 若 $X=a=\tt{\#}$，则分析器工作结束，分析成功
2. 若 $X=a\ne\tt{\#}$，则分析器把 $X$ 从栈顶弹出，让输入指针指向下一个符号
3. 若 $X$ 是一个非终结符，则查阅预测分析表 $M$，若在 $M[X,a]$ 中存放着关于 $X$ 的一个产生式规则，则先把 $X$ 弹出，再把产生式规则的右部符号串按==逆序==意义压栈。若 $M[X,a]=\{X,\varepsilon\}$，则预测分析表直接弹出 $X$。若 $M[X,a]$ 为出错标志，则调用出错处理。

> 与算术表达式求值的区别
> 此处为==推导==的过程，而算术表达式求值是==归约==的过程

**例 4.9** 设文法 $G[E]$

$$
\begin{aligned}
E&\to TE_1\\
E_1&\to+TE_1\mid\varepsilon\\
T&\to FT_1\\
T_1&\to \ast FT_1\mid \varepsilon\\
F&\to (E)\mid i
\end{aligned}
$$

则有预测分析表

| 非终结符\\输入符号 |     $i$     |         $+$         |      $\ast$       |     $($     |         $)$         |        $\#$         |
|:------------------:|:-----------:|:-------------------:|:-----------------:|:-----------:|:-------------------:|:-------------------:|
|        $E$         | $E\to TE_1$ |                     |                   | $E\to TE_1$ |                     |                     |
|       $E_1$        |             |   $E_1\to +TE_1$    |                   |             | $E_1\to\varepsilon$ | $E_1\to\varepsilon$ |
|        $T$         | $T\to FT_1$ |                     |                   | $T\to FT_1$ |                     |                     |
|       $T_1$        |             | $T_1\to\varepsilon$ | $T_1\to\ast FT_1$ |             | $T_1\to\varepsilon$ | $T_1\to\varepsilon$ |
|        $F$         |  $F\to i$   |                     |                   | $F\to (E)$  |                     |                     |

由此也可用预测分析器来推导输入串 $i+i\ast i$

### 4.5.2. 构造预测分析表

1. 计算文法 $G$ 的每个非终结符的 First 集和 Follow 集。
   - 对每一个文法符号 $X\in(V_\mathrm{T}\cup V_\mathrm{N})$，如下计算 $\text{First}(X)$
       1. 若 $X\in V_\mathrm{T}$，则 $\text{First}(X)=\{X\}$
       2. 若 $X\in V_\mathrm{N}$，且有产生式规则 $X\to a\cdots, a\in V_\mathrm{T}$，则 $a\in \text{First}(X)$
       3. 若 $X\in V_\mathrm{N}$，且有 $X\to \varepsilon$，则 $\varepsilon\in \text{First}(X)$
       4. 若有产生式规则 $X\to X_1X_2\cdots X_n$，对于任意 $j,1\leqslant j\leqslant n$，当 $X_1X_2\cdots X_{j-1}$ 都是非终结符，且 $X_1X_2\cdots X_{j-1}\overset{\ast}{\Rightarrow} \varepsilon$，则将 $\text{First}(X_j)$ 中的非 $\varepsilon$ 元素加到 $\text{First}(X)$ 中，特别地，如果 $X_1X_2\cdots X_n\overset{\ast}{\Rightarrow} \varepsilon$，则 $\varepsilon\in \text{First}(X)$
       5. 反复执行上述 4 步，直到 First 集不再变化为止
    - 对文法中每一个 $A\in V_\mathrm{N}$，如下计算 $\text{Follow}(A)$
        1. 若 $A$ 是文法的开始符号，则将 `#` 加到 $\text{Follow}(A)$ 中
        2. 若 $A\to \alpha B\beta$ 是一条产生式规则，则把 $\text{First}(\beta)$ 中的非 $\varepsilon$ 加到 $\text{Follow}(B)$ 中
        3. 若 $A\to \alpha B$ 或 $A\to \alpha B\beta$ 是一条产生式规则，且 $\beta \overset{\ast}{\Rightarrow} \varepsilon$，则把 $\text{Follow}(A)$ 加到 $\text{Follow}(B)$ 中。
        4. 反复执行上述 3 步，直到每个非终结符的 Follow 集不再变化为止
2. 对文法的每一个产生式规则 $A\to\alpha$，若 $a\in \text{First}(\alpha)$，则令 $M[A,a]=A\to\alpha$
3. 若 $\varepsilon\in\mathrm{First}(\alpha)$，对任何 $b\in \text{Follow}(A)$，则令 $M[A, b]=A\to\alpha$
4. 把预测分析表中无定义的空白元素标上出错标志

> 对于 1.1.4. 其理解为：有以下产生式规则
> $$X\to \underset{\text{Derive the }\varepsilon}{\underbrace{X_1X_2\cdots X_{j-1} } }X_jX_{j+1}\cdots X_n$$
> 由于前面部分可以推导出 $\varepsilon$，因此可以得到 $X_j$ 即为 $X$ 的 First

> 对于 1.2.3. 的理解为：有产生式规则 $A\to \alpha B$ 或 $A\to \alpha B\beta$，而 $\beta \overset{\ast}{\Rightarrow} \varepsilon$，那么跟在 $A$ 后面的符号串，也一定跟在 $B$ 的后面

#TODO 书上的例子

**例 4.10** 设有文法 $G[E]$，构造预测分析表

$$
\begin{aligned}
E&\to TE_1\\
E_1&\to ATE_1\mid \varepsilon\\
T&\to FT_1\\
T_1&\to MFT_1\mid \varepsilon\\
F&\to(E)\mid i\\
A&\to +\mid -\\
M&\to \ast\mid /
\end{aligned}
$$

| $V_\mathrm{N}$\\☇ |     $i$     |         $+$         |         $-$         |     $\ast$     |      $/$       |     $($     |         $)$         |        $\#$         |
|:-----------------:|:-----------:|:-------------------:|:-------------------:|:--------------:|:--------------:|:-----------:|:-------------------:|:-------------------:|
|        $E$        | $E\to TE_1$ |                     |                     |                |                | $E\to TE_1$ |                     |                     |
|       $E_1$       |             |   $E_1\to ATE_1$    |   $E_1\to ATE_1$    |                |                |             |                     | $E_1\to\varepsilon$ |
|        $T$        | $T\to FT_1$ |                     |                     |                |                | $T\to FT_1$ |                     |                     |
|       $T_1$       |             | $T_1\to\varepsilon$ | $T_1\to\varepsilon$ | $T_1\to MFT_1$ | $T_1\to MFT_1$ |             | $T_1\to\varepsilon$ | $T_1\to\varepsilon$ |
|        $F$        |  $F\to i$   |                     |                     |                |                | $F\to (E)$  |                     |                     |
|        $A$        |             |      $A\to +$       |      $A\to -$       |                |                |             |                     |                     |
|        $M$        |             |                     |                     |  $M\to \ast$   |    $M\to /$    |             |                     |                     |

### 4.5.3. 预测分析的出错处理

非递归的预测分析器在分析过程中会在以下两种情况下发现源程序的语法错误

1. 栈顶上的终结符号与下一个输入符号不匹配
2. 若栈顶上是非终结符 $A$，下一个输入符号是 $a$，并且分析表入口 $M[A,a]$ 为空

发现错误后，系统要尽快从错误中恢复过来，使分析能够继续下去。基本的做法是，跳过输入串中的一些符号直到遇到“同步符号”为止。这种做法的效果依赖于同步符号集的选择。

