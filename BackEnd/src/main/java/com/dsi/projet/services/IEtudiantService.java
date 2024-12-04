package com.dsi.projet.services;

import java.util.List;

import com.dsi.projet.entities.Etudiant;

public interface IEtudiantService {
	public Etudiant addEtudiant(Etudiant e);
	public List<Etudiant> getAll();
	
	public Etudiant editEtudiant(Etudiant e,int id);
	public boolean deleteEtudiant(int id);
	public Etudiant getEtudiantById(int id);

}
