package test;

import com.fasterxml.jackson.annotation.JsonProperty;
import test.response.client.Res;

public class Request {
    private String outMessageRef;
    private String outSource;
    private Res res;

    public Res getRes() {
        return res;
    }

    public void setRes(Res res) {
        this.res = res;
    }

    public String getOutMessageRef() {
        return outMessageRef;
    }

    public void setOutMessageRef(String outMessageRef) {
        this.outMessageRef = outMessageRef;
    }

    public String getOutSource() {
        return outSource;
    }

    public void setOutSource(String outSource) {
        this.outSource = outSource;
    }

    @Override
    public String toString() {
        return "Request{" +
                "outMessageRef='" + outMessageRef + '\'' +
                ", outSource='" + outSource + '\'' +
                ", res=" + res +
                '}';
    }
}
