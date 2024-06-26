---
title: 第 3 章 词法分析与有限自动机
---

## 3.1. 词法分析器的设计

### 3.1.1. 词法分析器的任务

输入源程序，输出单词符号

![](./assets/S03_01.svg)

单词符号是最小的语义单位。

### 3.1.2. 词法分析器输出形式

词法分析器所输出的单词符号通常表示为二元式（单词种别，单词符号的属性）

#### 单词的种类

| 种类   | 说明                                                       |
| ------ | ---------------------------------------------------------- |
| 关键字 | 又称基本字、保留字，是由程序语言定义的具有固定意义的标识符 |
| 标识符 | 用来标识各种名字，如变量名、数组名、过程名、函数名等       |
| 常数   | 整型、实型、字符型等，如 `0`, `abc`                        |
| 运算符 | 如算术运算符、逻辑运算符、关系运算符                       |
| 界限符 | `,` `;` `(` `)` `[` `]` `{` `}` `=` `/*` `*/` 等           | 

除以上外，还包括编辑符，如空格符、回车符、换行符、制表符等

#### 单词的属性值

书上好像并没有看到有什么比较有价值的东西😅

## 3.2. 词法分析器的手工打造

### 3.2.1. 确定的有限自动机

**定义 3.1** 一个确定的有限自动机（DFA）$M$ 是一个五元组 $M=(S,\Sigma,\delta,s_0,F)$，式中

- $S$ 是一个有限集，它的每一个元素称为一个状态
- $\Sigma$ 是一个有穷字母表，它的每个元素称为一个输入字符
- $\delta$ 是一个从 $S\times\Sigma$ 到 $S$ 的单值部分映射。$\delta(s,a)=s^\prime$ 表示在目前状态 $s$ 下输入字符为 $a$ 时，将转换到下一个状态 $s^\prime$，$s^\prime$ 被称为 $s$ 的一个后继状态

![](./assets/S03_02.svg)

- $s_0\in S$ 是==唯一==的初态
- $F\subseteq S$ 是一个终态，可空

**例如** 有 DFA $M=(\{0,1,2,3\},\{a,b\},\delta,0,\{3\})$，其中，$\delta$ 定义为

$$
\begin{aligned}
\delta(0,a)=1 &&\delta(0,b)=2 && \delta(1,a)=3 && \delta(1,b)=2\\
\delta(2,a)=1 &&\delta(2,b)=3 && \delta(3,a)=3 && \delta(3,b)=3
\end{aligned}
$$

可以画出状态转换矩阵，此时可以看出其定义中第三条的含义

![](./assets/S03_03.svg)

以及状态转换图

![](./assets/S03_04.svg)

### 3.2.2. 构造单词的确定有限自动机

### 3.2.3. 编写一个 C 语言词法分析器

留给实验部分

## 3.3. 有限自动机及其化简

### 3.3.1. 不确定有限自动机

**定义 3.2** 一个不确定有限自动机（NFA）$M$ 是一个五元组 $M=(S,\Sigma,\delta,S_0,F)$，其中

- $S$ 是一个有限集，它的每一个元素称为一个状态
- $\Sigma$ 是一个有穷字母表，它的每个元素称为一个输入字符
- $\delta$ 是一个从 $S\times\Sigma^*$ 到 $S$ 的子集映射，即 $\delta: S\times\Sigma^*\rightarrow 2^S$
- $S_0\subseteq S$ 是一个非空初态==集==
- $F\subseteq S$ 是一个终态集（可空） 

DFA 是 NFA 的特例，而 NFA 是 DFA 概念的推广

### 3.3.2. 不确定有限自动机的化简

对任意给定的 NFA，都能相应构造一个 DFA 使它们接受相同的语言

**定义 3.3** 假定 $I$ 是 NFA $M$ 的状态集子集，定义 $I$ 的 $\varepsilon\text{-Closure}(I)$ 如下

- 若 $q\in I$ ，则 $q\in\varepsilon\text{-Closure}(I)$
- 若 $q\in I$，则从 $q$ 触发经过任意条 $\varepsilon$ 弧而能到达的任何状态 $q^\prime$，有 $q^\prime\in\varepsilon\text{-Closure}(I)$

