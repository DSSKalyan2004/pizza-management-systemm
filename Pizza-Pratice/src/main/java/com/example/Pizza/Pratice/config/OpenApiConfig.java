package com.example.Pizza.Pratice.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class OpenApiConfig {

    @Bean
    public OpenAPI pizzaApi() {

        return new OpenAPI()

                .info(new Info()

                        .title("Pizza Ordering System API")

                        .version("1.0")

                        .description("Spring Boot REST API for Pizza Ordering System")

                        .contact(new Contact()

                                .name("Shiva Sai Kalyan")

                                .email("your-email@example.com"))

                        .license(new License()

                                .name("MIT License")));

    }

}