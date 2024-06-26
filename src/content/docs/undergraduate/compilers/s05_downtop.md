---
title: 第 5 章 自底向上的语法分析（上）
---

## 5.1. 引言

- ==“移进-归约”法==基本思想
- 算法优先分析技术及优先函数
- LR 系列分析技术（LR(0), SLR(1), LR(1), LALR(1) 等）
- 二义性文法的应用
- 语法分析器的自动生成器 YACC

由于“移进-归约”法的基本思想，这些“归约”都是最左归约。因为输入串中的符号是从左向右逐个移进栈，这样最左边的可归约子串先被归约掉。

## 5.2. 自底向上的语法分析面临的问题

设有文法 $G[S]$

$$
\begin{aligned}
S&\to cAd\\
A&\to a\mid Aa
\end{aligned}
$$

对于输入串 `#caad#`，采用自底向上分析技术，根据“移进-归约”思想，有以下序列

![](./assets/compile050201.svg)

其中，面临两个问题：

1. 如何寻找“可归约子串”？如何判定使用 $A\to a$ 还是 $A\to Aa$？
2. 可归约子串被归约到到一个非终结符？

可归约子串总是在栈顶产生，不会在栈内部产生。另外，在自底向上语法分析中，只有 4 个动作：移进、归约、接受、报错。

## 5.3. 算符优先分析技术

### 5.3.1. 算符优先关系的定义

很好理解，就例如乘法的优先级要高于加法。对于一个输入串 `#2*(3+4)#` 可以画出语法分析树，最终归约到一个结果。

![](./assets/compile050301.svg)

由图中，非终结符代表的是值，终结符都是运算符。因此在自底向上的算符优先分析中，==运算符是指文法中的所有终结符==，==运算数（运算对象）是所有非终结符==。归约的先后次序隐含了计算的先后次序。

算符优先分析技术对文法有一定的要求，如两个操作数之间至少有一个运算符。也就是说，若用非终结符表示操作数，则两个非终结符号之间至少要有一个或一个以上的运算符。

**定义 5.1** 若文法 $G$ 中不存在形式 $A\to\cdots UV\cdots$，其中 $A, U, V$ 均为非终结符，则称该文法是算符文法。通常，算符文法中也不包含 $A\to \varepsilon$，即不包含空规则。

由定义可知，算符文法产生的所有句型都满足：两个非终结符之间至少有一个或以上的终结符（运算符）

若文法 G 不是算符文法，则不能采用算符优先分析法。若是，则可以尝试对运算符进行优先关系分析。

在表达式 `#2+3*4+5*6#` 中只要通过相邻两个运算符之间的优先关系（如 `2+3*4` 中 `+` 和 `*` 相邻），就可以进行正确运算了。通过考察相邻运算符之间的优先关系，也许可以进行语法分析。由此引出“相邻”的概念

**定义 5.2** 若有 $ab$ 或 $aWb$，其中 $a,b\in V_\mathrm{T}$，$W\in V_\mathrm{N}$，则称运算符 $a,b$ 相邻

> [!warning]
> 运算符 $a$ 和 $b$ 相邻，要求 $a$ 在左边，$b$ 在右边，先后顺序不能颠倒，且 $a$ 与 $b$ 之间要么直接依靠在一起，要么最多有一个非终结符。显然，运算符 $a,b$ 相邻不一定有运算符 $b,a$ 相邻成立。

**定义 5.3** 设文法 G 是一个==算符文法==，对文法 G 中任何一对终结符 $a$ 和 $b$，定义：

1. $a\doteq b$ 当且仅当文法 G 中存在规则 $A\to \cdots ab\cdots$ 或 $A\to\cdots aRb \cdots$，其中 $a,b\in V_\mathrm{T};R\in V_\mathrm{N}$
2. $a \lessdot b$ 当且仅当文法 G 中存在规则 $A\to\cdots aR \cdots$ 并且 $R\overset{+}{\Rightarrow}b\cdots$ 或 $R\overset{+}{\Rightarrow}Qb\cdots$，其中 $a,b\in V_\mathrm{T};Q,R\in V_\mathrm{N}$
3. $a \gtrdot b$ 当且仅当文法 G 中存在规则 $A\to\cdots Rb \cdots$ 并且 $R\overset{+}{\Rightarrow}\cdots a$ 或 $R\overset{+}{\Rightarrow}\cdots aQ$，其中 $a,b\in V_\mathrm{T};Q,R\in V_\mathrm{N}$