**性质 3.1** 假定 $I=\{I_1,I_2,\cdots,I_i\}$ 是 NFA $M$ 的状态集的子集，对 $a\in\Sigma$，有 $\delta(I,a)=\delta(I,\varepsilon^* a\varepsilon^*)$ 成立，且 $\delta(I,a)=\bigcup_{j=1}^{i}\delta(I_j,\varepsilon^* a\varepsilon^*)$

**定理 3.1** 对任意一 NFA $M$，都存在一个 DFA $M^\prime$，使得 $L(M^\prime)=L(M)$

**例 3.3** 将 NFA $M$ 确定化

![](./assets/S03_05.svg)

|             新生成的状态 \\ 输入              |       a       |       b       |       c       |
|:---------------------------------------------:|:-------------:|:-------------:|:-------------:|
| $\varepsilon\text{-Closure}(\{0\})=\{0,2,3\}$ |    $\{1\}$    | $\varnothing$ |   $\{2,3\}$   |
|                    $\{1\}$                    | $\varnothing$ |    $\{3\}$    | $\varnothing$ |
|                   $\{2,3\}$                   | $\varnothing$ | $\varnothing$ |   $\{2,3\}$   |
|                    $\{3\}$                    | $\varnothing$ | $\varnothing$ | $\varnothing$ |

我们令每一行的首元素分别为新的状态 0, 1, 2, 3，接着考察哪些状态可以作为终态

- 因为原始的 NFA 中，3 是终态，因此，在新的状态集合中，只要是==包含原始终态的集合==，都可以作为终态。
- 例如上表中，line 0, line 2, line 3 的集合都包含原始 NFA 的终态 3 ，因此这 3 行生成的新状态都可以作为新的终态。


![](./assets/S0306.svg)

### 3.3.3. 确定有限自动机的化简

对一个 NFA $M$，当把它确定化后，得到的 DFA 可能包含较多的状态，有些状态有可能是多余或者等价的。因此应该对 DFA 进行化简。

**多余状态** 从初态出发，任何可识别的输入串也不能到达的状态。

设 DFA $M=(S,\Sigma, \delta, s_0, F)$，对 $s,t\in S$，若对任何 $\alpha\in\Sigma^*$，均有 $\delta(s,\alpha)\in F$ 当且仅当 $\delta(t,\alpha)\in F$，则称状态 $s$ 和 $t$ 等价

**定义 3.4** 对一个 DFA $M$，若能找到一个状态比 $M$ 少的 DFA $M^\prime$，使得 $L(M)=L(M^\prime)$，且 $M^\prime$ 满足

1. $M^\prime$ 中没有多余的状态
2. $M^\prime$ 的状态集中，没有两个状态是互相等价的

则称该 DFA $M^\prime$ 是一个最小化的 DFA，也称 DFA 的化简

**DFA $M$ 最小化的具体步骤**

1. 将 DFA $M$ 的状态集 $S$ 划分为两个子集：终态集 $F$ 和非终态集 $\tilde{F}$，形成初始划分 $\Pi$
2. 对 $\Pi$ 建立新的分划 $\Pi_{new}$，对 $\Pi$ 中的每个状态子集 $G$，进行如下变换
    1. 把 $G$ 划分成新的子集，使 $G$ 的两个状态 $s$ 和 $t$ 属于同一个子集，当且仅当对任何输入符号 $a$，状态 $s$ 和 $t$ 转换到的状态都属于 $\Pi$ 的同一个子集
    2. 用 $G$ 划分出来的所有新子集替换为 $G$，形成新的划分 $\Pi_{new}$
3. 如果 $\Pi_{new}$ 和 $\Pi$ 相等，则执行第 4 步；否则，令 $\Pi=\Pi_{new}$，重复第 2 步
4. 划分结束后，对划分中的每个状态子集，选出一个状态作为“代表”，删去其他一切等价的状态，并把射向其他状态的箭弧改为射向这个“代表”的状态

> DFA 最小化的核心：将不等价的状态拆分

**例** 对于有限自动机

![](./assets/compdfa_001.svg)

由于状态 0, 1 经过 a, b 落在同一个子集，可以发现它们无法拆分，因此 0 和 1 状态等价。可以将状态机化简为右边的形式。

**例 3.6** 将图中 DFA 最小化

![](./assets/S0307.svg)

