package test.json;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import test.Request;
import test.response.client.ClientInfoResponse;
import test.response.client.Data;
import test.response.client.Res;

import java.io.File;
import java.io.IOException;

public class JSONTest {

    public static void main(String[] args) {
        String path = "/home/developer/IdeaProjects/test/src/main/resources/test.json";


        ObjectMapper mapper = new ObjectMapper();
        try {

//            Res res = new Res("client");
//            ClientInfoResponse response = new ClientInfoResponse(res);
//            mapper.writeValue(new File(path),response);
            ClientInfoResponse response = mapper.readValue(new File(path), ClientInfoResponse.class);

            System.out.println(response.toString());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