> 书上的 $\doteq$ 符号好像点应该是夹在在等号两线中间，但是好像没找到这个符号，最像的只有 $\eqcirc$，$=\!\!\!\!\!\cdot$ 写出来又太丑

> [!note] 对于定义的理解
> 首先，归约是指产生式右部归约为产生式左部
> 对于 1，产生式右部包含了 $a,b$，那么这两个算符必定==同时能够被归约==，即对应了算符的优先级相等
> 对于 2 和 3，$R$ 能够推导出算符 $b$，那么在归约过程中，==$b$ 应当先被归约，而 $aR$ 应当后被归约==，也就对应着，==先被归约的优先级更高，后被归约的优先级更低==。

$a,b$ 之间可能不存在优先关系，有可能是上述 3 种之一，也有可能是 3 种中的两种或多种。但对我们有用的是==不存在或存在一种==

**定义 5.4** 若一个算符文法 G 种任何一对终结符号 $a,b$ 之间最多存在上述中的一种，则称文法 G 是一个==算符优先文法==。

显然，若一对终结符号 $a,b$ 之间不存在优先关系，表明 $a,b$ 不可能相邻

> 注意：不要混淆==算符文法==和==算符优先文法==

为方便处理，我们约定：

- $\#\lessdot$ 任何终结符号
- 任何终结符号 $\gtrdot \#$
- $\#$ 与 $\#$ 之间不存在优先关系

对于句型 $AaBbCcDd$，有产生式规则 $U\to BbCcD$，则可以看作以下形式

![](./assets/compile050302.svg)

可归约子串特点：左边 $\lessdot$，中间 $\doteq$，右边 $\gtrdot$

而对于一般形式的句型，可归约子串的结构与其形式类似。

![](./assets/compile050303.svg)
算符优先分析法首先定义终结符之间的优先关系，然后通过该优先关系按图所示方式，寻找或确定可归约子串。由此，引出素短语的定义

**定义 5.5** 算符优先文法的句型中具有上图结构特征且至少含有一个终结符的子串称为该句型的一个素短语（质短语）

> 一个素短语不可能包含其他的素短语，素短语是归约的==最小单位==

> 算符文法不允许两个相邻非终结符或者只有单个非终结符在规则的右部

**例 5.3** 试分析下图终结符之间的优先关系

![](./assets/compile050304.svg)

> [!example] 解答
> - 有 $A\to CcdD$，故 $c\doteq d$
> - $d$ 与 $a$ 相邻， $CcdD$ 先被归约，因此 $d \gtrdot a$；或由 $Z\to Aa\cdots,A \overset{+}{\Rightarrow} \cdots dD,d \gtrdot a$
> - $a$ 与 $e$ 相邻，$eE$ 先被归约，因此 $a \lessdot e$
> 
> 句型 $\#CcdDaeE$ 的素短语有两个 $CcdD$ 和 $eE$

**定义 5.6** 算符优先文法的一个句型中最左边的素短语称为==最左素短语==

### 5.3.2. 算符优先关系表的生成

**定义 5.7** 对文法中每一个非终结符 $P$，定义 

- $\text{FirstVT} (P)=\{a\mid P \overset{+}{\Rightarrow} a\cdots \text{ or } P \overset{+}{\Rightarrow} Qa \cdots, a\in V_\mathrm{T}, Q\in V_\mathrm{N}\}$
- $\text{LastVT} (P)=\{a\mid P \overset{+}{\Rightarrow}\cdots a \text{ or } P \overset{+}{\Rightarrow}\cdots aQ, a\in V_\mathrm{T}, Q\in V_\mathrm{N}\}$

基于这两个集合，可以给出如下表述 $\lessdot, \gtrdot, \doteq$ 的等价定义

**定义 5.8** 设文法 G 是一个算符文法，对文法 G 中任何一对终结符 $a,b$，定义

