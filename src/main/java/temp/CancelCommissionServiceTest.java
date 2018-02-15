//package temp;
//
//import com.pb.biplane.mp.api.configuration.ApiConfiguration;
//import com.pb.biplane.mp.api.configuration.ApiServiceConfiguration;
//import com.pb.biplane.mp.api.containers.request.payment.CancelCommissionRequest;
//import com.pb.biplane.mp.api.containers.response.payment.commission.CancelCommissionResponse;
//import com.pb.biplane.mp.api.controller.PaymentManagementController;
//import com.pb.biplane.mp.api.service.mapper.CancelCommissionConverter;
//import org.junit.Before;
//import org.junit.Test;
//import org.junit.runner.RunWith;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
//import org.springframework.http.HttpHeaders;
//import org.springframework.test.context.ContextConfiguration;
//import org.springframework.test.context.junit4.SpringRunner;
//import org.springframework.test.web.servlet.MockMvc;
//
//import java.math.BigDecimal;
//import java.util.ArrayList;
//import java.util.List;
//
//import static org.junit.Assert.assertNotNull;
//
//@WebMvcTest(value = PaymentManagementController.class, secure = false)
//@RunWith(SpringRunner.class)
//@ContextConfiguration(classes = {ApiConfiguration.class, ApiServiceConfiguration.class})
//public class CancelCommissionServiceTest {
//
//
//    @Autowired
//    private MockMvc mockMvc;
//
//    @Autowired
//    CancelCommissionServiceI service;
//
//    @Autowired
//    private CancelCommissionConverter converter;
//
//    @Autowired
//    private BiplaneService biplaneService;
//
//    private CancelCommissionRequest commissionRequest;
//    private CancelCommissionResponse commissionResponse;
//
//    Logger logger = LoggerFactory.getLogger(CancelCommissionServiceTest.class);
//
//    String json = "{\n" +
//            "\t\"ekb\":\"4547394\",\n" +
//            "\t\"card\":\"1285521\",\n" +
//            "\t\"type\":\"kdv\",\n" +
//            "\t\"outMessageRef\":\"string\",\n" +
//            "\t\"outSource\":\"CUREX\",\n" +
//            "\t\"payments\":[\n" +
//            "\t\t{\n" +
//            "\t\t\t\"biplaneId\":\"890809708.5.1\",\n" +
//            "\t\t\t\"kindId\":26,\n" +
//            "\t\t\t\"sum\":500,\n" +
//            "\t\t\t\"commission\":1.0\n" +
//            "\t\t}]\n" +
//            "}";
//
//    @Before
//    public void setUp() {
////
////        CancelCommissionService cancelCommissionService = new CancelCommissionService();
////        cancelCommissionService.biplaneService = new BiplaneService();
////        cancelCommissionService.converter = new CancelCommissionConverter();
////        cancelCommissionService.httpConnector = new HttpConnector();
////        cancelCommissionService.properties = new ApiConfiguration().appProperties(new PropertiesConfiguration().getPowerStoneManager());
//
////        service = cancelCommissionService;
//        List<CancelCommissionRequest.RequestPayment> requestPayments = new ArrayList<>();
//        requestPayments.add(new CancelCommissionRequest.RequestPayment("890809708.5.1", 26, new BigDecimal(1000), new BigDecimal(1)));
//        requestPayments.add(new CancelCommissionRequest.RequestPayment("890809711.5.1", 27, new BigDecimal(1), new BigDecimal(1)));
//        requestPayments.add(new CancelCommissionRequest.RequestPayment("890809709.5.1", 130, new BigDecimal(1500), new BigDecimal(1)));
//        requestPayments.add(new CancelCommissionRequest.RequestPayment("890809375.5.1", 26, new BigDecimal(100), null));
//        commissionRequest = new CancelCommissionRequest("4547394", "1285521", "kdv", requestPayments);
////        service = new CancelCommissionService();
//        List<CancelCommissionResponse.ResponsePayment> responsePayments = new ArrayList<>();
//        responsePayments.add(new CancelCommissionResponse.ResponsePayment("890809708.5.1", new BigDecimal(500), new BigDecimal(1), true));
//        commissionResponse = new CancelCommissionResponse();
//        commissionResponse.setResponsePayments(responsePayments);
//
//    }
//
//    @Test
//    public void cancelCommissionTest() throws Exception {
//        HttpHeaders headers = new HttpHeaders();
//        headers.add("sid", "171129csd2eo33qig6f0");
//        headers.add(HttpHeaders.CONTENT_TYPE, "application/json");
//
////        DropFeeResponse response = new CancelCommissionService().converter.callDropFee("1", headers, "c");
////        SumByCisResponse response = biplaneService.getSumByCis("1", headers);
//        CancelCommissionResponse response = service.cancelCommission(commissionRequest, headers);
//        assertNotNull(response);
//
////        CancelCommissionResponse response = service.cancelCommission(commissionRequest, headers);
////        assertFalse(response.getResponsePayments().get(0).getCommissionCancel());
////        assertTrue(response.getResponsePayments().get(1).getCommissionCancel());
////        assertFalse(response.getResponsePayments().get(2).getCommissionCancel());
////        assertFalse(response.getResponsePayments().get(3).getCommissionCancel());
//    }
//
////    @Test
////    public void checkEkbTest() throws Exception {
////    }
////
////    @Test
////    public void checkCardTest() throws Exception {
////    }
////
////    @Test
////    public void isPensionerTest() throws Exception {
////    }
////
////    @Test
////    public void getTrafficLightTest() throws Exception {
////
////    }
//
//
//}
//
//
//      SumByCisResponse sumByCis;
//              BigDecimal sumForMonth = new BigDecimal(0);
//              int countForMonth = 0;
//              CancelCommissionResponse response = new CancelCommissionResponse();
//
//              boolean flag = checkUser(request, headers);// признак того, что процесс обнуления можно продолжать
//
//              if (flag){
//              sumByCis = biplaneService.getSumByCis(request.getEkb(), headers);
//              sumForMonth = new BigDecimal(sumByCis.getSum());
//              countForMonth = sumByCis.getCount();
//              flag = checkLimits(commissionConst,sumByCis);
//              }