package com.dsi.projet.controllers;
import java.util.Base64;
import java.util.Date;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import org.springframework.security.core.GrantedAuthority;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.projet.entities.Admin;
import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Professeur;
import com.dsi.projet.repositories.EtudiantRepository;
import com.dsi.projet.repositories.ProfRepository;

import ch.qos.logback.core.model.Model;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class Authcontroller {

    private final String jwtSecret = Base64.getEncoder().encodeToString("s3cr3tK3yV3ryL0ngAndC0mpl3x".getBytes());

    @Autowired
    private EtudiantRepository etudiantRepository;

    @Autowired
    private ProfRepository professeurRepository;

    
  

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody AuthRequest loginRequest) {
        String email = loginRequest.getEmail();
        String password = loginRequest.getPassword();

        // Recherche d'abord un étudiant avec cet email
        Optional<Etudiant> etudiant = etudiantRepository.findByEmail(email);
        if (etudiant.isPresent() && password.equals(etudiant.get().getMot_de_passe_Etd())) {
            String token = generateTokenEtudiant(etudiant.get().getEmail_Etd(),etudiant.get());
            return ResponseEntity.ok(new AuthResponse(token));
        }

        // Recherche ensuite un professeur avec cet email
        Optional<Professeur> professeur = professeurRepository.findByEmail_Prof(email);
        if (professeur.isPresent() && password.equals(professeur.get().getMot_de_passe_Prof())) {
            String token = generateToken(professeur.get().getEmail_Prof(),professeur.get());
            return ResponseEntity.ok(new AuthResponse(token));
        }
        Admin admin = new Admin("admin","admin123","admin");
        if(password.equals("admin123")){
        	String token = generateTokenAdmin("admin",admin);
            return ResponseEntity.ok(new AuthResponse(token));
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Unauthorized");
    }

    // Génération du token JWT
    private String generateToken(String email,Professeur professeur) {
    	String role = professeur.getRole();  // Prendre le premier rôle
    	String userId =String.valueOf(professeur.getId_Professeur());
    	System.out.println("Role in JWT: " + role);
        return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .claim("id",userId)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 heure de validité
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }
    private String generateTokenEtudiant(String email,Etudiant etd) {
    	String role = etd.getRole();  // Prendre le premier rôle
    	String userId =String.valueOf(etd.getId_Etudiant());
    	System.out.println("Role in JWT: " + role);
        return Jwts.builder()
            .setSubject(email)
            .claim("role", role)
            .claim("id",userId)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 heure de validité
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }
    private String generateTokenAdmin(String username,Admin admin) {
    	String role = admin.getRole();  // Prendre le premier rôle
    	System.out.println("Role in JWT: " + role);
        return Jwts.builder()
            .setSubject(username)
            .claim("role", role)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60)) // 1 heure de validité
            .signWith(SignatureAlgorithm.HS512, jwtSecret)
            .compact();
    }
    // Classe de réponse contenant le token JWT
    public static class AuthResponse {
        private String token;

        public AuthResponse(String token) {
            this.token = token;
        }

        public String getToken() {
            return token;
        }
    }

    // Classe représentant la requête de login
    public static class AuthRequest {
        private String email;
        private String password;

        public String getEmail() {
            return email;
        }

        public void setEmail(String email) {
            this.email = email;
        }

        public String getPassword() {
            return password;
        }

        public void setPassword(String password) {
            this.password = password;
        }
    }
}