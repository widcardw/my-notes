const sidebar = [
    {
        text: "编译原理",
        collapsible: true,
        children: [
            "/编译原理/s01_引论.md",
            "/编译原理/s02_文法与语言.md",
            "/编译原理/s03_词法分析与有限自动机.md",
            "/编译原理/s04_自顶向下的语法分析.md",
            "/编译原理/s05_自底向上的语法分析-上.md",
            "/编译原理/s05_自底向上的语法分析-LR(0).md",
            "/编译原理/s05_自底向上的语法分析-LR(1).md",
            "/编译原理/s06_属性文法.md",
            "/编译原理/s07_语义分析与语法制导的翻译.md",
            "/编译原理/s08_运行时环境.md",
            "/编译原理/期末习题.md"
        ]
    },
    {
        text: "操作系统",
        collapsible: true,
        children: [
            "/操作系统/1-1_操作系统的概念.md",
            "/操作系统/2-1_进程.md",
            "/操作系统/2-2_进程调度.md",
            "/操作系统/3-1_进程互斥与同步.md",
            "/操作系统/3-2_互斥与同步案例.md",
            "/操作系统/3-4_死锁.md",
            "/操作系统/4_存储管理.md",
            "/操作系统/5_设备管理.md",
            "/操作系统/6_文件管理.md",
            "/操作系统/操作系统-Linux_0.00-内核实验.md",
            "/操作系统/2-0_习题.md",
            "/操作系统/期中复习.md",
            "/操作系统/期末复习.md"
        ]
    },
    {
        text: "计算机网络",
        collapsible: true,
        children: [
            "/计算机网络/sec1_structure.md",
            "/计算机网络/sec2_physical_layer.md",
            "/计算机网络/sec3_data_link_layer.md",
            "/计算机网络/sec4_network_layer.md",
            "/计算机网络/sec5_transmition_layer.md",
            "/计算机网络/sec6_app_layer.md",
        ]
    },
    {
        text: "大物",
        collapsible: true,
        children: [
            "/大物下/第09章_振动.md",
            "/大物下/第10章_波动.md",
            "/大物下/第11章_光.md",
            "/大物下/第12章_气体动理论.md",
            "/大物下/第13章_热力学.md",
        ]
    },
    {
        text: "计算机组成原理",
        collapsible: true,
        children: [
            "/计组课设/实验报告.md", 
            "/计组/s1_计算机系统概述.md",
            "/计组/s2_数据的表示和运算.md",
            "/计组/s3_存储系统.md",
            "/计组/s4_指令系统.md",
            "/计组/s5_中央处理器.md",
            "/计组/s6_总线.md",
            "/计组/s7_输入输出系统.md",
        ]
    },
    {
        text: "密码学",
        collapsible: true,
        children: [
            "/密码学/s01_引言.md",
            "/密码学/s03_分组密码体制.md",
            "/密码学/s04_公钥密码.md",
            "/密码学/s05_密钥管理.md",
            "/密码学/s06_消息认证与哈希函数.md",
            "/密码学/s07_数字签名.md",
            "/密码学/s08_密码协议.md"
        ]
    },
    {
        text: "实训",
        collapsible: true,
        children: [
            "/实训/实验报告1.md",
            "/实训/实验报告2.md",
            "/实训/实验报告3.md",
            "/实训/实验报告4.md",
            "/实训/实验报告5.md",
            "/实训/实验报告6.md",
            "/实训/CentOS_7_安装_MySQL.md",
            "/实训/CentOS安装Nodejs.md",
        ]
    },
    {
        text: "算法",
        collapsible: true,
        children: [
            "/算法/解题报告.md",
            "/算法/图的数据结构.md",
        ]
    },
    {
        text: "数据结构",
        collapsible: true,
        children: [
            "/data-structure/section02-linear-list.md",
            "/data-structure/section03-stack-queue.md",
            "/data-structure/section04-string.md",
            "/data-structure/section05-tree.md",
            "/data-structure/section06-graph.md",
            "/data-structure/section07-search.md",
            "/data-structure/section08-sort.md",
        ]
    },
    {
        text: "English",
        collapsible: true,
        children: [
            '/Eng/01-composition.md'
        ]
    },
    {
        text: 'Math',
        collapsible: true,
        children: [
            '/Math/differential-equation.md',
            '/Math/Fourier-Series.md',
            '/Math/Linear-algebra-done-wrong.md',
            '/Math/Probability-theory-done-wrong.md',
            '/Math/estimation.md',
            '/Math/div-rot.md'
        ]
    },
    {
        text: "微机原理",
        collapsible: true,
        children: [
            "/微机原理/第1章_概述.md",
            "/微机原理/第2章_IA-32结构微处理器与8086.md",
            "/微机原理/第3章_8086指令系统.md",
            "/微机原理/第4章_汇编语言程序设计.md",
            "/微机原理/第5章_处理器总线时序和系统总线.md",
            "/微机原理/第6章_存储器.md",
            "/微机原理/第7章_输入输出.md",
            "/微机原理/第8章_8251串行传输接口.md",
            "/微机原理/第8章_8253定时-计数器.md",
            "/微机原理/第8章_8255并行传输接口.md",
            "/微机原理/第8章_数模转换与模数转换接口.md"
        ]
    },
    {
        text: "Java",
        collapsible: true,
        children: [
            {
                text: "netty",
                collapsible: true,
                children: [
                    "/Java/netty/01-BIO.md",
                    "/Java/netty/02-NIO.md",
                    "/Java/netty/02_5-异步IO.md",
                    "/Java/netty/03-零拷贝.md",
                    "/Java/netty/04-netty-hm.md",
                    "/Java/netty/04-netty.md"
                ]
            }
        ]
    },
    {
        text: "manim",
        collapsible: true,
        children: ["/manim/从贝塞尔曲线到概率模型/doc.md"]
    },
    {
        text: "utils",
        collapsible: true,
        children: [
            "/utils/换源.md",
            "/utils/curl.md",
            "/utils/清缓存.md",
        ]
    },
    {
        text: "Web",
        collapsible: true,
        children: ["/web/HTML的奇淫巧计.md"]
    },
]

export default sidebar
