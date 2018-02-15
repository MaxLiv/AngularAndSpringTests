package conveyer;

import java.util.ArrayList;
import java.util.List;

import static conveyer.Const.MOBILEMASK;

public class CheckSing {

    String[] mts = {"домашний интернет киевстар", "интернет киевстар", "домашний киевстар", "киевстар"};
    String[] ks = {"домашний интернет мтс", "интернет мтс", "домашний мтс", "мтс"};
    String[] home = {"домашний интернет", "интернет", "домашний"};

//    public static void main(String[] args) {
//        GetSingRequest request = new GetSingRequest(null,"+380634456062", "mp", OutSourceProperty.CUREX.getName(),
//                "1", "", "id", false);
//
//        new CheckSing().checkSing(request);
//    }

    public void checkSing(GetSingRequest request) {
        List<String> sing = checkSearchOption(request.getSearchOption());
        sing = checkSing(request.getUrl(), sing);
        sing.forEach(System.out::println);
    }

    private List<String> checkSing(String url, List<String> sing) {
        switch (url) {
            case "curex":
            case "mp":
            case "fp":{
                if (sing.contains("moby_pay") || sing.contains("card_pay")){
                    sing.remove(0);
                    sing.add(0, "by_hand");
                }else if (sing.contains("net_ks") || sing.contains("net mts") || sing.contains("net_ks_mts"))
                    sing.remove(1);
            }
        }
        return sing;
    }

    private List<String> checkSearchOption(String search_option) {
        List<String> sing = new ArrayList<>();
        if (checkMobile(search_option))
            sing.add("moby_pay");
        else if (moonAlgorithm(search_option)) {
            sing.add("card_pay");
        } else if (checkArray(search_option, mts)) {
            sing.add("biplan");
            sing.add("net_mts");
        } else if (checkArray(search_option, ks)) {
            sing.add("biplane");
            sing.add("net_ks");
        } else if (checkArray(search_option, home)) {
            sing.add("biplan");
            sing.add("net_ks_mts");
        } else if (search_option.matches("-?263[0,5]\\d*"))
            sing.add("deposit");
        else if (search_option.matches("-?2909\\d*")) {
            sing.add("credit");
            sing.add("biplan");
        } else if (search_option.matches("-?1500\\d*"))
            sing.add("error");
        else if (search_option.matches("-?29244825509100"))
            sing.add("credit_error");
        else
            sing.add("biplan");
        return sing;
    }

    private boolean checkArray(String search_option, String[] array) {
        for (int i = 0; i < array.length; i++) {
            if (array[i].toLowerCase().equals(search_option)) return true;
        }
        return false;
    }

    private boolean checkMobile(String fullNumber) {
        String number;
        if (fullNumber.matches("-?\\+380\\d*") && fullNumber.length() == 13)
            number = fullNumber.substring(3);
        else if (fullNumber.matches("-?380\\d*") && fullNumber.length() == 12)
            number = fullNumber.substring(2);
        else if (fullNumber.matches("-?80\\d*") && fullNumber.length() == 11)
            number = fullNumber.substring(1);
        else if (fullNumber.length() == 10)
            number = fullNumber;
        else
            return false;
        for (String mask : MOBILEMASK) {
            if (number.matches(mask)) return true;
        }
        return false;
    }

    private boolean moonAlgorithm(String number) {
        if (number.length() >= 12 && number.length() <= 16 && number.matches("-?[4-7][\\d\\s]*")) {
            //алгоритм Луна
            return true;
        } else
            return false;
    }


}
