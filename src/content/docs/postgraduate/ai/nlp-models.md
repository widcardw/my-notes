---
title: 自然语言处理模型概览
---

## NLP Model Definition

使用一个已经训练好的模型，执行不同任务时提供相应的资料进行微调，即可使用。

## What is pre-train model

### FastText

One character/letter as token reflecting one embedding vector.

缺点：同样的词可能有不同的含义，无法理解

### Contextualized Word Embedding

读完整个句子后，每个字对应一个 embedding

model 实现：ELMo 使用 LSTM，BERT 使用 self attention layers

### Smaller Model

> BERT 一次只能读取 512 个 token

- Distill BERT
- Tiny BERT
- Mobile BERT
- Q8BERT
- ALBERT
	- BERT 12/24 层参数不同，ALBERT 12/24 层参数相同，performance 更好

### Network Architecture

- Transformer-XL
- Reduce the complexity of self-attention ($n^2$)
	- Reformer
	- Longformer

## How to fine-tune

### NLP Tasks

#### Input

- One sentence
- Multiple sentences
	- `S1:Query[SEP]S2:Answer`; `S1:Document[SEP]S2:Hypothesis`
	- 每个字是一个 token（包括 `[SEP]`）对应一个 embedding

#### Output

- One class
	- 在句首加 `[CLS]`，告诉 model 对 CLS 输出一个有关整个句子的 embedding，再将 embedding 输入一个 model (Linear transform)，输出一个 class
	- 或者将包括 `CLS` 以及字的所有 embedding 输入一个 model，输出一个 class
- Class for each token
	- 每个 token 的 embedding 输入一个 LSTM model，对应输出一个 class
- Copy form input (Extraction-based QA)
	- 将文章和 query 输入 QA model，输入一个 `s` 和 `e`，对应两个数字，显示文章第几个字是答案
	- 有一个 start vector (dot product) 和每个 token 的 vector 做搭配，输入一个 softmax，输出一个概率，概率最大的就是起始 token
	- 还有一个 end vector，和每个做搭配，概率大的就是结束 token

### How to fine-tune

- 固定 pre-train model 不做修改，根据具体任务只改变 embedding 输入的 task specific model
- 将 pre-train model 和 task specific model 看作一个整体一起修改（performance 更好）
	- 因为 pre-train model 的参数是预先初始化而非随机的，所以并不是很容易 overfaded
	- 在 pre-train model 中设置 layers called adaptor，减少调整的参数数量
		- pre-train model 的主题是一层层 self-attention，在 fine-tune 时再将 adaptor 插入到每一个 feed-forward layer 之后，pre-trained 时不插入
- Weighted feature 将不同 pre-train model 的不同 layer 输出的不同 embedding 乘不同的权重之后求和，放入 task specific model 中

## How to pre-train

### Pre-train by Translation

- Context vector，将 model 当作 translation 的 encoder
	- 输入 language A，将 encoder 的输出，输入到 decoder 做 attention，产生 language B
- 用翻译做预训练的原因
	- 如果用 summary 任务，则不能学会每个 token 的表示，而是会忽略掉不重要的部分
- 缺陷：需要很多的 apir data 才能训练出

### Self-supervised Learning

用输出的一部分去预测另一部分，可以自己产生输出，并根据输入输出训练

```
                      ┌──────────────────┐                
        ┌─────┐       │Linear Transformer│  distribution  
   w1──▶│     ├─▶h1──▶│      Softmax     ├─▶w,w,...w,...  
   │    └─────┘       └──────────────────┘       │        
   │                                             ▼ max    
   └────────────────────────────────────────────▶w2       
                                                 │        
                                                 ▼ predict
                                                 w3       
                                                 │        
                                                 ▼...     
```

输入 w1 输出 h1，进一步输入 Linear Transformer 和 Softmax 产生一个 token 的概率分布，概率最高的 w2，根据 w1和 w2 预测 w3，以此类推。

不能一次性输入 w1-4，因为相当于直接把 234 的答案告诉模型了，它就无法学习了。

- model 可以是 LSTM
	- ELMo: Predict next token bidirection
	- ULMFit
- 可以是 self attention
	- GPT
	- Megatron
	- Turing NLG

> attention 的范围：不能提前看到答案，w1 只能看到 w1，w2 只能看到 w1 和 w2

#### BERT

- 双向工作时前后文同时考虑，随机 mask/replace 一个 token，根据前后文进行预测
- 前后能看多长就看多长，model 更复杂有 12/24 用 transformation
- mask 方法
	- Whole word mask
	- Phrase level & Entity level
	- Span BERT
		- 一次 mask 多个 token，数量由概率定义
		- 结合 SBO：将被盖住部分的左右的 embedding 输入 SBO（一个小的 model），在向 SBO 输入一个数字，表示预测的第几个，SBO 输出一个 w5
	- XLNet (Transformer XL)
		- token 随机打乱，预测目标 token
		- 或者整个句子随机输入，并不全部输入，预测 masked token

> BERT 不擅长 talk


- 由左往右生成 token 的模型有 Autoregressive Model
- 因为 generate sentences 只根据左边 tokens，BERT 是经受过双向 tokens 的训练预测
- 不适用于 seq2seq 的 model，BERT只能作为 encoder, decoder 部分没有 pre-train到
	- seq2seq model: w123 输入 encoder model1，经过 attention，输入 decoder model2，输出 W456
	- 如何使用 self-supervised learning 训练 seq2seq model
		- Reconstructed the input： 破坏 w1234 的顺序， 使其经过 seq2seq model 后能输出按序的 w1234
		- corrupted method
			- MASS
				- Mask some tokens
				- Delete some tokens
				- 将多个句子顺序打乱（效果一般）
				- 改变不同句子中token的位置（效果一般） 导致机器不认识正常的语序
				- 不同句子里mask随机插入，AB 之间可以插入， CD 可以同时被一个 mask 遮盖（Text Infilling 效果最好）
			- BART UniLM，一个模型可以同时当作 BERT, GPT, BART, MASS 使用
				- BERT：mask some tokens, 进行预测
				- GPT：当作 language model 使用
				- BART MASS：当作 seq2seq model 使用
					- 将输入分为两个部分，第一部分是 encoder，第二部分是 decoder

#### ELECTRA

不预测，回答 binary 问题

- 输入一个句子，输出每个 token 是否被替换
- 优点
	- 预测 Y/N 比 reconstruction 简单
	- 每一个输出的 token 都被使用，不仅仅是只预测被 mask 的部分
	- 如何实现找到被替换的 token，使得语法正确， 语义奇怪
		- 将正确句子（mask token） 输入一个 small BERT（选一个能力差的BERT），mask 的部分输出一个错误 token，再输入 ELECTRA model

### 产生 sentence embedding

- Skip thought
	- 输入一个句子，encoder 产生一个 embedding，输入 decoder，预测下一个句子
	- 不好训练
- Quick thought
	- 与 ELECTRA 类似，避免做生成任务
	- 将不同句子输入 encoder，若句子越相邻，则 embedding 越相似
- Sentence order prediction (SOP)
	- 将两个句子顺序颠倒，机器回答 No，反之 Yes
- NSP（效果不好）
	- 判断来自不同文章的句子对机器来说太简单，所以学不到东西
- structBERT
	- 将 NSP 与 SOP 结合

