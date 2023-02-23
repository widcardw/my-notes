export const SITE = {
  title: 'Notes',
  description: 'Notes of widcardw',
  defaultLanguage: 'zh_CN',
}

export const OPEN_GRAPH = {
  image: {
    src: 'https://github.com/withastro/astro/blob/main/assets/social/banner-minimal.png?raw=true',
    alt:
      'astro logo on a starry expanse of space,'
      + ' with a purple saturn-like planet floating in the right foreground',
  },
  twitter: 'astrodotbuild',
}

// This is the type of the frontmatter you put in the docs markdown files.
export interface Frontmatter {
  title: string
  description: string
  layout: string
  image?: { src: string; alt: string }
  dir?: 'ltr' | 'rtl'
  ogLocale?: string
  lang?: string
}

export const KNOWN_LANGUAGES = {
  English: 'en',
} as const
export const KNOWN_LANGUAGE_CODES = Object.values(KNOWN_LANGUAGES)

export const GITHUB_EDIT_URL = 'https://github.com/widcardw/my-notes/tree/main'

export const COMMUNITY_INVITE_URL = ''

// See "Algolia" section of the README for more information.
export const ALGOLIA = {
  indexName: 'XXXXXXXXXX',
  appId: 'XXXXXXXXXX',
  apiKey: 'XXXXXXXXXX',
}

// export type Sidebar = Record<
//   typeof KNOWN_LANGUAGE_CODES[number],
//   Record<string, { text: string; link: string }[]>
// >

export type Sidebar = Record<string, { text: string; link: string }[]>

