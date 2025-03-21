# Git 常用命令指南

Git 是当今最流行的版本控制系统，本文将详细介绍 Git 的常用命令和一些常见问题的解决方案。

## 1. 基本命令

### 1.1 仓库初始化和配置
```bash
# 初始化新仓库
git init

# 配置用户信息
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"

# 克隆远程仓库
git clone <repository-url>
```

### 1.2 日常操作命令
```bash
# 查看仓库状态
git status

# 添加文件到暂存区
git add <file>          # 添加指定文件
git add .               # 添加所有文件

# 提交更改
git commit -m "提交信息"
git commit -am "提交信息"  # 合并 add 和 commit 操作（仅对已跟踪文件有效）

# 查看提交历史
git log
git log --oneline      # 简洁模式
git log --graph        # 图形化显示
```

### 1.3 分支操作
```bash
# 查看分支
git branch             # 查看本地分支
git branch -r          # 查看远程分支
git branch -a          # 查看所有分支

# 创建和切换分支
git branch <branch-name>           # 创建分支
git checkout <branch-name>         # 切换分支
git checkout -b <branch-name>      # 创建并切换分支
git switch <branch-name>           # 切换分支（新版本）
git switch -c <branch-name>        # 创建并切换分支（新版本）

# 删除分支
git branch -d <branch-name>        # 删除本地分支
git push origin --delete <branch-name>  # 删除远程分支
```

### 1.4 标签管理
```bash
# 创建标签
git tag v1.0.0                     # 创建轻量标签
git tag -a v1.0.0 -m "版本说明"     # 创建附注标签（推荐）
git tag -a v1.0.0 9fceb02 -m "版本说明"  # 给指定的提交创建标签

# 查看和管理标签
git tag                  # 列出所有标签
git show v1.0.0         # 查看标签信息
git tag -d v1.0.0       # 删除本地标签

# 推送标签到远程
git push origin v1.0.0   # 推送指定标签
git push origin --tags   # 推送所有标签
git push origin --delete v1.0.0  # 删除远程标签
```

### 1.5 暂存管理（Stash）
```bash
# 保存工作目录修改
git stash                    # 快速暂存
git stash save "修改说明"     # 添加说明信息
git stash -u                 # 包含未跟踪的文件
git stash -a                 # 包含忽略的文件
git stash -p                 # 交互式选择要暂存的内容

# 查看和恢复暂存
git stash list              # 查看暂存列表
git stash apply            # 恢复但保留暂存记录
git stash pop              # 恢复并删除暂存记录
git stash apply stash@{0}  # 恢复指定的暂存
git stash show             # 查看暂存内容
git stash show -p          # 查看详细差异

# 管理暂存
git stash drop stash@{0}   # 删除指定暂存
git stash clear            # 删除所有暂存
git stash branch <branch-name>  # 从暂存创建分支
```

### 1.6 提交选择（Cherry-Pick）
```bash
# 基本用法
git cherry-pick <commit-id>     # 将某个提交应用到当前分支
git cherry-pick <commit1> <commit2>  # 应用多个提交
git cherry-pick <start>..<end>  # 应用一个范围的提交

# 高级选项
git cherry-pick -x <commit-id>  # 保留原始作者信息
git cherry-pick -n <commit-id>  # 不自动提交
git cherry-pick --continue      # 解决冲突后继续
git cherry-pick --abort         # 放弃操作
```

## 2. 代码回滚方案

### 2.1 未提交的修改回滚
```bash
# 撤销工作区的修改
git checkout -- <file>
# 或使用新版命令
git restore <file>

# 撤销暂存区的修改
git reset HEAD <file>
# 或使用新版命令
git restore --staged <file>
```

### 2.2 已提交的修改回滚
```bash
# 回退到指定提交
git reset --soft HEAD^    # 回退一个版本，保留修改在暂存区
git reset --mixed HEAD^   # 回退一个版本，保留修改在工作区
git reset --hard HEAD^    # 回退一个版本，完全丢弃修改

# 回退到指定提交
git reset --hard <commit-id>

# 创建新提交来撤销之前的提交（推荐用于已推送到远程的提交）
git revert <commit-id>
```

## 3. 远程代码和本地代码不一致解决方案

### 3.1 拉取远程更新
```bash
# 获取远程更新
git fetch origin

# 查看差异
git diff origin/<branch-name>

# 合并远程更新
git pull origin <branch-name>
```

### 3.2 解决冲突场景
```bash
# 当本地有未提交的修改时
git stash               # 暂存本地修改
git pull               # 拉取远程更新
git stash pop          # 恢复本地修改并尝试合并

# 强制使用远程版本
git fetch origin
git reset --hard origin/<branch-name>
```

## 4. Rebase vs Merge 对比

### 4.1 Merge（合并）
- 优点：
  - 保留完整的历史记录
  - 不会改变提交历史
  - 操作简单，不容易出错
- 缺点：
  - 会产生额外的合并提交
  - 提交历史可能会比较混乱

```bash
git checkout main
git merge feature
```

### 4.2 Rebase（变基）
- 优点：
  - 提交历史清晰，呈现线性
  - 避免不必要的合并提交
- 缺点：
  - 改变了提交历史
  - 如果使用不当可能会造成混乱

```bash
git checkout feature
git rebase main
```

### 4.3 使用建议
- 在个人特性分支上使用 rebase 保持代码整洁
- 在主分支上使用 merge 保持历史完整
- 已推送到远程的分支谨慎使用 rebase

## 5. .gitignore 不生效的解决方案

当我们修改 .gitignore 文件后，发现已经被 Git 追踪的文件仍然会出现在 git status 中，这是因为 .gitignore 只能忽略那些还没有被追踪的文件。解决方案如下：

```bash
# 1. 清除本地 Git 缓存
git rm -r --cached .

# 2. 重新添加所有文件
git add .

# 3. 提交更改
git commit -m "更新 .gitignore"
```

注意事项：

- 在执行以上操作前，确保已经提交或备份了重要修改
- 该操作会重新检查所有文件，可能会影响到其他协作者
- 建议在执行前先通知团队成员

## 6. 设置git提交代理 - 解决github提交网络延时问题

```js

设置：git config --global https.https://github.com.proxy http://localhost:7890   （代理软件端口）

移除：git config --global --unset https.https://github.com.proxy

查询：git config --global --get https.https://github.com.proxy


```



