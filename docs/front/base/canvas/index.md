# Canvas 完全入门指南：从零开始掌握网页绘图

## 什么是 Canvas？

Canvas 是 HTML5 提供的一个强大的绘图元素，就像网页中的"电子画板"。它允许我们使用 JavaScript 在网页上绘制图形、文字、图片，甚至制作复杂的动画和交互效果。

与传统的 DOM 元素不同，Canvas 提供了像素级别的控制能力，这使得它在处理复杂视觉效果时比 CSS 更加灵活和高效。

## Canvas 的核心特点

- **像素级控制**：直接操作画布上的每个像素
- **高性能渲染**：基于底层图形 API，渲染效率高
- **丰富的绘图 API**：支持路径、形状、文字、图像等多种绘制方式
- **动画支持**：结合 `requestAnimationFrame` 实现流畅动画
- **事件交互**：可以监听鼠标、键盘等用户交互事件

## Canvas 的应用场景

### 1. 数据可视化
- 动态图表（折线图、柱状图、饼图等）
- 实时数据监控大屏
- 复杂的统计图表展示

### 2. 游戏开发
- 2D 网页游戏（贪吃蛇、俄罗斯方块等）
- 粒子效果和动画
- 交互式游戏场景

### 3. 图像处理
- 图片滤镜效果（灰度、模糊、反转等）
- 图像编辑工具
- 照片处理应用

### 4. 创意设计
- 在线绘图工具
- 艺术创作平台
- 交互式设计展示

## Canvas 基础用法

### 创建 Canvas 元素

```html
<!-- HTML 中创建 Canvas -->
<canvas id="myCanvas" width="800" height="600"></canvas>
```

```javascript
// 获取 Canvas 元素和绘图上下文
const canvas = document.getElementById('myCanvas');
const ctx = canvas.getContext('2d');
```

**重要提示**：
- Canvas 默认尺寸是 300×150 像素
- 设置尺寸时使用 `canvas.width` 和 `canvas.height`，而不是 CSS 样式
- `getContext('2d')` 返回 2D 绘图上下文，这是所有绘图操作的核心

### 基础绘图示例

```javascript
// 绘制图片
const img = new Image();
img.src = 'path/to/image.jpg';
img.onload = function() {
    // 设置 Canvas 尺寸
    canvas.width = img.naturalWidth;
    canvas.height = img.naturalHeight;
    
    // 绘制图片
    ctx.drawImage(img, 0, 0);
};
```

## Canvas 常用 API 详解

### 1. 矩形绘制

```javascript
// 填充矩形
ctx.fillStyle = 'red';
ctx.fillRect(x, y, width, height);

// 描边矩形
ctx.strokeStyle = 'blue';
ctx.strokeRect(x, y, width, height);

// 清除矩形区域
ctx.clearRect(x, y, width, height);
```

### 2. 路径绘制

```javascript
// 开始新路径
ctx.beginPath();

// 移动到起点
ctx.moveTo(x, y);

// 画直线
ctx.lineTo(x, y);

// 画圆弧
ctx.arc(x, y, radius, startAngle, endAngle, anticlockwise);

// 二次贝塞尔曲线
ctx.quadraticCurveTo(cpx, cpy, x, y);

// 三次贝塞尔曲线
ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, x, y);

// 闭合路径
ctx.closePath();

// 填充或描边
ctx.fill();
ctx.stroke();
```

### 3. 文字绘制

```javascript
// 设置字体样式
ctx.font = '30px Arial';
ctx.fillStyle = 'black';
ctx.textAlign = 'center';
ctx.textBaseline = 'middle';

// 填充文字
ctx.fillText('Hello Canvas', x, y);

// 描边文字
ctx.strokeText('Hello Canvas', x, y);

// 测量文字宽度
const metrics = ctx.measureText('Hello Canvas');
console.log(metrics.width);
```

### 4. 图像操作

```javascript
// 绘制图像
ctx.drawImage(image, dx, dy);
ctx.drawImage(image, dx, dy, dWidth, dHeight);
ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);

// 获取像素数据
const imageData = ctx.getImageData(x, y, width, height);

// 设置像素数据
ctx.putImageData(imageData, x, y);

// 创建新的像素数据
const newImageData = ctx.createImageData(width, height);
```

### 5. 样式和颜色

