---
title: 解题报告
---

## 1. 性能分析与 STL

### 1.1. 性能分析

#### 1.1.1. 频度求合法

当算法中语句的执行次数和某变量直接相关，且变量的起止范围明确，可以使用求和公式求出最大语句频度 $f(n)$，取其阶数即可。

#### 1.1.2. 假设法

先假设循环执行 m 次，再根据循环终止条件求出语句频度 $f(n)$。

#### 1.1.3. 迭代分析法

适用于算法包含递归函数。迭代地展开递归方程的右端，化成非递归和式，最后再求和即可。

### 1.2. STL

#### 1.2.1. map

##### 特性

包含一个键值对，可以通过 $map[key]$ 获取对应的 $value$。另一方面，map 底层实现为红黑树，因此在插入节点时会自动按照一定规则进行排序，而 unordered_map 则不会进行排序。前两者都不允许有重复的键，而 multi_map 允许有重复的键。

##### 例题

给定一个长度为 n 的整数序列 a1,a2,…,an，请你从中选出尽可能多的数。要求满足如下两个条件之一：

-   仅选择一个数；
-   选择至少两个数，且所选择的数的最大公约数大于 1（即不互质）；

输出选出数的最大可能数量。

##### 问题分析

如果选出这些数，再对它们进行判断，这样似乎不是一个好办法。而从另一个角度考虑，首先对这些数字进行预处理，即首先对它们进行质因数分解，而后再选出**某一个质数**，这个质数能被最多的数所包含。

##### 代码实现

```cpp
#include <iostream>
#include <unordered_map>
using namespace std;
int main()
{
    int n, x;
    unordered_map<int, int> umap;  // 用于存放质数 i 被包含的数的个数
    cin >> n;
    while (n--)
    {
        cin >> x;
        for (int i = 2; i * i <= x; i++)  // 进行质因数分解
        {
            if (x % i == 0)  // 找到一个质数
            {
                umap[i]++;  // 这个质数被包含的次数加一
                while (x % i == 0)  // 相除
                    x /= i;			// 直至这个数不能被 i 整除
            }
            if (x > 1)	// 再将这个数本身加入 map 中
                umap[x]++;  // 以避免自己本身就是质数
        }
    }
    int res = 1;
    for (auto it = umap.begin(); it != umap.end(); it++)
        res = max(res, it->second);	 // 找到被包含次数最多的质数
    cout << res << endl;
    return 0;
}
```

#### 1.2.2. set 集合

##### 特征

集合的特征就是其中包含的元素不能重复。unordered_set 满足了集合的特性：确定性、无序性、互异性。而 set 底层为红黑树，在插入是会按照一定的规则进行排序。通过向 set 中插入数值，可以去除重复元素。

#### 1.2.3. stack 栈

##### 特征

栈的特征为**后进先出**，与队列的先进先出有所区别。栈可以保存和读取上一步的状态，适用于状态转移的一些方法。另外，递归调用采用的就是栈的结构，因此两者的结构完全一致。

##### 例题

<https://leetcode-cn.com/problems/candy/>

老师想给孩子们分发糖果，有 N 个孩子站成了一条直线，老师会根据每个孩子的表现，预先给他们评分。你需要按照以下要求，帮助老师给这些孩子分发糖果：

- 每个孩子至少分配到 1 个糖果。
- 评分更高的孩子必须比他两侧的邻位孩子获得更多的糖果。

那么这样下来，老师至少需要准备多少颗糖果呢？

##### 问题分析

利用单调栈，对数组进行遍历。如果当前元素大于后面的元素，则需要一定的预估，因为当前元素被分到的糖果由左右两侧共同决定。对于右边的元素，可以将严格单调递减的元素连续压栈，直至递减结束，那么在栈中的元素所对应的糖果数在出栈时，就依次地给它们分配 1, 2, 3, …的糖果。而对于单调递增的序列，相对会好处理一些，只需要根据前一个元素进行“爬坡”即可。

##### 代码实现

```cpp
int candy(vector<int> &ratings)
{
    vector<int> candies(ratings.size(), 0); // 对应下标元素的糖果数
    stack<int> s;                           // 单调递减栈
    for (int i = 0; i < ratings.size(); i++)
    {   // 如果遇到严格单调递减序列，则持续入栈
        if (i + 1 < ratings.size() && ratings[i] > ratings[i + 1])
            s.push(i);
        else
        {   // 非单调递减，则依据前一个人的糖果数进行判断
            if (i < ratings.size() && i - 1 >= 0 && ratings[i] > ratings[i - 1])
                // 如果前一个人存在并且当前严格大于前一个，则 c[i] = c[i-1]+1
                candies[i] = candies[i - 1] + 1;
            else  // 否则不是严格大于（其实是相等），可以只给 1 个
                candies[i] = 1;
            // 对已经压栈的单调序列进行处理
            while (!s.empty())
            {
                int p = s.top();
                s.pop();
                // 如果当前元素的评分为“坡峰”，那么就选择两侧最大糖果+1
                if (p - 1 >= 0 && ratings[p] > ratings[p - 1])
                    candies[p] = max(candies[p + 1], candies[p - 1]) + 1;
                else // 否则对栈中的元素逐个取出，爬坡
                    candies[p] = candies[p + 1] + 1;
            }
        }
    }
    return sum(candies);
}
```

#### 1.2.4. queue 队列

##### 特征

队列的特点是元素先进先出，与栈的后进先出有所不同。队列常常用于状态搜索中的**广度优先遍历**。

priority_queue 为优先队列，可以定义优先级比较的策略，因此也会用在一部分**启发式搜索**中，选出较优的节点，进行下一步扩展。

##### 例题

<https://www.acwing.com/problem/content/701/>

给定一个无限完全二叉树，其中根节点是 1/1，节点 p/q 的左右子节点分别是 p/(p+q) 和 (p+q)/q。这棵树看起来如下：

```
         1/1
    ______|______
    |           |
   1/2         2/1
 ___|___     ___|___
 |     |     |     |
1/3   3/2   2/3   3/1
...
```

每个正有理数在这棵树中只出现一次，对这棵树进行层次遍历，可得到以下数组：

```
1/1, 1/2, 2/1, 1/3, 3/2, 2/3, 3/1, ...
```

现在需要找到索引为 n 的节点的形式。

##### 问题分析

本题就是对一棵二叉数的层次遍历，需要用到队列进行构造。

##### 代码实现

```cpp
#include <iostream>
#include <queue>
using namespace std;
struct TreeNode
{
    int p, q;
    TreeNode *left;
    TreeNode *right;
    TreeNode(int x, int y) : p(x), q(y), left(NULL), right(NULL) {}
};
TreeNode* buildTree(TreeNode *root, int n)
{
    root = new TreeNode(1, 1);	// 根结点
    queue<TreeNode *> q;		// 队列
    q.push(root);				// 根结点入队
    int i = 0;					// 用于计数
    TreeNode *tmp;
    while (!q.empty())
    {
        tmp = q.front();		// 取出队头的节点
        q.pop();
        TreeNode *left = new TreeNode(tmp->p, tmp->p + tmp->q);
        tmp->left = left;		// 创建左子节点
        q.push(left);
        i++;
        if (i >= n)				// 如果到达索引值
            break;				// 就不再创建
        TreeNode *right = new TreeNode(tmp->p + tmp->q, tmp->q);
        tmp->right = right;		// 创建右子节点
        q.push(right);
        i++;
        if (i >= n)				// 如果到达索引值
            break;				// 就不再创建
    }
    while (!q.empty())
    {
        tmp = q.front();		// 持续出队，直到最后一个元素
        q.pop();
    }
    cout << tmp->p << "/" << tmp->q << endl;	// 输出结果
    return root;
}
int main()
{
    TreeNode* root;
    root = buildTree(root, 3);	// 建树
    destroyTree(root);			// 销毁树
    return 0;
}
```

## 2. 穷举法

### 2.1. 基本思想

穷举作为最基础的一种思想，也是一种较为简单的算法。我们可能理所应当的认为从头逐一的枚举到结束，无非就是判断一下边界条件。然而，如果没有较好的穷举策略，算法将会变得相当的复杂、耗时。例如，对于一部分二维数组，针对它的穷举，或许可以根据之前保存的状态来进行优化，而不是将整个 $n\times m$ 的矩阵全部运算一遍。

### 2.2. 例题

#### 2.2.1. 木棍拼正三角形

<https://www.luogu.com.cn/problem/P3799>

##### 问题描述

有 n 根木棒，现在从中选 4 根，想要组成一个正三角形，问有几种选法？

##### 问题分析

正三角形需要三条边均相等，所以选出的边中有两根长度 $l$ 是必定相等的，并且这两根会是较长的。而剩下的两根木棍长度之和为 $l$。因此，在外循环中，选出较长的两根长度相等的木棍。在内循环中，选出两根拼接后长度为 $l$ 的木棍。

##### 代码实现

```cpp
#include <iostream>
using namespace std;
const int N = 5000;
int choose(int a, int k)
{
	if (k == 0) return 1;
	if (k == 1) return a;
	if (k == 2) return a * (a - 1) / 2;
}
int main()
{
    int n, maxa = 0x80000000, ans = 0;
    int a[N] = {0}, num[N] = {0};
    cin >> n;
    for (int i = 0; i < n; i++)
    {
        cin >> a[i];
        num[a[i]] ++;           // 记录长度为 a[i] 的木棍个数
        maxa = max(a[i], maxa); // 最长的木棍
    }

    for (int i = 2; i <= maxa; i++)  // 边长至少为 2
    {
        if (num[i] >= 2)  // 至少有 2 根长木棍
        {
            int long_stick = choose(num[i], 2);  // 长木棍的方法数，为 n 选 2 的组合数
            for (int j = 1; j <= i / 2; j++)  // 枚举拼接边
            {
                int combine_stick = 0;
                if (j != i - j && num[j] >= 1 && num[i - j] >= 1)  // 如果拼接边不等长
                    combine_stick = num[j] * num[i - j];  // 那么各选其一
                else if (j == i - j && num[j] >= 2)  // 如果拼接边等长
                    combine_stick = choose(num[j], 2);  // 那么选择其中两根
                ans += long_stick * combine_stick;
            }
        }
    }
    cout << ans << endl;
    return 0;
}
```

#### 2.2.2. 熄灯问题

<http://poj.org/problem?id=1222>

