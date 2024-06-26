---
title: 第 2 章 文法与语言
---

## 2.1. 符号串与语言

### 1. 字母表

#### 定义

字母表 $\Sigma$ 是一个有穷符号集合

- 符号：字母、数字、标点符号

#### 字母表上的运算

- 乘积
    - $\Sigma_1\Sigma_2=\{ab|a\in\Sigma_1,b\in\Sigma_2\}$
- $n$ 次幂
    - $\Sigma^0=\{\varepsilon\}$
    - $\Sigma^n=\Sigma^{n-1}\Sigma, n\geqslant 1$
    - 即为长度为 $n$ 的符号串构成的集合
- 正闭包
    - $\Sigma^{+}=\Sigma\cup\Sigma^2\cup\Sigma^3\cup\cdots$
- 闭包
    - $\Sigma^{*}=\Sigma^0\cup\Sigma\cup\Sigma^2\cup\Sigma^3\cup\cdots$

### 2. 串

#### 定义

- 设 $\Sigma$ 为一个字母表，$\forall x\in\Sigma^{*}$，$x$ 称为 $\Sigma$ 上的一个串。
    - 串是字母表中符号的一个有穷序列
- 串的长度 $|s|$，指符号的个数
- 空串 $|\varepsilon|$

#### 连接

$x$ 和 $y$ 是串，则 $x$ 和 $y$ 的连接—— $xy$，对于非空不相等串有 $xy\ne yx$

空串是连接运算的单位元，$\varepsilon s=s\varepsilon=s$

#### 幂

$$
\begin{cases}
s^0=\varepsilon\\
s^n=s^{n-1}s,n\geqslant 1
\end{cases}
$$
## 2.2. 文法定义

### 1. 文法的形式化定义

#### 文法

$$G=(V_T,V_N,P,Z)$$

- $V_T$ 终结符集合，为非空有穷集合
    - 终结符是文法所定义的语言的基本符号，有时也称为 token
- $V_N$ 非终结符集合，为非空有穷集合
    - 非终结符有时也称为“语法变量”
        - $V_T\cap V_N=\varnothing$
        - $V_T\cup V_N$ 文法符集合
- $P$ 产生式集合
    - ==产生式==描述了将终结符和非终结符组成串的方法
    - 产生式的一般形式 $\alpha\rightarrow\beta$ 或 $\alpha ::=\beta$，读作 $\alpha$ 定义为 $\beta$
        - $\alpha\in(V_T\cup V_N)^{+}$ 且 $\alpha$ 中至少包含 $V_N$ 中的一个元素，称为产生式的头或左部
        - $\beta\in(V_T\cup V_N)^{*}$ 称为产生式的体或者右部
- $Z$ 开始符号或识别符号
    - 第一条产生式规则的左部是识别符号

> 不引起歧义的前提下，可以只写产生式

#### 产生式的简写

对一组有相同左部的产生式

$$\alpha::=\beta_1,\alpha::=\beta_2,\cdots,\alpha::=\beta_n$$

可以简写为

$$\alpha::=\beta_1|\beta_2|\cdots|\beta_n$$

$\beta_i(i=1,2,\cdots,n)$ 称为 $\alpha$ 的候选式

### 2. 语言的形式化定义

#### 推导与归约

给定文法 $G=(V_T,V_N,P,Z)$，如果 $\alpha\rightarrow\beta\in P$，那么可以将符号串 $\gamma\alpha\delta$ 中 $\alpha$ 替换为 $\beta$，即将 $\gamma\alpha\delta$ 重写为 $\gamma\beta\delta$ 记作

$$\gamma\alpha\delta\Rightarrow\gamma\beta\delta$$

称文法中的符号串 $\gamma\alpha\delta$ 直接推导出 $\gamma\beta\delta$

- 其中，从 $\gamma\alpha\delta$ 推导出$\gamma\beta\delta$ 只用了一次推导，称之为==直接推导==，或者称$\gamma\beta\delta$ 直接归约到 $\gamma\alpha\delta$

> 简言之，用产生式右部替换产生式左部

若存在推导序列

$$\alpha_0\Rightarrow\alpha_1\Rightarrow\alpha_2\Rightarrow\cdots\Rightarrow\alpha_n$$

