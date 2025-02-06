# TypeScript入门及实践

## 1. TypeScript简介

TypeScript是由Microsoft开发和维护的开源编程语言，它是JavaScript的超集，为JavaScript添加了可选的静态类型和基于类的面向对象编程特性。TypeScript代码最终会被编译成JavaScript代码，可以在任何支持JavaScript运行环境中执行。

### 1.1 为什么需要TypeScript？

在大型项目开发中，JavaScript存在以下问题：
- 无法在编译阶段发现类型错误
- 对开发工具的支持不够友好
- 代码重构困难
- 对ES6+特性支持有限：
  - 装饰器（Decorators）：JavaScript目前仍处于Stage 3阶段，而TypeScript已经支持
  - 私有字段（Private Fields）：在旧版JavaScript中无法真正实现私有属性
  - 枚举（Enums）：JavaScript不支持枚举类型
  - 命名空间（Namespace）：JavaScript缺乏内置的命名空间支持
  - 泛型（Generics）：JavaScript没有泛型的概念
  - 接口（Interface）：JavaScript不支持接口定义
  - 类型模块（Type Modules）：JavaScript无法定义和导入类型定义

TypeScript很好地解决了这些问题。

## 2. TypeScript的优势

1. **静态类型检查**
   - 在编译阶段就能发现类型错误
   - 减少运行时错误
   - 提高代码质量

2. **更好的IDE支持**
   - 智能提示更加准确
   - 代码重构更加方便
   - 查找引用和定义更加便捷

3. **更好的团队协作**
   - 类型系统作为代码文档
   - 接口定义清晰
   - 代码可维护性更强

4. **JavaScript的超集**
   - 完全兼容JavaScript
   - 可以逐步迁移
   - 拥有最新的ECMAScript特性

## 3. TypeScript基础语法

### 3.1 基本使用

```typescript
// 基本类型
// js也有的
let isDone: boolean = false; // 布尔值
isDone = true ; // 正确
isDone = 2; // 编译报错，不能将number类型赋值给布尔类型
let decimal: number = 6; // 数字
let color: string = "blue"; // 字符串
let sym: symbol = Symbol("key");  // symbol
let big1: bigint = BigInt(9007199254740991); // bigint
let a:undefined = undefined; // undefined
let b:null = null; // null
// 声明为undefined或null的变量，后续任意类型的数据均不能为该变量赋值，所以如果要初始化为undefined或null的值，我们需要使用联合类型
let number1:number|undefined = undefined;
let arr1:number[]|null = null;
// ts特有
let data1:any = []; // 任意值，等同于js不声明,后续可任意更改类型
let data2:unknown= []; // 不确定值，可任意更改类型，和any区别为调用该值的方法或属性时，需要通过if判断明确类型，或者使用断言语法
// any和unknown区别的案例
data1.push(2); // 正确
data2.push(2); // 报错 'data2' is of type 'unknown'
(data2 as number[]).push(2); // 正确
if(Array.isArray(data2)) data2.push(2); // 正确


const list: number[] = [1, 2, 3]; // 数组写法1
const list:Array<number> = [1,2]; // 数组写法2
const tuple: [string, number] = ["hello", 10]; // 元组

// 默认枚举,默认Red为0,后序依次递增，如green为1，blue为2。。。
enum Color {Red, Green, Blue}

// 数字枚举
enum Direction {
    Up = 1,        // 可以设置起始值
    Down,          // 自动递增为 2
    Left,          // 3
    Right          // 4
}

// 字符串枚举
enum HttpStatus {
    OK = "OK",
    NOT_FOUND = "NOT_FOUND",
    BAD_REQUEST = "BAD_REQUEST",
    SERVER_ERROR = "SERVER_ERROR"
}

// 异构枚举（混合型）
enum BooleanLikeHeterogeneousEnum {
    No = 0,
    Yes = "YES",
}
// 枚举使用
let c: Color = Color.Green;

// Any和Unknown
let notSure: any = 4;
let uncertain: unknown = 4;

// 类型不匹配示例
let num: number = 42;
// 以下赋值会导致编译错误
// num = "42"; // 错误：不能将类型"string"分配给类型"number"
// num = true; // 错误：不能将类型"boolean"分配给类型"number"

let str: string = "hello";
// str = 42; // 错误：不能将类型"number"分配给类型"string"

// 使用类型断言可以绕过类型检查，但要谨慎使用
let value: any = "hello";
let strLength: number = (value as string).length; // 正确
let numValue: number = 42;
// let strValue: string = numValue as string; // 错误：不能直接断言不相关的类型

// Void, Null和Undefined
function warnUser(): void {
    console.log("This is a warning message");
}

// 类型推导示例
let inferredNumber = 42; // 自动推断为number类型
let inferredString = "hello"; // 自动推断为string类型
let inferredArray = [1, 2, 3]; // 自动推断为number[]类型
let inferredObject = { name: "Alice", age: 25 }; // 自动推断为{ name: string; age: number }类型

// Never类型
function error(message: string): never {
    throw new Error(message);
}
 
// Symbol类型
const sym = Symbol('me');
const obj = {
    [sym]: 'value'
};

// BigInt类型
const max = BigInt(Number.MAX_SAFE_INTEGER);
```

### 3.2 类型别名（Type）

类型别名用来给一个类型起个新名字，使用 `type` 关键字。

