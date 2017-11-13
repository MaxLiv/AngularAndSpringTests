package test.spring;

public class LoggerTest2 implements LoggerInterface{

    private String logger;


    public String getLogger() {
        return logger;
    }

    public void setLogger(String logger) {
        this.logger = logger;
    }

    public void init(){
        System.out.println("Bean is going through init.");
    }
    public void destroy() {
        System.out.println("Bean will destroy now.");
    }

    @Override
    public void printLog(String msg) {
        System.out.println("Print log2: " + msg);
    }
}