称串 $\alpha_0$ 经过 $n$ 步推导出 $\alpha_n$ 可简记为 $\alpha_0\overset{n}{\Rightarrow}\alpha_n$，这个序列是一个从 $\alpha_0$ 到 $\alpha_n$ 的长度为 $n$ 的==推导==

- $\alpha\overset{0}{\Rightarrow}\alpha$
- $\alpha_0\overset{+}{\Rightarrow}\alpha_n$ 表示经过正数步推导
- $\alpha_0\overset{*}{\Rightarrow}\alpha_n$ 表示经过若干（可以是 0）步推导

归约是推导的逆过程

#### 句型和句子

- 如果 $Z\overset{*}{\Rightarrow}\alpha,\alpha\in(V_T\cup V_N)^{*}$，则称 $\alpha$ 是文法 $G$ 的一个==句型==
    - 一个句型中既可包含终结符，又可包含非终结符，也可能是空串
- 如果 $Z\overset{*}{\Rightarrow}\alpha,\alpha\in V_T^{*}$，则称 $\alpha$ 是 $G$ 的一个==句子==

> [!note]
> - 句型中可以包含非终结符
> - 句子中不可以包含非终结符

#### 语言

==由文法 $G$ 的开始符号 $Z$ 推导出的所有句子构成的集合==称为文法 $G$ 生成的语言，记为 $L(G)$

$$L(G)=\{x|Z\overset{+}{\Rightarrow}x,x\in V_T^*\}$$

由语言的定义可知，当文法给定时，语言也就确定了。语言 $L(G)$ 是 $V_T^*$ 的子集，$L(G)$ 中的每个符号均由非终结符组成，且该符号串能由 $Z$ 推导出来。


### 3. 短语 直接短语 句柄

设 $G[Z]$ 是一个文法，假定 $\alpha\beta\delta$ 是 $G$ 的一个句型，如果有

$$
Z\overset{+}{\Rightarrow}\alpha A\delta, A\overset{+}{\Rightarrow}\beta
$$

则称 $\beta$ 是句型 $\alpha\beta\delta$ 相对于非终结符 $A$ 的短语。特别的，如果有 $A$ 直接推导到 $\beta$，则称 $\beta$ 是句型 $\alpha\beta\delta$ 相对于产生式规则 $A\rightarrow\beta$ 的==直接短语==，一个句型的最左直接短语称为该句型的==句柄==。

> [!caution]
> 短语、直接短语、句柄一定是相对于某一句型的

**例** 设有文法 $G[E]$

$$
\begin{aligned}
E&\rightarrow E+T \mid E-T \mid T\\
T&\rightarrow T*F \mid T/F \mid F\\
F&\rightarrow (E) \mid i
\end{aligned}
$$

假设句型 $F-T*(E-T)$ 的推导过程

$$
\begin{aligned}
E&\Rightarrow E-T\Rightarrow E-T*F\Rightarrow E-T*(E)\Rightarrow E-T*(E-T)\\
&\Rightarrow T-T*(E-T)\Rightarrow F-T*(E-T)
\end{aligned}
$$

语法分析树如下

![](./assets/S02_01.svg)

其中

- 最左边的 $F$ 为句柄
- 短语有 $\{F,E-T,(E-T),T*(E-T),F-T*(E-T)\}$
- 直接短语有 $\{F,E-T\}$


### 4. 规范推导和规范归约

一般==最右推导为规范推导，最左归约为规范归约==

- 最右推导的逆过程为最左归约
- 最左推导的逆过程为最右归约

最右推导就类似如下递归

```python
def f(root):
    process(root)
    f(root.right)
    f(root.left)
```

## 2.3. 语法分析树与文法的二义性

### 1. 语法分析树

> 例子见上面

有助于理解一个句子语法结构的层次

$G[Z]=(V_N,V_T,P,Z)$ 是一个上下文无关文法

- 根节点标记为 $Z$
- 根节点外的每一个节点也有一个标记，是 $V_N\cup V_T\cup\{\varepsilon\}$ 中的符号
- 每一个内部节点的标记 $A$ 必在 $V_N$ 中
- 若某个内部节点标记为 $A$，其孩子节点的标记从左到右分别为 $X_1,X_2,\cdots X_n$，则 $A\rightarrow X_1 X_2\cdots X_n$ 必为 $P$ 中的一条产生式规则
- 若结点有标记 $\varepsilon$，则该节点为叶子，且是它父亲唯一的孩子

