package com.dsi.projet.services;

import java.util.List;

import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Professeur;

public interface IAdmin {
	public Etudiant addEtudiant(Etudiant e);
	public List<Etudiant> getAll();
	public List<Professeur> getProfs();
	public Professeur addProf(Professeur p);

}
