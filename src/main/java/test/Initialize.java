package test;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.servlet.support.AbstractAnnotationConfigDispatcherServletInitializer;

import javax.servlet.Filter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;

public class Initialize extends AbstractAnnotationConfigDispatcherServletInitializer {

    public static final String ROOT = "/";


    @Override
    public void onStartup(ServletContext servletContext) throws ServletException {
//        servletContext.addListener(new ApiContextListener());
        Logger logger = LoggerFactory.getLogger("");
        logger.info("Server start");
        super.onStartup(servletContext);
    }

    protected Class<?>[] getRootConfigClasses() {
        return new Class[0];
    }

    protected Class<?>[] getServletConfigClasses() {
        return new Class[]{TestConfiguration.class};
    }

    protected String[] getServletMappings() {
        return new String[]{ROOT};
    }

    @Override
    protected Filter[] getServletFilters() {
        return new Filter[0];
    }

}
