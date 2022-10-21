# 第 3 章 栈 队列 数组

## 3.1. 栈

### 3.1.1. 定义

后进先出

#### 数学性质

$n$ 个不同元素进栈，出栈元素不同排列的个数为

$$
\begin{aligned}
{1 \over n+1} C_{2n} ^{n}
\end{aligned}
$$

### 3.1.2. 栈的形式

- 数组栈
- 链栈

## 3.2. 队列

### 3.2.1. 定义

先进先出

### 3.2.2. 顺序存储结构

#### 1. 顺序队列

```cpp
#define MaxSize 50
struct SeqQueue {
	int data[MaxSize];
	int front, rear;
}
```

- 队空：`Q.front == Q.rear == 0`
- 入队：`if ( !Q.full() ) { Q.rear = x; Q.rear++; }`
- 出队：`if ( !Q.empty() ) { int temp = Q.front; Q.front++; return temp; }`

然而，这种队列存在假溢出的现象，需要进行改进。

#### 2. 循环队列

- 初始：`Q.front == Q.rear == 0`
- 队首指针进一：`Q.front = (Q.front + 1) % MaxSize`
- 队尾指针进一：`Q.rear = (Q.rear + 1) % MaxSize`
- 队列长度：`(Q.rear - Q.front + MaxSize) % MaxSize`

此时，队空和队满的条件相同，难以区分。可以采用 “牺牲一个元素的位置” 来决定队列是否满。

|  index  |   0   |  1  |  2  |  3   | 4   | 5   | 6   | 7   | 8   | 9   |
|:-------:|:-----:|:---:|:---:|:----:|:---:|:---:|:---:|:---:|:---:|:---:|
|  value  |   a   |  b  |  c  |      |     |     |     |     |     |     |
| pointer | front |     |     | rear |     |     |     |     |     |     |

|  index  |  0  |  1  |  2   |   3   |  4  |  5  |  6  |  7  |  8  |  9  |
|:-------:|:---:|:---:|:----:|:-----:|:---:|:---:|:---:|:---:|:---:|:---:|
|  value  |  a  |  b  |      |   d   |  e  |  f  |  g  |  h  |  i  |  j  |
| pointer |     |     | rear | front |     |     |     |     |     |     |

- 队满条件：`(Q.rear + 1) % MaxSize == Q.front`
- 队空条件：`Q.rear == Q.front`
- 队列元素数量：`(Q.rear - Q.front + MaxSize) % MaxSize`

其他方法，如增加一个 `tag` 表明是否满，均可。

```rust
#[derive(Debug)]
struct LinkQueue {
    front: usize, 
    rear: usize,
    max_size: usize,
    data: Vec<i32>,
}

impl LinkQueue {

    pub fn new(max_size: usize) -> Self {
        let mut data = Vec::<i32>::new();
        data.resize(max_size, 0);
        LinkQueue { front: 0, rear: 0, data, max_size }
    }

    pub fn is_empty(&self) -> bool {
        self.front == self.rear
    }
    
    pub fn is_full(&self) -> bool {
        (self.rear + 1) % self.max_size == self.front
    }

    pub fn push(&mut self, x: i32) -> Option<i32> {
        if self.is_full() {
            return None;
        }
        self.data[self.rear] = x;
        self.rear = (self.rear + 1) % self.max_size;
        Some(x)
    }

    pub fn pop(&mut self) -> Option<i32> {
        if self.is_empty() {
            return None;
        }
        let x = self.data[self.front];
        self.front = (self.front + 1) % self.max_size;
        Some(x)
    }
}
```

### 3.2.4. 双端队列

- 两头进，两头出
- 受限的双端队列
	- 两头进，一头出
	- 一头进，两头出

## 3.3. 栈和队列的应用

### 3.3.4. 队列在层次遍历中的作用

- 根节点入队
- 若队空，则退出；否则重复下一步
- 队头出队，并访问它。将它的所有（未访问的）子节点添加到队尾。返回上一步

## 3.4. 数组和特殊矩阵

### 3.4.3. 特殊矩阵的压缩存储

- 压缩矩阵：为多个值相同的元素只分配一个存储空间，对零元素不分配存储空间。目的是节省存储空间
- 特殊矩阵：具有许多相同矩阵元素或令元素，并且这些相同矩阵元素或零元素的分布有一定的规律性。常见的有对称矩阵、上（下）三角、对角阵等

#### 1. 对称矩阵

$$
\begin{bmatrix}
a_{1,1} & a_{1,2} & \cdots & a_{1,n} \\
a_{2,1} & a_{2,2} & \cdots & a_{2,n} \\
\vdots & \vdots & \ddots  & \vdots \\
a_{n,1} & a_{n,2} & \cdots & a_{n,n} 
\end{bmatrix}
$$

##### 用下三角区存储

只需要 $n(n+1)/2$ 个元素的空间，元素 $a_{i,j}$ 在数组中的索引

$$
\begin{aligned}
k={i(i-1) \over 2} + j - 1, && i \geqslant j
\end{aligned}
$$

##### 用上三角区存储

只需要 $n(n+1)/2$ 个元素的空间，元素 $a_{i,j}$ 在数组中的索引

$$
\begin{aligned}
k={j(j-1) \over 2} + i - 1, && i < j
\end{aligned}
$$

#### 2. 三角矩阵

将 $A[1..n][1..n]$ 压缩存储在 $B[n(n+1)/2+1]$ 中，前面 $n(n+1)/2$ 个为数组元素，最后一个为常数 $c$

##### 下三角

$$
\begin{bmatrix}
a_{1,1} &   &   & c  \\
a_{2,1} & a_{2,2} &   &   \\
\vdots & \vdots & \ddots  &   \\
a_{n,1} & a_{n,2} & \cdots & a_{n,n} 
\end{bmatrix}
$$

元素 $a_{i,j}$ 在数组中的索引

$$
\begin{aligned}
k= 
\begin{cases}
 \displaystyle{i(i-1) \over 2} + j - 1, && i \geqslant j \\
 \displaystyle{n(n+1) \over 2}, && i < j
\end{cases}

\end{aligned}
$$

##### 上三角

$$
\begin{bmatrix}
a_{1,1} & a_{1,2} & \cdots & a_{1,n} \\
  & a_{2,2} & \cdots & a_{2,n} \\
  &   & \ddots  & \vdots \\
 c &   &   & a_{n,n} 
\end{bmatrix}
$$

元素 $a_{i,j}$ 在数组中的索引

$$
k = 
\begin{cases}
\displaystyle{(i-1)(2n-i+2) \over 2} + (j-i), && i \leqslant j \\
\displaystyle{n(n+1) \over 2}, && i > j
\end{cases}
$$

#### 3. 三对角矩阵

$$
\begin{bmatrix}
a_{1,1} & a_{1,2} &  &  \\
a_{1,2} & a_{2,2} &  a_{2,3} &  \\
 & a_{3,2} & a_{3,3} & a_{3,4} \\
 &  & \ddots & \ddots & \ddots \\
 & & & a_{ {}_{n-1,n-2} }& a_{ {}_{n-1,n-1} }& a_{ {}_{n-1,n} } \\
 & & & & a_{ {}_{n,n-1} } & a_{n,n}
\end{bmatrix}
$$

元素 $a_{i,j}$ 在数组中的索引

$$
k=2i+j-3
$$

### 3.4.4. 稀疏矩阵

使用三元组存储