##### 问题描述

在墙上有 $5\times 6$ 的区域有灯，按下某一个灯，不仅会让自己的状态相反，还会会导致相邻上下左右的灯状态的变化。

|    O    |    -    |    -    |  O  |  -  |  -  |    |    O    |    -    |    -    |  O  |  -  |  -  |
|:-------:|:-------:|:-------:|:---:|:---:|:---:|:---:|:-------:|:-------:|:-------:|:---:|:---:|:---:|
|    -    | ==(-)== |    O    |  -  |  -  |  -  |    |    -    | ==(O)== |    O    |  -  |  -  |  -  |
| ==(O)== | ==(O)== | ==(-)== |  O  |  -  |  -  |  →  | ==(-)== | ==(-)== | ==(O)== |  O  |  -  |  -  |
|    -    | ==(O)== |    O    |  -  |  -  |  -  |    |    -    | ==(-)== |    O    |  -  |  -  |  -  |
|    O    |    -    |    -    |  -  |  O  |  O  |    |    O    |    -    |    -    |  -  |  O  |  O  |

##### 问题分析

如果对于所有的方格都进行逐一的枚举，这样是不现实的，这样会造成 $2^{30}$ 种枚举，大大降低了效率。而仔细分析过后，发现可以只枚举第一行，而接下来的行中，为了达到“熄灭上一行的所有灯”这个目的而按下该行的灯。最终判断所有的灯是否都熄灭即可。

##### 代码实现

```cpp
void Turn(int m[ROW][COL], int r, int c)
{	// 按下一盏灯, 包含了对周围灯的影响
    m[r][c] = !m[r][c];
    for (int i = 0; i < 4; i++)
    {
        int x = r + dx[i], y = c + dy[i];
        if (x >= 0 && x < ROW && y >= 0 && y < COL)
            m[x][y] = !m[x][y];
    }
}
void PressOneRowOfLights(int puzzle[ROW][COL], int press[ROW][COL], int r)  
{	// 按照 press 数组按下某一行的灯
    for (int i = 0; i < COL; i++)
        if (press[r][i] == 1)
            Turn(puzzle, r, i);
}
void ProcessRemainedRows(int puzzle[ROW][COL], int press[ROW][COL])
{	// 处理从第二行开始的剩余行
    for (int i = 1; i < ROW; i++)
        for (int j = 0; j < COL; j++)
            if (puzzle[i - 1][j] == 1)  // 如果上一行出现没灭的灯
            {
                Turn(puzzle, i, j);     // 那么就按下这一行同列的灯, 使上一行的这盏灯熄灭
                press[i][j] = 1;
            }
}
bool EnumerateRow(int puzzle[ROW][COL], int press[ROW][COL], int r)
{
    int k = 2;
    int puzzle_copy[ROW][COL] = {0};
    while (1)
    {
        CopyPuzzle(puzzle, puzzle_copy, ROW, COL);      // 拷贝原始状态
        ResetPress(press, ROW, COL);              // 重置需要按下的矩阵至0, 除第一行外
        PressOneRowOfLights(puzzle_copy, press, r);     // 按下第一行指定要按下的灯
        ProcessRemainedRows(puzzle_copy, press);        // 按下剩余行的灯
        if (IsEntireRowOff(puzzle_copy, ROW - 1)) // 如果最后一行的灯都熄灭了, 那么解决成功
            return true;
        // 将 press 数组的第一行按二进制枚举, 共 64 种状态
        int i;
        for (i = COL - 1; i >= 0 && press[r][i] == k - 1; i--) ;
        if (i == -1)
            break;
        press[r][i]++;
        for (i++; i < COL; i++)
            press[r][i] = 0;
    }
    return false;   // 解决失败, 无解
}
```

#### 2.2.3. 走迷宫

<https://www.acwing.com/problem/content/3815/>

##### 问题描述

有一个 $n\times m$ 个单元格构成的迷宫，其中空单元格用 `.` 表示，障碍物用 `#` 表示。迷宫中有一个机器人，它的起点位置用 `S` 表示，目标位置用 `E` 表示，这两个地点均没有障碍。

机器人只能沿上下左右四个方向移动。给定一串由数字 0∼3 构成的字符串，表示机器人的行动指令列表。机器人将按照列表中的指令，依次进行移动。

在执行指令的过程中：

-   如果机器人走出迷宫边界或者碰到障碍物，则机器人会损坏。
-   如果机器人到达目标位置，则停止行动，不再接受后续指令。

现在，哪个数字（0∼3）对应哪种行动（上下左右）还未分配。请问，共有多少种分配方案，能够使得机器人顺利到达目标位置。

```
5 6         // 迷宫大小
.....#
S....#
.#....
.#....
...E..		// 迷宫内容
333300012	// 可分配的操作
```

##### 问题分析

首先，需要分配 0~3 这 4 个数字分别对应哪四种操作，即有 24 种排列。由于排列数量较少，所以可以使用枚举来尝试可分配的操作。

从操作集合中选出一组操作码后，按照给定的操作序列进行枚举，如果失败，则选择另一种操作码。

##### 代码实现

```cpp
#include <iostream>
#include <cstring>
#include <string>
#include <algorithm>
using namespace std;
const int N = 51;
int per[24][4] = {0};
int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
pair<int, int> start;
void init_permutation()
{
    int tmp[4] = {0,1,2,3}; bool flag = true; int i = 0;
    do {
        flag = next_permutation(tmp, tmp + 4);
        copy(tmp, tmp + 4, per[i]);
        i++;
    } while (flag);
}
bool can_find(int n, int m, char g[N][N], int pattern, const string &steps)
{
    pair<int, int> cur = start;
    for (int i = 0; i < steps.length(); i++)
    {
        int op = steps[i] - '0';
        int ddx = dx[per[pattern][op]], ddy = dy[per[pattern][op]];
        cur.first += ddx, cur.second += ddy;
        if (cur.first < 0 || cur.first >= n || cur.second < 0 || cur.second >= m || g[cur.first][cur.second] == '#')
            return false;
        if (g[cur.first][cur.second] == 'E')
            return true;
    }
    return false;
}
int get_answer(int n, int m, char g[N][N], string &steps)
{
    int res = 0;
    init_permutation();
    for (int i = 0; i < 24; i++)
    {
        if (can_find(n, m, g, i, steps))
            res++;
    }
    return res;
}
int main()
{
    int t;
    cin >> t;
    char grid[N][N];
    while (t--)
    {
        int n, m;
        cin >> n >> m;
        for (int i = 0; i < n; i++)
            for (int j = 0; j < m; j++)
            {
                cin >> grid[i][j];
                if (grid[i][j] == 'S')
                    start = {i, j};
            }
        string steps;
        cin >> steps;
        int res = get_answer(n, m, grid, steps);
        cout << res << endl;
    }
    return 0;
}
```

#### 2.2.4. 国际象棋

##### 问题描述

在一个 8×8 的国际象棋棋盘上放置着一个车和一个马。保证这两个棋子之间不能攻击到对方。

现在，要在棋盘的**空格**上放置另一个马，要求放置完毕后，三个棋子两两之间不得攻击到对方。请问，共有多少种放置方法。

关于国际象棋行棋规则：

-   车：横、竖均可以走，步数不受限制，不能斜走。
-   马：每步棋先横走或竖走一格，然后再往外斜走一格；或者先斜走一格，最后再往外横走或竖走一格（即走 “日” 字）。可以越子，没有中国象棋中的 “蹩马腿” 限制。

关于棋盘：8 行从上到下依次编号为 1∼8, 8 列从左到右依次编号为 a∼h，其中的具体方格可用字母加数字来描述，如下图所示。

| a8  | b8  | c8  | d8  | e8  | f8  | g8  | h7  |
| --- | --- | --- | --- | --- | --- | --- | --- |
| a7  | b7  | c7  | d7  | e7  | f7  | g7  | h7  |
| a6  | b6  | c6  | d6  | e6  | f6  | g6  | h6  |
| a5  | b5  | c5  | d5  | e5  | f5  | g5  | h5  |
| a4  | b4  | c4  | d4  | e4  | f4  | g4  | h4  |
| a3  | b3  | c3  | d3  | e3  | f3  | g3  | h3  |
| a2  | b2  | c2  | d2  | e2  | f2  | g2  | h2  |
| a1  | b1  | c1  | d1  | e1  | f1  | g1  | h1  |

- 输入格式
	- 第一行包含一个小写字母（a∼h）和一个数字（1∼8），表示车的位置。
	- 第二行包含一个小写字母（a∼h）和一个数字（1∼8），表示马的位置。
- 输出格式
	- 一个整数，表示第二个马的放置方法数量。

##### 问题分析

可以对整个棋盘进行穷举，标记出所有不能放的地方，再算出所有可以放的位置。

##### 代码实现

```cpp
#include <iostream>
#include <string>
#include <vector>
#include <algorithm>
using namespace std;
const int N = 8;
int dx[N] = {-2, -2, -1, 1, 2, 2, 1, -1};
int dy[N] = {1, -1, -2, -2, -1, 1, 2, 2};
int row2index(char ch)
{
    return 7 - (ch - '1');
}
int col2index(char ch)
{
    return ch - 'a';
}
struct Pos
{
    int row, col;
    Pos(int r, int c) : row(r), col(c) {}
    Pos(string pos)
    {
        row = row2index(pos.at(1));
        col = col2index(pos.at(0));
    }
};
void vehicle_can_reach(vector<vector<bool>> &m, const Pos &v_pos)
{   // 车可以到达的位置
    for (int i = 0; i < N; i++)
        m[v_pos.row][i] = 1;
    for (int i = 0; i < N; i++)
        m[i][v_pos.col] = 1;
}
void horse_can_reach(vector<vector<bool>> &m, const Pos &h_pos)
{   // 马可以到达的位置
    for (int i = 0; i < N; i++)
    {
        int n_r = h_pos.row + dx[i], n_c = h_pos.col + dy[i];
        if (n_r >= 0 && n_r < N && n_c >= 0 && n_c < N)
            m[h_pos.row + dx[i]][h_pos.col + dy[i]] = 1;
    }
}
bool judge_can_put(vector<vector<bool>> &m, Pos &new_pos, Pos &h_pos, Pos &v_pos)
{   // 判断能否放马
    if (m[new_pos.row][new_pos.col] == 1)
        return false;
    for (int i = 0; i < N; i++)
    {
        int n_r = new_pos.row + dx[i], n_c = new_pos.col + dy[i];
        if ((n_r == h_pos.row && n_c == h_pos.col) || 
			(n_r == v_pos.row && n_c == v_pos.col))
            return false;
    }
    return true;
}
int main()
{
    string horse, vehicle;
    cin >> vehicle >> horse;
    Pos h_pos = Pos(horse);
    Pos v_pos = Pos(vehicle);
    vector<vector<bool>> m(N, vector<bool>(N, 0));
    vehicle_can_reach(m, v_pos);
    horse_can_reach(m, h_pos);
    int count = 0;
    for (int i = 0; i < N; i++)
        for (int j = 0; j < N; j++)
        {
            Pos p = Pos(i, j);
            if (judge_can_put(m, p, h_pos, v_pos))
                count++;
        }
    cout << count - 1 << endl;
    return 0;
}
```

