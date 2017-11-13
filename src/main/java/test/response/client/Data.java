package test.response.client;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Map;

public class Data implements Serializable {
    private Res res;
//
//    public Data() {
//    }
    @JsonCreator
    public Data(@JsonProperty("res") Res res) {
        this.res = res;
    }



    public Res getRes() {
        return res;
    }

    public void setRes(Res res) {
        this.res = res;
    }

    @Override
    public String toString() {
        return "Data{" +
                "res=" + res +
                '}';
    }
}