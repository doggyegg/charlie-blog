# 浅析React的反直觉重新渲染

## 前言

在React开发中，组件的重新渲染机制往往会让开发者感到困惑。明明只是修改了一个不相关的状态，为什么子组件也会重新渲染？为什么用了`memo`包裹子组件，传递对象时仍然会重新渲染？本文将深入分析React中这些"反直觉"的重新渲染情况，并提供相应的解决方案。

## React的渲染机制原理

### useState执行后的自顶向下渲染

当调用`useState`的setter函数时，React会触发以下流程：

1. **状态更新入队**：React将状态更新加入到更新队列中
2. **调度更新**：根据优先级决定何时执行更新
3. **重新渲染组件**：从触发更新的组件开始，自顶向下重新渲染
4. **Diff算法**：比较新旧Virtual DOM，计算需要更新的DOM节点
5. **提交更新**：将变更应用到真实DOM

```javascript
function App() {
  const [count, setCount] = useState(0);
  const [name, setName] = useState('React');
  
  console.log('App组件重新渲染'); // 任何状态更新都会触发
  
  return (
    <div>
      <Child1 count={count} />
      <Child2 name={name} />
    </div>
  );
}
```

**关键特性**：React默认采用"自顶向下"的渲染策略，父组件重新渲染时，所有子组件都会重新渲染，无论props是否变化。

## 反直觉的重新渲染场景与解决方案

### 场景一：不相关状态更新导致子组件渲染

```javascript
function App() {
  const [userInfo, setUserInfo] = useState({ name: 'John' });
  const [theme, setTheme] = useState('light'); // 主题状态
  
  return (
    <div>
      {/* 修改theme时，UserProfile也会重新渲染 */}
      <UserProfile user={userInfo} />
      <ThemeToggle theme={theme} onToggle={setTheme} />
    </div>
  );
}

function UserProfile({ user }) {
  console.log('UserProfile重新渲染'); // theme变化时也会执行
  return <div>{user.name}</div>;
}
```

**问题**：修改`theme`状态时，`UserProfile`组件也会重新渲染，尽管它的props没有变化。

#### 解决方案一：使用memo包裹子组件

```javascript
// 使用memo包裹子组件
const UserProfile = memo(({ user }) => {
  console.log('UserProfile重新渲染'); // 只有user变化时才执行
  return <div>{user.name}</div>;
});
```

**原理**：`memo`会对props进行**浅比较**，只有props发生变化时才重新渲染。这样就解决了场景一的问题。

### 场景二：memo失效 - 对象引用问题

但是，仅仅使用`memo`并不能解决所有问题。考虑以下场景：

```javascript
function App() {
  const [name, setName] = useState('John');
  
  return (
    <div>
      {/* 每次渲染都创建新对象 */}
      <UserCard user={{ name, age: 25 }} />
    </div>
  );
}

const UserCard = memo(({ user }) => {
  console.log('UserCard重新渲染'); // 每次都会执行
  return <div>{user.name} - {user.age}</div>;
});
```

**问题**：即使使用了`memo`，但由于每次渲染都创建新的对象`{ name, age: 25 }`，引用不同，导致memo失效。

### 场景三：useState返回新引用导致memo失效

```javascript
function App() {
  const [userObj, setUserObj] = useState({ name: 'John', age: 25 });
  
  const updateName = () => {
    setUserObj(prev => ({ ...prev, name: 'Jane' })); // 创建新对象
  };
  
  return (
    <div>
      <button onClick={updateName}>更新姓名</button>
      <UserDisplay user={userObj} />
    </div>
  );
}

const UserDisplay = memo(({ user }) => {
  console.log('UserDisplay重新渲染');
  return <div>{user.name}</div>;
});
```

**问题**：即使`user.name`的值没变，但`useState`每次都返回新的对象引用，导致memo的浅比较失效。

#### 解决方案二：useMemo缓存对象

针对场景二和场景三的对象引用问题，需要引入`useMemo`：

```javascript
function App() {
  const [name, setName] = useState('John');
  
  // 只有name变化时才创建新对象
  const user = useMemo(() => ({ name, age: 25 }), [name]);
  
  return <UserCard user={user} />;
}
```

**原理**：`useMemo`会缓存计算结果，只有依赖项变化时才重新计算。

#### 解决方案三：分离状态管理