## 3. 分治法

### 3.1. 基本思想

#### 3.1.1. 递归的概念与思想

直接或间接调用自身的算法称为递归算法，用函数自身给出定义的函数称为递归函数。递归包括“递推”和“回归”两部分，

- 递推：为了得到问题的解，将原问题推到比它简单的问题求解。递推应该有终止条件，简单问题表示离递推终止条件更接近的问题。
- 回归：指将简单问题的解，回归到原问题的解上来。

换句话说，递归就是把一个问题划分成一个或多个规模更小的子问题，用同样的方法求解子问题。

#### 3.1.2. 例：全排列

> 输入一个字符串，例如 `abcd`，输出这个字符串的所有排列

首先，对于字符串 `abc`，我们有 6 种方案：`abc`, `acb`, `bac`, `bca`, `cab`, `cba`.

从上面的尝试中，我们发现，如果确定了第一个字母，那么接下来就是对剩余字母的全排列。而每次排列需要做到两个字母之间相互交换顺序，组成不同的序列。如果没有剩余字母，则表明这一种情况已经排列完成。

```cpp
void Permutation(char a[], int n, int ith)
{
    if (ith == n)      // 没有剩余字母
        Output(a, n);  // 输出序列
    else 
    {
        for (int k = ith; k < n; k++)  // 从第 ith 个开始，向后排列
        {
            swap(a[ith], a[k]);         // 交换 k 和 ith 的位置，成为一个新的序列
            Permutation(a, n, ith + 1); // 对剩余的序列继续排列
            swap(a[ith], a[k]);         // 恢复原来的序列
        }
    }
}
```

### 3.2. 细化分析

#### 3.2.1. 分治算法总体思想

将要求解的较大规模的问题分割成 个小规模的子问题，对这 个子问题分别求解。如果子问题规模仍然不够小，则再划分为 个子问题，如此递归下去，直到问题规模足够小，容易求解为止。再将求出的小规模的问题的解合并为一个更大规模问题的解，自底向上逐步求出原问题的解。

```python
def divide_and_conquer(P):
	if P in condition:
		Solve(P)    # 解决小规模的问题
	sub_P_list = divide_P_into_smaller_subinstances(P)  # 分解问题
	for P_i in sub_P_list:
		y_i = divide_and_conquer(P_i)  # 递归去解各子问题
	return merge(y_1, y_2, ..., y_k)  # 将各子问题解合并为原问题解
```

在使用分治法时，最好使子问题规模大致相等，即把原问题分成大小相等的 $k$ 个子问题，这是一种**平衡子问题**的思想，通常总是比子问题规模不等的做法要更优。

#### 3.2.2. 分治策略的使用条件

- 该问题具有最优子结构性质
- 该问题分解出的子问题的解可以合并为该问题的解
- 该问题分解出的各个子问题是相互独立的
- 子问题与原问题类型一致而其规模却不断缩小，且缩小到一定规模容易解决

### 3.3. 问题举例

#### 3.3.1. 赦免战俘问题

<https://www.luogu.com.cn/problem/P5461>

##### 问题描述

在一个边长为 $2^k$ 的方阵中，国王每次会将方阵按“田”字平均分成四份，并赦免左上角一个正方形区域内的战俘，直到这个这个方阵大小为 $1\times 1$ 为止。假设被赦免的战俘为 `.`，没有的为 `x`，请输出这个方阵。

##### 分析

- 假设这个矩阵为 $2\times 2$，那么就赦免左上角那一个人
- 而对于边长为 $2^k$ 的矩阵，不仅要处理左上角一个子矩阵，还需要对右上、左下、右下的子矩阵分别再次以同样的方式处理

| . | . | . | . | x | x | x | x | l | . | . | . | . | . | . | x | x | l | . | . | . | . | . | . | . | x |
| - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - | - |
| . | . | . | . | x | x | x | x | l | . | . | . | . | . | . | x | x | l | . | . | . | . | . | . | x | x |
| . | . | . | . | x | x | x | x | l | . | . | . | . | x | x | x | x | l | . | . | . | . | . | x | . | x |
| . | . | . | . | x | x | x | x | l | . | . | . | . | x | x | x | x | l | . | . | . | . | x | x | x | x |
| x | x | x | x | x | x | x | x | l | . | . | x | x | . | . | x | x | l | . | . | . | x | . | . | . | x |
| x | x | x | x | x | x | x | x | l | . | . | x | x | . | . | x | x | l | . | . | x | x | . | . | x | x |
| x | x | x | x | x | x | x | x | l | x | x | x | x | x | x | x | x | l | . | x | . | x | . | x | . | x |
| x | x | x | x | x | x | x | x | l | x | x | x | x | x | x | x | x | l | x | x | x | x | x | x | x | x |

##### 代码实现

```cpp
// 在M中,对以(si,sj)为左上角的，n*n的矩阵，进行操作
void Solve(vector<vector<bool>> &M, int si, int sj, int n)
{
	if (n == 1) return;
	n /= 2;  // 分割矩阵
	// 左上角的处理
	for (int i = si; i < si + len; i++)
		for (int j = sj; j < sj + len; j++)
			M[i][j] = 1;
	// 右上角的递归
	Solve(M, si,     sj + n, n);
	// 左下角的递归 
	Solve(M, si + n, sj,     n);
	// 右下角的递归 
	Solve(M, si + n, sj + n, n);
}
```

#### 3.3.2. 快速幂

<https://www.acwing.com/activity/content/11/>

##### 问题描述

对于某一个任意正整数求幂，通常地，我们会想到使用循环，即

$$
a^k=\underset{k 个 a}{\underbrace{a\times a\times \cdots\times a}}
$$

这样就导致时间复杂度为 $O(k)$，当 $k$ 较大时，速度会变得相当地慢。

##### 分析

之所以将这一技巧放在分治当中，必然会利用分治的方法将求幂进行一定程度上的优化。考虑当 $k$ 较大的情况下，我们尝试从“二分”的角度来进行优化，而着手点就在于指数 $k$。

- 当 $k$ 为偶数时，可以将 $a^k$ 分解为 $a^{k/2}\times a^{k/2}$
- 当 $k$ 为奇数时，可以将 $a^k$ 分解为 $a^{k/2}\times a^{k/2}\times a$

因此，幂的求解就可以从刚开始的线性，转化为现在的二分了，从而时间复杂度也变为了 $O(\log k)$。

##### 代码实现

```cpp
int qmid(int a, int k)
{
	if (k == 0) return 1;
	int ans = qmid(a, k / 2);  // 分治计算降解后的幂
	if (k % 2 == 0)  // 针对奇偶的判断
		return ans * ans;
	else
		return ans * ans * a;
}
```

##### 再次优化

考虑到使用递归会产生一部分额外的开销，尽管快速幂可以实现 $O(\log k)$ 的时间复杂度，同样的，它也产生了 $O(\log k)$ 的空间开销。因此，考虑可以利用循环来进行一些优化。

与此同时，针对 $2$ 为底的指数幂，我们常常会考虑使用移位运算而不是循环相乘，所以可以尝试采用类似的方法将位运算也渗透到这一算法中。

例如，我们想要计算 $7^{21}$，而可以把 $10$ 化成二进制的 $(10101)_2$。从而，我们需要计算的，是

$$
\begin{aligned}
7^{21}&=7^{2^{0}+2^2+2^4}\\
&=7^{(1)_2}\times 7^{(100)_2}\times 7^{(10000)_2}\\
&=(7^1)^1\times(7^2)^0\times(7^4)^1\times(7^8)^0\times(7^{16})^1\\
&=\displaystyle\prod_{i=0}^{\mathrm{len(\mathrm{bin(k)})}-1}\left(7^{2^i}\right)^{\mathrm{bin}(k)[i]}
\end{aligned}
$$

在最后一行的式子 $(7^{2^i})^b$ 中，$0\leqslant i<\mathrm{len}(\mathrm{bin}(k))$，而 $b$ 则是指数 $k$ 转为二进制后的每一位。因此，整体算法可以进行如下的优化：

```cpp
int qmid(int a, int k)
{
	int ans = 1;	// 结果
	while (k)		// 指数连续右移
	{
		if (k & 1)	// 如果当前位为 1，即需要乘上相应的幂
			ans *= a;	// 对结果乘上a^i
		a *= a;		// a^i 变为 a^2i
		k >>= 1;
	}
	return ans;
}
```

#### 3.2.3. 填补棋盘问题

<https://www.luogu.com.cn/problem/P1228>

##### 问题描述

在一个 $2^k\times 2^k$ 个方格组成的棋盘中，恰有一个方格与其他方格不同，称该方格为特殊方格，且称该棋盘为特殊棋盘。

| ☐   | ☑   | ☐   | ☐   |
| --- | --- | --- | --- |
| ☐   | ☐   | ☐   | ☐   |
| ☐   | ☐   | ☐   | ☐   |
| ☐   | ☐   | ☐   | ☐   |

现在需要使用 L 形的骨牌填满其他的方格。

- 输入格式
	- k : 上述的 2 的次数
	- x, y : 特殊格子的坐标
- 输出格式
	- 输出 x, y, c，其中 x 和 y 为拐角的坐标，c 为 L 形的种类，用 1, 2, 3, 4 表示
		- 1 : ▟，2 : ▙，3 : ▜，4 : ▛

##### 问题分析

显然，在任何一个 $2^k\times 2^k$ 的棋盘覆盖中，骨牌总数为 $(4^k-1)/3$.

