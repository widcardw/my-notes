# Translation

## Foundational Theoretical Questions in Deep Learning

> 深度学习中的基础理论问题

With the above minimal frameworks for supervised and unsupervised learning in hand, we can now introduce foundational theoretical questions in the field of deep learning and how ideas from statistical physics have begun to shed light on these questions. On the supervised side, we discuss four questions. First, what is the advantage of depth `$D$`? In principle, what functions can be computed in Equation 1 for large, but not small, `$D$`? We address this question in Section 2 by making a connection to dynamical phase transitions between order and chaos.

> 有了上面监督学习和无监督学习的最小化框架，现在我们可以引出深度学习中的基础理论问题，以及从统计物理学的观点上是如何阐明这些问题的。在监督学习方面，我们讨论四个问题。首先，深度参数 `$D$` 的优势是什么？原则上，对于大而不小的 `$D$`，在 _方程 1_ 中可以计算出哪些函数？我们在第 2 节将通过建立秩序与混沌的动态相变的联系来解决这个问题。

Second, many methods for minimizing the training error in Equation 3 involve descending the error landscape over the parameter vector `$bb w$` given by `$cc(E)_"Train"(bb(w),cc D)$` via (stochastic) gradient descent. What is the shape of this landscape and  when can we descend to points of low training error? We address these questions in Section 3, making various connections to the statistical mechanics of energy landscapes with quenched disorder, including phenomena like random Gaussian landscapes, spin glasses, and jamming. Indeed `$cc(E)_"Train"(bb(w),cc D)$` could be thought of as such an energy function over thermal degrees of freedom `$bb w$`, where the data `$cc D$` play the role of quenched disorder.

> 第二，_方程 3_ 中最小化训练误差的许多方法都涉及到通过（随机）梯度下降将由 `$cc(E)_"Train"(bb(w),cc D)$` 给出的参数向量 `$bb w$` 上的误差分布下降。这一分布的形状是怎样的？我们什么时候才能降低训练误差？我们将在第 3 节解决这个问题，建立能量分布的统计力学和淬火无序之间的各种联系，包括类似高斯随机分布，自旋玻璃和干扰的现象。事实上 `$cc(E)_"Train"(bb(w),cc D)$` 可以被认为是一种热自由度 `$bb w$` 上的能量函数，其中数据 `$cc D$` 充当了淬火无序的角色。

Third, when minimizing `$cc(E)_"Train"(bb(w),cc D)$` via gradient descent, one must start at an initial point `$bb w$`, which is often chosen randomly. How can one choose the random initialization to accelerate subsequent gradient descent? In Section 4, we show that theories of signal propagation through random deep networks provide clues to good initializations, making connections to topics in random matrix theory, free probability, and functional path integrals.

> 第三，当通过梯度下降来最小化 `$cc(E)_"Train"(bb(w),cc D)$` 时，必须从初始点 `$bb w$` 开始，这个初始点通常是随机选择的。如何选择随机初始化来加速后续的梯度下降？在第 4 节，我们展示了信号通过随机深度网络传播的理论为良好的初始化提供了线索，将随机矩阵理论、自由概率和函数路径积分的主题联系起来。

Fourth, though many learning algorithms minimize `$cc(E)_"Train"(bb(w),cc D)$` in Equation 3, possibly with extra regularization on the parameters `$bb w$`, the key goal is to minimize the inaccessible test error `$cc E_"Test"$` in Equation 2 on a randomly chosen new input not necessarily present in the training data `$cc D$`. It is then critical to achieve a small generalization error `$cc E _"Gen" = cc E _"Test" - cc E_"Train"$`. When can one achieve such a small generalization error, especially in situations in which the number of parameters `$N$` can far exceed the number of data points `$P$`? We address this question in Section 5, making connections to topics like phase transitions in random matrix spectra, free field theories, and interacting particle systems.

> 第四，虽然有许多学习算法最小化 _方程 3_ 中的 `$cc(E)_"Train"(bb(w),cc D)$`，可能对参数 `$bb w$` 进行了额外的正则化，但关键目标是最小化 _方程 2_ 中不可达的测试误差 `$cc E_"Test"$`，这个随机选择的新输入不一定出现在训练数据 `$cc D$` 中。实现一个尽可能小的泛化误差 `$cc E _"Gen" = cc E _"Test" - cc E_"Train"$` 是至关重要的。何时能达到这个小的泛化误差，特别是在参数 `$N$` 的数量远超数据点 `$P$` 数量的情况下？我们在第 5 节解决了这个问题，与随机矩阵光谱中的相变、自由场论和交互粒子系统等主题建立了联系。

On the unsupervised side, the theoretical development is much less mature. However, in Section 6, we review work in deep unsupervised learning that connects to ideas in equilibrium statistical mechanics, like free-energy minimization, as well as nonequilibrium statistical mechanics, like the Jarzynski equality and heat dissipation in irreversible processes.

> 在无监督学习方面，理论发展相对没有那么成熟。尽管如此，在第 6 节，我们查看了平衡统计力学（如自由能最小化）和非平衡力学（如 Jarzynski 等式和不可逆过程中的散热）相关的无监督深度学习的工作。


