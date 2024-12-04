package com.dsi.projet.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dsi.projet.entities.Classe;
import com.dsi.projet.entities.Professeur;

public interface ProfRepository extends JpaRepository<Professeur, Integer> {
	 @Query("SELECT DISTINCT c FROM Classe c JOIN c.matieres m JOIN m.professeurs p WHERE p.id_Professeur = :idProf")
	    List<Classe> findClassesByProfId(@Param("idProf") int idProf);
	 @Query("SELECT p FROM Professeur p WHERE p.email_Prof = :email") 
		Optional<Professeur> findByEmail_Prof(String email);
}
