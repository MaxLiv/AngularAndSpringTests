package test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.util.StreamUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.ServletInputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletRequestWrapper;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpServletResponseWrapper;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;

public class WrapFilter extends OncePerRequestFilter {

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        Logger logger = LoggerFactory.getLogger(WrapFilter.class);
        logger.info("URI"+request.getRequestURI());
        filterChain.doFilter(RequestWrapper.wrap(request), ResponseWrapper.wrap(response));
    }

    public static class RequestWrapper extends HttpServletRequestWrapper {
        private byte[] payload;

        private RequestWrapper(HttpServletRequest request, byte[] payload) {
            super(request);
            this.payload = payload;
        }

        public static RequestWrapper wrap(HttpServletRequest request) throws IOException {
                InputStream is = request.getInputStream();
                return new RequestWrapper(request, StreamUtils.copyToByteArray(is));
        }

        @Override
        public ServletInputStream getInputStream() throws IOException {
            return new ProxyInputStream(payload);
        }

        public byte[] getPayload() {
            return payload;
        }

        private static class ProxyInputStream extends ServletInputStream {
            private ByteArrayInputStream payload;

            private ProxyInputStream(byte[] content) throws IOException {
                payload = new ByteArrayInputStream(content);
            }

            @Override
            public int read() throws IOException {
                return payload.read();
            }
        }
    }

    public static class ResponseWrapper extends HttpServletResponseWrapper {
        private ByteArrayOutputStream payload;
        private ServletOutputStream sos;

        private ResponseWrapper(HttpServletResponse response, ServletOutputStream sos) {
            super(response);
            this.payload = new ByteArrayOutputStream();
            this.sos = sos;
        }

        public static ResponseWrapper wrap(HttpServletResponse response) throws IOException {
            return new ResponseWrapper(response, response.getOutputStream());
        }


        public byte[] getPayload() {
            return payload.toByteArray();
        }


        @Override
        public ServletOutputStream getOutputStream() throws IOException {
            return new ProxyOutputStream(payload, sos);
        }

        private static class ProxyOutputStream extends ServletOutputStream {
            private ByteArrayOutputStream payload;
            private ServletOutputStream sos;

            public ProxyOutputStream(ByteArrayOutputStream payload, ServletOutputStream sos) {
                this.payload = payload;
                this.sos = sos;
            }

            @Override
            public void write(int b) throws IOException {
                payload.write(b);
                sos.write(b);
            }

            @Override
            public void flush() throws IOException {
                sos.flush();
            }

            @Override
            public void close() throws IOException {
                sos.close();
            }
        }
    }
}



