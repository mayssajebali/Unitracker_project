package com.dsi.projet.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {
	@Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
        .cors()
        .and()
        .csrf().disable()
            .authorizeRequests()
                .requestMatchers("/login").permitAll() // Permet l'accès sans authentification
                .requestMatchers("/tasksByProf").hasAuthority("prof") // Seulement les professeurs peuvent accéder
                .requestMatchers("/createTaskByProf").hasAuthority("prof") 
                .requestMatchers("/task/assign").hasAuthority("prof")
                .requestMatchers("/tasksByEtudiant").hasAuthority("etudiant") // Seulement les étudiants peuvent accéder
                .requestMatchers("/createTaskByEtdudiant").hasAuthority("etudiant")
                .requestMatchers("/addSubTask").hasAuthority("etudiant")
                .requestMatchers("/realisation/mark").hasAuthority("etudiant")
                .requestMatchers("/realisation/mark/subTask").hasAuthority("etudiant") 
                .requestMatchers("/realisation/difficulty").hasAuthority("etudiant") 
                .requestMatchers("/createGroupe").hasAuthority("etudiant")
                .requestMatchers("/rappels/{id}").hasAuthority("etudiant")
                .requestMatchers("/profs").hasAuthority("admin")                
                .anyRequest().authenticated() // Toutes les autres requêtes nécessitent une authentification
            .and()
            .addFilterBefore(new JwtTokenFilter(), UsernamePasswordAuthenticationFilter.class);
        // Ajout du filtre JWT
        return http.build();
    }

   
}