对于文法 $G[E]$

$$
\begin{aligned}
E&\rightarrow E+T \mid E-T \mid T\\
T&\rightarrow T*F \mid T/F \mid F\\
F&\rightarrow (E) \mid i
\end{aligned}
$$

可以发现，先有的规则，运算符优先级更低；而对应到==二叉树==中，下层运算未结束，上层的运算不能进行。

### 2. 文法的二义性

如果一个文法存在某个句子对应两棵不同的语法树，则这个文法是二义的。即，若一个文法中存在某个句子，它有两个不同的最左（右）推导，则它是二义的。

**例** 设 $G[E]$
$$
E\rightarrow i \mid E+E \mid E*E \mid (E)
$$

关于 $i*i+i$ 有两种不同的最右推导

![](./assets/S02_02.svg)



从该例来看，因为不同优先级的运算符都写在了一个推导语句中，前面提到了==规则写在前面的优先级更低一些==，此处的二义性就源自混淆了优先级。

### 3. 二义性的消除

- 改写原有的文法，构造一个等价的新文法，把排除二义性的规则合并到原文法中
- 不改变原有文法，附加限制性条件
    - 运算符优先级顺序
    - 结合规则（左结合、右结合）

### 4. 文法的化简

- 若一个非终结符不能推导出终结符号串，则该非终结符是无用的
    - 函数递归没有出口
- 若一个符号不能出现在文法的任何句型中，则该符号是无用的
    - 定义了函数 `func` 但是从来没有被调用

文法化简思路源于语言的生成

- 从识别符号开始进行推导，若推导出的某句型包括某个不能推导出终结符号的非终结符，则删除包括该非终结符号的所有产生式规则
    - 递归没有出口
- 从终结符号逆向归约，若归约得到的某个非终结符不能归约到文法的符号，则删除包括该非终结符的所有产生式规则
    - 归约没有溯源（函数没有定义）
- 删除不能出现在句型中的所有符号对应的产生式规则
    - 函数没有调用

### 5. 语言的分类

文法包含的广泛程度 $0>1>2>3$

#### 0 型文法

若文法 $G[Z]=(V_N,V_T,P,Z)$ 中的每个产生式规则为如下形式：

$$\alpha\rightarrow\beta$$

式中，$\alpha\in(V_T\cup V_N)^*$ 且至少包含一个非终结符号，而 $\beta\in(V_T\cup V_N)^*$ 则 $G[Z]$ 为 0 型文法

0 型文法相当于图灵机，未加任何限制，识别能力最强

#### 1 型文法（上下文敏感文法）

若文法 $G[Z]=(V_N,V_T,P,Z)$ 中的每个产生式规则为如下形式：

$$\alpha A\beta\rightarrow\alpha v\beta$$

式中，$\alpha,\beta\in(V_N\cup V_T)^*$，$A\in V_N$，$v\in(V_T\cup V_N)^+$，则 $G[Z]$ 为 1 型文法

#### 2 型文法（上下文无关文法）

若文法 $G[Z]=(V_N,V_T,P,Z)$ 中的每个产生式规则为如下形式：

$$A\rightarrow v$$

式中，$A\in V_N$，$v\in(V_T\cup V_N)^+$，则 $G[Z]$ 为 2 型文法

#### 3 型文法（正规文法）

若文法 $G[Z]=(V_N,V_T,P,Z)$ 中的每个产生式规则为如下形式：

$$
A\rightarrow\alpha B\quad\text{or}\quad A\rightarrow\alpha
$$

式中，$A,B\in V_N$，$\alpha\in V_T$，则 $G[Z]$ 为右线性文法

若文法 $G[Z]=(V_N,V_T,P,Z)$ 中的每个产生式规则为如下形式：

$$
A\rightarrow B\alpha \quad\text{or}\quad A\rightarrow\alpha
$$

式中，$A,B\in V_N$，$\alpha\in V_T$，则 $G[Z]$ 为左线性文法

