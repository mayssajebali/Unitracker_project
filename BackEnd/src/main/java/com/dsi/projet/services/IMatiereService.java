package com.dsi.projet.services;


import java.util.List;

import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Professeur;

public interface IMatiereService {
	public List<Matiere> allMatieres();
	public Matiere createMatiere(Matiere m);
	List<Matiere> getMatieresByIds(List<Integer> ids);
	Matiere getMatiereById(int id);
	List<Integer> getProfIdsByIdMatiere(int idMatiere);
	void deleteMatiereById(int idMatiere);
	Matiere updateMatiere(int idMatiere, Matiere matiereDetails);

}