```javascript
function App() {
  const [name, setName] = useState('John');
  
  return (
    <div>
      {/* 直接传递基本类型，避免对象引用问题 */}
      <UserDisplay name={name} age={25} />
    </div>
  );
}

const UserDisplay = memo(({ name, age }) => {
  return <div>{name} - {age}</div>;
});
```

#### 解决方案四：自定义比较函数

```javascript
const UserCard = memo(({ user }) => {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  // 自定义比较逻辑：只比较name属性
  return prevProps.user.name === nextProps.user.name;
});
```

## memo和useMemo的底层原理

### React.memo原理

```javascript
// 简化版memo实现
function memo(Component, areEqual) {
  return function MemoizedComponent(props) {
    const prevProps = useRef();
    const prevResult = useRef();
    
    // 默认浅比较函数
    const defaultAreEqual = (prev, next) => {
      if (Object.keys(prev).length !== Object.keys(next).length) {
        return false;
      }
      for (let key in prev) {
        if (prev[key] !== next[key]) { // 使用Object.is()比较
          return false;
        }
      }
      return true;
    };
    
    const compare = areEqual || defaultAreEqual;
    
    if (prevProps.current && compare(prevProps.current, props)) {
      return prevResult.current; // 返回缓存结果
    }
    
    prevProps.current = props;
    prevResult.current = Component(props);
    return prevResult.current;
  };
}
```

**核心机制**：
- 使用`Object.is()`进行浅比较
- 缓存上次的props和渲染结果
- 只有props变化时才重新渲染

### useMemo原理

```javascript
// 简化版useMemo实现
function useMemo(factory, deps) {
  const hook = getCurrentHook(); // 获取当前hook
  const prevDeps = hook.deps;
  const prevValue = hook.value;
  
  // 比较依赖项
  if (prevDeps && areEqual(prevDeps, deps)) {
    return prevValue; // 返回缓存值
  }
  
  // 重新计算
  const nextValue = factory();
  hook.deps = deps;
  hook.value = nextValue;
  
  return nextValue;
}

function areEqual(prevDeps, nextDeps) {
  if (prevDeps.length !== nextDeps.length) {
    return false;
  }
  for (let i = 0; i < prevDeps.length; i++) {
    if (!Object.is(prevDeps[i], nextDeps[i])) {
      return false;
    }
  }
  return true;
}
```

**核心机制**：
- 维护依赖项数组和计算结果的缓存
- 使用`Object.is()`逐一比较依赖项
- 只有依赖项变化时才重新执行factory函数

## 实战示例

基于我们的对话，这里是一个完整的优化示例：

```javascript
import { useState, useMemo, memo } from 'react';

function App() {
  // 优化前：直接使用对象状态
  // const [pText, setPText] = useState({name: "zs"});
  
  // 优化后：分离基本类型状态
  const [pText, setPText] = useState('zs');
  const [selfText, setSelfText] = useState('originSelf');
  
  // 使用useMemo缓存对象，避免每次创建新引用
  const pObj = useMemo(() => ({
    name: pText
  }), [pText]);

  return (
    <>
      <button onClick={() => setPText('ls')}>changePText</button>
      <button onClick={() => setPText('ws')}>changePText2</button>
      <button onClick={() => setSelfText('222')}>changeSelfText</button>
      <div>{selfText}</div>
      <Child pObj={pObj} />
    </>
  );
}

// 使用memo包裹子组件
const Child = memo((props) => {
  console.log('Child组件重新渲染'); // 只有pObj变化时才执行
  const { pObj } = props;
  return <div>{pObj.name}</div>;
});

export default App;
```

## 性能优化最佳实践

1. **合理使用memo**：不要过度使用，只在必要时使用
2. **避免内联对象**：不要在JSX中直接创建对象
3. **状态结构优化**：尽量使用基本类型，减少对象嵌套
4. **useMemo缓存计算**：对于复杂计算或对象创建使用useMemo
5. **useCallback缓存函数**：避免函数引用变化导致的重新渲染

## 总结

React的重新渲染机制虽然简单直接，但在实际开发中容易产生性能问题。理解其底层原理，合理使用`memo`、`useMemo`等优化工具，能够有效避免不必要的重新渲染，提升应用性能。

关键要记住：
- React默认自顶向下渲染所有子组件
- memo通过浅比较props决定是否重新渲染
- 对象和函数每次创建都是新引用，会导致memo失效
- useMemo可以缓存对象，避免重复创建
