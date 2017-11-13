package test.response.client;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonProperty;

import java.io.Serializable;
import java.util.Map;

/**
 * Created by oleh_dovbnya on 11.08.17.
 */

public class ClientInfoResponse implements Serializable {

    private Data data;
//
//    public ClientInfoResponse() {
//    }
    @JsonCreator
    public ClientInfoResponse(@JsonProperty("res") Res res) {
        this.data = new Data(res);
    }



    public Data getData() {
        return data;
    }

    public void setData(Data data) {
        this.data = data;
    }


    @Override
    public String toString() {
        return "ClientInfoResponse{" +
                "data=" + data +
                '}';
    }
}