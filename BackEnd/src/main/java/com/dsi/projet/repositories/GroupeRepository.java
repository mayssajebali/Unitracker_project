package com.dsi.projet.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.dsi.projet.entities.Groupe;

@Repository
public interface GroupeRepository extends JpaRepository<Groupe,Integer> {

}