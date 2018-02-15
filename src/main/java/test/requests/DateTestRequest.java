package test.requests;

import com.fasterxml.jackson.annotation.JsonFormat;
import test.response.DateTestResponse;

import java.util.Date;
import java.util.List;

public class DateTestRequest {

    private List<InnerClass> list;

    public List<InnerClass> getList() {
        return list;
    }

    public void setList(List<InnerClass> list) {
        this.list = list;
    }

    public static class InnerClass {

        @JsonFormat( pattern = "yyyy-MM-dd HH:mm:ss.SSS")
        private Date date1;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
        private Date date2;

        public Date getDate1() {
            return date1;
        }

        public void setDate1(Date date1) {
            this.date1 = date1;
        }

        public Date getDate2() {
            return date2;
        }

        public void setDate2(Date date2) {
            this.date2 = date2;
        }
    }
}