1. 按照终态和非终态划分，得到两个子集 $\Pi_1=\{A,B,F\}$，$\Pi_2=\{C,D,E,G\}$
2. 对 $\Pi_1$，状态 $A,B$ 均与 $F$ 可区别，因为 $A\xrightarrow{b}{T},B\xrightarrow{b}{T}$，而 $F\overset{b}{\nrightarrow}T$（$T$ 表示终止态），因此 $\Pi_1$ 划分为 $\Pi_{11}=\{A,B\},\Pi_{12}=\{F\}$。
	- 进一步，$A,B$ 是两个可区别的状态，因为 $A\xrightarrow{bb}T,B\overset{bb}{\nrightarrow}T$，进而将 $\Pi_1$ 分为三个子集 $\{A\},\{B\},\{F\}$
3. 对 $\Pi_2=\{C,D,E,G\}$，用输入 $b$ 可将其划分为 $\Pi_{21}=\{C,E\},\Pi_{22}=\{D,G\}$
	- 进一步，可将 $\Pi_{21}$ 划分为 $\{C\},\{E\}$

于是划分为了以下子集

$$
\{A\},\{B\},\{F\},\{C\},\{E\},\{D,G\}
$$

![](./assets/S0308.svg)

## 3.4. 正规文法、正规式和有限自动机之间的关系

### 3.4.1. 正规式与正规集


**定义** 设有字母表 $\Sigma$，在 $\Sigma$ 上的正规式，它们所表示的正规集的递归定义：

1. $\varepsilon$ 和 $\varnothing$ 都是 $\Sigma$ 上的正规式，它们所表示的正规集分别为 $\{\varepsilon\}$ 和 $\varnothing$
2. 任何 $a\in\Sigma$，$a$ 是 $\Sigma$ 上的一个正规式，它所表示的正规集为 $\{a\}$
3. 假设 $e_1,e_2$ 是 $\Sigma$ 上的正规式，它们所表示的正规集分别为 $L(e_1), L(e_2)$，则
    1. $e_1|e_2$ 是 $\Sigma$ 上的正规式，它所表示的正规集为 $L(e_1\mid e_2)=L(e_1)\cup L(e_2)$
    2. $e_1e_2$ 是 $\Sigma$ 上的正规式，它所表示的正规集为 $L(e_1e_2)=L(e_1)L(e_2)$
    3. $(e_1)^*$ 是 $\Sigma$ 上的正规式，它所表示的正规集为 $L((e_1)^*)=L(e_1)^*$

|        谁是 $\Sigma$ 的正规式         |                    正规集                     |
|:-------------------------------------:|:---------------------------------------------:|
|             $\varepsilon$             |               $\{\varepsilon\}$               |
|             $\varnothing$             |                 $\varnothing$                 |
|                  $a$                  |                    $\{a\}$                    |
| $e_1$ 和 $e_2$ 是 $\Sigma$ 上的正规式 | 它们所表示的正规集分别为 $L(e_1)$ 和 $L(e_2)$ |
|             $e_1\mid e_2$             |      $L(e_1\mid e_2)=L(e_1)\cup L(e_2)$       |
|               $e_1e_2$                |           $L(e_1e_2)=L(e_1)L(e_2)$            |
|               $(e_1)^*$               |             $L((e_1)^*)=L(e_1)^*$             |

**性质**

1. 交换律 $U|V=V|U$
2. 结合律 $U|(V|W)=(U|V)|W$，$U(VW)=(UV)W$
3. 分配率 $U(V|W)=UV|UW$，$(V|W)U=VU|WU$
4. $\varepsilon U=U\varepsilon=U$

**例**

| 正规式               | 正规集                                        |
| -------------------- | --------------------------------------------- |
| $a\mid b$            | $\{a,b\}$                                     |
| $(a\mid b)(a\mid b)$ | $\{aa,ab,ba,bb\}$                             |
| $a^*$                | $\{\varepsilon,a,aa,aaa,\cdots\}$             |
| $(a\mid b)^*$        | $\{\varepsilon, a,b,aa,ab,ba,bb,aaa,\cdots\}$ |
| $a\mid a^*b$         |    $\{a,b,ab,aab,aaab,\cdots\}$                                           |

### 3.4.2. 正规式与正规文法的关系

#### 1. 正规式转换为正规文法

字母表 $\Sigma$ 上的正规式 $U$ 到正规文法 $G[Z]=(V_\mathrm{N},V_\mathrm{T},P,Z)$ 的转换方法