```javascript
// 填充样式
ctx.fillStyle = 'red';
ctx.fillStyle = '#ff0000';
ctx.fillStyle = 'rgb(255, 0, 0)';
ctx.fillStyle = 'rgba(255, 0, 0, 0.5)';

// 描边样式
ctx.strokeStyle = 'blue';
ctx.lineWidth = 5;
ctx.lineCap = 'round';
ctx.lineJoin = 'round';

// 渐变
const gradient = ctx.createLinearGradient(x0, y0, x1, y1);
gradient.addColorStop(0, 'red');
gradient.addColorStop(1, 'blue');
ctx.fillStyle = gradient;

// 阴影
ctx.shadowColor = 'rgba(0, 0, 0, 0.5)';
ctx.shadowBlur = 10;
ctx.shadowOffsetX = 5;
ctx.shadowOffsetY = 5;
```

### 6. 变换操作

```javascript
// 平移
ctx.translate(x, y);

// 旋转
ctx.rotate(angle);

// 缩放
ctx.scale(x, y);

// 变换矩阵
ctx.transform(a, b, c, d, e, f);

// 保存和恢复状态
ctx.save();
// ... 进行变换和绘制
ctx.restore();
```

## Canvas 动画原理

Canvas 动画的核心是"帧"的概念，类似电影播放：

```javascript
let x = 0;

function animate() {
    // 清除画布
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // 绘制新的帧
    ctx.fillStyle = 'red';
    ctx.fillRect(x, 100, 50, 50);
    
    // 更新位置
    x += 2;
    if (x > canvas.width) x = -50;
    
    // 请求下一帧
    requestAnimationFrame(animate);
}

// 开始动画
animate();
```

**动画关键点**：
- 使用 `requestAnimationFrame` 而不是 `setInterval`
- 每帧先清除画布，再重新绘制
- 通过修改绘制参数实现动态效果

## 实战示例：动态文字效果

```javascript
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let counter = 0;

function animateText() {
    requestAnimationFrame(function() {
        // 清除画布
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        // 动态颜色
        ctx.fillStyle = `rgba(${counter}, 0, 0, 1)`;
        
        // 设置字体
        ctx.font = '50px Verdana';
        ctx.textAlign = 'center';
        
        // 绘制文字
        ctx.fillText(counter, canvas.width / 2, canvas.height / 2);
        
        // 更新计数器
        counter++;
        if (counter >= 255) counter = 0;
        
        // 继续动画
        animateText();
    });
}

// 启动动画
animateText();
```

## 图像处理示例：灰度滤镜

```javascript
function applyGrayscaleFilter() {
    // 获取图像数据
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    // 遍历每个像素
    for (let i = 0; i < data.length; i += 4) {
        // 计算灰度值
        const gray = (data[i] + data[i + 1] + data[i + 2]) / 3;
        
        // 设置 RGB 为相同的灰度值
        data[i] = gray;     // Red
        data[i + 1] = gray; // Green
        data[i + 2] = gray; // Blue
        // data[i + 3] 是 Alpha 通道，保持不变
    }
    
    // 将处理后的数据绘制回画布
    ctx.putImageData(imageData, 0, 0);
}
```

## 性能优化建议

1. **合理使用 Canvas 尺寸**：避免过大的画布影响性能
2. **减少重绘次数**：只在必要时清除和重绘画布
3. **使用离屏 Canvas**：复杂图形可以预先绘制到离屏画布
4. **批量操作**：将多个绘制操作合并执行
5. **避免频繁的状态切换**：减少 `save()` 和 `restore()` 的使用

## 常见问题和注意事项

### 1. Canvas 尺寸设置
```javascript
// ❌ 错误：使用 CSS 设置尺寸会导致拉伸
canvas.style.width = '800px';
canvas.style.height = '600px';

// ✅ 正确：使用属性设置尺寸
canvas.width = 800;
canvas.height = 600;
```

### 2. 图像加载时机
```javascript
// ❌ 错误：图像可能还未加载完成
const img = new Image();
img.src = 'image.jpg';
ctx.drawImage(img, 0, 0); // 可能绘制失败

// ✅ 正确：等待图像加载完成
const img = new Image();
img.onload = function() {
    ctx.drawImage(img, 0, 0);
};
img.src = 'image.jpg';
```

### 3. 坐标系统
Canvas 使用左上角为原点 (0,0) 的坐标系统，X 轴向右，Y 轴向下。

## 总结

Canvas 是一个功能强大的绘图工具，掌握了基础 API 后，你可以：

- 创建动态的数据可视化图表
- 开发简单的网页游戏
- 实现图像处理功能
- 制作各种创意动画效果

学习 Canvas 的关键是多实践，从简单的图形绘制开始，逐步尝试更复杂的动画和交互效果。结合实际项目需求，Canvas 将成为你前端开发中的有力工具。

## 相关资源

- [MDN Canvas API 文档](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API)
- [Canvas 教程](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial)
- [requestAnimationFrame 详解](https://developer.mozilla.org/zh-CN/docs/Web/API/window/requestAnimationFrame)