#### 3.2.1 基本类型别名
```typescript
// 基本类型
type Name = string;
type Age = number;
type Married = boolean;

// 字面量类型
type Greeting = "Hello";
type Count = 1 | 2 | 3;

// 联合类型
type Status = "pending" | "fulfilled" | "rejected";
type ID = string | number;

// 交叉类型
type Employee = Person & { employeeId: number };
```

#### 3.2.2 对象类型
```typescript
// 简单对象类型
type Point = {
    x: number;
    y: number;
};

// 可选属性
type Config = {
    color?: string;
    width?: number;
};

// 只读属性
type Coordinates = {
    readonly lat: number;
    readonly long: number;
};

// 索引签名
type Dictionary = {
    [key: string]: string;
};
```

#### 3.2.3 函数类型
```typescript
// 普通函数类型
type GreetFunction = (name: string) => string;

// 带有属性的函数类型
type ValidatorWithMessage = {
    (value: string): boolean;
    message: string;
};

// 函数重载
type Overloaded = {
    (x: string): number;
    (x: number): string;
};
```

#### 3.2.4 元组类型
```typescript
// 基本元组
type Point2D = [number, number];
type Point3D = [number, number, number];

// 可选元素的元组
type Vector2D = [number, number?];

// 带有剩余元素的元组
type StringNumberBooleans = [string, number, ...boolean[]];
```

#### 3.2.5 工具类型
```typescript
// 提取属性类型
type Person = {
    name: string;
    age: number;
};
type AgeType = Person['age']; // number

// 映射类型
type Nullable<T> = {
    [P in keyof T]: T[P] | null;
};

// 条件类型
type NonNullable<T> = T extends null | undefined ? never : T;

// 模板字面量类型
type EventName<T extends string> = `${T}Changed`;
type UserEvents = EventName<'name' | 'age'>; // 'nameChanged' | 'ageChanged'
```

#### 3.2.6 递归类型
```typescript
// JSON值类型
type JSONValue = 
    | string
    | number
    | boolean
    | null
    | JSONValue[]
    | { [key: string]: JSONValue };

// 嵌套对象类型
type NestedNumbers = number | NestedNumbers[];

// 文件系统结构
type FileSystemObject = {
    name: string;
    size: number;
    type: 'file' | 'directory';
    children?: FileSystemObject[];
};
```

#### 3.2.7 实用工具类型
```typescript
// 部分属性可选
type Partial<T> = {
    [P in keyof T]?: T[P];
};

// 所有属性必选
type Required<T> = {
    [P in keyof T]-?: T[P];
};

// 所有属性只读
type Readonly<T> = {
    readonly [P in keyof T]: T[P];
};

// 从T中选择部分属性
type Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};

// 排除部分属性
type Omit<T, K extends keyof any> = Pick<T, Exclude<keyof T, K>>;
```

#### 3.2.8 实际应用示例
```typescript
// API响应类型
type ApiResponse<T> = {
    data: T;
    status: number;
    message: string;
    timestamp: number;
};

// 用户接口
interface User {
    id: number;
    username: string;
    email: string;
    profile: {
        firstName: string;
        lastName: string;
        avatar?: string;
    };
}

// 用户服务接口
interface UserService {
    getUser(id: number): Promise<ApiResponse<User>>;
    updateUser(id: number, data: Partial<User>): Promise<ApiResponse<void>>;
    deleteUser(id: number): Promise<ApiResponse<void>>;
}
```

### 3.3 接口（Interface）

接口是TypeScript中一个非常强大的特性，它可以定义对象的类型、约束类的实现、定义函数类型等。接口的作用是为这些类型命名和为你的代码或第三方代码定义契约。

#### 3.3.1 基本接口

```typescript
// 基本对象接口
interface User {
    name: string;
    age?: number;        // 可选属性
    readonly id: number; // 只读属性
}

const user: User = {
    name: "Tom",
    id: 1
};

// 函数接口
interface SearchFunc {
    (source: string, subString: string): boolean;
}

let mySearch: SearchFunc = function(src: string, sub: string): boolean {
    return src.search(sub) > -1;
};

// 可索引的接口
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray = ["Bob", "Fred"];
```

#### 3.3.2 接口继承

```typescript
// 接口继承接口
interface Animal {
    name: string;
}

interface Dog extends Animal {
    breed: string;
}

const dog: Dog = {
    name: "Spot",
    breed: "Labrador"
};

// 接口继承多个接口
interface Shape {
    color: string;
}

interface PenStroke {
    penWidth: number;
}

interface Square extends Shape, PenStroke {
    sideLength: number;
}

const square: Square = {
    color: "blue",
    penWidth: 5,
    sideLength: 10
};

// 接口继承类
class Control {
    private state: any;
}

interface SelectableControl extends Control {
    select(): void;
}

class Button extends Control implements SelectableControl {
    select() { }
}
```

#### 3.3.3 混合类型接口

有时我们需要一个对象同时具有多种类型，比如一个对象可以同时作为函数和对象使用。

```typescript
interface Counter {
    (start: number): string;  // 函数
    interval: number;         // 属性
    reset(): void;           // 方法
}

function getCounter(): Counter {
    let counter = function (start: number) { } as Counter;
    counter.interval = 123;
    counter.reset = function () { };
    return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

#### 3.3.4 接口泛型

接口也可以使用泛型，使其更加灵活。

```typescript
// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

