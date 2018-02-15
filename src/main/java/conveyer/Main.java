package conveyer;

import java.math.BigDecimal;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.Date;

public class Main {

    CheckSing checkSing = new CheckSing();

    public static void main(String[] args) {
        new Main().config("getSing");
    }

    private void config(String keyWord){
        SimpleDateFormat format = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss.SSS");
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("y-M-d H:m:s:A");
        String s1 = "2017-12-17 11:38:32.260";
        String s2 = "2017-12-17 11:38:32.260";

//        LocalDateTime date = LocalDateTime.parse(s1, formatter);

        try {
            Date date1 = format.parse(s1);
            Date date2 = format.parse(s2);
            System.out.println(date1);
            System.out.println(date1.before(date2));
        } catch (ParseException e) {
            e.printStackTrace();
        }

//        BigDecimal nodeOrder = new BigDecimal(4);
//        BigDecimal x = new BigDecimal(2);
//
//        System.out.println(x.equals(nodeOrder));
//        System.out.println("Дикий".toLowerCase().contains("дик".toLowerCase()));
//
//        String option = "  |!^~*&-дик&ий-сад-интернет-()\"  ";
//
//        System.out.println(option.replaceAll("[+\\\\&|!()^\"~*?:]", "")
//                .replaceAll("-", " ")
//                .trim()
//                .replaceAll("\\s", " AND "));
//
//        if (keyWord.equalsIgnoreCase("getSing")){
//            GetSingRequest request = new GetSingRequest(null,"+380634456062", "mp", OutSourceProperty.CUREX.getName(),
//                    "1", "", "id", false);
//            checkSing.checkSing(request);
//
//        }



    }

}
