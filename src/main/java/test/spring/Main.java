package test.spring;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {


    public static void main(String[] args) {
        new Main().run();
    }

    private void run() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(Config.class);

        Controller controller1 = (Controller) context.getBean("controller");

        controller1.printLog(" test");

    }
}