function identity<T>(arg: T): T {
    return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;

// 泛型接口描述对象字面量
interface Box<T> {
    value: T;
    setValue(value: T): void;
}

class NumberBox implements Box<number> {
    value: number;
    setValue(value: number) {
        this.value = value;
    }
}

// 泛型约束
interface Lengthwise {
    length: number;
}

interface Collection<T extends Lengthwise> {
    add(item: T): void;
    remove(item: T): void;
    getLength(): number;
}
```

#### 3.3.5 可索引类型接口

TypeScript支持两种索引签名：字符串和数字。

```typescript
// 字符串索引签名
interface StringDictionary {
    [index: string]: string;
    name: string;     // 可以，name是string类型
    // age: number;   // 错误，类型必须是string
}

// 数字索引签名
interface NumberDictionary {
    [index: number]: string;
    length: number;    // 可以，length是特殊的内置属性
}

// 混合类型索引
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;    // ok, length是number
    name: string;      // ok, name是string
}

// 只读索引签名
interface ReadonlyStringArray {
    readonly [index: number]: string;
}

let myArray: ReadonlyStringArray = ["Alice", "Bob"];
// myArray[2] = "Mallory"; // 错误，索引签名是只读的

// 类数组接口
interface IArguments {
    [index: number]: any;
    length: number;
    callee: Function;
}

// 混合索引类型
interface ImageData {
    [x: string]: string | number | boolean;
    height: number;
    width: number;
    url: string;
    animated: boolean;
}
```

#### 3.3.6 实际应用示例

##### 1. API接口
```typescript
// API响应接口
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: number;
}

// 用户接口
interface User {
    id: number;
    username: string;
    email: string;
    profile: {
        firstName: string;
        lastName: string;
        avatar?: string;
    };
}

// 用户服务接口
interface UserService {
    getUser(id: number): Promise<ApiResponse<User>>;
    updateUser(id: number, data: Partial<User>): Promise<ApiResponse<void>>;
    deleteUser(id: number): Promise<ApiResponse<void>>;
}
```

##### 2. 组件接口
```typescript
// React组件Props接口
interface ButtonProps {
    type?: 'primary' | 'secondary' | 'danger';
    size?: 'small' | 'medium' | 'large';
    disabled?: boolean;
    loading?: boolean;
    onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
    children: React.ReactNode;
}

// Vue组件Props接口
interface TableProps<T> {
    data: T[];
    columns: Array<{
        key: keyof T;
        title: string;
        render?: (value: T[keyof T], record: T) => Vue.VNode;
    }>;
    loading?: boolean;
    pagination?: {
        current: number;
        pageSize: number;
        total: number;
    };
    onPageChange?: (page: number) => void;
}
```

##### 3. 状态管理接口
```typescript
// 状态接口
interface State {
    user: {
        data: User | null;
        loading: boolean;
        error: string | null;
    };
    settings: {
        theme: 'light' | 'dark';
        language: string;
        notifications: boolean;
    };
}

// Action接口
interface Action<T = any> {
    type: string;
    payload?: T;
    error?: boolean;
    meta?: any;
}

// Store接口
interface Store<S = any, A extends Action = Action> {
    getState(): S;
    dispatch(action: A): void;
    subscribe(listener: () => void): () => void;
}
```

### 3.4 Interface vs Type

TypeScript中的`interface`和`type`都可以用来定义类型，但它们有一些重要的区别和各自的使用场景。

#### 3.4.1 主要区别

1. **声明合并（Declaration Merging）**
```typescript
// Interface支持声明合并
interface User {
  name: string;
}
interface User {
  age: number;
}
// 最终User包含name和age两个属性

// Type不支持声明合并
type User = {
  name: string;
}
type User = {  // Error: 重复的标识符'User'
  age: number;
}
```

2. **扩展语法**
```typescript
// Interface扩展interface
interface Animal {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}

// Type扩展type
type Animal = {
  name: string;
}
type Dog = Animal & {
  breed: string;
}

// Type可以扩展interface，interface也可以扩展type
interface Animal {
  name: string;
}
type Dog = Animal & {
  breed: string;
}

type Animal = {
  name: string;
}
interface Dog extends Animal {
  breed: string;
}
```

3. **组合类型**
```typescript
// Type可以创建联合类型
type Status = "pending" | "fulfilled" | "rejected";
type StringOrNumber = string | number;

// Type可以创建映射类型
type Readonly<T> = {
  readonly [P in keyof T]: T[P];
};

// Interface不能直接创建联合类型或映射类型
```

4. **计算属性**
```typescript
// Type支持计算属性
type Keys = "firstname" | "surname";
type DudeType = {
  [key in Keys]: string;
}

// Interface不支持计算属性
```

#### 3.4.2 使用建议

1. **使用Interface的场景**：
   - 定义对象的形状（Shape）
   - 定义类的实现契约
   - 需要声明合并的场景
   - 在开发库或框架时（更好的接口定义）
   - 描述对象的公共API

```typescript
// 定义类的实现契约
interface Repository<T> {
  find(id: number): Promise<T>;
  save(entity: T): Promise<void>;
  delete(id: number): Promise<void>;
}

class UserRepository implements Repository<User> {
  async find(id: number): Promise<User> {
    // 实现细节
  }
  async save(user: User): Promise<void> {
    // 实现细节
  }
  async delete(id: number): Promise<void> {
    // 实现细节
  }
}
```

2. **使用Type的场景**：
   - 定义联合类型或交叉类型
   - 需要使用计算属性
   - 定义工具类型
   - 需要使用映射类型
   - 定义函数类型或元组类型

```typescript
// 联合类型
type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

// 工具类型
type Nullable<T> = T | null;
type Optional<T> = T | undefined;

// 映射类型
type Mutable<T> = {
  -readonly [P in keyof T]: T[P];
};

