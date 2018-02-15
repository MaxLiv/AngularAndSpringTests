package test.service;

import com.fasterxml.jackson.databind.JsonNode;
import org.apache.http.HttpResponse;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Recover;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

@Service
public class RealExchangeRateCalculator{

    private static final double BASE_EXCHANGE_RATE = 1.09;
    private int attempts = 0;

    @Retryable(maxAttempts = 10, value = RuntimeException.class, backoff = @Backoff(delay = 10000, multiplier = 2))
    public Double getCurrentRate(String status) {
        switch (status) {
            case "200":
                return 500.0;
            case "503":
                throw new RuntimeException("Server Response: " + status);
            default:
                throw new IllegalStateException("Server not ready");
        }
    }


    @Recover
    public Double recover(RuntimeException e) {
        System.out.println("Recovering - returning safe value");
        return BASE_EXCHANGE_RATE;
    }

}