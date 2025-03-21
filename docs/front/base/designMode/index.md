# 前端常用设计模式

## 什么是设计模式？

设计模式是软件开发中解决常见问题的可复用方案。它们是经过时间验证的最佳实践，能够帮助我们写出更加可维护、可扩展和可重用的代码。

## 为什么要使用设计模式？

1. **提高代码可维护性**：设计模式提供标准化的解决方案，使代码更容易理解和维护
2. **提高代码复用性**：通过抽象共同的解决方案，可以在不同场景下复用代码
3. **提高代码可扩展性**：设计模式通常遵循开闭原则，便于扩展功能
4. **提高团队协作效率**：团队成员都熟悉这些模式后，可以更好地理解和协作

## 常用设计模式详解

### 1. 工厂模式（Factory Pattern）

#### 简介
工厂模式是一种创建型模式，它提供了一种创建对象的最佳方式。在工厂模式中，我们在创建对象时不会对客户端暴露创建逻辑。

#### 使用场景
- 需要根据不同条件创建不同的对象
- 处理大量具有相似属性的小对象

#### 代码示例
```javascript
// 简单工厂模式示例
class UserFactory {
    static createUser(role) {
        switch(role) {
            case 'admin':
                return new AdminUser();
            case 'normal':
                return new NormalUser();
            default:
                throw new Error('Unknown user type');
        }
    }
}

// 使用示例
const admin = UserFactory.createUser('admin');
```

### 2. 策略模式（Strategy Pattern）

#### 简介
策略模式定义了算法家族，分别封装起来，让它们之间可以互相替换，此模式让算法的变化独立于使用算法的客户。

#### 使用场景
- 表单验证
- 支付方式选择
- 排序算法选择

#### 代码示例
```javascript
// 策略模式示例
const strategies = {
    isNonEmpty: (value, errorMsg) => {
        if (value.trim() === '') {
            return errorMsg;
        }
    },
    minLength: (value, length, errorMsg) => {
        if (value.length < length) {
            return errorMsg;
        }
    }
};

// 使用示例
const validate = (value, rules) => {
    for (let rule of rules) {
        const strategy = strategies[rule.strategy];
        const errorMsg = strategy(value, ...rule.args);
        if (errorMsg) return errorMsg;
    }
};
```

### 3. 观察者模式（Observer Pattern）

#### 简介
观察者模式定义了对象间的一种一对多的依赖关系，当一个对象的状态发生改变时，所有依赖于它的对象都得到通知并被自动更新。

#### 使用场景
- 事件处理系统
- 状态监听
- 数据绑定

#### 代码示例
```javascript
// Observer类：数据监听者，负责把数据转换成getter/setter形式
class Observer {
    constructor(data) {
        this.data = data;
        this.watchers = [];
        // 将数据转换为响应式
        this.walk(data);
    }

    // 遍历数据对象的所有属性
    walk(data) {
        Object.keys(data).forEach(key => {
            this.defineReactive(data, key, data[key]);
        });
    }

    // 添加观察者
    addWatcher(watcher) {
        this.watchers.push(watcher);
        console.log(`添加了一个新的Watcher`);
    }

    // 通知所有观察者
    notify(key, newValue) {
        console.log(`Observer检测到${key}属性发生变化，新值为：${newValue}`);
        this.watchers.forEach(watcher => {
            watcher.update(key, newValue);
        });
    }

    // 将数据转换为响应式
    defineReactive(obj, key, val) {
        const self = this;
        Object.defineProperty(obj, key, {
            enumerable: true,
            configurable: true,
            get() {
                console.log(`访问${key}属性，值为：${val}`);
                return val;
            },
            set(newValue) {
                if (newValue === val) return;
                val = newValue;
                self.notify(key, newValue);
            }
        });
    }
}

// Watcher类：观察者，负责订阅数据的变化
class Watcher {
    constructor(name, keys) {
        this.name = name;
        this.keys = keys; // 要监听的属性列表
    }

    // 当数据变化时触发更新
    update(key, value) {
        if (this.keys.includes(key)) {
            console.log(`Watcher(${this.name}) 检测到${key}更新: ${value}`);
        }
    }
}

// 使用示例
const data = {
    user: 'Alice',
    age: 20
};

// 创建观察者
const observer = new Observer(data);

// 创建监听器
const userWatcher = new Watcher('UserWatcher', ['user']);
const ageWatcher = new Watcher('AgeWatcher', ['age']);
const allWatcher = new Watcher('AllWatcher', ['user', 'age']);

// 添加监听器
observer.addWatcher(userWatcher);
observer.addWatcher(ageWatcher);
observer.addWatcher(allWatcher);

// 修改数据，触发更新
data.user = 'Bob';
data.age = 21;

/* 输出结果：
添加了一个新的Watcher
添加了一个新的Watcher
添加了一个新的Watcher
Observer检测到user属性发生变化，新值为：Bob
Watcher(UserWatcher) 检测到user更新: Bob
Watcher(AllWatcher) 检测到user更新: Bob
Observer检测到age属性发生变化，新值为：21
Watcher(AgeWatcher) 检测到age更新: 21
Watcher(AllWatcher) 检测到age更新: 21
*/
```

