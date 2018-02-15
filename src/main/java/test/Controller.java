package test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import test.requests.DateTestRequest;
import test.response.DateTestResponse;
import test.response.client.ClientInfoResponse;
import test.response.Responce;
import test.service.RealExchangeRateCalculator;


import javax.validation.Valid;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import static org.springframework.http.MediaType.APPLICATION_JSON_UTF8_VALUE;
import static test.Constants.SEND;
import static test.Constants.CATCH;

@RestController
@RequestMapping(consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
public class Controller {

    private ClientInfoResponse request;
    Logger logger = LoggerFactory.getLogger(Controller.class);


    @RequestMapping(value = {CATCH})
    public void catchRequest(@Valid @RequestBody ClientInfoResponse request) {
        logger.info("Catch request");
        logger.info(request.toString());
        this.request = request;


//        RequestLogger logger = new RequestLogger();
//        logger.logRequest(request.toString(),request.getOutSource());
    }

    @RequestMapping(value = {SEND})
    public ClientInfoResponse sendRequest() {
        logger.info("Send response body");
        return request;
    }

    @RequestMapping(value = "/test/date")
    public DateTestResponse checkFate(@RequestBody DateTestRequest request) {
        DateTestResponse response = new DateTestResponse();


        List<DateTestRequest.InnerClass> requestList = request.getList();
        List<DateTestResponse.InnerClass> responseList = new ArrayList<>();

        for (DateTestRequest.InnerClass innerClass : requestList) {
            Date date1 = innerClass.getDate1();
            Date date2 = innerClass.getDate2();

            DateTestResponse.InnerClass innerClass1 = new DateTestResponse.InnerClass();

            innerClass1.setDate1(date1);
            innerClass1.setDate2(date2);

            logger.debug("Date1: {}", date1.toString());
            logger.debug("Date2: {}", date2.toString());

            innerClass1.setSame(date1.before(date2));

            responseList.add(innerClass1);
        }

        response.setList(responseList);


        return response;
    }


    @RequestMapping(method = RequestMethod.POST, value = "/retry", consumes = APPLICATION_JSON_UTF8_VALUE, produces = APPLICATION_JSON_UTF8_VALUE)
    public Responce getChange(@RequestBody Responce response) {
        RealExchangeRateCalculator realExchangeRateCalculator = new RealExchangeRateCalculator();
        return new Responce(String.valueOf(realExchangeRateCalculator.getCurrentRate(response.getStatus())));
    }

}