export const SIDEBAR: Sidebar = {
  编译原理: [
    { text: '引论', link: 'compile/s01_intro' },
    { text: '文法与语言', link: 'compile/s02_lang' },
    { text: '词法分析与有限自动机', link: 'compile/s03_lex' },
    { text: '自顶向下的语法分析', link: 'compile/s04_topdown' },
    { text: '自底向上的语法分析', link: 'compile/s05_downtop' },
    { text: '自底向上的语法分析LR(0)', link: 'compile/s05_downtop-LR(0)' },
    { text: '自底向上的语法分析LR(1)', link: 'compile/s05_downtop-LR(1)' },
    { text: '属性文法', link: 'compile/s06_properity' },
    { text: '语义分析与语法制导的翻译', link: 'compile/s07_translate' },
    { text: '运行时环境', link: 'compile/s08_runtime' },
    { text: '期末习题', link: 'compile/final' },
  ],
  操作系统: [
    { text: '操作系统的概念', link: 'os/1-1_intro' },
    { text: '进程', link: 'os/2-1_proc' },
    { text: '进程调度', link: 'os/2-2_proc-sche' },
    { text: '进程互斥与同步', link: 'os/3-1_proc-sync' },
    { text: '互斥与同步案例', link: 'os/3-2_proc-mul' },
    { text: '死锁', link: 'os/3-4_dead-lock' },
    { text: '存储管理', link: 'os/4_mem' },
    { text: '设备管理', link: 'os/5_device' },
    { text: '文件管理', link: 'os/6_file' },
    { text: 'Linux 0.00 内核实验', link: 'os/lab' },
    { text: '习题', link: 'os/2-0_exercise' },
    { text: '期中复习', link: 'os/mid-term' },
    { text: '期末复习', link: 'os/final' },
  ],
  计算机网络: [
    { text: '系统结构', link: 'computer-network/sec1_structure' },
    { text: '物理层', link: 'computer-network/sec2_physical_layer' },
    { text: '数据链路层', link: 'computer-network/sec3_data_link_layer' },
    { text: '网络层', link: 'computer-network/sec4_network_layer' },
    { text: '传输层', link: 'computer-network/sec5_transmition_layer' },
    { text: '应用层', link: 'computer-network/sec6_app_layer' },
  ],
  计算机组成原理: [
    { text: '实验报告', link: 'cs/report' },
    { text: '五级流水线数据通路', link: 'cs/note' },
    { text: '计算机系统概述', link: 'cs/s1_intro' },
    { text: '数据的表示和运算', link: 'cs/s2_calc' },
    { text: '存储系统', link: 'cs/s3_mem' },
    { text: '指令系统', link: 'cs/s4_ins' },
    { text: '中央处理器', link: 'cs/s5_cpu' },
    { text: '总线', link: 'cs/s6_bus' },
    { text: '输入输出系统', link: 'cs/s7_io' },
  ],
  实训: [
    { text: '实验报告1', link: 'corporate-training/c1' },
    { text: '实验报告2', link: 'corporate-training/c2' },
    { text: '实验报告3', link: 'corporate-training/c3' },
    { text: '实验报告4', link: 'corporate-training/c4' },
    { text: '实验报告5', link: 'corporate-training/c5' },
    { text: '实验报告6', link: 'corporate-training/c6' },
    { text: 'CentOS 7 安装 MySQL', link: 'corporate-training/CentOS_7_install_MySQL' },
    { text: 'CentOS 安装 Nodejs', link: 'corporate-training/CentOSinstallNodejs' },
  ],
  算法: [
    { text: '解题报告', link: 'algorithm/report' },
    { text: '图的数据结构', link: 'algorithm/graph' },
  ],
  数据结构: [
    { text: '线性表', link: 'data-structure/section02-linear-list' },
    { text: '栈 & 队列', link: 'data-structure/section03-stack-queue' },
    { text: '串', link: 'data-structure/section04-string' },
    { text: '树', link: 'data-structure/section05-tree' },
    { text: '图', link: 'data-structure/section06-graph' },
    { text: '查找', link: 'data-structure/section07-search' },
    { text: '排序', link: 'data-structure/section08-sort' },
  ],
  微机原理: [
    { text: '第1章 概述', link: 'Intel8086/c1-intro' },
    { text: '第2章 IA-32结构微处理器与8086', link: 'Intel8086/c2-IA32-8086' },
    { text: '第3章 8086指令系统', link: 'Intel8086/c3-instructions' },
    { text: '第4章 汇编语言程序设计', link: 'Intel8086/c4-programming' },
    { text: '第5章 处理器总线时序和系统总线', link: 'Intel8086/c5-timing-bus' },
    { text: '第6章 存储器', link: 'Intel8086/c6-mem' },
    { text: '第7章 输入输出', link: 'Intel8086/c7-io' },
    { text: '第8章 8251串行传输接口', link: 'Intel8086/c8-8251' },
    { text: '第8章 8253定时-计数器', link: 'Intel8086/c8-8253' },
    { text: '第8章 8255并行传输接口', link: 'Intel8086/c8-8255' },
  ],
  概率论: [
    { text: '基本概念', link: 'Math/probability/c1' },
    { text: '多变量', link: 'Math/probability/c2-multi-variable' },
    { text: '数字特征', link: 'Math/probability/c3-shuzitezhen' },
    { text: '统计', link: 'Math/probability/c4-tongji' },
    { text: '估计', link: 'Math/probability/c5-estimation' },
  ],
  高数: [
    { text: '微分方程', link: 'Math/gaoshu/differential-equation' },
    { text: '散度 & 旋度', link: 'Math/gaoshu/div-rot' },
    { text: '傅里叶级数', link: 'Math/gaoshu/Fourier-Series' },
    { text: '公式', link: 'Math/gaoshu/formula' },
    { text: '空间', link: 'Math/gaoshu/space' },
    { text: '泰勒公式', link: 'Math/gaoshu/taylor' },
    { text: '构造辅助函数的方法', link: 'Math/gaoshu/Auxiliary_function' },
  ],
  线代: [
    { text: '千万不要这样学线代', link: 'Math/linear/Linear-algebra-done-wrong' },
  ],
  密码学: [
    { text: '引言', link: 'crypto/s01_intro' },
    { text: '分组密码体制', link: 'crypto/s03_block-cipher' },
    { text: '公钥密码', link: 'crypto/s04_pk' },
    { text: '密钥管理', link: 'crypto/s05_key-management' },
    { text: '消息认证与哈希函数', link: 'crypto/s06_identify-hash' },
    { text: '数字签名', link: 'crypto/s07_sign' },
    { text: '密码协议', link: 'crypto/s08_proto' },
  ],
  netty: [
    { text: '01-BIO', link: 'Java/netty/01-BIO' },
    { text: '02-NIO', link: 'Java/netty/02-NIO' },
    { text: '02_5-异步IO', link: 'Java/netty/02_5-async-IO' },
    { text: '03-零拷贝', link: 'Java/netty/03-zero-copy' },
    { text: '04-netty-hm', link: 'Java/netty/04-netty-hm' },
    { text: '04-netty', link: 'Java/netty/04-netty' },
  ],
  utils: [
    { text: '换源', link: 'utils/change-source' },
    { text: 'curl', link: 'utils/curl' },
    { text: '清缓存', link: 'utils/clean-cache' },
  ],
  manim: [
    { text: '从贝塞尔曲线到概率模型', link: 'manim/bezier/doc' },
  ],
  Web: [
    { text: 'HTML的奇淫巧计', link: 'web/HTML-skills' },
  ],
}
