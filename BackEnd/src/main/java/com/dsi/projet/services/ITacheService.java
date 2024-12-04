package com.dsi.projet.services;

import java.util.List;


import com.dsi.projet.entities.Tache;

public interface ITacheService {
	public Tache addTacheByProf(Tache t,int idProf);
	public Tache addTachebyEtudiant(Tache t,int idEtudiant);
	public Tache addSubTask(Tache t,int idEtudiant,int idTacheP);
	public List<Tache> getAll();
	public List<Tache> getTasksByEtudiant(int idEtudiant);
	public List<Tache> getTasksByProf(int id_Professeur);
	public boolean deleteTaskByProf(int idTache,int id_prof);
	public Tache assignTaskToStudents(int idTache, List<Integer> idsEtudiants);
	public Tache updateTaskByProf(int idTache,Tache tache);
	public Tache updateTaskByEtud(int idTache,Tache tache);
	public Tache getTaskById(int idTask);
	public boolean deleteTaskByEtud(int idTache,int id_etud);
	
	public String getMatiereByTache(int idTache);
	public List<String> getNotifications(int etudiantId);
	public void clearNotifications(int etudiantId);
	List<Integer> getTachesIdsForMatiere(int idMatiere);
}
