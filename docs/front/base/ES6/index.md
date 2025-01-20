 # 重学ES6

## 前言

从2015年6月17日ES6由ECMA国际组织正式发布，到现在ES15(ES2024)正式发布，已经过去9年了，各位前端同学对ES6+的大部分语法已经用的相当熟练,但是部分不那么常用的，可能还是停留在听过，见过，没用过的层次，本文主要针对一些平时业务开发中不太常见的ES6+语法进行深入，带大家一起看看不一样的ES6+

## Reflect和Proxy

### Reflect

简单的说，Reflect就是官方对对象操作相关的API进行的一次重构

 1. **主要作用**
 
 - 提供了一个统一的对象操作 API，将对象的底层操作方法都统一集中到了 Reflect 对象上
 - 让对象操作更加规范化，某些明显属于对象内部的方法放到 Reflect 上更合理
 - 和Proxy 的操作方法一一对应，使得 Proxy代理对象后，可以方便地调用对应的 Reflect 方法完成原本的默认行为

2. **对比Object类**

- 修改属性值:  obj.name = 'zs'; Reflect.set(obj,'name','zs');
- 判断属性是否存在:  'name' in obj; Reflect.has(obj,'name');
- 删除属性: delete zs.name ; Reflect.deleteProperty(obj,'name')
- 获取对应属性值：const name = obj.name; const name = Reflect.get(obj,'name');
... 其它相关函数均可以参考
[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Reflect)


## Symbol


## Generator和literator


## Set和Map