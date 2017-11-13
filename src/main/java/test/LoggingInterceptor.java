package test;

import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.nio.charset.Charset;
import java.util.*;

public class LoggingInterceptor extends HandlerInterceptorAdapter {

    private static final Logger log = LoggerFactory.getLogger(LoggingInterceptor.class);

    static final String COLON_SPACE = ": ";
    static final String REQUEST = "Request" + COLON_SPACE;
    static final String RESPONSE = "Response" + COLON_SPACE;
    static final String PAYLOAD = "Payload" + COLON_SPACE;
    static final String HEADERS = "Headers" + COLON_SPACE;
    static final String REQUEST_ID = "request-id";
    static final String URI = " , URI" + COLON_SPACE;
    static final String IP = " , IP" + COLON_SPACE;
    static final String STATUS = " , Status" + COLON_SPACE;

    static final String X_FORWARDED_FOR = "X-FORWARDED-FOR";

    static final List<String> excludedServices = new ArrayList<String>(
            Arrays.asList(new String[]{"/sync/payment/receipt","/sync/payment/receipt/pdf"}));

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        if (isLogRequest(request)) {
            StringBuilder res = createStringBuilder();
            printRequest(res, request);
            logRequest(res.toString());
        }
        return true;
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
        if (isLogResponse(request, response)) {
            StringBuilder res = createStringBuilder();
            printResponse(res, request, response);
            logResponse(res.toString());
        }
    }

    protected void logRequest(String msg) {
        log.debug(msg);
    }

    protected boolean isLogRequest(HttpServletRequest httpServletRequest) {
        return log.isDebugEnabled();
    }

    protected void logResponse(String msg) {
        log.debug(msg);
    }

    protected boolean isLogResponse(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        return log.isDebugEnabled();
    }

    protected void printRequest(StringBuilder msg, HttpServletRequest httpServletRequest) {
        printStartRequest(msg, httpServletRequest);
        printRequestHeaders(msg, httpServletRequest);
        if (httpServletRequest instanceof WrapFilter.RequestWrapper) {
            printPayload(msg, ((WrapFilter.RequestWrapper) httpServletRequest).getPayload());
        }
        printEndRequest(msg, httpServletRequest);
    }


    protected void printResponse(StringBuilder msg, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        printStartResponse(msg, httpServletRequest, httpServletResponse);
        printResponseHeaders(msg, httpServletResponse);
        if (httpServletResponse instanceof WrapFilter.ResponseWrapper) {
            String pathInfo = httpServletRequest.getServletPath();
            if (!excludedServices.contains(pathInfo)) {
                printPayload(msg, ((WrapFilter.ResponseWrapper) httpServletResponse).getPayload());
            } else {
                printPayload(msg, new String("*****").getBytes());
            }
        }
        printEndResponse(msg, httpServletRequest, httpServletResponse);
    }

    protected void printEndResponse(StringBuilder msg, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
    }


    protected void printEndRequest(StringBuilder msg, HttpServletRequest httpServletRequest) {
    }


    protected void printStartRequest(StringBuilder msg, HttpServletRequest httpServletRequest) {
        msg.append('\n').append(REQUEST).append(getRequestId(httpServletRequest)).
                append(IP).append(getAddressFromRequest(httpServletRequest)).append(URI).append(httpServletRequest.getRequestURI());
    }

    protected void printStartResponse(StringBuilder msg, HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse) {
        msg.append('\n').append(RESPONSE).append(getRequestId(httpServletRequest)).append(STATUS).append(httpServletResponse.getStatus());
    }

    protected void printRequestHeaders(StringBuilder sb, HttpServletRequest httpServletRequest) {
        Enumeration<String> headerNames = httpServletRequest.getHeaderNames();
        sb.append('\n').append(HEADERS);
        while (headerNames.hasMoreElements()) {
            String name = headerNames.nextElement();
            printHeader(sb, name, httpServletRequest.getHeader(name));
        }
    }

    protected void printResponseHeaders(StringBuilder sb, HttpServletResponse httpServletResponse) {
        sb.append('\n').append(HEADERS);
        for (String name : httpServletResponse.getHeaderNames()) {
            printHeader(sb, name, httpServletResponse.getHeader(name));
        }
    }

    protected void printHeader(StringBuilder sb, String name, String value) {
        sb.append("\n\t").append(name).append(COLON_SPACE).append(value);
    }

    protected void printPayload(StringBuilder sb, byte[] payload) {
        if (payload.length > 0) {
            sb.append('\n').
                    append(PAYLOAD).append('\n').
                    append(new String(payload, Charset.defaultCharset())).append('\n');
        }
    }


    protected String getRequestId(HttpServletRequest httpServletRequest) {
        String requestId;
        if ((requestId = (String) httpServletRequest.getAttribute(REQUEST_ID)) == null) {
            requestId = UUID.randomUUID().toString();
            httpServletRequest.setAttribute(REQUEST_ID, requestId);
        }
        return requestId;
    }

    //for test
    protected StringBuilder createStringBuilder() {
        return new StringBuilder();
    }

    protected String getAddressFromRequest(HttpServletRequest request) {
        String forwardedFor = request.getHeader(X_FORWARDED_FOR);
        if (StringUtils.isBlank(forwardedFor)) {
            forwardedFor = request.getHeader(X_FORWARDED_FOR.toLowerCase());
        }
        return StringUtils.isBlank(forwardedFor) ? request.getRemoteAddr() : forwardedFor;
    }

}
