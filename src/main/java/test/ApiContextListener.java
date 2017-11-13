package test;

import org.slf4j.ILoggerFactory;
import org.slf4j.LoggerFactory;

import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;

public class ApiContextListener implements ServletContextListener {


    public void contextInitialized(ServletContextEvent sce) {
    }


    public void contextDestroyed(ServletContextEvent sce) {
//        ILoggerFactory iLoggerFactory = LoggerFactory.getILoggerFactory();
//        if (iLoggerFactory instanceof LoggerContext) {
//            LoggerContext loggerContext = (LoggerContext) iLoggerFactory;
//            loggerContext.stop();
//        }
    }
}