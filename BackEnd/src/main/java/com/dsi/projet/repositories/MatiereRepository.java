package com.dsi.projet.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.dsi.projet.entities.Matiere;

import jakarta.transaction.Transactional;

public interface MatiereRepository extends JpaRepository<Matiere, Integer>{

	@Modifying
@Transactional
@Query(value = "INSERT INTO classe_matiere (classe_id,matiere_id) VALUES (:classeId,:matiereId)", nativeQuery = true)
void addMatiereToClasse(@Param("matiereId") int matiereId, @Param("classeId") int classeId);

	Optional<Matiere> findById(Integer id);
}
