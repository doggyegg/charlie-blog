# Charlie-Blog

Charlie-Chen 的个人博客项目，用于记录日常开发，或者学习中的一些心得和总结，**该项目所有内容均为原创，转载请注明出处！**

## 技术框架简介

项目整体采取 VitePress 作为静态站点生成器，通过配置 github-workflow 实现自动化打包和部署，提交到 master 分支后，github-workflow 会自动在 prod 分支打包并部署到线上