1. $a\doteq b$ 当且仅当文法 G 中存在规则 $A\to\cdots ab\cdots \text{ or }A\to \cdots aRb\cdots$，其中 $a,b\in V_\mathrm{T}, R\in V_\mathrm{N}$
2. $a\lessdot b$ 当且仅当文法 G 中存在规则 $A\to \cdots aR\cdots \text{ and } b\in \text{FirstVT} (R)$，其中 $a,b\in V_\mathrm{T}, R\in V_\mathrm{N}$
3. $a \gtrdot b$ 当且仅当文法 G 中存在规则 $A\to \cdots Rb\cdots \text{ and } a\in \text{LastVT} (R)$，其中 $a,b\in V_\mathrm{T}, R\in V_\mathrm{N}$

要找出一个句型中的最左素短语，需要知道任何一对终结符之间的优先关系。为此用二维表登记所有的终结符之间的优先关系。

| None | $a$       | $b$        |
| --- | --------- | ---------- |
| $a$ | $\gtrdot$ | $\lessdot$ |
| $b$ | $\gtrdot$ | $\gtrdot$  | 

> 表格行中的终结符出现在左边，列中的终结符出现在右边。如表格 $a$ 行 $b$ 列中填写 $\lessdot$，含义为 $a \lessdot b$，即 $a$ 出现在左边，$b$ 出现在右边相邻时，$a$ 的优先关系小于 $b$

#### 1. 求 $\text{FirstVT}(P)$ 的算法

1. 若有规则 $P\to a\cdots \text{ or }P\to Qa\cdots$，则 $a\in \text{FirstVT}(P)$
2. 若有规则 $P\to Q\cdots$，则 $\text{FirstVT}(Q)$ 全部加入 $\text{FirstVT}(P)$
3. 反复利用上述两条规则，直到所有的非终结符的 FirstVT 集不再增大为止

#### 2. 求 $\text{LastVT}(P)$ 的算法

1. 若有 $P\to \cdots a \text{ or } P\to \cdots aQ$，则 $a\in \text{LastVT}(P)$
2. 若有 $P\to \cdots Q$，则 $\text{LastVT}(Q)$ 全部加入 $\text{LastVT}(P)$
3. 反复利用上述两条规则，直到所有的非终结符的 LastVT 集不再增大为止

以求 FirstVT 集为例，具体实现时，可以定义一个布尔数组 $\text{FirstVT}[P,a]$，$\text{FirstVT}[P,a]=\text{true}$ 表示 $a\in \text{FirstVT}(P)$ 

对 $\text{FirstVT}[P,a]$ 赋初值，再利用一个栈，将所有初始 $\text{FirstVT}[P,a]=\text{true}$ 的符号对 $(P,a)$ 入栈，然后对栈施加一个循环，用于完成 2 和 3 的任务

```typescript
while (stack.length > 0) {
    let q: Pair = stack.pop();  // [Q, a]
    for (let rule in rules.match("P→Q...").group()) {  // 考察所有 P→Q... 的规则
        if (FirstVT[P, a] === false) {
            FirstVT[P, a] = true;
            stack.push([P, a]);
        }
    }
}
```

**例 5.4** 设有文法 $G[S]$

$$
\begin{aligned}
S&\to cAd\\
A&\to a \\
A & \to Aa
\end{aligned}
$$

求出 FirstVT 集和 LastVT 集

> [!example] 解答
> 
> |     | FirstVT | LastVT |
> |:---:|:-------:|:------:|
> | $S$ |   $c$   |  $d$   |
> | $A$ |   $a$   |  $a$   |
> 
> 对每一个规则进行分析
> 
> 1. 有式子 $cAd$ 所以 ==$c \doteq d$== ；同时 $c \lessdot \text{FirstVT}(A)$ 即 ==$c \lessdot a$== ；有 $\text{LastVT}(A) \gtrdot d$ 即 ==$a \gtrdot d$==
> 2. 对于第三条式子，$\text{LastVT}(A) \gtrdot a$ 即 ==$a \gtrdot a$==
> 
> 
> |     | a          | c   | d         |
> |:---:|:----------:|:---:|:---------:|
> | a   | $\gtrdot$  |     | $\gtrdot$ |
> | c   | $\lessdot$ |     | $\doteq$  |
> | d    |            |     |           |
> 
> 由于表中没有多重定义，即一个单元格内没有同时存在多种关系，因此是算符优先文法。
> 