1. 令 $V_T=\Sigma$，将 $Z\rightarrow U$ 加入到 $P$ 中
2. 对 $P$ 中的每条产生式规则 $V\rightarrow U$，while $(!(U=\varepsilon\parallel U=a(a\in\Sigma)))$ 执行

| 条件            | $V\rightarrow U$ 修改为                                  |
| --------------- | -------------------------------------------------------- |
| $U=e_1\mid e_2$ | $V\rightarrow A\mid B,A\rightarrow e_1,B\rightarrow e_2$ |
| $U=e_1e_2$      | $V\rightarrow e_1B,B\rightarrow e_2$                     |
| $U=(e_1)^*e_2$  | $V\rightarrow e_1V,V\rightarrow e_2$                                                         |

**例 3.10** 将正规式 $(a\mid b)^\ast a(a\mid b)$ 转换为相应的正规文法

由 1. 有

$$
V_\mathrm{T}=\{a,b\},P=\{Z\to(a\mid b)^\ast a(a\mid b)\}
$$

由 2.3. 有

$$
Z\to aZ\mid bZ,Z\to a(a\mid b)
$$

继续由 2.2. 有

$$
Z\to aZ\mid bZ,Z\to aB,B\to (a\mid b)
$$

即

$$
P=\{Z\to aZ\mid bZ,Z\to aB,B\to (a\mid b)\}
$$

**例 3.11** 将正规式 $(a\mid b)a^\ast(a\mid b)$ 转换为相应的正规文法

$$
\begin{aligned}
&V_\mathrm{T}=\{a,b\},P=\{Z\to(a\mid b)a^\ast(a\mid b)\}\\
\Rightarrow & Z\to(a\mid b)B,B\to a^\ast(a\mid b)\\
\Rightarrow & Z\to aB\mid bB,B\to aB,B\to a\mid b
\end{aligned}
$$

因此有

$$
P=\{Z\to aB\mid bB,B\to aB,B\to a\mid b\}
$$

#### 2. 正规文法转换为正规式

1. 将正规文法中的每个非终结符表示成它的一个正规式方程，获得一个联立方程组
2. 求解
    - 若 $x=\alpha x\mid\beta$，则解为 $x=\alpha^\ast\beta$
    - 若 $x=x\alpha\mid\beta$，则解为 $x=\beta\alpha^\ast$

**例 3.12** 设有正规文法 $G[Z]$，求出该文法生成语言的正规式

$$
\begin{aligned}
Z&\to Zc\mid Bc\\
B&\to Bb\mid Ab\\
A&\to Aa\mid a
\end{aligned}
$$

方程组有

$$
\begin{cases}
Z= Zc+ Bc\\
B= Bb+ Ab\\
A= Aa+ a
\end{cases}
$$

求解有

$$
\begin{aligned}
A&=aa^\ast\\
B&=Bb+a\{a\}b=aa^\ast bb^\ast\\
Z&=Zc+Bc=Zc+aa^\ast bb^\ast c=aa^\ast bb^\ast cc^\ast
\end{aligned}
$$

故该正规式的正规集就是文法 $G[Z]$ 定义的语言 $\{a^ib^jc^k\mid i,j,k\geqslant 1\}$

### 3.4.3. 正规文法与有限自动机之间的转换

#### 1. 右线性文法转换为有限自动机

> 它对应着文法的==推导过程==

设 $G[Z]=(V_\mathrm{N},V_\mathrm{T},P,Z)$ 是一个右线性文法，其产生式规则具有形式 $A\to aB\mid a\mid\varepsilon$，由 $G$ 构造相应的有限自动机 $M=(S,\Sigma,\delta,s_0,F)$ 的步骤

1. 令 $s_0=\{Z\}$，将每个非终结符看作 $M$ 中的一个状态，并增加一个==终态 $Y$== 且 $Y\notin V_\mathrm{N}$，令 $F=\{Y\}$，即可得 $S=V_\mathrm{N}\cup F$，令 $\Sigma=V_\mathrm{T}$
2. 对 $G$ 中每一个形如 $A\to \varepsilon$ 的产生式规则，令 $\delta(A,\varepsilon)=Y$
3. 对 $G$ 中每一个形如 $A\to a$ 的产生式规则，令 $\delta(A,a)=Y$
4. 对 $G$ 中每一个形如 $A\to aB$ 的产生式规则，令 $\delta(A,a)=B$