// 函数类型
type Handler = (event: Event) => void;

// 元组类型
type Point = [number, number];
```

3. **最佳实践**：
   - 优先使用interface
   - 当interface无法满足需求时，使用type
   - 在定义对象结构时使用interface
   - 在定义函数类型、联合类型、工具类型时使用type
   - 保持一致性，在同一个项目中尽量统一使用方式

```typescript
// 好的实践
interface UserData {
  id: number;
  name: string;
  email: string;
}

type UserState = 'active' | 'inactive' | 'banned';

type Handler<T> = (data: T) => void;

interface UserService {
  getUser(id: number): Promise<UserData>;
  updateUserState(id: number, state: UserState): Promise<void>;
  onUserUpdate: Handler<UserData>;
}
```

## 4. TypeScript高级语法

### 4.1 泛型

泛型是TypeScript中最强大的特性之一，它允许我们在定义函数、接口或类时，不预先指定具体的类型，而在使用时再指定类型的一种特性。

#### 4.1.1 基础泛型

```typescript
// 泛型函数
function identity<T>(arg: T): T {
    return arg;
}

// 使用方式
let output1 = identity<string>("myString");
let output2 = identity("myString");  // 类型推断

// 泛型接口
interface GenericIdentityFn<T> {
    (arg: T): T;
}

// 泛型类
class GenericNumber<T> {
    zeroValue: T;
    add: (x: T, y: T) => T;
}
```

#### 4.1.2 泛型约束

```typescript
// 使用extends关键字约束泛型
interface Lengthwise {
    length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
    console.log(arg.length);  // 现在我们知道arg具有length属性
    return arg;
}

// 使用keyof约束对象属性
function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] {
    return obj[key];
}

let x = { a: 1, b: 2, c: 3 };
getProperty(x, "a"); // 正确
getProperty(x, "d"); // 错误：参数"d"不能赋给参数"keyof {a: number, b: number, c: number}"
```

#### 4.1.3 多重泛型

```typescript
// 多个类型参数
function pair<T, U>(first: T, second: U): [T, U] {
    return [first, second];
}

// 泛型约束中使用类型参数
function copyFields<T extends U, U>(target: T, source: U): T {
    const existingRequired: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
    existingRequired.push(parameterIndex);
    Reflect.defineMetadata("required", existingRequired, target, propertyKey);
}
```

#### 4.1.4 实用泛型工具类型

```typescript
// Partial - 使所有属性可选
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

type PartialTodo = Partial<Todo>;
// 相当于：
// {
//   title?: string;
//   description?: string;
//   completed?: boolean;
// }

// Record - 构造一个对象类型，属性键为K，属性值为T
type PageInfo = {
    title: string;
    url: string;
}
type Pages = Record<'home' | 'about' | 'contact', PageInfo>;

// Pick - 从类型中选择部分属性
type TodoPreview = Pick<Todo, 'title' | 'completed'>;

// Omit - 从类型中排除部分属性
type TodoWithoutDescription = Omit<Todo, 'description'>;

// Readonly - 使所有属性只读
type ReadonlyTodo = Readonly<Todo>;
```

#### 4.1.5 条件类型

```typescript
// 基础条件类型
type TypeName<T> = 
    T extends string ? "string" :
    T extends number ? "number" :
    T extends boolean ? "boolean" :
    T extends undefined ? "undefined" :
    T extends Function ? "function" :
    "object";

// 分配条件类型
type ToArray<T> = T extends any ? T[] : never;
type StrArrOrNumArr = ToArray<string | number>;  // string[] | number[]

// infer关键字
type ReturnType<T> = T extends (...args: any[]) => infer R ? R : any;

// 实际应用示例
type Unpacked<T> = 
    T extends (infer U)[] ? U :
    T extends (...args: any[]) => infer U ? U :
    T extends Promise<infer U> ? U :
    T;

type T0 = Unpacked<string>;  // string
type T1 = Unpacked<string[]>;  // string
type T2 = Unpacked<() => string>;  // string
type T3 = Unpacked<Promise<string>>;  // string
```

#### 4.1.6 实际应用示例

1. **API响应处理**
```typescript
// 通用API响应类型
interface ApiResponse<T> {
    data: T;
    status: number;
    message: string;
    timestamp: number;
}

// 具体业务类型
interface User {
    id: number;
    name: string;
    email: string;
}

// API服务
class ApiService {
    async get<T>(url: string): Promise<ApiResponse<T>> {
        const response = await fetch(url);
        return response.json();
    }

    async post<T, U>(url: string, data: T): Promise<ApiResponse<U>> {
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data)
        });
        return response.json();
    }
}

// 使用示例
const api = new ApiService();
api.get<User>('/api/user/1')
    .then(response => {
        console.log(response.data.name);
    });
```

2. **状态管理**
```typescript
// 通用状态管理Store
class Store<State> {
    private state: State;

    constructor(initialState: State) {
        this.state = initialState;
    }

    getState(): State {
        return this.state;
    }

    setState(newState: Partial<State>) {
        this.state = { ...this.state, ...newState };
    }
}

// 使用示例
interface UserState {
    currentUser: User | null;
    isLoading: boolean;
    error: string | null;
}

const userStore = new Store<UserState>({
    currentUser: null,
    isLoading: false,
    error: null
});
```

3. **组件Props类型**
```typescript
// 通用列表组件
interface ListProps<T> {
    items: T[];
    renderItem: (item: T) => React.ReactNode;
    onItemClick?: (item: T) => void;
}