### 5.3.3. 算符优先分析总控程序

有了算符优先关系表，就可以在“移进-归约”过程中，在栈内部寻找最左素短语，一旦找到，就进行归约。

**例 5.6** 还是拿最熟悉的文法 G

$$
\begin{aligned}
E&\to E+T\mid T\\
T&\to T\ast F\mid F\\
F&\to (E)\mid i
\end{aligned}
$$

尝试分析句子 $\#i+i\ast i\#$

![](./assets/compile050306.svg)

1. 当栈顶运算符优先关系为 $a \lessdot b$ 或 $a\doteq b$ 时，将 $b$ 入栈
2. 当栈顶运算符优先关系为 $a\gtrdot b$ 时，此时 $b$ 不进栈，已经找到了最左素短语的==尾部==（右部），然后在栈内由栈顶向底搜索第一个出现 $\lessdot$ 的运算符，此时找到最左素短语的==头部==，头尾之间的子串即为最左素短语，然后进行==归约==。

注意到，我们在过程中直接将 $F\ast F$ 归约为 $T$，将 $T+F$ 归约为 $E$，其实分别是用 $T\to TF$ 和 $E\to E+T$ 来完成的。由此可见，算符优先分析法与规范归约的不同点在于：在前者中，由于==非终结符代表的是值（运算对象）==，因而我们不必关心非终结符之间在名字上的区别，不论他的名字是 $E$ 还是 $F$，所有的非终结符，都只是栈中作为相应属性值的一个==占位符==，名字无关紧要。因此最左短语 $F+F$ 与规则 $E\to E+T$ 的右部是相匹配的。

> 由于非终结符对归约没有实质性影响，因此非终结符其实可以不用进栈

归纳起来，算符优先分析法的总控程序工作过程有：

```typescript
let top = 1;             // 移进-归约栈的栈顶指针
let pos = 0;
stack[top] = '#'         // 初始时 # 进栈
while (true) {
    let a = inputSymbol();
    if (V_T.has(stack[top])) {
        pos = top;       // 栈顶符号是终结符，用 pos 指向他的位置
    } else {
        pos = top - 1;   // 栈顶是非终结符，次栈顶符号必为非终结符，用 pos 指向他
    }                    // stack[pos] 可理解为最靠近栈顶的终结符
    if (a === '#' && top === 2) {
        return SUCCESS;  // 成功结束
    }
    // 查算符优先表，处理 (stack[pos], a) 之间的优先关系
    let relation = table[stack[pos]][a];  
    switch (relation) {
        case '<':
        case '=': {
            stack.push(a);
            top++;
            break;
        }
        case '>': {
            top = derive(stack, pos);
            // 含义：最左素短语的尾部已经找到
            // 在栈内由栈顶向栈底搜索第一个出现 < 的运算符（找到最左素短语的头部）
            // 找到后，头尾之间的子串即为最左素短语
            // 把它归约为某个非终结符 N
            break;
        }
        default: {
            throw new Error('不存在优先关系');
        }
    }
}
```

### 5.3.4. 优先函数及其生成

在实际使用算符优先分析技术时，若有 $n$ 个终结符，则优先关系表的大小为 $n\times n$，此时我们需要减小表的大小，来进行优化。

基本想法：每个运算符（终结符）披上两个数。当终结符 $a$ 在左边出现，配 $f(a)$；当终结符 $a$ 出现在右边，配 $g(a)$. 如果每个终结符都能如愿配上两个数，则优先关系表的大小就可以缩减为 $2n$

**定义 5.9** 算符优先文法 $G$ 中每个终结符 $a$ 对应着两个数 $f(a)$ 和 $g(a)$，满足

- 若 $a \lessdot b$ 则 $f(a)<g(a)$
- 若 $a \gtrdot b$ 则 $f(a)>g(a)$
- 若 $a \doteq b$ 则 $f(a)=g(a)$

