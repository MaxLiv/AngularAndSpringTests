package temp;

import com.fasterxml.jackson.core.JsonParser;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.core.ObjectCodec;
import com.fasterxml.jackson.databind.DeserializationContext;
import com.fasterxml.jackson.databind.JsonDeserializer;
import com.fasterxml.jackson.databind.JsonNode;

import java.io.IOException;

public class CrmDeserializer {
//    public static String FLAG;
//
//
//    @Override
//    public CrmRequest deserialize(JsonParser jsonParser, DeserializationContext deserializationContext) throws IOException, JsonProcessingException {
//        ObjectCodec oc = jsonParser.getCodec();
//        JsonNode node = oc.readTree(jsonParser);
//
//        String st = node.get("st").asText();
//        String src = node.get("src").asText();
//        String addr_type;
//        String evt;
//        if (FLAG.equals("phone")) {
//            addr_type = node.get("addr_type_phone").asText();
//            evt = node.get("evt_phone").asText();
//        } else {
//            addr_type = node.get("addr_type_ekb").asText();
//            evt = node.get("evt_ekb").asText();
//        }
//
//
//        return new CrmRequest(evt,st,src,addr_type);
//    }
}
