package test.concurrent;

public class MyFunction {
    public static double f(double x){
        return Math.pow(Math.E, x)* Math.sqrt(1-Math.pow(Math.E, x));
    }
}
