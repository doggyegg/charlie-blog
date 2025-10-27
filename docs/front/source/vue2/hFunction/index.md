# 从源码角度浅析 Vue H 函数

## 什么是 H 函数

H 函数（HyperScript 函数）是 Vue 中用于创建虚拟 DOM 节点的底层函数。在 Vue 2.x 中，它通常被命名为 `h`，是 `createElement` 函数的简写。H 函数是 Vue 虚拟 DOM 系统的核心，负责将模板编译成虚拟 DOM 节点树。

```javascript
// 基本语法
h(
  "div", // HTML 标签名，或直接传入组件
  {
    /* 属性对象 */
  }, // 可选的属性对象
  [
    /* 子节点 */
  ] // 可选的子节点数组
);
```

## H 函数有哪些用法

### 1. 创建普通元素

```javascript
h("div", { class: "container" }, "Hello World");
```

### 2. 创建带子元素的组件

```javascript
h("div", [h("h1", "标题"), h("p", "这是一段内容")]);
```

### 3. 渲染组件

```javascript
// 导入组件
import MyComponent from "./MyComponent.vue";

// 直接渲染组件
h(MyComponent, {
  props: {
    title: "组件标题",
    content: "这是组件内容",
  },
  on: {
    click: this.handleClick,
  },
  scopedSlots: {
    default: (props) => h("span", props.text),
  },
});
```

### 4. 动态组件

```javascript
h("component", {
  is: currentComponent,
  props: {
    // 传递给动态组件的 props
  },
});
```

### 4. 作用域插槽

```javascript
h("div", [
  this.$scopedSlots.default({
    text: "插槽内容",
  }),
]);
```

## 什么时候需要用到 H 函数

1. **渲染函数 (Render Functions)**：当需要完全控制组件的渲染逻辑时
2. **JSX**：在 Vue 中使用 JSX 语法时，JSX 会被编译成 h 函数调用
3. **高阶组件**：创建可复用的组件逻辑
4. **动态组件**：需要根据条件动态渲染不同组件时
5. **性能优化**：在特定场景下手动优化渲染性能

## H 函数源码解析

Vue 2.x 中的 h 函数定义在 `src/core/vdom/create-element.js` 中：

```javascript
export function _createElement(
  context: Component,
  tag: any,
  data: any,
  children: any,
  normalizationType: any,
  alwaysNormalize: boolean
) {
  // 参数处理
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }

  // 返回虚拟节点
  return _createElement(context, tag, data, children, normalizationType);
}
```

### 核心流程：

1. 参数标准化处理
2. 处理子节点
3. 创建 VNode 实例
4. 返回虚拟节点

## Template 解析为 H 函数

Vue 的模板编译过程：

1. **解析**：将模板字符串解析成 AST（抽象语法树）
2. **优化**：标记静态节点和静态根节点
3. **生成**：将 AST 转换为 render 函数字符串

### 示例转换

模板：

```html
<div id="app">
  <h1>{{ message }}</h1>
  <button @click="handleClick">点击</button>
</div>
```

编译后的 render 函数：

```javascript
function render() {
  return h("div", { attrs: { id: "app" } }, [
    h("h1", this.message),
    h("button", { on: { click: this.handleClick } }, "点击"),
  ]);
}
```

## 性能优化建议

1. **使用 key**：为列表项提供稳定的 key
2. **避免内联函数**：避免在 render 函数中创建新函数
3. **使用 keep-alive**：缓存不活跃组件
4. **合理使用 v-show 和 v-if**
5. **使用函数式组件**：对于无状态组件

## 总结

H 函数是 Vue 响应式系统的核心之一，理解其工作原理对于深入 Vue 开发至关重要。通过直接使用 h 函数，我们可以获得更大的灵活性，但也要注意合理使用，避免过度优化。
