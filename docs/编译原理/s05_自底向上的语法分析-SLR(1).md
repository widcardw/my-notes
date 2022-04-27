# 第 5 章 自底向上的语法分析 SLR(1)

### 5.4.3. SLR(1) 分析技术

LR(0) 不想前看下一个符号，不利用下一个符号的信息，增加了冲突的机会。

设有 LR(0) 项目集 $I_k=\{A \to \alpha \bullet b \beta, B \to \gamma \bullet, C \to \xi \bullet\}$。这个项目集存在“移进-归约”冲突和“归约-归约”冲突。

设下一个要读入的符号为 $x$，假设此时==允许==使用 $B \to \gamma$ 归约，那么归约后，符号 $x$ 就紧跟在 $B$ 之后，也就是 $x\in \text{Follow}(B)$。SLR(1) 正是==使用 Follow 集==来提高分析能力的。

对于上述 $I_k$，若 $\text{Follow}(B) \cap \text{Follow}(C)=\varnothing$，且终结符号 $b\notin \text{Follow}, b\notin \text{Follow}(C)$，则上述冲突全部消失。此时，SLR(1) 采用的“以及该-归约”方式：

1. 如果下一个符号 $x=b$，则使用 $A \to \alpha \bullet b \beta$ 项目移进 $b$
2. 如果下一个符号 $x \in \text{Follow}(B)$，则使用 $B \to \gamma \bullet$ 项目进行归约
3. 如果下一个符号 $x \in \text{Follow}(C)$，则使用 $C \to \xi \bullet$ 项目进行归约
4. 其他情况报错

```ad-note
title: SLR(1) 与 LR(0) 的区别
LR(0) 会将项目集 $I_k=\{B \to \gamma \bullet \bigcirc \!\!\!\! p\,\}$ 对应的分析报第 $k$ 行全部填上 $r_p$；而 SLR(1) 分析则会对其进行限制：只有当下一个符号（终结符）$x \in \text{Follow}(B)$ 时，才会在此单元格写上 $r_p$. 由此，SLR(1) 分析的动作填写更加精确，减少了冲突发生的机会。
```

**定义 5.17** 若文法 G 的 SLR(1) 分析表中没有多重定义项，则该文法是 SLR(1) 文法。