当 $k>1$ 时，将 $2^k\times 2^k$ 的棋盘分割成 4 个 $2^{k-1}\times 2^{k-1}$ 的字棋盘，特殊方格必位于四个字棋盘之一，其余三个没有特殊方格。为了将这三个棋盘特殊化，可以用一个骨牌，覆盖住 3 个子棋盘的会合处，那么这 3 个字棋盘也变成了特殊棋盘。图中“☒”为骨牌位置。

| ☐   | ☑   | ☐   | ☐   |
| --- | --- | --- | --- |
| ☐   | ☐   | ☒   | ☐   |
| ☐   | ☒   | ☒   | ☐   |
| ☐   | ☐   | ☐   | ☐   |

##### 代码实现

```cpp
#include <iostream>
using namespace std;
// x, y 为特殊格子位置，sx, sy 为当前处理棋盘的左上角坐标
void chessBoard(int x, int y, int sx, int sy, int size)
{
    if (size == 1)
        return;
    size /= 2;
    if (x - sx < size && y - sy < size)
    { // 左上角，骨牌拐角在右下子棋盘的左上角
        cout << sx + size << " " << sy + size << " " << 1 << endl;
        chessBoard(x, y, sx, sy, size);
        chessBoard(sx + size - 1, sy + size, sx, sy + size, size); // 右上
        chessBoard(sx + size, sy + size - 1, sx + size, sy, size); // 左下
        chessBoard(sx, sy, sx + size, sy + size, size);            // 右下
    }
    else if (x - sx < size && y - sy >= size)
    { // 右上角，骨牌拐角在左下子棋盘的右上角
        cout << sx + size << " " << sy + size - 1 << " " << 2 << endl;
        chessBoard(x, y, sx, sy + size, size);
        chessBoard(sx + size - 1, sy + size - 1, sx, sy, size);    // 左上
        chessBoard(sx + size, sy + size - 1, sx + size, sy, size); // 左下
        chessBoard(sx, sy, sx + size, sy + size, size);            // 右下
    }
    else if (x - sx >= size && y - sy < size)
    { // 左下角，骨牌拐角在右上子棋盘的左下角
        cout << sx + size - 1 << " " << sy + size << " " << 3 << endl;
        chessBoard(x, y, sx + size, sy, size);
        chessBoard(sx + size - 1, sy + size - 1, sx, sy, size);    // 左上
        chessBoard(sx + size - 1, sy + size, sx, sy + size, size); // 右上
        chessBoard(sx, sy, sx + size, sy + size, size);            // 右下
    }
    else if (x - sx >= size && y - sy >= size)
    { // 右下角，骨牌拐角在左上子棋盘的右下角
        cout << sx + size - 1 << " " << sy + size - 1 << " " << 4 << endl;
        chessBoard(x, y, sx + size, sy + size, size);
        chessBoard(sx + size - 1, sy + size - 1, sx, sy, size);    // 左上
        chessBoard(sx + size - 1, sy + size, sx, sy + size, size); // 右上
        chessBoard(sx + size, sy + size - 1, sx + size, sy, size); // 左下
    }
}
int main()
{
    int k, x, y;
    cin >> k >> x >> y;
    chessBoard(x, y, 1, 1, 1 << k);
    return 0;
}
```

## 4. 模拟法

### 4.1. 基本思想

将自然的过程或者语言直白的程序化，比如题目中的求解过程，我们直接程序化模拟求解。即根据实际问题建立模型，模拟实际玩法从而解决问题。

### 4.2. 问题举例

#### 4.2.1. 报数

https://www.acwing.com/problem/content/1458/

##### 问题描述

有一群人从 1 开始按顺序报数，但是如果这个数是 3 的倍数，或者是 5 的倍数，那么就跳过。那么请给出报出的第 n 个数字是什么。数据范围 $1\leqslant n \leqslant 10^9$. 

##### 问题分析

初看只需要按照数字进行枚举，逐步向下推进即可。但是细想，如果数据范围是 $10^9$，那么暴力枚举似乎没有那么容易通过。然而，这类报数的题可以通过找规律来解决，在题目中其实是以 15 为一个周期，在后面的数据中，只需要在轮回的基础上加上一个倍数即可。

第一次轮回中，数字有 $[1,2,4,7,8,11,13,14]$，共 8 个，即 15 个人报了 8 个数。所以进行反推，如果要得到第 n 个数，那么要报 $n\times 8/ 15 - 1$ 次（因为最后一个人没有报数，而整个循环是以 15 为界），余下的就是对向前或向后加一些索引的处理。

##### 代码实现

对于数据量较少，可以枚举。

```cpp
int i = 0; num = 0;
while (i < n)
{
    num++;
    if (num % 3 != 0 && num % 5 != 0)
        i++;
}
cout << num;
```

但对于数据量较大，通过找规律来解决。

```cpp
#include <iostream>
using namespace std;
int arr[] = {1, 2, 4, 7, 8, 11, 13, 14};
int main()
{
    long long ans = 0;
    long long n;
    cin >> n;
    ans = n / 8 * 15;
    if (n % 8 == 0)
        cout << ans - 1 << endl;
    else 
        cout << ans + arr[n % 8 - 1] << endl;
    return 0;
}
```

#### 4.2.2. 笨鸟

<https://www.acwing.com/problem/content/1513/>

##### 问题描述

小王特别喜欢玩 flappy birds，但是他比较菜，所以向大家寻求帮助，游戏规则大家都懂，每一秒如果点击屏幕，小鸟会从 $(x,y)$ 飞到 $(x+1,y+1)$；如果不点击屏幕，小鸟则会飞到 $(x+1,y−1)$。

笨鸟初始坐标 $(0,0)$，要飞到横坐标为 $X$ 的地方，纵坐标不做要求。

沿途有一些障碍，用 $(x_0,a,b)$ 的形式给出，表示在横坐标为 $x_0$ 的地方 $y\leqslant a$ 和 $y\geqslant b$ 的地方都是障碍，碰到或者擦边都算游戏失败。

也就是说，小鸟通过此横坐标时纵坐标必须在 $(a,b)$ 这个范围内，且横坐标不等于 $a$ 或 $b$。

如果这只笨鸟根本没有办法飞到终点横坐标，则输出“Stupid bird!”（不包含引号）。  
否则输出通过每个障碍以及终点横坐标时所需要点击屏幕的最少次数。

**注意：** 在考虑通过某个障碍所需最少点击次数时，不用考虑此操作对通过后面障碍物的影响以及是否能够确保通关。

##### 问题分析


首先，可以预估当前可以到达的区间，接着将这个区间与可通过的区间取交集。如果交集不空，那么就有解。

接着，需要计算点击屏幕的最小次数。如果点击的次数为 $up$，下一个障碍物的横坐标距离为 $x_i$，那么当到达下一个障碍物时，纵坐标为 $y_i=up-(x_i-up)$，$up=\displaystyle{x_i+y_i\over 2}$。即点击次数最少为障碍物的的下界代入上述公式得到的结果。同时，值得注意的是，按下和不按之间纵坐标的距离之差为 2，因此按下不按的纵坐标奇偶性一定相同，同时，到达障碍物时，如果当前纵坐标与障碍物的纵坐标奇偶性不一致，那么只能取到较小的那个区间。

##### 代码实现

```cpp
#include <iostream>
using namespace std;
const int N = 500000;
int main()
{
	int n, X; int ans[N] = {0};
	cin >> n >> X;
	bool success = true;
	int up = 0, down = 0;
	int last = 0; // 上一个障碍物的横坐标
	for (int i = 0; i < n; i++)
	{
		int xi, a, b;
		cin >> xi >> a >> b;
		a++, b--; // 实际能通过的区间
		up += xi - last, down -= xi - last; // 更新每次能到达的范围
		if ((up & 1) != (b & 1)) b--; // 判断奇偶性
		if ((down & 1) != (a & 1)) a++; // 可以到达的高度与奇偶性相关
		up = min(up, b); down = max(down, a);
		if (up < down)  // 无解的情况
		{
			success = false;
			break;
		}
		ans[i] = (xi + down) / 2;  // 要按下的次数
		last = xi;
	}
	if (!success) cout << "Stupid bird!" << endl;
	else 
	{
		for (int i = 0; i < n; i++)
			cout << ans[i] << endl;
		cout << ans[n - 1] << endl;
	}
	return 0;
}
```

## 5. 贪心法

### 5.1. 贪心算法的特点

贪心算法总是作出在当前看来最好的选择，即贪心算法并不从整体最优考虑，它所作出的选择只是在某种意义上的**局部最优选择**。利用了问题本身的一些特性，希望贪心算法得到的**最终结果也是整体最优的**。在某些情况，贪心算法不能得到整体最优，但其最终结果是最优解的近似。

### 5.2. 问题举例

#### 5.2.1. 拆地毯

##### 问题描述

会场上有 n 个关键区域，不同的关键区域由 m 条无向地毯彼此连接。每条地毯可由三个整数 u、v、w 表示，其中 u 和 v 为地毯连接的两个关键区域编号，w 为这条地毯的美丽度。

由于颁奖典礼已经结束，铺过的地毯不得不拆除。为了贯彻勤俭节约的原则，组织者被要求只能保留 K 条地毯，且保留的地毯构成的图中，任意可互相到达的两点间只能有一种方式互相到达。换言之，组织者要求新图中不能有环。现在组织者求助你，想请你帮忙算出这 K 条地毯的美丽度之和最大为多少。

##### 问题分析

本题可以看出其实是一个求解“最大生成树”的算法，而我们较为熟悉的是使用 Prim 算法求解最小生成树。我们有以下两种方案：

- 对路径权重取**相反数**或**倒数**，得到最小生成树后再次进行一次逆操作
- 使用 kruskal 算法，对边的权重进行排序，之后选择权重最大的边集进行组合

##### 代码实现

```cpp
int n, m, k, f[100100], ans;
struct no
{
    int x, y, z;
} a[100100];
bool comp (const no & a, const no & b)
{
    return a.z > b.z;
}
int find(int x)
{
    if(f[x] != x)
        f[x] = find(f[x]);
    return f[x];
}
void un(int x, int y)
{
    f[x] = y;
}
int main()
{
	cin >> n >> m >> k;
    for(int i = 1; i <= m; i++)
		cin >> a[i].x >> a[i].y >> a[i].z;
    sort(a + 1, a + m + 1, comp);
    for(int i = 1; i <= n; i++) // 并查集，初始时每个祖先都是自己
        f[i] = i;
    for(int i = 1, kk = 0; i <= m && kk < k; i++)
    {
        int l = find(a[i].x), r = find(a[i].y);
        if(l != r) // 不在同一集合就合并
        {
            un(l, r);
            kk++; // 计数
            ans += a[i].z;
        }
    }
	cout << ans << endl;
    return 0;
}
```

