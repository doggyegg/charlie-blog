# Git 常用指令介绍

Git 是一个分布式版本控制工具，它被广泛应用于开源和私有项目的管理中。掌握 Git 的常用指令是每个开发者必备的技能，本文将介绍 Git 中一些常见的操作命令

## 1. 配置操作

```bash
git config --list # 查看当前git的所有配置
git config --global user.name "Your Name"        # 设置全局用户名
git config --global user.email "youremail@example.com"  # 设置全局邮箱

git config --global http.proxy http://proxy.example.com:8080  # 设置全局http代理
git config --global https.proxy https://proxy.example.com:8080 # 设置全局https代理

git config --global https."github.com".proxy https://proxy.example.com:8080  # 仅对某个域名进行代理
```

## 2. 初始化及克隆仓库

```bash
git init # 初始化git，创建git目录
git clone https://github.com/dcloudio/uni-ui.git  # 克隆仓库

```
