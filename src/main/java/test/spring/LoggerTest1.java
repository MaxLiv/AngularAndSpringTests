package test.spring;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class LoggerTest1 implements LoggerInterface{

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
        System.out.println("Print log1: " + msg);
    }
}
