# Markdown ：入门与应用

## Markdown 是什么？

Markdown 是由 **John Gruber** 和 **Aaron Swartz** 于 2004 年共同设计的一种标记语言。它的核心目标是让文档可以轻松阅读、编写和转换为多种格式（如 HTML）。

Markdown 的语法简单明了，使用常见的文本符号（如 `#`、`*`、`[]`）即可实现丰富的格式化效果。

## Markdown 有什么用？

Markdown 的灵活性和轻量级特性使其适用于多个场景：

- **技术文档编写**：例如 README 文件、API 文档等。
- **博客文章**：许多博客平台支持 Markdown，比如 Hexo、Hugo、Jekyll。
- **协作文档**：工具如 Notion、Confluence 和 Typora 支持 Markdown。
- **版本管理**：结合 Git 使用 Markdown 编写开发文档。
- **邮件格式化**：部分邮件客户端支持 Markdown，方便编写富文本邮件。

## 常用 Markdown 操作命令

### **标题**

用 `#` 表示标题，`#` 的数量决定标题级别。

```markdown
# 一级标题

## 二级标题

### 三级标题
```

### **换行**

```markdown
这是第一段

这是第二段
```

这是第一段

这是第二段

###

### **强调**

```markdown
**我被加粗了**_我是斜体_ ~~我被删除了~~
```

**我被加粗了**_我是斜体_~~我被删除了~~

### **引用**

```markdown
> 单行引用

> 多行引用
>
> > 嵌套引用
```

> 单行引用

> 多行引用
>
> > 嵌套引用

### **列表**

```markdown
1. 有序列表 1
2. 有序列表 2

- 无序列表 1
- 无序列表 2
```

1. 有序列表 1
2. 有序列表 2

- 无序列表 1
- 无序列表 2

### **代码块**

````markdown
```js
const text = "这是一段js代码";
console.log(text);
```
````

```js
const text = "这是一段js代码";
console.log(text);
```

### **分割线**

```markdown
细：---

粗：——————————————————————
```

---

——————————————————————

### **链接**

```markdown
[超链接](https://doggyegg.github.io/charlie-blog/ "Charlie博客链接")
```

[超链接](https://doggyegg.github.io/charlie-blog/ "Charlie博客链接")

```markdown
网址：<https://doggyegg.github.io/charlie-blog/>
邮箱：<clh.codes@gmail.com>
```

网址：<https://doggyegg.github.io/charlie-blog/>

邮箱：<clh.codes@gmail.com>

### **图片**

```markdown
![alt区域](/public/home/home-banner.jpg "title文本")
```

![alt区域](/public/home/home-banner.jpg "title 文本")

### **表格**

```markdown
| 功能（居中对齐） |     代码（右对齐） |
| :--------------: | -----------------: |
|    一级标题）    |          #一级标题 |
|       加粗       | \*\*被加粗文本\*\* |
```

|   功能   |               代码 |
| :------: | -----------------: |
| 1 级标题 |            #标题 1 |
|   加粗   | \*\*被加粗文本\*\* |

### **TodoList**

```markdown
- [x] 完成 markdown 文章书写
- [] 完成 git 相关操作指令文章
```

- [x] 完成 markdown 文章书写
- [ ] 完成 git 相关操作指令文章
