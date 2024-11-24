package com.rs.shopdiapi;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication(scanBasePackages = {"com.rs.shopdiapi"})
public class ShopdiApiApplication {

    public static void main(String[] args) {
        SpringApplication.run(ShopdiApiApplication.class, args);
    }

}