function List<T>({ items, renderItem, onItemClick }: ListProps<T>) {
    return (
        <ul>
            {items.map((item, index) => (
                <li key={index} onClick={() => onItemClick?.(item)}>
                    {renderItem(item)}
                </li>
            ))}
        </ul>
    );
}

// 使用示例
interface Product {
    id: number;
    name: string;
    price: number;
}

<List<Product>
    items={products}
    renderItem={product => `${product.name}: $${product.price}`}
    onItemClick={product => console.log(`Selected ${product.name}`)}
/>
```

### 4.2 装饰器

装饰器（Decorator）是一种特殊类型的声明，它能够被附加到类声明、方法、访问符、属性或参数上。装饰器使用 `@expression` 这种形式，`expression`求值后必须为一个函数，它会在运行时被调用，被装饰的声明信息会作为参数传入。

> 注意：要启用装饰器特性，需要在`tsconfig.json`中启用`experimentalDecorators`编译器选项：
```json
{
  "compilerOptions": {
    "target": "ES5",
    "experimentalDecorators": true
  }
}
```

#### 4.2.1 类装饰器

类装饰器在类声明之前被声明，应用于类构造函数，可以用来监视、修改或替换类定义。

```typescript
// 简单的类装饰器
function sealed(constructor: Function) {
    Object.seal(constructor);
    Object.seal(constructor.prototype);
}

@sealed
class BugReport {
    type = "report";
    title: string;

    constructor(t: string) {
        this.title = t;
    }
}

// 装饰器工厂
function reportable(isReportable: boolean) {
    return function (constructor: Function) {
        constructor.prototype.isReportable = isReportable;
    }
}

@reportable(true)
class BugReport {
    type = "report";
}

// 重载构造函数的装饰器
function classDecorator<T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
        newProperty = "new property";
        hello = "override";
    }
}

@classDecorator
class Greeter {
    property = "property";
    hello: string;
    constructor(m: string) {
        this.hello = m;
    }
}
```

#### 4.2.2 方法装饰器

方法装饰器声明在方法声明之前，可以用来监视、修改或者替换方法定义。

```typescript
// 方法装饰器
function log(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // 保存原始的方法
    const originalMethod = descriptor.value;

    // 修改方法的行为
    descriptor.value = function(...args: any[]) {
        console.log(`Calling ${propertyKey} with args: ${JSON.stringify(args)}`);
        const result = originalMethod.apply(this, args);
        console.log(`Result: ${JSON.stringify(result)}`);
        return result;
    }
}

class Calculator {
    @log
    add(x: number, y: number) {
        return x + y;
    }
}

// 只读方法装饰器
function readonly(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    descriptor.writable = false;
}

class Example {
    @readonly
    pi() { return 3.14; }
}
```

#### 4.2.3 访问器装饰器

访问器装饰器声明在访问器声明之前，应用于访问器的属性描述符。

```typescript
function configurable(value: boolean) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        descriptor.configurable = value;
    };
}

class Point {
    private _x: number;
    private _y: number;

    constructor(x: number, y: number) {
        this._x = x;
        this._y = y;
    }

    @configurable(false)
    get x() { return this._x; }

    @configurable(false)
    get y() { return this._y; }
}
```

#### 4.2.4 属性装饰器

属性装饰器声明在属性声明之前，用于监视类中是否声明了某个属性。

```typescript
// 属性装饰器
function defaultValue(value: string) {
    return function (target: any, propertyName: string) {
        target[propertyName] = value;
    }
}

class Example {
    @defaultValue("default")
    name!: string;
}

// 验证装饰器
function validate(target: any, propertyName: string) {
    let value: string;
    
    const getter = function() {
        return value;
    };
    
    const setter = function(newVal: string) {
        if (newVal.length < 3) {
            throw new Error("Value must be at least 3 characters long.");
        }
        value = newVal;
    };
    
    Object.defineProperty(target, propertyName, {
        get: getter,
        set: setter
    });
}

class User {
    @validate
    password!: string;
}
```

#### 4.2.5 参数装饰器

参数装饰器声明在参数声明之前，用于监视函数参数是否被传入。

```typescript
function required(target: Object, propertyKey: string | symbol, parameterIndex: number) {
    const existingRequired: number[] = Reflect.getOwnMetadata("required", target, propertyKey) || [];
    existingRequired.push(parameterIndex);
    Reflect.defineMetadata("required", existingRequired, target, propertyKey);
}

function validate(target: any, propertyName: string, descriptor: PropertyDescriptor) {
    const method = descriptor.value;

    descriptor.value = function(...args: any[]) {
        const requiredParameters: number[] = Reflect.getOwnMetadata("required", target, propertyName) || [];
        
        requiredParameters.forEach(index => {
            if (args[index] === undefined) {
                throw new Error(`Parameter at index ${index} is required.`);
            }
        });

        return method.apply(this, args);
    }
}

class UserService {
    @validate
    createUser(@required name: string, @required email: string, age?: number) {
        // 创建用户的逻辑
    }
}
```

#### 4.2.6 实际应用示例

```typescript
// 1. 性能监控装饰器
function measure(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;

    descriptor.value = async function(...args: any[]) {
        const start = performance.now();
        const result = await originalMethod.apply(this, args);
        const end = performance.now();
        console.log(`${propertyKey} took ${end - start}ms to execute`);
        return result;
    }
}

// 2. 缓存装饰器
function memoize(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    const originalMethod = descriptor.value;
    const cache = new Map();

    descriptor.value = function(...args: any[]) {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = originalMethod.apply(this, args);
        cache.set(key, result);
        return result;
    }
}

