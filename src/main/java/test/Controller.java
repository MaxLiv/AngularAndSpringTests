package test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import test.response.client.ClientInfoResponse;


import javax.validation.Valid;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static test.Constants.SEND;
import static test.Constants.CATCH;

@RestController
@RequestMapping(method = RequestMethod.POST, consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
public class Controller {

    private ClientInfoResponse request;
    Logger logger = LoggerFactory.getLogger(Controller.class);

    @RequestMapping(value = {CATCH})
    public void catchRequest(@Valid @RequestBody ClientInfoResponse request ){
        logger.info("Catch request");
        logger.info(request.toString());
        this.request = request;


//        RequestLogger logger = new RequestLogger();
//        logger.logRequest(request.toString(),request.getOutSource());
    }

    @RequestMapping(value = {SEND})
    public ClientInfoResponse sendRequest(){
        logger.info("Send response body");
        return request;
    }

}