这样构造的 $M$ 大多数情况下是一个 NFA

**例 3.14** 设有文法 $G[Z]$，试构造有限自动机

$$
\begin{aligned}
Z&\to 0Z\mid 1A\mid\varepsilon\\
A&\to 0Z\mid\varepsilon
\end{aligned}
$$

$$
M=(\{Z,A,Y\},\{0,1\},\delta,\{Z\},\{Y\})$$

$$
\begin{aligned}
\delta(Z,0)=Z && \delta(Z,1)=A && \delta(Z,\varepsilon)=Y\\
\delta(A,0)=Z && \delta(A,1)=\varnothing && \delta(A,\varepsilon)=Y
\end{aligned}
$$

![](./assets/compile_10.svg)

#### 2. 左线性文法转换为有限自动机

> 它对应着文法的==归约过程==

设 $G[Z]=(V_\mathrm{N},V_\mathrm{T},P,Z)$ 是一个右线性文法，其产生式规则具有形式 $A\to Ba\mid a\mid\varepsilon$，由 $G$ 构造相应的有限自动机 $M=(S,\Sigma,\delta,s_0,F)$ 的步骤

1. 令 $s_0=\{Z\}$，将每个非终结符看作 $M$ 中的一个状态，并增加一个==初态 $X$== 且 $X\notin V_\mathrm{N}$，令 $s_0=\{X\}$，即可得 $S=V_\mathrm{N}\cup \{X\}$，令 $\Sigma=V_\mathrm{T}$
2. 对 $G$ 中每一个形如 $A\to \varepsilon$ 的产生式规则，令 $\delta(X,\varepsilon)=A$
3. 对 $G$ 中每一个形如 $A\to a$ 的产生式规则，令 $\delta(X,a)=A$
4. 对 $G$ 中每一个形如 $A\to Ba$ 的产生式规则，令 $\delta(B,a)=A$

这样构造的 $M$ 大多数情况下是一个 NFA

**例 3.14** 设有文法 $G[Z]$，试构造有限自动机

$$
\begin{aligned}
Z&\to Z0\mid A1\mid\varepsilon\\
A&\to Z0\mid\varepsilon
\end{aligned}
$$

$$
M=(\{Z,A,X\},\{0,1\},\delta,\{X\},\{Z\})$$

$$
\begin{aligned}
\delta(Z,0)=Z && \delta(A,1)=Z && \delta(A,0)=\varnothing && \delta(X,\varepsilon)=Z\\
\delta(Z,0)=A && \delta(Z,1)=\varnothing && \delta(X,\varepsilon)=A
\end{aligned}
$$

![](./assets/compile0311.svg)

#### 3. 有限自动机转换为正规文法

对于给定的有限自动机 $M$，构造文法 $G$ 使得 $L(G)=L(M)$

1. 令 $V_\mathrm{T}=\Sigma,V_\mathrm{N}=S,Z=s_0$
2. 若 $Z$ 是一个终态，则将产生式规则 $Z\to\varepsilon$ 加到 $P$ 中
3. 对 $\delta(A,a)=B$，若 $B\notin F$，则将 $A\to aB$ 加到 $P$ 中；否则，将 $A\to aB\mid A\to a$ 或 $A\to aB,B\to\varepsilon$ 加到 $P$ 中。特别的，若 $\delta(A,a)=A$，则将 $A\to aA\mid\varepsilon$ 加到 $P$ 中。

**例 3.16** 对以下状态图，构造文法 $G$

![](./assets/compile0312.svg)

$$
\begin{aligned}
G[Z]&=(\{Z,A,B,C\},\{a,b\},P,Z)\\
P:\,&Z\to aA\mid bB\\
&A\to aC\mid bB\mid a\\
&B\to aA\mid aB\mid bC\mid b\\
&C\to aC\mid aA\mid \varepsilon
\end{aligned}
$$

### 3.4.4. 正规式与有限自动机之间的转换

#### 1. 由正规式构造有限自动机

![](./assets/compile0313.svg)

TODO: 画个例子

#### 2. 由正规式构造有限自动机

![](./assets/compile0314.svg)

TODO: 画个例子

## 3.5. 词法分析程序自动生成器 Lex

似乎是留给实验了
