---
title: AIO
layout: ~/layouts/MainLayout.astro
---

## AIO 用来解决数据复制阶段的阻塞问题

- 同步意味着，在读写操作时，线程需要等待结果，相当于闲置
- 异步意味着，在进行读写操作时，线程不必等待结果，而是将来由操作系统来通过回调方式由另外的线程来获得结果

> 异步模型需要底层操作系统内核提供支持
> - Linux 系统异步在 2.6 版本引入，但其底层还是用多路复用模拟了异步 IO，性能没有优势
> - Windows 系统通过 IOCP 实现了真正的异步 IO

## 文件 AIO

```java
public class AioFileChannel {
    public static void main(String[] args) throws IOException, InterruptedException {
        try (AsynchronousFileChannel channel = AsynchronousFileChannel.open(Paths.get("data2.txt"), StandardOpenOption.READ)) {
            // 参数1：ByteBuffer
            // 参数2：文件开始位置
            // 参数3：附件
            // 参数4：回调对象
            ByteBuffer buffer = ByteBuffer.allocate(64);
            System.out.println("开始读取文件");
            channel.read(buffer, 0, buffer, new CompletionHandler<Integer, ByteBuffer>() {
                // 当文件正确读取到了
                @Override
                public void completed(Integer result, ByteBuffer attachment) {
                    System.out.println("读取文件完成");
                    attachment.flip();
                    System.out.println(new String(attachment.array(), 0, result));  // 其实就是把buffer中的数据读取出来
                }
                // 出现异常
                @Override
                public void failed(Throwable exc, ByteBuffer attachment) {
                    System.out.println("读取文件失败");
                    exc.printStackTrace();
                }
            });
            System.out.println("结束读取文件");
        } catch (IOException e) {
            System.out.println("读取文件出现异常");
            e.printStackTrace();
        }
        System.in.read();
    }
}
```

> 此处还是会报出 AsynchronousCloseException 的异常

