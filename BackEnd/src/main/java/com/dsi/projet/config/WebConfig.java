package com.dsi.projet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
@EnableWebSecurity
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/")  // Appliquer la règle sur toutes les routes
                .allowedOrigins("http://localhost:4200")  // Autoriser les requêtes de l'URL du frontend
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Autoriser les méthodes HTTP spécifiques
                .allowedHeaders("Authorization", "Content-Type")  // Autoriser les en-têtes spécifiques
                .allowCredentials(true);  // Permettre l'envoi des cookies (si nécessaire)
    }
}