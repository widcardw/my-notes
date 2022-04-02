# Netty

## Hello World

![[public/netty/Snipaste_2022-02-16_15-11-10.png]]

- 把 channel 理解为数据的通道
- 把 msg 理解为流动的数据，最开始输入是 ByteBuf，但经过 pipeline 加工，会编程其他类型对象，最后输入又变成 ByteBuf
- 把 handler 理解为数据的处理工序
    - 工序有多道，合在一起就是 pipeline，pipeline 负责发布事件（读、读取完成…）传播给每个 handler，handler 对自己感兴趣的事件进行处理（重写了相应事件处理方法）
    - handler 分 InBound 和 OutBound 两类
- 把 EventLoop 理解为处理数据的工人
    - 工人可以管理多个 channel 的 io 操作，并且一旦工人负责了某个 channel，就要负责到底（绑定，工人-1--n-channel）（其实也保证了线程安全）
    - 工人既可以执行 io 操作，也可以进行任务处理，每个工人有人无队列，队列里可以堆放多个 channel 的待处理任务，任务分为普通任务、定时任务（底层是单线程的线程池）
    - 工人按照 pipeline 顺序，依次按照 handler 的规划（代码）处理数据，可以为没到工序指定不同的工人

## 组件

### EventLoop 

#### 事件循环对象

本质是一个**单线程执行器**（同时维护了一个 Selector），里面有 run 方法处理 Channel 上源源不断的 io 事件

继承关系比较复杂

- 一条线是继承自 `j.u.c.ScheduledExecutorService` 因此包含了线程池中所有的方法
- 另一条是继承自 Netty 自己的 `OrderedEventExecutor`
    - 提供了 `boolean inEventLoop(Thread thread)` 方法判断一个线程是否属于此 EventLoop
    - 提供了 parent 方法来看自己属于哪个 EventLoopGroup

#### 事件循环组 EventLoopGroup

是一组 EventLoop，Channel 一般会调用 EventLoopGroup 的 register 方法来绑定其中一个 EventLoop，后续这个 Channel 上的 io 事件都由此 EventLoop 来处理（保证了 io 事件处理时的线程安全）

- 继承自 Netty 的 EventExecutorGroup
    - 实现了 iterable 接口提供遍历 EventLoop 的能力
    - 另有 next 方法获取集合中下一个 EventLoop

### Channel

- close() 用来关闭 channel
- closeFuture() 用户来处理 channel 的关闭
    - sync 是同步等待 channel 的关闭
    - addListener 是异步等待 channel 的关闭
- pipeline() 方法添加处理器
- writeAndFlush() 将数据写入并立即刷出

```java
public class EventLoopClient {
    public static void main(String[] args) throws InterruptedException {
        NioEventLoopGroup group = new NioEventLoopGroup();
        // 1. 启动类
        ChannelFuture channelFuture = new Bootstrap()
                // 2. 添加 EventLoop
                .group(group)
                // 3. 选择客户端 channel 的实现
                .channel(NioSocketChannel.class)
                // 4. 添加处理器
                .handler(new ChannelInitializer<NioSocketChannel>() {
                    @Override  // 连接建立后被调用
                    protected void initChannel(NioSocketChannel ch) throws Exception {
                        ch.pipeline().addLast(new StringEncoder());  // 将字符串转换为字节数组
                    }
                })
                // 5. 连接服务端，这一步是「异步非阻塞」的，main 发起了调用，真正执行 connect 的是 nio 线程
                .connect(new InetSocketAddress("127.0.0.1", 8080));

        Channel channel = channelFuture
                .sync()  // 处理方法 1: 阻塞当前线程，直到 nio 线程连接成功
                .channel();

        // 从控制台发送消息
        new Thread(() -> {
            Scanner scanner = new Scanner(System.in);
            while (true) {
                String msg = scanner.nextLine();
                if ("q".equals(msg)) {
                    channel.close(); // 是异步操作
                    break;
                }
                channel.writeAndFlush(msg);
            }
        }, "input").start();

        // 1) 同步处理方法
        ChannelFuture closeFuture = channel.closeFuture();
        System.out.println("waiting for close");
        closeFuture.sync();
        System.out.println("处理关闭后的操作");
        group.shutdownGracefully();

        // 2) 异步处理方法
        /*closeFuture.addListener(new ChannelFutureListener() {
            @Override
            public void operationComplete(ChannelFuture channelFuture) throws Exception {
                System.out.println("异步处理关闭后的操作");
                group.shutdownGracefully();
            }
        });*/


        // 6. 向服务器发送数据
//        channel.writeAndFlush("Hello Netty");

        // 处理方法 2: 使用 addListener 回调对象）方法，异步处理结果
        /*channelFuture.addListener(new ChannelFutureListener() {
            @Override
            public void operationComplete(ChannelFuture future) throws Exception {
                Channel channel = future.channel();
                System.out.println(channel);
                channel.writeAndFlush("Hello Netty");
            }
        });*/

    }
}
```
### Future & Promise

```ad-caution
Netty 中的 Future 接口和 JDK 中的 Future 同名，但 Netty 的继承于 JDK
Netty 的 Promise 对 Netty 的 Future 进行了扩展
- JDK Future 只能同步等待任务结束（成功或失败）才能得到结果
- Netty Future 可以同步等待任务执行得到的结果，也可以异步方式得到结果，但是需要等任务结束
- Netty Promise 不仅有 Netty Future 的功能，而且脱离任务独立存在，只作为两个线程之间传递结果的容器
```

```java
public class TestNettyPromise {
    public static void main(String[] args) throws ExecutionException, InterruptedException {
        // 1. 准备 EventLoop 对象
        EventLoop eventLoop = new NioEventLoopGroup().next();

        // 2. 可以主动创建 promise
        DefaultPromise<Object> promise = new DefaultPromise<>(eventLoop);

        new Thread(()-> {
            // 3. 任意线程执行计算，计算完毕后向 promise 写入结果
            try {
                Thread.sleep(1000);
            }catch (InterruptedException e){
                e.printStackTrace();
            }
            promise.setSuccess(80);
        }).start();

        // 4. 接收结果
        System.out.println("等待结果");
        System.out.println("结果为：" + promise.get());
    }
}
```

### Handler & Pipeline

ChannelHandler 用来处理 Channel 上的各种事件，分为入站和出站两种。所有 Channel 连成一串，就成了 Pipeline

- ChannelInBoundHandlerAdapter 主要用于读取客户端数据，写回结果
- ChannelOutBoundHandlerAdapter 主要用于对写回结果进行加工


