---
title: Conda 使用指南
---

## 安装 conda

建议使用 [miniconda](https://docs.conda.io/projects/miniconda/en/latest/)，按照官网的方式安装就行了。

## 创建环境

```sh
conda create -n py311 python=3.11
```

## 查看已有环境

```sh
conda env list
```

## 删除环境

```sh
conda remove -n py311 --all
```

## 进入或退出环境

```sh
conda activate py311
```

```sh
conda deactivate
```

## Windows Powershell 无法找到 conda

先试试

```sh
Set-ExecutionPolicy RemoteSigned
```

再试试运行 conda init，把显示的 ps1 文件添加到 `C:\Users\YourName\Documents` 下。

