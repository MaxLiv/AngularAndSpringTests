package test.response;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.datatype.jsr310.deser.LocalDateTimeDeserializer;

import java.util.Date;
import java.util.List;

public class DateTestResponse {

    private List<InnerClass> list;

    public List<InnerClass> getList() {
        return list;
    }

    public void setList(List<InnerClass> list) {
        this.list = list;
    }

    public static class InnerClass{
        private boolean isSame;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
        private Date date1;
        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss.SSS")
        private Date date2;

        public boolean isSame() {
            return isSame;
        }

        public void setSame(boolean same) {
            isSame = same;
        }

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