// 3. 权限控制装饰器
function requireRole(role: string) {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        const originalMethod = descriptor.value;

        descriptor.value = function(...args: any[]) {
            if (!currentUser.hasRole(role)) {
                throw new Error(`Requires role: ${role}`);
            }
            return originalMethod.apply(this, args);
        }
    }
}

// 使用示例
class UserController {
    @measure
    @requireRole('admin')
    async getAllUsers() {
        // 获取用户列表
    }

    @memoize
    calculateExpensiveValue(input: number) {
        // 复杂计算
    }
}
```

### 4.3 类型断言

```typescript
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
// 或
let strLength: number = (<string>someValue).length;
```

### 4.4 高级类型

```typescript
// 联合类型
type StringOrNumber = string | number;

// 交叉类型
type Combined = Type1 & Type2;

// 类型别名
type Point = {
    x: number;
    y: number;
};
```

## 5. 在Vue项目中使用TypeScript

### 5.1 项目初始化

```bash
# 使用Vue CLI创建项目
vue create my-project
# 选择TypeScript支持

# 或使用Vite创建项目
npm create vite@latest my-project -- --template vue-ts
```

### 5.2 TypeScript配置

#### 5.2.1 tsconfig.json配置
在项目根目录创建`tsconfig.json`文件：

```json
{
  "compilerOptions": {
    "target": "esnext",
    "module": "esnext",
    "strict": true,
    "jsx": "preserve",
    "moduleResolution": "node",
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "forceConsistentCasingInFileNames": true,
    "useDefineForClassFields": true,
    "sourceMap": true,
    "baseUrl": ".",
    "types": [
      "webpack-env",
      "jest"
    ],
    "paths": {
      "@/*": [
        "src/*"
      ]
    },
    "lib": [
      "esnext",
      "dom",
      "dom.iterable",
      "scripthost"
    ]
  },
  "include": [
    "src/**/*.ts",
    "src/**/*.tsx",
    "src/**/*.vue",
    "tests/**/*.ts",
    "tests/**/*.tsx"
  ],
  "exclude": [
    "node_modules"
  ]
}
```

#### 5.2.2 Vite配置
如果使用Vite，需要在`vite.config.ts`中添加以下配置：

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  }
})
```

#### 5.2.3 Webpack配置
如果使用Vue CLI (基于Webpack)，在`vue.config.js`中添加：

```javascript
const path = require('path')

module.exports = {
  configureWebpack: {
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    }
  },
  chainWebpack: config => {
    config.module
      .rule('ts')
      .use('ts-loader')
      .loader('ts-loader')
      .options({
        transpileOnly: true,
        appendTsSuffixTo: [/\.vue$/]
      })
  }
}
```

### 5.3 Vue组件示例

```typescript
<script lang="ts">
import { defineComponent, ref } from 'vue'

// 定义接口
interface Todo {
  id: number
  title: string
  completed: boolean
}

export default defineComponent({
  name: 'TodoList',
  props: {
    initialTodos: {
      type: Array as () => Todo[],
      required: true
    }
  },
  setup(props) {
    const todos = ref<Todo[]>(props.initialTodos)
    const newTodo = ref('')

    const addTodo = () => {
      if (newTodo.value.trim()) {
        todos.value.push({
          id: Date.now(),
          title: newTodo.value,
          completed: false
        })
        newTodo.value = ''
      }
    }

    const toggleTodo = (id: number) => {
      const todo = todos.value.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    }

    return {
      todos,
      newTodo,
      addTodo,
      toggleTodo
    }
  }
})
</script>

<template>
  <div>
    <input v-model="newTodo" @keyup.enter="addTodo" />
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <input
          type="checkbox"
          :checked="todo.completed"
          @change="toggleTodo(todo.id)"
        />
        {{ todo.title }}
      </li>
    </ul>
  </div>
</template>
```

## 6. 在React项目中使用TypeScript

### 6.1 项目初始化

```bash
# 使用Create React App
npx create-react-app my-app --template typescript

# 或使用Vite
npm create vite@latest my-app -- --template react-ts
```

### 6.2 TypeScript配置

#### 6.2.1 tsconfig.json配置
在项目根目录创建`tsconfig.json`文件：

```json
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "allowJs": true,
    "skipLibCheck": true,
    "esModuleInterop": true,
    "allowSyntheticDefaultImports": true,
    "strict": true,
    "forceConsistentCasingInFileNames": true,
    "noFallthroughCasesInSwitch": true,
    "module": "esnext",
    "moduleResolution": "node",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "noEmit": true,
    "jsx": "react-jsx",
    "baseUrl": "src",
    "paths": {
      "@/*": ["*"]
    }
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules", "**/*.spec.ts"]
}
```

#### 6.2.2 Vite配置
如果使用Vite，在`vite.config.ts`中添加：

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000
  }
})
```

#### 6.2.3 Webpack配置
如果使用Create React App，可以通过`craco`来自定义webpack配置。

首先安装craco：
```bash
npm install @craco/craco --save-dev
```

创建`craco.config.js`：
```javascript
const path = require('path')

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src')
    }
  },
  jest: {
    configure: {
      moduleNameMapper: {
        '^@/(.*)$': '<rootDir>/src/$1'
      }
    }
  }
}
```

更新`package.json`中的scripts：
```json
{
  "scripts": {
    "start": "craco start",
    "build": "craco build",
    "test": "craco test"
  }
}
```

### 6.3 React组件示例

```typescript
import React, { useState } from 'react';

