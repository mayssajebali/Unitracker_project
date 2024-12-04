package com.dsi.projet.config;


import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.dsi.projet.entities.Professeur;
import com.dsi.projet.repositories.ProfRepository;

@Service
public class CustomUserDetails implements UserDetailsService {

    @Autowired
    private ProfRepository profRepository;
    
    private PasswordEncoder passwordEncoder;

   
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Professeur prof = profRepository.findByEmail_Prof(username)
            .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + username));

        return new User(
            prof.getEmail_Prof(),
            prof.getMot_de_passe_Prof(),
            new ArrayList<>() 
        );
    }

}