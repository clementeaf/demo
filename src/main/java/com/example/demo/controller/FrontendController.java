package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.servlet.http.HttpServletRequest;

@Controller
public class FrontendController {

    // Handle SPA routing - forward all non-API requests to index.html
    @RequestMapping(value = {
            "/",
            "/backoffice",
            "/backoffice/**",
            "/admin",
            "/admin/**",
            "/dashboard",
            "/dashboard/**",
            "/users",
            "/users/**",
            "/login",
            "/profile"
    })
    public String forward(HttpServletRequest request) {
        // Check if the request is for an API endpoint
        String path = request.getRequestURI();
        
        if (path.startsWith("/api/")) {
            // Let API controllers handle API requests
            return null;
        }
        
        // Forward all other requests to index.html for SPA routing
        return "forward:/index.html";
    }

    // Serve the main application
    @RequestMapping("/app")
    public String app() {
        return "forward:/index.html";
    }
}