package docs.back.framework.java;

public class test1 {

    public static void main(String[] args) {
        func1();
    }

    static void func1() {
        new test1().func2();
    }

    void func2() {
        System.out.println(233);
    }
}