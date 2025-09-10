package com.example.demo;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
@RestController
public class HelloController {
    @GetMapping("/")
    public String hello() {
        return "Hello World! Spring Boot funcionando con Java 8!";
    }
    @GetMapping("/status")
    public String status() {
        return "Estado: OK - Aplicación ejecutándose correctamente";
    }
}