则称 $f$ 和 $g$ 为算符优先文法 $G$ 的优先函数

每个算符优先文法，都存在一张优先关系表，但并不总是存在优先函数。如果存在优先函数，实际上也就存在无穷多个优先函数。因为只要把一个优先函数的每一个数加上一个 $k$，就可以形成一个优先函数。

下面介绍一些构造优先函数的方法

#### 1. Bell 有向图法

基本步骤：

1. 对每个终结符 $a_1,a_2,\cdots,a_n$（包含 $\#$），上排画 $n$ 个结点，标记为 $f(a_i), i=1,2,\cdots,n$；下排画 $n$ 个结点，标记为 $g(a_j), j=1,2,\cdots,n$
2. 画有向边
    1. 若 $a_i \gtrdot a_j$，则画 $f(a_i)\to g(a_j)$
    2. 若 $a_i \lessdot a_j$，则画 $g(a_j)\to f(a_i)$
    3. 若 $a_i\doteq a_j$，则画 $f(a_i)\rightleftharpoons g(a_j)$
3. 配数。每个结点（无论 $f$ 还是 $g$）都配上一个数 $x$，它等于从该结点出发沿有向边所能到达的结点总数（结点自身也算）
4. 检验。检验这样构造出来的优先函数是否与优先关系表一致。若一致，则即为所求，否则该优先关系表不存在优先函数。

可以证明，这样构造出来的函数正是所要求的优先函数，也就是说，函数满足：

- 若 $a\doteq b$，则 $f(a)=g(b)$
- 若 $a\gtrdot b$，则 $f(a)>g(b)$
- 若 $a\lessdot b$，则 $f(a) <g(b)$

> [!example] 一些说明
> 当 $a\gtrdot b$，从 $f(a)$ 发出有向边到 $g(b)$，因此有 $f(a)\geqslant g(b)$。而对于等号成立条件来说，不妨假设有两者相等，则一定存在以下有向边构成的环路：
> 
> $$
> f_a\to g_b \to f_{q1}\to g_{q1}\to f_{q2}\to g_{q2}\to\cdots\to g_{qm}\to f_a
> $$
> 
> 这表示有下面的优先关系存在
> 
> $$
> a\gtrdot b,p_1\leqslant\!\!\!\!\cdot \,\,b,p_1\,\cdot\!\!\!\!\geqslant q_1,\cdots,p_m\,\cdot\!\!\!\!\geqslant q_m,a\leqslant\!\!\!\!\cdot\,\, q_m
> $$
> 
> 而对于任何优先函数 $f$ 和 $g$，按优先级定义，对于上述描述，有
> 
> $$
> f(a) > g(b) \geqslant f(p_1) \geqslant g(q_1) \geqslant \cdots \geqslant f(p_m) \geqslant g(q_m) \geqslant f(a)
> $$
> 
> 由此得到矛盾。这一矛盾表明，当 $a\gtrdot b$时，如果 $f(a)=g(b)$，则不存在优先函数。
> 
> 这样==带有环路的==，是==不存在优先函数==的，所以此处的==等号应当不成立==。

**例 5.7** 对表中的优先关系矩阵，用 Bell 有向图法构造优先函数

|     | a        | b         |
|:---:|:--------:|:---------:|
| a   | $\doteq$ | $\doteq$  |
| b   | $\doteq$ | $\gtrdot$ | 
> [!example] 解答
> 
> ![](./assets/compile050307.svg)
> 
> 表不一致，不存在优先函数。

#### 2. 逐次加一法（Floyd 法）

1. 初始所有终结符 $f(a)=g(a)=1$
2. 对优先关系表中每一对终结符 $(a,b)$，分情况讨论
    1. 若 $a\lessdot b$ 但 $f(a) \geqslant g(b)$，令 $g(b)=f(a)+1$
    2. 若 $a\gtrdot b$ 但 $f(a)\leqslant g(b)$，令 $f(a)=g(b)+1$
    3. 若 $a\doteq b$ 但 $f(a)\ne g(b)$，令 $f(a)=g(b)=\max\{f(a),g(b)\}$
