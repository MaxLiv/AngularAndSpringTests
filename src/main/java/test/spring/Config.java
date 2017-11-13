package test.spring;

import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Scope;

@Configuration
public class Config {



    @Bean
    public LoggerInterface logger1(){
        return new LoggerTest1();
    }

    @Bean
    public LoggerInterface logger2(){
        return new LoggerTest2();
    }

    @Bean
    public Controller controller(){
        return new Controller(logger1());
    }

}