#### 5.2.2. 背包问题

<https://www.acwing.com/problem/content/3/>

##### 问题描述

有一个能承重 $K$ 千克的包，现场有 $n$ 种类的物品，每个物品都能无限量供应，它们的重量和价值分别为 $w_i$ 和 $v_i$，请求出这个背包能够装下的所有物品最大价值为多少。

##### 问题分析

对于这样一个抽象的描述，对于我们来说，还是用具体的数字来举例，才能看得更加清晰。如果背包最大承重为 13 kg，而 4 类物品如下表所示。

| 序号 | 重量 | 价值 |
|:----:|:----:|:----:|
|  1   |  2   |  3   |
|  2   |  3   |  4   |
|  3   |  5   |  7   |
|  4   |  6   |  10  |

从贪心的角度分析，就是需要让背包装的尽量满，并且还要使物品的价值最大。

如果我们仅仅使用一个变量表示剩余的空间，另一个变量表示已经装载的价值，那么就有可能需要进行非常多次的比较，才能得到较为合适的结果。这似乎就不太满足**时刻贪心**的一个要求，即每一个步骤都选择最佳的方案。因此，我们结合动态规划，在每次取物品的时候，都尽量的把最佳的方案填写到状态数组中。

而这个状态数组的构建，我们需要采用的是针对背包承重的，即当背包能够承重 $n$ 的物品时，它所包含的价值为 $a[n]$

| 重量 |  0  |  1  |  2  |  3  |  4  |  5  |  6  |  7  |  8  |  9  | 10  | 11  | 12  |  13  |
|:----:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:---:|:----:|
| 价值 |  0  |  0  |  3  |  4  |  6  |  7  | 10  | 10  | 13  | 13  | 16  | 17  | 20  |  20  |
| 组合 | 无  | 无  |  2  |  3  | 2+2 |  5  |  6  | 5+2 | 6+2 | 7+2 | 8+2 | 8+3 | 6+6 | 10+3 |

模拟过程如下：

- 最大承重为 2 时，选择 1 号物品，最大价值为 3
- 最大承重为 3 时，选择 2 号物品，最大价值为 4
- 最大承重为 4 时，有两种选择，综合以下，我们选两个 1 号
	- 选择两个 1 号，价值为 6
	- 选择一个 2 号，价值为 4
- 最大承重为 5 时，有以下选择，综合以下，选择一个 3 号
	- 选择一个 3 号，价值为 7
	- 选择 1+2，价值为 7
	- 选择 1+1，价值为 6
- 最大承重为 6 时，有以下选择，综合以下，选择一个 4 号
	- 选择 4 号，价值为 10
	- 选择 2+2，价值为 8
	- ……
- ……

##### 代码实现

```cpp
#include <iostream>
#include <vector>
using namespace std;
int main()
{
    int n, m;
    cin >> n >> m;
    vector<int> weight(n + 1);
    vector<int> value(n + 1);
	// 构造 n+1 行 m+1 列的矩阵
    vector<vector<int>> f(n + 1, vector<int>(m + 1, 0));
	// 读取重量和价值
    for (int i = 1; i <= n; i++)
        cin >> weight[i] >> value[i];
	// 当前在放第 i 个物品
    for (int i = 1; i <= n; i++)
		// 当前背包的承重为 j
        for (int j = 0; j <= m; j++)
        {	// 如果背包还没满，那么还可以向里面放物品
            for (int k = 0; k * weight[i] <= j; k++)
				// 根据之前的结果，选择价值较大的那一个方案
                f[i][j] = max(f[i][j], f[i - 1][j - k * weight[i]] + k * value[i]);
        }
	// 最后一个元素即为最大价值
    cout << f[n][m] << endl;
    return 0;
}
```

#### 0-1 背包

```cpp
#include <iostream>
using namespace std;
const int MAX = 1005;
int n, W;
int f[MAX], w[MAX], v[MAX];
int main()
{
	cin >> n >> W;
	for (int i = 1; i <= n; i++)
		cin >> w[i] >> v[i];
	for (int i = 1; i <= n; i++)
		for (int l = W; l >= w[i]; l--)
			if (f[l] < f[l - w[i]] + v[i])
				f[l] = f[l - w[i]] + v[i];
	cout << f[W] << endl;
	return 0;
}
```

#### 完全背包

```cpp
#include <iostream>
using namespace std;
const int MAX = 1005;
int n, W;
int f[MAX], w[MAX], v[MAX];
int main()
{
	cin >> n >> W;
	for (int i = 1; i <= n; i++)
		cin >> w[i] >> v[i];
	for (int i = 1; i <= n; i++)
		for (int l = w[i]; l <= W; l++)
			if (f[l] < f[l - w[i]] + v[i])
				f[l] = f[l - w[i]] + v[i];
	cout << f[W] << endl;
	return 0;
}
```

#### 多重背包

```cpp
#include <bits/stdc++.h>
using namespace std;
int a[10005], b[10005], t = 0, n, m, dp[10005] = { }, w, v, s;
int main()
{
    cin >> n >> m;
    while(n--)
    {
        cin >> v >> w >> s;
        while(s--)
        {
            a[++t] = v;
            b[t] = w;
        } //死拆，把多重背包拆成01背包
    }
    for(int i = 1; i <= t; i++)
	    for(int j = m; j >= a[i]; j--)
		    dp[j] = max(dp[j - a[i]] + b[i], dp[j]);
    cout << dp[m] << endl;
    return 0;
}
```

#### 5.2.3. 股票买卖

<https://www.acwing.com/problem/content/79/>

##### 问题描述

假设把某股票的价格按照时间先后顺序存储在数组中，请问买卖**一次**该股票可能获得的利润是多少？

例如一只股票在某些时间节点的价格为 $[9,11,8,5,7,12,16,14]$。如果我们能在价格为 5 的时候买入并在价格为 16 时卖出，则能收获最大的利润 11。

##### 问题分析

本题中由于只需要买卖一次股票，因此只需要搜索这个数组中的两个元素 $a_m$ 和 $a_M$，满足 $a_M$ 和 $a_m$ 的差值（的绝对值）最大，其中 $a_m \leqslant a_M, m<M$。从而，我们就可以得到如下的贪心选择：

```cpp
buy = stock[0], diff = 0;
for (i = 0; i < stock.size(); i++)
{
	buy = min(buy, stock[i]);    		// 选出买入价格最小的一次
	diff = max(diff, stock[i] - buy);	// 差价选择较大的一项，注意卖出必须在买入之后
}
```

##### 代码实现

```cpp
int maxDiff(vector<int>& nums)
{
    int buy = nums[0], diff = 0;
    for (int i = 0; i < nums.size(); i++)
	{
        buy = min(buy, nums[i]);
        diff = max(diff, nums[i] - buy);
    }
    return diff;
}
```

## 6. 回溯搜索法

### 6.1. 基本思想

回溯法是能避免不必要搜索的穷举式搜索法。回溯法是一个既带有系统性又带有跳跃性的搜索算法。回溯法在问题的解空间树中，按**深度优先策略**，从根结点出发搜索解空间树。算法搜索至解空间树的任一结点时，先判断该结点是否包含问题的解。如果肯定不包含，则跳过对该结点为根的子树的搜索，**逐层向其祖先结点回溯**；否则，进入该子树，**继续按深度优先策略搜索**。

为了避免生成那些不可能产生最优解的问题状态，要不断利用**剪枝函数**来剪掉那些实际上不可能产生所需解的活结点，以减少问题的计算量。回溯法的基本步骤：

1. 针对所给问题，定义问题的解空间，找出进行穷举的搜索范围。
2. 确定易于搜索的解空间结构，一般是形成状态空间树。
3. 深度优先方式搜索解空间，搜索过程中用剪枝函数（约束函数、限界函数）避免无效搜索。

### 6.2. 例题

#### 6.2.1. 数独

<https://www.acwing.com/problem/content/168/>

##### 问题描述

在一个 $9\times 9$ 的方格内填入 1~9 的数字，使得每一行、每一列、以及 9 个 $3\times 3$ 的子方格中的数字都不能重复。

##### 问题分析

采用深度优先的搜索，让数从小到大开始搜索，当遇到“当前格子没有办法填入任何一个数”时，将尝试结果进行回溯，使父结点尝试新的数。由于数独有非常多组解，因此只需解出一组即可。

##### 代码实现

```cpp
bool isValid(vector<vector<int>> &matrix, int row, int col, int num)
{	// 填入的这个数字是否合法
    int sub_row = row / 3 * 3, sub_col = col / 3 * 3;
    for (int i = 0; i < 9; i++)
    {
        if (matrix[row][i] == num)  // 行冲突
            return false;
        if (matrix[i][col] == num)  // 列冲突
            return false;
        if (matrix[sub_row + i / 3][sub_col + i % 3] == num)  // 子矩阵冲突
            return false;
    }
    return true;
}
bool fillMatrix(vector<vector<int>> &matrix, int x, int y)
{	// 查找空位
    for (int i = x; i < 9; i++)
        for (int j = y; i < 9; j++)
            if (matrix[x][y] == 0)
            {
                x = i, y = j;
                goto L1;
            }
L1:	if (matrix[x][y] != 0)
        return true;
    for (int num = 1; num <= 9; num++)
    {
        if (!isValid(matrix, x, y, num))
            continue;
        matrix[x][y] = num;  	// 填入数字
        if (x == 8 && y == 8) 	// 到达最后一个格子
        {
            Output(matrix);  	// 输出矩阵
            return true;
        }
        int n_row, n_col;		// 下一个要填写的位置
        if (y < 8)
            n_row = x, n_col = y + 1;
        else
            n_row = x + 1, n_col = 0;
        if (fillMatrix(matrix, n_row, n_col))  // 递归填写
            return true;
        matrix[x][y] = 0;		// 不满足的数，恢复现场
    }
    return false;
}
```

#### 6.2.2. 矩阵中的路径