// 定义接口
interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

interface Props {
  initialTodos: Todo[];
}

const TodoList: React.FC<Props> = ({ initialTodos }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [newTodo, setNewTodo] = useState<string>('');

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          title: newTodo,
          completed: false
        }
      ]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map(todo =>
        todo.id === id
          ? { ...todo, completed: !todo.completed }
          : todo
      )
    );
  };

  return (
    <div>
      <input
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        onKeyPress={addTodo}
      />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
            />
            {todo.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
```

## 7. 全局声明

在TypeScript中，我们经常需要使用一些全局变量或类型。这些可能来自于：
- 浏览器环境（如 `window`、`document`）
- 第三方库没有提供类型定义
- 项目中自定义的全局变量
- 扩展已有的全局接口

### 7.1 声明全局变量

```typescript
// 在 global.d.ts 文件中
declare const API_BASE_URL: string;
declare const DEBUG_MODE: boolean;

// 使用
console.log(API_BASE_URL);  // TypeScript 不会报错
```

### 7.2 声明全局接口

```typescript
// 扩展 Window 接口
declare global {
    interface Window {
        config: {
            apiUrl: string;
            theme: 'light' | 'dark';
        };
        analytics: {
            track(event: string, data?: any): void;
            identify(userId: string): void;
        };
    }
}

// 使用
window.config.theme = 'dark';
window.analytics.track('page_view');
```

### 7.3 声明全局命名空间

```typescript
// 为 jQuery 添加类型声明
declare namespace $ {
    function ajax(url: string, settings?: any): Promise<any>;
    function get(url: string): Promise<any>;
    function post(url: string, data: any): Promise<any>;
}

// 使用
$.ajax('/api/users');
```

### 7.4 模块声明

```typescript
// 为没有类型定义的模块添加声明
declare module 'some-untyped-module' {
    export function doSomething(): void;
    export function doSomethingElse(): void;
}

// 为 CSS/SCSS 模块添加声明
declare module '*.css' {
    const css: { [key: string]: string };
    export default css;
}

declare module '*.scss' {
    const content: { [className: string]: string };
    export default content;
}

// 为图片等资源添加声明
declare module '*.png' {
    const value: string;
    export default value;
}

declare module '*.svg' {
    const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
    export default content;
}
```

### 7.5 环境声明

```typescript
// 声明环境变量
declare namespace NodeJS {
    interface ProcessEnv {
        NODE_ENV: 'development' | 'production';
        API_KEY: string;
        DATABASE_URL: string;
    }
}

// 使用
if (process.env.NODE_ENV === 'development') {
    console.log('开发环境');
}
```

### 7.6 扩展已有类型

```typescript
// 扩展 Express 的 Request 接口
declare namespace Express {
    interface Request {
        user?: {
            id: string;
            name: string;
            roles: string[];
        };
        session: {
            token: string;
            lastAccess: Date;
        };
    }
}

// 扩展 Vue 的组件选项类型
declare module 'vue' {
    interface ComponentCustomOptions {
        permissions?: string[];
        layout?: string;
    }
}
```

### 7.7 最佳实践

1. **组织声明文件**
```
src/
├── types/
│   ├── global.d.ts     // 全局类型声明
│   ├── env.d.ts        // 环境变量声明
│   ├── vue.d.ts        // Vue 相关声明
│   └── modules.d.ts    // 模块声明
```

2. **在 tsconfig.json 中包含声明文件**
```json
{
    "compilerOptions": {
        // ...其他配置
    },
    "include": [
        "src/**/*",
        "src/types/**/*.d.ts"
    ]
}
```

3. **使用类型保护**
```typescript
// 检查全局变量是否存在
declare const __FEATURE_FLAG__: boolean | undefined;

if (typeof __FEATURE_FLAG__ !== 'undefined') {
    // 这里 __FEATURE_FLAG__ 的类型被收窄为 boolean
    console.log(__FEATURE_FLAG__);
}
```

4. **模块扩展**
```typescript
// 安全地扩展第三方模块
import 'vue-router';

declare module 'vue-router' {
    interface RouteMeta {
        requiresAuth?: boolean;
        roles?: string[];
        title?: string;
    }
}
```

这些声明方式可以帮助我们更好地处理全局变量和类型，使代码更加类型安全和可维护。记住要将声明文件（.d.ts）放在合适的位置，并在 `tsconfig.json` 中正确配置。

## 8. TypeScript内置工具类型

TypeScript提供了多种实用的工具类型，可以帮助我们进行类型转换和操作。

### 8.1 部分类型工具

```typescript
// Partial<T> - 将类型的所有属性变为可选
interface Todo {
    title: string;
    description: string;
    completed: boolean;
}

// 所有字段都变为可选
type PartialTodo = Partial<Todo>;
// 等价于：
// {
//    title?: string;
//    description?: string;
//    completed?: boolean;
// }

// Required<T> - 将类型的所有属性变为必选
type RequiredTodo = Required<PartialTodo>;
// 所有可选属性都变为必选

// Readonly<T> - 将类型的所有属性变为只读
type ReadonlyTodo = Readonly<Todo>;
// 所有属性都变为只读，不能被修改
```

### 8.2 提取和排除类型工具

```typescript
// Pick<T, K> - 从类型中选择部分属性
type TodoPreview = Pick<Todo, 'title' | 'completed'>;
// 等价于：
// {
//    title: string;
//    completed: boolean;
// }

// Omit<T, K> - 从类型中排除指定属性
type TodoWithoutDescription = Omit<Todo, 'description'>;
// 等价于：
// {
//    title: string;
//    completed: boolean;
// }

// Extract<T, U> - 提取联合类型中的指定类型
type T0 = Extract<'a' | 'b' | 'c', 'a' | 'f'>;  // 'a'
type T1 = Extract<string | number | (() => void), Function>;  // () => void

// Exclude<T, U> - 从联合类型中排除指定类型
type T2 = Exclude<'a' | 'b' | 'c', 'a'>;  // 'b' | 'c'
type T3 = Exclude<string | number | (() => void), Function>;  // string | number
```

### 8.3 类型推断工具

```typescript
// ReturnType<T> - 获取函数返回值类型
function f1(): { a: number; b: string } {
    return { a: 1, b: 'hello' };
}
type F1Return = ReturnType<typeof f1>;  // { a: number; b: string }

// Parameters<T> - 获取函数参数类型
function f2(arg1: number, arg2: string): void {}
type F2Params = Parameters<typeof f2>;  // [number, string]

// InstanceType<T> - 获取构造函数类型的实例类型
class C {
    x = 0;
    y = 0;
}
type T4 = InstanceType<typeof C>;  // C
```

### 8.4 条件类型工具

```typescript
// NonNullable<T> - 从类型中排除 null 和 undefined
type T5 = NonNullable<string | number | undefined | null>;  // string | number

// Record<K, T> - 创建具有指定属性和类型的对象类型
type PageInfo = {
    title: string;
    url: string;
}
type Pages = Record<'home' | 'about' | 'contact', PageInfo>;
// 等价于：
// {
//    home: PageInfo;
//    about: PageInfo;
//    contact: PageInfo;
// }
```

### 8.5 字符串操作工具

```typescript
// Uppercase<T> - 将字符串字面量类型转换为大写
type T6 = Uppercase<'hello'>;  // 'HELLO'

// Lowercase<T> - 将字符串字面量类型转换为小写
type T7 = Lowercase<'HELLO'>;  // 'hello'

// Capitalize<T> - 将字符串字面量类型的首字母转换为大写
type T8 = Capitalize<'hello'>;  // 'Hello'

// Uncapitalize<T> - 将字符串字面量类型的首字母转换为小写
type T9 = Uncapitalize<'Hello'>;  // 'hello'
```

### 8.6 实际应用示例

```typescript
// 1. 创建部分更新类型
interface User {
    id: number;
    name: string;
    email: string;
    age: number;
    address: {
        street: string;
        city: string;
        country: string;
    };
}

// 用于更新用户信息的类型，所有字段都是可选的
type UserUpdate = Partial<User>;

// 只允许更新某些字段
type UserProfileUpdate = Pick<User, 'name' | 'email' | 'age'>;

// 2. 创建API响应类型
type ApiSuccess<T> = {
    status: 'success';
    data: T;
    timestamp: number;
};

type ApiError = {
    status: 'error';
    error: string;
    code: number;
};

type ApiResponse<T> = ApiSuccess<T> | ApiError;

// 3. 表单处理
interface FormField<T> {
    value: T;
    error?: string;
    touched: boolean;
    dirty: boolean;
}

type FormFields<T> = {
    [K in keyof T]: FormField<T[K]>;
};

// 使用示例
interface LoginForm {
    username: string;
    password: string;
    rememberMe: boolean;
}

type LoginFormState = FormFields<LoginForm>;
// 等价于：
// {
//    username: FormField<string>;
//    password: FormField<string>;
//    rememberMe: FormField<boolean>;
// }

// 4. 类型安全的事件处理
type EventMap = {
    click: MouseEvent;
    keypress: KeyboardEvent;
    submit: SubmitEvent;
};

type EventHandler<K extends keyof EventMap> = (event: EventMap[K]) => void;

// 使用示例
const handleClick: EventHandler<'click'> = (event) => {
    // event 被正确推断为 MouseEvent
    console.log(event.clientX, event.clientY);
};
```

这些工具类型可以帮助我们编写更加类型安全和可维护的代码。通过组合使用这些工具类型，我们可以构建复杂的类型系统，满足各种业务场景的需求。

## 9. 最佳实践

1. **始终使用严格模式**
   ```json
   {
     "compilerOptions": {
       "strict": true
     }
   }
   ```

2. **合理使用类型注解**
   - 大多数情况下可以依赖类型推断
   - 对函数参数和返回值使用明确的类型注解
   - 使用接口定义对象结构

3. **使用ESLint和Prettier**
   ```bash
   npm install --save-dev eslint @typescript-eslint/parser @typescript-eslint/eslint-plugin prettier
   ```

4. **组织项目结构**
   ```
   src/
   ├── components/
   ├── types/
   ├── utils/
   ├── services/
   └── index.ts
   ```

## 10. 总结

TypeScript作为JavaScript的超集，通过其强大的类型系统和面向对象特性，能够帮助我们构建更加健壮的应用程序。在Vue和React等现代前端框架中，TypeScript的集成也变得越来越简单和自然。通过合理的配置和最佳实践的遵循，我们可以充分发挥TypeScript的优势，提高开发效率和代码质量。

## 11. 参考资源

- [TypeScript官方文档](https://www.typescriptlang.org/docs/)
- [Vue + TypeScript](https://vuejs.org/guide/typescript/overview.html)
- [React + TypeScript](https://create-react-app.dev/docs/adding-typescript/)

```
