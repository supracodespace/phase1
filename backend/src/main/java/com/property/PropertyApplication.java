/* @SpringBootApplication
public class PropertyApplication extends SpringBootServletInitializer {

    @Override
    protected SpringApplicationBuilder configure(SpringApplicationBuilder builder) {
        return builder.sources(PropertyApplication.class);
    }

    public static void main(String[] args) {
        SpringApplication.run(PropertyApplication.class, args);
    }
}
 */



package com.property;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;

@SpringBootApplication
public class PropertyApplication extends SpringBootServletInitializer {

    public static void main(String[] args) {
        SpringApplication.run(PropertyApplication.class, args);
    }

}
