package test.concurrent;

import java.util.concurrent.Callable;

public class Calculate implements Callable<Double>{

    private double a,b, h;


    public Calculate(double a, double b, double h) {
        this.a = a;
        this.b = b;
        this.h = h;
    }

    @Override
    public Double call() throws Exception {
        double sum = 0;
        for (double i = a; i < b; i+=h) {
            sum+=MyFunction.f(i);
        }
        return sum;
    }
}
