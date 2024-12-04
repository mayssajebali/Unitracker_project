package com.dsi.projet.services;

import java.util.List;

import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Professeur;

public interface IProfService {
	public List<Professeur> getProfs();
	public Professeur addProf(Professeur p);
	public Professeur getProf(int idProf);
	public List<Matiere> getMatieresByProf(int idProf);
	public boolean deleteProfesseur(int id);
	public Professeur editProfesseur(int id,Professeur p);
	List<Professeur> getProfsByIds(List<Integer> profIds);

}