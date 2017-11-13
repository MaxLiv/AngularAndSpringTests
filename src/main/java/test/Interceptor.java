package test;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;
import test.response.client.ClientInfoResponse;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;

public class Interceptor extends HandlerInterceptorAdapter {

    String path = "/home/developer/IdeaProjects/test/src/main/resources/test.json";
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        Logger logger = LoggerFactory.getLogger(Interceptor.class);
        if (request instanceof WrapFilter.RequestWrapper) {
            String payload = printPayload(((WrapFilter.RequestWrapper) request).getPayload());
            logger.info("Interceptor");
            logger.info(payload);
//            logger.info(((WrapFilter.RequestWrapper) request).getPayload());
            ObjectMapper mapper = new ObjectMapper();
            ClientInfoResponse clientInfoResponse = mapper.readValue(payload, ClientInfoResponse.class);
            logger.info(clientInfoResponse.toString());

//            mapper.writeValue(new File(path),clientInfoResponse);
        }

        return super.preHandle(request, response, handler);
    }

    protected String printPayload( byte[] payload) {
        StringBuilder sb = new StringBuilder("");
        if (payload.length > 0) {
            sb.append('\n').
                    append("request: ").append('\n').
                    append(new String(payload, Charset.defaultCharset())).append('\n');
        }
        return sb.toString();
    }



    }