<https://www.acwing.com/problem/content/21/>

##### 问题描述

请设计一个函数，用来判断在一个矩阵中是否存在一条包含某字符串所有字符的路径。路径可以从矩阵中的任意一个格子开始，每一步可以在矩阵中向左，向右，向上，向下移动一个格子。如果一条路径经过了矩阵中的某一个格子，则之后不能再次进入这个格子。

```cpp
matrix=[["A","B","C","E"],
  		["S","F","C","S"],
  		["A","D","E","E"]]
str="BCCE" , return "true" 
```

##### 问题分析

路径问题使用深度优先搜索，如果遇到匹配的元素，那么就寻找下一步；如果找不到匹配的元素，那么就回退到上一步。

##### 代码实现

```cpp
int dx[4] = {-1, 0, 1, 0}, dy[4] = {0, 1, 0, -1};
bool hasPath(vector<vector<char>>& matrix, string &str) {
    if (matrix.size() == 0) return false;
    vector<bool> visited(matrix.size() * matrix[0].size(), 0);
    for (int i = 0; i < matrix.size(); i ++ ) {
        for (int j = 0; j < matrix[i].size(); j ++ ) {
			// 从 (i,j) 处开始搜索
            if (dfs(matrix, str, i, j, 0, visited)) {
                return true;  // 找到路径,返回 true
            }
        }
    }
    return false;
}
bool dfs(vector<vector<char>>& matrix, string &str, 
		 int i, int j, int k, vector<bool>& visited) {
    if (matrix[i][j] != str[k]) return false;	// 字符匹配失败
    if (str.length() == k + 1) return true;		// 整个串匹配成功
    int pos = i * matrix[i].size() + j;			// (i,j) 的位置
    visited[pos] = true;						// 标记已经访问过 (i,j)
    for (int l = 0; l < 4; l ++) {				// 向上下左右延伸
        int x = i + dx[l], y = j + dy[l];
        if (x >= 0 && x < matrix.size() && y >= 0 && y < matrix[x].size() // 越界判断
			&& !visited[x * matrix[x].size() + y]) {	// 已访问判断，防止来回跳动
            if (dfs(matrix, str, x, y, k + 1, visited)) {
                return true;
            }
        }
    }
    visited[pos] = false;	// 未能找到下一部匹配，则回溯到上一步
    return false;
}
```

#### 6.2.3. 二叉树中和为某一值的路径

<https://www.acwing.com/problem/content/45/>

##### 问题描述

输入一棵二叉树和一个整数，打印出二叉树中结点值的和为输入整数的所有路径。从树的根结点开始往下一直到叶结点所经过的结点形成一条路径。保证树中结点值均不小于 0。

```
给出二叉树如下所示，并给出num=22。
      5
     / \
    4   6
   /   / \
  12  13  6
 /  \    / \
9    1  5   1

输出：[[5,4,12,1],[5,6,6,5]]
```

##### 问题分析

使用深度优先搜索。由于需要从根节点到叶节点形成的一条路径上和为指定的值，因此需要一个数组来保存走过的路径。每向前一步走，都为下一步做了铺垫，也就是说，进入下一步时，sum 值就减去了刚才一个节点的值。而回退的时候，sum 还需要加回原来走过的节点的值。

##### 代码实现

```cpp
struct TreeNode
{
    int val;
    TreeNode *left;
    TreeNode *right;
};
void dfs(TreeNode* root, int sum, vector<vector<int>> &res, vector<int>& path)
{
    if (!root) return;
    path.push_back(root->val);	// 记录路径
    sum -= root->val;  			// 向前一步
    if (!root->left && !root->right && sum == 0)  // 从根到叶值刚好为 sum
        res.push_back(path);
    if (root->left) dfs(root->left, sum, res, path);  // 对左子树进行进一步操作
    if (root->right) dfs(root->right, sum, res, path);  // 对右子树进行进一步操作
    path.pop_back();  // 回溯
    sum += root->val;
}
void findPath(TreeNode *root, int sum, vector<vector<int>> &res)
{
    vector<int> path;
    dfs(root, sum, res, path);
    for (int i = 0; i < res.size(); i++)  // 输出路径
    {
        for (int j = 0; j < res[i].size(); j++)
            cout << res[i][j] << " ";
        cout << endl;
    }
}
```



## 7. 动态规划

### 7.1. 基本思想

与分治法类似，动态规划的基本思想也是将待求解问题分解成若⼲子问题，**用最优原则来建立递归关系式**。但是经分解得到的子问题往往不是互相独立的（重叠子问题），不同子问题的数目只有**多项式量级**，在用分治法求解时，有些子问题被重复计算，导致算法需要**指数级**时间复杂度。

如果能**保存已解决子问题的答案**，对每一个问题只计算一次，而后将其解存在一个表格（备忘录）中， 当再次要解此问题时，用常数时间调用已有的结果，就可以避免重复，得到多项式时间的算法。

#### 7.1.1. 动态规划的基本步骤

1. 找出最优解的性质，并刻画其结构特征。
2. 递归地定义最优值。
3. 以自底向上的方式计算出最优值。
4. 根据计算最优值过程中得到的信息，构造最优解。

#### 7.1.2. 动态规划的设计要素

- 建模时，优化的目标函数是什么，约束条件是什么；
- 如何划分子问题（**边界**）；
- 问题的优化函数值与子问题的优化函数值存在什么依赖关系（**递推方程**）；
- 是否满足优化原则或最优子结构；
- 最小子问题怎样界定，初值等于什么。

### 7.2. 问题举例

#### 7.2.1. 抛骰子

<https://www.acwing.com/problem/content/76/>

##### 问题描述

将 $1$ 个骰子抛起，点数之和有 $6$ 种不同的情况，分别为 $1, 2, 3, 4, 5, 6$，其可能的情况数分别为 $[1,1,1,1,1,1]$。

将 $2$ 个骰子抛起，点数之和有 $11$ 种不同的情况，分别为 $2, 3, 4, \cdots, 12$，其可能的情况数分别为 $[1,2,3,4,5,6,5,4,3,2,1]$，因为点数和为 $3$ 有 $1+2$ 和 $2+1$ 两种情况，点数和为 $4$ 有 $1+3$，$3+1$，$2+2$ 三种情况。

如果抛起 $n$ 个骰子，点数之和有 $n\sim 6n$ 这些情况，请输出情况数的矩阵。

##### 分析

如果抛出 $3$ 枚骰子，则有 $3,4,\cdots,18$ 这些情况，情况数分别为 $[1,3,6,10,15,21,...]$，发现是一个组合数的序列。但是这种方法似乎有点投机取巧。

然而，我们想到组合数中的**帕斯卡恒等式** $C_{n+1}^k=C_{n}^{k}+C_n^{k-1}$，它的本质其实是一个迭代，或者说是动态规划，每个数可以基于上一步的结果来进行运算，即

1. $v_{i}[0]$ 可由 ==$v_{i-1}[0]$ 加上一个 **掷出结果为 $1$**== 组成
2. $v_{i}[1]$ 可由 ==$v_{i-1}[0]$ 加上一个 **掷出结果为 $2$**==，==$v_{i-1}[1]$ 加上一个 **掷出结果为 $1$**== 组成
3. $v_{i}[2]$ 可由 ==$v_{i-1}[0]$ 加上一个 **掷出结果为 $3$**==，==$v_{i-1}[1]$ 加上一个 **掷出结果为 $2$**==，==$v_{i-1}[2]$ 加上一个 **掷出结果为 $1$**== 组成

注意，一个骰子最多可掷出 $6$ 点，所以最终的递推式为

$$
\begin{aligned}
v_{i}[j]&=\sum_{k=j-6+1}^{j-6+6}v_{i-1}[k]\\
&=v_{i-1}[j-5]+v_{i-1}[j-4]+v_{i-1}[j-3]+v_{i-1}[j-2]+v_{i-1}[j-1]+v_{i-1}[j]
\end{aligned}
$$

##### 代码

在这里，为了统一化管理，可以在数组的前面插入一些空格，使得前 5 种情况也能够用一般的公式来计算。

```cpp
void numberOfDice(int n)
{
 	vector<vector<int>> v(n + 1, vector<int>(6 * n + 7, 0));
 	for (int i = 1; i <= 6; i++)
 	v[1][i + 6] = 1;
 	for (int i = 2; i <= n; i++)
 	{
 		for (int j = i; j <= 6 * i; j++)
 		{
 			v[i][j + 6] = v[i - 1][(j - 1) + 6]
 						+ v[i - 1][(j - 2) + 6]
 						+ v[i - 1][(j - 3) + 6]
 						+ v[i - 1][(j - 4) + 6]
 						+ v[i - 1][(j - 5) + 6]
 						+ v[i - 1][(j - 6) + 6];
 		}
 	}
 	for (int i = 1; i <= n; i++)
 	{
 		for (int j = i + 6; j <= i * 6 + 6; j++)
 			cout << v[i][j] << ",";
 		cout << endl;
 	}
}
```

#### 7.2.2. 斐波那契数列的变式

##### 问题描述

对于斐波那契数列的某一项 $a[n]$，它是由前面的项 $a[n-1]+a[n-2]$ 构成的，类似的问题形式还有：某人一次能够跨上 1 级或 2 级台阶，求到达第 n 级台阶共有多少种方法。

而在这里的问题中，某人一次最多可以跨上 k 级台阶，那么他到达第 n 级台阶有多少种方法？

##### 问题分析

对于较为简单的斐波那契数列，我们可以构造一个长度为 $n$ 的数组，然后依次的对每一个元素进行赋值，这个值由该元素的前两项相加构成。简言之，只需使用“**走一步，回看两步**”这种方式，即可得到最终结果。

$$
f(n) = f(n-1)+f(n-2)
$$


而对于本题，无非就是“**走一步，回看 $k$ 步**”，因此问题相对来说只是在上面的层次上稍微修改了一些数据，其他并没有变化。

$$
f(n)=f(n-k)+f(n-k+1)+\cdots+f(n-2)+f(n-1)=\sum_{i=n-k}^{n-1}f(i)
$$

##### 代码实现

