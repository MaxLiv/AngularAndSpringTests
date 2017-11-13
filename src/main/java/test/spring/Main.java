package test.spring;

import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Main {


    public static void main(String[] args) {
        new Main().run();
    }

    private void run() {
        AnnotationConfigApplicationContext context = new AnnotationConfigApplicationContext(Config.class);

//        This is the Spring example from the git tutorial.
//        (changed in original)


        Controller controller1 = context.getBean(Controller.class);

        controller1.printLog("test");

    }
}
