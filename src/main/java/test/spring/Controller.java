package test.spring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;

public class Controller {

    @Qualifier("logger1")
    @Autowired
    private LoggerInterface loggerInterface;

    public Controller(LoggerInterface loggerInterface) {
        this.loggerInterface = loggerInterface;
    }


    public LoggerInterface getLoggerInterface() {
        return loggerInterface;
    }

    public void setLoggerInterface(LoggerInterface loggerInterface) {
        this.loggerInterface = loggerInterface;
    }

    public void printLog(String test) {
        loggerInterface.printLog(test);
    }
}