```cpp
int Solve(int n, int k)
{
    vector<int> fib(n + k, 0);
	// 给前面预留 k 个空位，而本人当前站在第 k-1 级上
	// 站在开始处只有一种方法
    fib[k - 1] = 1;
    for (int i = k; i < n + k; i++)
    {
		// 对于向上的一层台阶，可以从它的前面的台阶推导
        int s = 0;
        for (int j = i - k; j < i; j++)
        {
            s += fib[j];
        }
        fib[i] = s;
    }
	// 到达终点
    int ans = fib[n + k - 1];
    return ans;
}
```

#### 7.2.3. 礼物的最大价值

<https://www.acwing.com/problem/content/56/>

##### 问题描述

在一个 $m\times n$ 的棋盘的每一格都放有一个礼物，每个礼物都有一定的价值（价值大于 0）。你可以从棋盘的左上角开始拿格子里的礼物，并每次向右或者向下移动一格直到到达棋盘的右下角。

给定一个棋盘及其上面的礼物，请计算你最多能拿到多少价值的礼物？

```
输入：[[2,3,1],
       [1,7,1],
       [4,6,1]]
输出：19
解释：沿着路径 2→3→7→6→1 可以得到拿到最大价值礼物。
```

##### 问题分析

最开始，我们可能会考虑使用贪心法，去搜索局部的最优解。但是这种方法有一些致命的缺陷，在如下的示例中就无法得到最佳的结果：

```
[[ 1, 1, 1, 1, 1],
 [ 2, 3, 1, 1,99],
 [ 3, 4, 1, 1, 1],
 [ 2, 1, 3, 4, 2]]
```

贪心方法在此处就显的有些鼠目寸光，因此我们还是需要全盘的进行考虑。对于矩阵中一个格子，我们想要尽可能的让它的价值更高，所以需要从它的上边一格或左边一个中，选出价值较高的，加上本身这一格的价值，填充到这一格。最终，会在矩阵的最后一个元素，得到最大的价值。

对于上面的例子，我们可以得到这样一个矩阵

|  1  |  2  |  3  |  4  |  5  |
|:---:|:---:|:---:|:---:|:---:|
|  3  |  6  |  7  |  8  | 107 |
|  6  | 10  | 11  | 12  | 108 |
|  8  | 11  | 14  | 18  | 110 |

##### 代码实现

```cpp
int getMaxValue(vector<vector<int>>& grid) {
    int i, j;
    for (i = 0; i < grid.size(); i++) {
        for (j = 0; j < grid[i].size(); j++) {
            if (i != 0 && j != 0)	// 不在靠左和靠上边的处理
                grid[i][j] += max(grid[i - 1][j], grid[i][j - 1]);
            else if (i != 0)		// 靠左边的处理
                grid[i][j] += grid[i - 1][j];
            else if (j != 0)		// 靠上边的处理
                grid[i][j] += grid[i][j - 1];
        }
    }
    return grid[i - 1][j - 1];
}
```

数组的主元素

```cpp
int hasMajor(int* arr, int n) {
    int a = arr[0], count = 1;
    for (int i = 1; i < n; ++i) {
        if (arr[i] == a) {
	        count++;
        }
	    else {
	        count--;
	        if (count <= 0) {
	            a = arr[i];
	        }
	    }
    }
    return a;
}
```



## 8. 树

### 8.1. 基本概念

在前面讲到的数据结构大多是线性的，而树可以算是一种更加复杂的类线性结构，这样我们可以采用不同的方法来处理树，例如深度优先或者广度优先，以及在此处，我们可以学到不少分治的思想。同时，利用树进行一些处理，可以让一些问题的解决更加的灵活。

### 8.2. 问题举例

#### 8.2.1. 二叉树转双向链表

<https://www.acwing.com/problem/content/87/>

##### 问题描述

有一棵完全二叉数，现要将这棵二叉数转变为一个双向链表，头节点为最左叶子节点，尾节点为最右叶子节点。

##### 问题分析

从题意可以看出，算法逻辑应当为“中序遍历”，即先处理左子树，然后处理根结点，最后处理右子树，而剩下的就只有处理指针了。

处理指针的过程为：需要一个前驱节点，用来指向已经处理好的左子树的尾节点。此时左子树其实已经变成了双向链表。因此我们需要做的就是：

- 当前处理的根结点的左节点指向链表尾部
- 链表尾部的右节点指向当前处理的根结点
- 链表尾指针指向新的尾节点

##### 代码实现

```cpp
TreeNode* prev = NULL;
void process(TreeNode* root) {
    root->left = prev;
    if (prev) prev->right = root;
    prev = root;
}
void inOrder(TreeNode* root) {
    if (!root) return;
    inOrder(root->left);	// 左子树
    process(root);			// 根结点
    inOrder(root->right);	// 右子树
}
TreeNode* convert(TreeNode* root) {
    inOrder(root); // 处理完后，root为根节点
    while (root && root->left) // 向左子树遍历，把节点指向左子树的叶节点
        root = root->left;
    return root;
}
```

#### 8.2.2. 医院设置

<https://www.luogu.com.cn/problem/P1364>

##### 问题描述

设有一棵二叉树，如图：


其中，圈中的数字表示结点中居民的人口。圈边上数字表示结点编号，现在要求在某个结点上建立一个医院，使所有居民所走的路程之和为最小，同时约定，相邻接点之间的距离为 11。如上图中，若医院建在 1 处，则距离和 $=4+12+2\times20+2\times40=136=4+12+2×20+2×40=136$；若医院建在 3 处，则距离和 $=4\times2+13+20+40=81=4×2+13+20+40=81$。

- 输入格式
	- 第一行一个整数 n，表示树的结点数。
	- 接下来的 n 行每行描述了一个结点的状况，包含三个整数 w, u, v，其中 w 为居民人口数，u 为左链接（为 0 表示无链接），v 为右链接（为 0 表示无链接）。
- 输出格式
	- 一个整数，表示最小距离和。

##### 问题分析

由于本题数据量不大 $(1\leqslant n \leqslant 100)$，可以使用邻接矩阵来存储，并使用 Floyd 算法求出任意两个顶点之间的最短路径。

得到以上数据后，尝试医院可能的 n 个节点的位置，得到一个最小的距离。

##### 代码实现

```cpp
#include <iostream>
using namespace std;
const int INF = 0x7ffffff;
const int N = 101;
void floyd(int m[N][N], int n)
{
    for (int k = 1; k <= n; k++)
        for (int i = 1; i <= n; i++)
            if (i != k)
                for (int j = 1; j <= n; j++)
                    if (i != j && k != j && m[i][k] + m[k][j] < m[i][j])
                        m[i][j] = m[i][k] + m[k][j];
}
int main()
{
    int m[N][N] = {0};
    int a[N] = {0};
    int n, w, u, v, min = INF, total_dist;
    cin >> n;
    for (int i = 1; i <= n; i++)
        for (int j = 1; j <= n; j++)
            m[i][j] = INF;
    for (int i = 1; i <= n; i++)
    {
        cin >> w >> u >> v;
        m[i][i] = 0, a[i] = w;
        m[i][u] = m[u][i] = 1;
        m[i][v] = m[v][i] = 1;
    }
    floyd(m, n);
    Output(m, n);  // 打印查看矩阵
    for (int i = 1; i <= n; i++)
    {
        total_dist = 0;
        for (int j = 1; j <= n; j++)
            total_dist += m[i][j] * a[j];
        if (total_dist < min)
            min = total_dist;
    }
    cout << min << endl;
    return 0;
}
```

#### 8.2.3. 线段树

https://www.luogu.com.cn/problem/P3372

##### 问题描述

如题，已知一个数列，你需要进行下面两种操作：

1.  将某区间每一个数加上 $k$。
2.  求出某区间每一个数的和。

- 输入格式
	- 第一行包含两个整数 $n, m$，分别表示该数列数字的个数和操作的总个数。
	- 第二行包含 $n$ 个用空格分隔的整数，其中第 $i$ 个数字表示数列第 $i$ 项的初始值。
	- 接下来 $m$ 行每行包含 $3$ 或 $4$ 个整数，表示一个操作，具体如下：
		-  `1 x y k`：将区间 $[x, y]$ 内每个数加上 $k$。	
		-  `2 x y`：输出区间 $[x, y]$ 内每个数的和。
- 输出格式
	- 输出包含若干行整数，即为所有操作 2 的结果。

##### 问题分析

对于这样一个数列，我们可以使用线性操作，但是如果对于数据量非常大的数列，那么搜索和处理，尤其是合并会相当的耗费算力。

对于可以结合的元素，例如求和、求最大值、最小值等，可以将结果合并在（相对的）父结点，能够使得处理速度加快不少。


##### 代码实现

```cpp
#include <iostream>
#include <cmath>
using namespace std;
const int N = 10000;
typedef long long ll;
struct Node
{
    int left, right; // 左右孩子下标
    ll s;            // 求和
};
// 对 a[left]...a[right]，建立线段树，存于 tree[k]
void build(ll *a, Node *tree, int left, int right, int k)
{
    tree[k].left = left, tree[k].right = right;
    if (left == right)       // 对于没有子节点的
        tree[k].s = a[left]; // 求和只有一个元素
    else
    {
        int mid = (left + right) >> 1;
        build(a, tree, left, mid, 2 * k + 1);       // 左孩子下标 2 * k + 1
        build(a, tree, mid + 1, right, 2 * k + 2);  // 右孩子下标 2 * k + 2
        tree[k].s = tree[2 * k + 1].s + tree[2 * k + 2].s; // 对左右子树求和
    }
}
// 在以 root 为根的线段树 tree 中，查找 [left,right] 的特征值
ll query(Node *tree, int root, int left, int right)
{
    if (tree[root].left == left && tree[root].right == right) // 找到该节点就是答案
        return tree[root].s;                                  // 返回节点的特征值
    int mid = (tree[root].left + tree[root].right) >> 1;
    if (right <= mid)
        return query(tree, root * 2 + 1, left, right); // 在左子树查找
    if (left > mid)
        return query(tree, root * 2 + 2, left, right); // 在右子树查找
    ll s1 = query(tree, root * 2 + 1, left, mid);      // 在左子树查找
    ll s2 = query(tree, root * 2 + 2, mid + 1, right); // 在右子树查找
    return s1 + s2;                                    // 处理最终结果
}
void update(Node *tree, int root, int k, ll value)
{
    if (tree[root].left == tree[root].right)
    {
        tree[root].s += value;
        return;
    }
    int mid = (tree[root].left + tree[root].right) >> 1;
    if (k <= mid)
        update(tree, 2 * root + 1, k, value);
    else
        update(tree, 2 * root + 2, k, value);
    tree[root].s = tree[2 * root + 1].s + tree[2 * root + 2].s;
}
void updateInterval(Node *tree, int root, int left, int right, ll addon)
{
    for (int i = left; i <= right; i++)
        update(tree, 0, i, addon);
}
void test()
{
    int n, m;
    cin >> n >> m;
    ll a[N] = {0};
    for (int i = 0; i < n; i++)
        cin >> a[i];
    int num = 2 * n - 1;
    int depth = log10(num) / log10(2) + 1;
    num = 1 << depth;
    Node tree[2 * N];
    build(a, tree, 0, n - 1, 0);
    for (int i = 0; i < m; i++)
    {
        int c, x, y, k;
        ll q;
        cin >> c;
        if (c == 1)
        {
            cin >> x >> y >> k;
            updateInterval(tree, 0, x - 1, y - 1, k);
        }
        else
        {
            cin >> x >> y;
            q = query(tree, 0, x - 1, y - 1);
            cout << q << endl;
        }
    }
}
int main()
{
    test(); 
    return 0;
}
```

