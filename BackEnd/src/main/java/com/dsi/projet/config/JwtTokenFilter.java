package com.dsi.projet.config;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.SignatureException;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;
import java.io.IOException;
import java.util.Base64;
import java.util.List;

public class JwtTokenFilter extends OncePerRequestFilter {

	
	private static final String jwtSecret = Base64.getEncoder().encodeToString("s3cr3tK3yV3ryL0ngAndC0mpl3x".getBytes());


    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String token = request.getHeader("Authorization");

        if (token != null && token.startsWith("Bearer ")) {
            token = token.substring(7); // Retirer "Bearer "

            try {
                // Parser le JWT et récupérer les claims
                Claims claims = Jwts.parser()
                        .setSigningKey(jwtSecret) // Utiliser la même clé secrète pour la vérification
                        .parseClaimsJws(token)
                        .getBody();
             // Extraire le rôle depuis le JWT
                String role = claims.get("role", String.class); // Le rôle est stocké dans les claims
                // Ajouter l'authentification dans le contexte de sécurité
                UsernamePasswordAuthenticationToken authentication = 
                	    new UsernamePasswordAuthenticationToken(claims.getSubject(), null, List.of(new SimpleGrantedAuthority(role)));
                	SecurityContextHolder.getContext().setAuthentication(authentication);

                	
                	System.out.println("Extracted Role: " + role);
            } catch (SignatureException e) {
                // Gérer l'erreur de signature ici
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT signature");
            
                return;
            } catch (Exception e) {
                // Gérer d'autres exceptions (comme l'expiration du token)
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED, "Invalid JWT token");
                System.out.println("JWT Token: " + token);
                return;
            }
        }

        // Continuer la chaîne de filtres pour les autres traitements
        filterChain.doFilter(request, response);
    }
        
    }
    
