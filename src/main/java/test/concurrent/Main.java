package test.concurrent;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

public class Main {

    private double a = -1, b = 0;
    private int n = 1000;
    private double h = (b - a) / n;


    public static void main(String[] args) {
        Map<String, Object> response = new HashMap<>();
        response.put("hos", "1318USG4G5P8M0");
        Map<String, Object> params = new HashMap();

        params.putAll(response);

        System.out.println(params);

        dateTest();
        new Main().run();
    }

    private static void dateTest() {
        SimpleDateFormat format = new SimpleDateFormat("dd-MM-yyyy HH:mm:ss.SSS");


        String s1 = "20-06-2018 20:10:20.210";
        String s2 = "20-06-2018 20:10:20.200";

        try {
            Date date1 = format.parse(s1);
            Date date2 = format.parse(s2);

            System.out.println(date1.compareTo(date2));
        } catch (ParseException e) {
            e.printStackTrace();
        }

        try {
            String encode = URLEncoder.encode("+del:false +juridical:0+(id2:138809^11 id2:1282596^10 id2:1282848^9 id2:1285928^8 id2:1035841^7 id2:797523^6 id2:2118328^5 id2:374387^4 id2:2058899^3 id2:2884462^2 id2:2950210^1) +(kind_id:17 kind_id:26 kind_id:27 kind_id:28 kind_id:29 kind_id:30 kind_id:31 kind_id:32 kind_id:39 kind_id:40 kind_id:41 kind_id:42 kind_id:49 kind_id:123 kind_id:139 kind_id:147)-parent_cnt:[0 TO *]", StandardCharsets.UTF_8.toString());
            System.out.println(StandardCharsets.UTF_8.toString());
            System.out.println(encode);
        } catch (UnsupportedEncodingException e) {
            e.printStackTrace();
        }
    }

    private void run() {
//        System.out.println("just loop: " + timeLoop());
//        System.out.println("with one thread: " + timeSingleThread());
//        System.out.println("with pool of thread: " + timePoolThread());
        List<String> strings = new ArrayList<>();
        strings.add("string");
        List<Integer> integers = new ArrayList<>();
        integers.add(20);

        System.out.println(getOnlyValue(strings));
        System.out.println(getOnlyValue(integers));

    }

    private <T> T getOnlyValue(List<T> list) {
        return list.get(0);
    }

    private long timeLoop() {
        long start = System.nanoTime();
        test();
        long finish = System.nanoTime();
        return finish - start;
    }

    private long timeSingleThread() {
        long start = System.nanoTime();
        ExecutorService service = Executors.newSingleThreadExecutor();
        Future<Double> future = service.submit(new Calculate(a, b, h));

        while (future.isDone()) {
            System.out.println("wait");
        }

        long finish = System.nanoTime();
        return finish - start;
    }

    private long timePoolThread() {
        long start = System.nanoTime();
        ExecutorService service = Executors.newFixedThreadPool(n);

        Future<Double> future = service.submit(new Calculate(a, b, h));

        while (future.isDone()) {
            System.out.println("wait");
        }
        service.shutdown();

        long finish = System.nanoTime();
        return finish - start;
    }

    private double test() {
        double sum = 0;
        for (double i = a; i < b; i += h) {
            sum += MyFunction.f(i);
        }
        return sum;
    }
}