## 9. 图

### 9.1. 概念与基本结构

图是一种非常常用的非线性结构，相对于树来说更为复杂，任意两个节点之间都能有边连接。因此，图的存储结构也相对较多样化，例如邻接矩阵、邻接表、multi_map、链式向前星等等。


### 9.2. 问题举例

#### 9.2.1. 单源最短路径

<https://www.luogu.com.cn/problem/P4779>

##### 问题描述

给定一个 n 个点，m 条有向边的带非负权图，请你计算从 s 出发，到每个点的距离。数据保证你能从 s 出发到任意点。

##### 问题分析

使用 Dijkstra 算法，从 s 出发，找到距离最小的边，将这个对应的顶点加入集合内，直至所有顶点都进入集合中。

##### 代码实现

采用了链式前向星存储图结构，[查看详情](undergraduate/algorithm/graph.md)

```cpp
#include <iostream>
#include <queue>
#include <cstring>
using namespace std;
const int N = 10002, E = 50005;
struct Edge
{
    int to, next, dist;
};
Edge e[E];
int cnt, vexnum, edgenum;
int head[N];
int dist[N];
bool visited[N];
struct Node
{
    int dist;
    int pos;
    Node(int d, int p) : dist(d), pos(p) {}
    bool operator<(const Node &x) const
    {
        return x.dist < dist;
    }
};
priority_queue<Node> q;
void addEdge(int from, int to, int dist)
{
    cnt++;
    e[cnt].dist = dist;       // 边的权重
    e[cnt].to = to;           // 指向的下一个顶点
    e[cnt].next = head[from]; // 第 cnt 条边的下一条边的序号
    head[from] = cnt;         // head[i] 保存的是以 i 为起点的所有边中编号最大的那个
}
void dijkstra(int s)
{
    dist[s] = 0;
    q.push(Node(0, s));
    while (!q.empty())  // 使用优先队列对取点进行优化
    {
        Node tmp = q.top();
        q.pop();
        int vex = tmp.pos, d = tmp.dist;
        if (visited[vex])  // 跳过已经访问过的点
            continue;
        visited[vex] = true;
        int t = head[vex];
        while (t != -1)
        {
            int vex_to = e[t].to;
            if (dist[vex_to] > dist[vex] + e[t].dist)
            {  // 选择权重较小的那条路径
                dist[vex_to] = dist[vex] + e[t].dist;
                if (!visited[vex_to])  // 将未访问过的节点继续入队
                    q.push(Node(dist[vex_to], vex_to));
            }
            t = e[t].next;  // 寻找 vex 为起始的下一条边
        }
    }
}
int main()
{
    cnt = 0;
    int s;
    cin >> vexnum >> edgenum >> s;
    for (int i = 0; i <= vexnum; i++)
    {
        head[i] = -1;
        visited[i] = false;
        dist[i] = 0x7fffffff;
    }
    int from, to, d;
    while (edgenum--)
    {
        cin >> from >> to >> d;
        addEdge(from, to, d);
    }
    dijkstra(s);
    for (int k = 1; k <= vexnum; k++)
        cout << dist[k] << " ";
    return 0;
}
```

#### 9.2.2. 最大子树之和

<https://www.luogu.com.cn/problem/P1122>

##### 问题描述

有 $N$ 朵花，由 $N-1$ 根枝条连在一起，形成一棵树，上面的每一朵花都有一个美丽度，美丽度有可能为负值。现要求剪断并扔掉几根枝条，使得剩下的一棵（连通的）树，它的美丽度之和最大。

- 输入格式
	- 第一行一个整数$N(1\leqslant N\leqslant 16000)$。表示原始的那株花卉上共 $N$ 朵花
	- 第二行有 $N$ 个整数，第 $I$ 个整数表示第 $I$ 朵花的美丽指数。
	- 接下来 $N−1$ 行每行两个整数 $a,b$，表示存在一条连接第 $a$ 朵花和第 $b$ 朵花的枝条。
- 输出格式
	- 一个数，表示一系列“修剪”之后所能得到的“美丽指数”之和的最大值。保证绝对值不超过 2147483647。

##### 问题分析

题意是要我们找到树上点权之和最大的一个连通分量，去掉对权值负面影响较大的节点。用 $f[i]$ 记录以 i 为根的子树中点权和最大的一棵子树，$a[i]$ 是输入的点权，最终找到最大的 $f[i]$ 作为答案。

$f[i]$ 的公式推导：在某个节点 $x$ 处，这个节点一定包含在本身在内的连通分量中，所以先将 $f[x]$ 初始化为 $a[x]$。接着对于 $x$ 的子树 $y_i$，当 $f[y_i]<0$ 时，将这棵子树剪掉，否则保留这棵树。

##### 代码实现

```cpp
#include <iostream>
using namespace std;
const int N = 16005;
int a[N], f[N], head[N];
int cnt;
struct Edge
{
    int to, next;
} e[N];
void addEdge(int from, int to)
{
    cnt++;
    e[cnt].to = to;
    e[cnt].next = head[from];
    head[from] = cnt;
}
void dfs(int x, int fa)
{
    f[x] = a[x];
    int t = head[x];
    while (t != -1)
    {
        int vex_to = e[t].to;
        if (vex_to != fa)
        {
            dfs(vex_to, x);
            if (f[vex_to] > 0)
                f[x] += f[vex_to];
        }
        t = e[t].next;
    }
}
int main()
{
    int n, x, y, ans = 0x80000000;
    cin >> n;
    for (int i = 1; i <= n; i++)
    {
        cin >> a[i];
        head[i] = -1;
    }
    for (int i = 1; i < n; i++)
    {
        cin >> x >> y;
        addEdge(x, y);
        addEdge(y, x);
    }
    dfs(1, 0);
    for (int i = 1; i <= n; i++)
        ans = max(ans, f[i]);
    cout << ans << endl;
    return 0;
}
```

#### 9.2.3. 家谱

<https://www.luogu.com.cn/problem/P2814>

##### 问题描述

给出充足的父子关系，请你编写程序找到某个人的最早的祖先。

- 输入格式
	- 输入由多行组成，首先是一系列有关父子关系的描述，其中每一组父子关系中父亲只有一行，儿子可能有若干行，用 `#name` 的形式描写一组父子关系中的父亲的名字，用 `+name` 的形式描写一组父子关系中的儿子的名字；接下来用 `?name` 的形式表示要求该人的最早的祖先；最后用单独的一个 `$` 表示文件结束。
- 输出格式
	- 按照输入文件的要求顺序，求出每一个要找祖先的人的祖先，格式为：本人的名字 + 一个空格 + 祖先的名字 + 回车。

##### 问题分析

本题可以使用 map 来存储这样一棵树，然后再使用查找，逐层向上检查，但是这样做感觉也有些违背了我所想的样子。我刚开始的想法，是给这些关系构建一个拓扑排序，而对于某一个对象，他的祖先就是该拓扑的根。不妨就将这道题作为拓扑排序的一个训练模板。

##### 代码实现

```cpp
#include <iostream>
#include <string>
#include <unordered_map>
using namespace std;
unordered_map<string, string> m;
string find(string x)  // 查找祖先
{
    if (x != m[x])
        m[x] = find(m[x]);
    return m[x];
}
int main()
{
    char ch;
    string child, parent;

    cin >> ch;
    while (ch != '$')
    {
        if (ch == '#')
        {
            cin >> parent;
            if (m[parent] == "")  // 如果他没有祖先，那么就把 parent 定为自己
                m[parent] = parent;
        }
        else if (ch == '+')
        {
            cin >> child;
            m[child] = parent;  // 给出父结点
        }
        else
        {
            cin >> child;
            cout << child << " " << find(child) << endl;
        }
        cin >> ch;
    }
    return 0;
}
```

```cpp
// 拓扑排序
#include <iostream>
#include <queue>
using namespace std;
const int N = 10005;
struct Edge
{
    int to, next;
} e[N];
int head[N];
int indeg[N];
int cnt, n, m;
void addEdge(int from, int to)
{
    cnt++;
    e[cnt].to = to;
    e[cnt].next = head[from];
    head[from] = cnt;
    indeg[to]++; // 某个节点的入度增加
}
void topo(queue<int> &q)
{
    for (int i = 1; i <= n; i++)
        if (indeg[i] == 0)
            q.push(i); // 入度为 0 的节点入队
    while (!q.empty())
    {
        int tmp = q.front(); // 取出一个入度为 0 的节点
        q.pop();
        for (int t = head[tmp]; t != -1; t = e[t].next)
        {
            int vex_to = e[t].to;                   // 找到它的一个目标节点
            cout << tmp << "-->" << vex_to << endl; // 输出它的路径
            indeg[vex_to]--;                        // 目标节点的入度减一
            if (indeg[vex_to] == 0)                 // 如果入度为 0，即没有前驱节点了
                q.push(vex_to);                     // 那么将这一个节点入队
        }
    }
}
int main()
{
    int x, y;
    cin >> n >> m;
    for (int i = 0; i <= n; i++)
    {
        head[i] = -1, indeg[i] = 0;
    }
    for (int i = 1; i <= m; i++)
    {
        cin >> x >> y;
        addEdge(x, y);
    }
    queue<int> q;
    topo(q);
    return 0;
}
```



