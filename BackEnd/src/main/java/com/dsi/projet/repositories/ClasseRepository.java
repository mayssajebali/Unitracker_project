package com.dsi.projet.repositories;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.dsi.projet.entities.Classe;
@Repository
public interface ClasseRepository extends JpaRepository<Classe,Integer>{
	
//	     @Query("SELECT c FROM Classe c WHERE c.nom_Classe = :nomClasse")
//	     Optional<Classe> findByNomClasse(@Param("nomClasse") String nomClasse);
	
	@Query("SELECT c FROM Classe c WHERE c.nom_Classe = :nomClasse AND c.annee_Classe = :anneeClasse AND c.num_Classe = :numClasse")
	Optional<Classe> findByNameAndYearAndNumber(@Param("nomClasse") String nomClasse, 
	                                            @Param("anneeClasse") int anneeClasse, 
	                                            @Param("numClasse") int numero);

	 
	     @Query("SELECT c.id FROM Classe c JOIN c.matieres m WHERE m.id_Matiere = :matiereId")
	     List<Integer> findClassesIdByMatiereId(@Param("matiereId") Integer matiereId);
	 }


