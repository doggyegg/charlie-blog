package docs.back.framework.java;

public class test {

    // ========================
    // 1. public vs private
    // ========================

    // public: 任何地方都能调用（类似 JS 的 export function）
    public static void sayHello() {
        System.out.println("Hello! 我是 public 方法，谁都能调用我");
    }

    // private: 只有本类内部能调用（类似 JS 闭包里的私有函数）
    private static void secret() {
        System.out.println("我是 private 方法，只有 test 类内部能调用我");
    }

    // ========================
    // 2. static vs 非 static
    // ========================

    // static: 属于类本身，直接 test.staticMethod() 调用
    // 类似 JS 的 Math.max()，不需要 new Math()
    public static void staticMethod() {
        System.out.println("我是 static 方法，通过 test.staticMethod() 调用");
    }

    // 非 static: 属于实例，必须先 new 才能调用
    // 类似 JS 的 arr.push()，必须先有一个数组实例
    public void instanceMethod() {
        System.out.println("我是非 static 方法，必须 new test() 之后才能调用");
    }

    // ========================
    // 3. 返回值类型：void / int / String / boolean
    // ========================

    // void: 不返回值（JS 里就是没有 return 的函数）
    public static void printMessage() {
        System.out.println("我不返回任何东西");
        // 没有 return
    }

    // int: 返回整数（JS 里 return 42）
    public static int add(int a, int b) {
        return a + b;
    }

    // String: 返回字符串（JS 里 return "hello"）
    public static String greet(String name) {
        return "你好, " + name + "!";
    }

    // boolean: 返回布尔值（JS 里 return true/false）
    public static boolean isAdult(int age) {
        return age >= 18;
    }

    // ========================
    // main 入口：演示所有方法
    // ========================
    public static void main(String[] args) {

        // --- 1. public vs private ---
        sayHello(); // ✅ public，可以调用
        secret(); // ✅ 在本类内部，所以 private 也能调用
        // 但如果在其他类里写 test.secret()，就会报错 ❌

        // --- 2. static vs 非 static ---
        staticMethod(); // ✅ static 方法，直接调用

        // instanceMethod(); // ❌ 报错！非 static 方法不能在 static 上下文中直接调用

        test obj = new test(); // 先 new 一个实例（类似 JS: const obj = new test()）
        obj.instanceMethod(); // ✅ 通过实例调用

        // --- 3. 不同返回值类型 ---
        printMessage(); // void，不返回值

        int sum = add(10, 20); // int，返回 30
        System.out.println("10 + 20 = " + sum);

        String greeting = greet("前端同学"); // String，返回字符串
        System.out.println(greeting);

        boolean adult = isAdult(25); // boolean，返回 true
        System.out.println("25岁是否成年: " + adult);
    }

}