### 4. 发布订阅模式（Publish-Subscribe Pattern）

#### 简介
发布订阅模式是观察者模式的一个变体，它引入了一个事件通道，用于解耦发布者和订阅者。

#### 使用场景
- 事件总线
- 消息队列
- 组件通信

#### 代码示例
```javascript
class EventEmitter {
    constructor() {
        this.events = {};
    }

    on(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    }

    emit(event, data) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(data));
        }
    }
}

// 使用示例
const emitter = new EventEmitter();
emitter.on('userLogin', data => console.log('User logged in:', data));
emitter.emit('userLogin', { userId: 1 });
```

### 5. 单例模式（Singleton Pattern）

#### 简介
单例模式确保一个类只有一个实例，并提供一个访问它的全局访问点。

#### 使用场景
- 全局状态管理
- 全局配置对象
- 缓存机制

#### 代码示例
```javascript
class Singleton {
    static instance = null;

    constructor() {
        if (Singleton.instance) {
            return Singleton.instance;
        }
        Singleton.instance = this;
    }

    static getInstance() {
        if (!Singleton.instance) {
            Singleton.instance = new Singleton();
        }
        return Singleton.instance;
    }
}
```

### 6. 装饰器模式（Decorator Pattern）

#### 简介
装饰器模式动态地给对象添加一些额外的职责，就增加功能来说，装饰器模式比生成子类更为灵活。

#### 使用场景
- 日志记录
- 性能监控
- 权限验证

#### 代码示例
```typescript
// TypeScript装饰器示例
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with:`, args);
        const result = originalMethod.apply(this, args);
        console.log(`Result:`, result);
        return result;
    };
    
    return descriptor;
}

class Example {
    @log
    multiply(a: number, b: number) {
        return a * b;
    }
}
```

### 7. 适配器模式（Adapter Pattern）

#### 简介
适配器模式将一个类的接口转换成客户希望的另外一个接口，使得原本由于接口不兼容而不能一起工作的那些类可以一起工作。

#### 使用场景
- 接口兼容
- 老系统改造
- 第三方库整合

#### 代码示例
```javascript
// 旧接口
class OldAPI {
    getOldData() {
        return { oldKey: 'oldValue' };
    }
}

// 新接口适配器
class APIAdapter {
    constructor(oldAPI) {
        this.oldAPI = oldAPI;
    }

    getNewData() {
        const oldData = this.oldAPI.getOldData();
        return { newKey: oldData.oldKey };
    }
}
```

### 8. 代理模式（Proxy Pattern）

#### 简介
代理模式为其他对象提供一种代理以控制对这个对象的访问。

#### 使用场景

- Vue响应式底层
- MobX 状态管理实现对象观察


#### 代码示例
```javascript
// ES6 Proxy示例
const handler = {
    get: function(target, prop) {
        console.log(`Accessing property: ${prop}`);
        return target[prop];
    },
    set: function(target, prop, value) {
        console.log(`Setting property: ${prop} = ${value}`);
        target[prop] = value;
        return true;
    }
};

const target = {};
const proxy = new Proxy(target, handler);

// 使用示例
proxy.name = 'John'; // 输出: Setting property: name = John
console.log(proxy.name); // 输出: Accessing property: name, John
```

