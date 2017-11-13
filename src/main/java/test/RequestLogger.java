package test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class RequestLogger {
    public void logRequest(String ref, String taskId){
        Logger logger = LoggerFactory.getLogger(Request.class);
        logger.info("outMessageRef = " + ref);
        logger.info("taskId = " + taskId);

    }
}
