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

export interface SidebarChild {
  text: string
  link: string
  children?: SidebarChild[]
}

export type SidebarType = SidebarChild[]

export const SIDEBAR: SidebarType = [
  {
    text: '编译原理',
    link: 'compile',
    children: [
      { text: '引论', link: 's01_intro' },
      { text: '文法与语言', link: 's02_lang' },
      { text: '词法分析与有限自动机', link: 's03_lex' },
      { text: '自顶向下的语法分析', link: 's04_topdown' },
      { text: '自底向上的语法分析', link: 's05_downtop' },
      { text: '自底向上的语法分析LR(0)', link: 's05_downtop-LR(0)' },
      { text: '自底向上的语法分析LR(1)', link: 's05_downtop-LR(1)' },
      { text: '属性文法', link: 's06_property' },
      { text: '语义分析与语法制导的翻译', link: 's07_translate' },
      { text: '运行时环境', link: 's08_runtime' },
      { text: '期末习题', link: 'final' },
    ],
  },
  {
    text: '操作系统',
    link: 'os',
    children: [
      { text: '操作系统的概念', link: '1-1_intro' },
      { text: '进程', link: '2-1_proc' },
      { text: '进程调度', link: '2-2_proc-sche' },
      { text: '进程互斥与同步', link: '3-1_proc-sync' },
      { text: '互斥与同步案例', link: '3-2_proc-mul' },
      { text: '死锁', link: '3-4_dead-lock' },
      { text: '存储管理', link: '4_mem' },
      { text: '设备管理', link: '5_device' },
      { text: '文件管理', link: '6_file' },
      { text: 'Linux 0.00 内核实验', link: 'lab' },
      { text: '习题', link: '2-0_exercise' },
      { text: '期中复习', link: 'mid-term' },
      { text: '期末复习', link: 'final' },
    ],
  },
  {
    text: '计算机网络',
    link: 'computer-network',
    children: [
      { text: '系统结构', link: 'sec1_structure' },
      { text: '物理层', link: 'sec2_physical_layer' },
      { text: '数据链路层', link: 'sec3_data_link_layer' },
      { text: '网络层', link: 'sec4_network_layer' },
      { text: '传输层', link: 'sec5_transmition_layer' },
      { text: '应用层', link: 'sec6_app_layer' },
    ],
  },
  {
    text: '计算机组成原理',
    link: 'cs',
    children: [
      { text: '实验报告', link: 'report' },
      { text: '五级流水线数据通路', link: 'note' },
      { text: '计算机系统概述', link: 's1_intro' },
      { text: '数据的表示和运算', link: 's2_calc' },
      { text: '存储系统', link: 's3_mem' },
      { text: '指令系统', link: 's4_ins' },
      { text: '中央处理器', link: 's5_cpu' },
      { text: '总线', link: 's6_bus' },
      { text: '输入输出系统', link: 's7_io' },
    ],
  },
  {
    text: '实训',
    link: 'corporate-training',
    children: [
      { text: '实验报告1', link: 'c1' },
      { text: '实验报告2', link: 'c2' },
      { text: '实验报告3', link: 'c3' },
      { text: '实验报告4', link: 'c4' },
      { text: '实验报告5', link: 'c5' },
      { text: '实验报告6', link: 'c6' },
      { text: 'CentOS 7 安装 MySQL', link: 'CentOS_7_install_MySQL' },
      { text: 'CentOS 安装 Nodejs', link: 'CentOSinstallNodejs' },
    ],
  },
  {
    text: '算法',
    link: 'algorithm',
    children: [
      { text: '解题报告', link: 'report' },
      { text: '图的数据结构', link: 'graph' },
    ],
  },
  {
    text: '数据结构',
    link: 'data-structure',
    children: [
      { text: '线性表', link: 'section02-linear-list' },
      { text: '栈 & 队列', link: 'section03-stack-queue' },
      { text: '串', link: 'section04-string' },
      { text: '树', link: 'section05-tree' },
      { text: '图', link: 'section06-graph' },
      { text: '查找', link: 'section07-search' },
      { text: '排序', link: 'section08-sort' },
    ],
  },
  {
    text: '微机原理',
    link: 'Intel8086',
    children: [
      { text: '第1章 概述', link: 'c1-intro' },
      { text: '第2章 IA-32结构微处理器与8086', link: 'c2-IA32-8086' },
      { text: '第3章 8086指令系统', link: 'c3-instructions' },
      { text: '第4章 汇编语言程序设计', link: 'c4-programming' },
      { text: '第5章 处理器总线时序和系统总线', link: 'c5-timing-bus' },
      { text: '第6章 存储器', link: 'c6-mem' },
      { text: '第7章 输入输出', link: 'c7-io' },
      { text: '第8章 8251串行传输接口', link: 'c8-8251' },
      { text: '第8章 8253定时-计数器', link: 'c8-8253' },
      { text: '第8章 8255并行传输接口', link: 'c8-8255' },
    ],
  },
  {
    text: '数学',
    link: 'Math',
    children: [
      {
        text: '概率论',
        link: 'probability',
        children: [
          { text: '基本概念', link: 'c1' },
          { text: '多变量', link: 'c2-multi-variable' },
          { text: '数字特征', link: 'c3-shuzitezhen' },
          { text: '统计', link: 'c4-tongji' },
          { text: '估计', link: 'c5-estimation' },
        ],
      },
      {
        text: '高数',
        link: 'gaoshu',
        children: [
          { text: '微分方程', link: 'differential-equation' },
          { text: '散度 & 旋度', link: 'div-rot' },
          { text: '傅里叶级数', link: 'Fourier-Series' },
          { text: '公式', link: 'formula' },
          { text: '空间', link: 'space' },
          { text: '泰勒公式', link: 'taylor' },
          { text: '构造辅助函数的方法', link: 'Auxiliary_function' },
        ],
      },
      {
        text: '线代',
        link: 'linear',
        children: [
          { text: '千万不要这样学线代', link: 'Linear-algebra-done-wrong' },
        ],
      }],
  },
  {
    text: '密码学',
    link: 'crypto',
    children: [
      { text: '引言', link: 's01_intro' },
      { text: '分组密码体制', link: 's03_block-cipher' },
      { text: '公钥密码', link: 's04_pk' },
      { text: '密钥管理', link: 's05_key-management' },
      { text: '消息认证与哈希函数', link: 's06_identify-hash' },
      { text: '数字签名', link: 's07_sign' },
      { text: '密码协议', link: 's08_proto' },
    ],
  },
  {
    text: 'Java',
    link: 'Java',
    children: [{
      text: 'netty',
      link: 'netty',
      children: [
        { text: '01-BIO', link: '01-BIO' },
        { text: '02-NIO', link: '02-NIO' },
        { text: '02_5-异步IO', link: '02_5-async-IO' },
        { text: '03-零拷贝', link: '03-zero-copy' },
        { text: '04-netty-hm', link: '04-netty-hm' },
        { text: '04-netty', link: '04-netty' },
      ],
    }],
  },
  {
    text: 'utils',
    link: 'utils',
    children: [
      { text: '换源', link: 'change-source' },
      { text: 'curl', link: 'curl' },
      { text: '清缓存', link: 'clean-cache' },
    ],
  },
  {
    text: 'manim',
    link: 'manim',
    children: [
      { text: '从贝塞尔曲线到概率模型', link: 'bezier' },
    ],
  },
  {
    text: 'Web',
    link: 'web',
    children: [
      { text: 'HTML的奇淫巧计', link: 'HTML-skills' },
    ],
  },
]
