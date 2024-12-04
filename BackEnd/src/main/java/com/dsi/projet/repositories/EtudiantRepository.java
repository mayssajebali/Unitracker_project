package com.dsi.projet.repositories;



import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.dsi.projet.entities.Etudiant;

public interface EtudiantRepository extends JpaRepository<Etudiant, Integer> {
	
//	Optional<Etudiant> findByCin_Etd(String cin_Etd);
	   @Query("SELECT e FROM Etudiant e WHERE e.classe.id_Classe = :classeId")
	    List<Etudiant> findEtudiantsByClasseId(int classeId);
	   
	   @Query("SELECT e FROM Etudiant e WHERE e.email_Etd = :email") 
	   Optional<Etudiant> findByEmail(String email);


}
