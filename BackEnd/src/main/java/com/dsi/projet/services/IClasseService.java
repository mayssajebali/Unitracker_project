package com.dsi.projet.services;

import java.util.List;
import java.util.Optional;

import com.dsi.projet.entities.Classe;

public interface IClasseService {
	public List<Classe> allClasses();
	public Classe createClass(Classe c);
	Classe updateClasse(int id, Classe updatedClasse);
	boolean deleteClasse(int id);
	List<Integer> getMatieresByIdClasse(int id_Classe);
	Optional<Classe> getClasseById(int id);
	List<Integer> getClassesIdByIdMatiere(Integer matiereId);
	List<Classe> getClassesByIds(List<Integer> ids);

}