3. 反复执行 2，直到以下两种情况
    1. $f(a),g(b)$ 都不再变化，此时 $f,g$ 为所求的优先函数
    2. 每个 $f,g$ 都大于 $2n$，则优先函数不存在

> 逐次加一法需要从优先关系矩阵从上到下，从左到右一一进行

**例 5.8** 对上面的例子使用逐次加一法构造优先函数

> [!example] 解答
> 初始化 $f(a)=g(a)=1,f(b)=g(b)=1$，而后逐步分析
> 
> |     Step     | $f(a)$ | $g(a)$ | $f(b)$ | $g(b)$ |
> |:------------:|:------:|:------:|:------:|:------:|
> | $a\doteq a$  |   1    |   1    |   1    |   1    |
> | $a\doteq b$  |   1    |   1    |   1    |   1    |
> | $b\doteq a$  |   1    |   1    |   1    |   1    |
> | $b\gtrdot b$ |   1    |   1    |   2    |   1    |
> | $a\doteq a$  |   1    |   1    |   2    |   1    |
> | $a\doteq b$  |   1    |   1    |   2    |   1    |
> | $b\doteq a$  |   1    |   2    |   2    |   1    |
> | $b\gtrdot b$ |   1    |   2    |   2    |   1    |
> | $a\doteq a$  |   2    |   2    |   2    |   1    |
> | $a\doteq b$  |   2    |   2    |   2    |   2    |
> | $b\doteq a$  |   2    |   2    |   2    |   2    |
> | $b\gtrdot b$ |   2    |   2    |   3    |   2    |
> 
> 由此可见，在 $b\gtrdot b$ 发生了循环，经过若干步后一定会得到 $f,g>2n$，故优先函数不存在。

#### 3. Martin 算法

Bell 有向图法本身不能发现是否存在优先函数，需要找到函数后再进行检验。Martin 算法也是基于有向图的，但算法本身能发现是否存在优先函数，不需要再检验。

1. 对每个终结符 $a_1,a_2,\cdots,a_n$ 包含 $\#$，上排画 $n$ 个结点，标记为 $f(a_i), i=1,2,\cdots,n$；下排画 $n$ 个结点，标记为 $g(a_j), j=1,2,\cdots,n$
2. 对所有的 $\lessdot, \gtrdot$ 画有向边，即 $a_i\lessdot a_j$ 则画 $f(a_i)\leftarrow g(a_j)$，$a_i \gtrdot a_j$ 则画 $f(a_i)\to g(a_j)$
3. 对 $\doteq$ 反复画有向边。若 $a_i\doteq a_j$，则画 $f(a_i)$ 向 $g(a_j)$ 的所有==直接后继结点==，以及则画 $g(a_i)$ 向 $f(a_j)$ 的所有==直接后继结点==。反复执行，直至没有新的有向边添加到图中。
4. 配数。若该有向图==有环路==，则==不存在优先函数==。否则，每个结点都配数 $x$，它等于从该结点出发==可达==的所有结点的数量（不包含自己）。

**例 5.9** 对上表使用 Martin 算法来求优先函数

> [!example] 解答
> 
> ![](./assets/compile050308.svg)
> 
> 对于 $b \gtrdot b$，画 $f(b)to g(b)$
> 2. 由于 $a\doteq b$，从 $g(a)$ 出发画到 $f(b)$ 的直接后继结点 $g(b)$
> 3. 由于 $a\doteq a$，从 $f(a)$ 出发画到 $g(a)$ 的直接后继结点 $g(b)$
> 4. $f(a)$ 的 $a$ 与 $g(b)$ 的 $b$ 优先级相同，那么要从 $g(b)$ 出发画到 $f(a)$ 的直接后继 $g(b)$ 此时生成了环

#### 引入优先函数的利弊

- 利：优先关系的存储空间从 $n\times n$ 减小到 $2n$
- 弊： 原本在优先关系表中，不存在优先关系的终结符对 $(a,b)$，现在通过优先函数，反而可以比较优先关系了。原本通过优先关系表能立即发现错误，现在多做了许多“移进-归约”动作，直到找出来的最左短语不能和任何规则的右部匹配时，才能出现报错，即推迟了错误的发现。

