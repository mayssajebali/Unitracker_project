package com.dsi.projet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsi.projet.entities.Classe;
import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Professeur;
import com.dsi.projet.repositories.ClasseRepository;
import com.dsi.projet.repositories.EtudiantRepository;
import com.dsi.projet.repositories.MatiereRepository;
import com.dsi.projet.repositories.ProfRepository;

@Service
public class ClasseServiceImpl implements IClasseService {

	@Autowired
	private ClasseRepository classeRepository;

	@Autowired
	private EtudiantRepository etudiantRepository;

	@Autowired
	private MatiereRepository matiereRepository;

	

	@Override
	public List<Classe> allClasses() {
		return classeRepository.findAll();
	}

	@Override
	public Classe createClass(Classe c) {
	    if (classeExistente(c)) {
	        return null; 
	    }
	    c.setEtudiants(c.getEtudiants()); 
	    c.setMatieres(c.getMatieres()); 
	    Classe savedClass = classeRepository.save(c);
	    for (Integer etudiantId : savedClass.getEtudiants()) {
	        etudiantRepository.findById(etudiantId).ifPresent(etudiant -> {
	            etudiant.setClasse(savedClass); 
	            etudiantRepository.save(etudiant);
	        });
	    }
	    for (Integer matiereId : savedClass.getMatieres()) {
	        matiereRepository.findById(matiereId).ifPresent(matiere -> {
	            matiere.getClasses().add(savedClass); 
	            matiereRepository.save(matiere);
	        });
	    }

	    return savedClass; 
	}

	private boolean classeExistente(Classe c) {

	    return classeRepository.findAll().stream().anyMatch(classe ->
	            classe.getAnnee_Classe() == c.getAnnee_Classe() &&
	            classe.getNum_Classe() == c.getNum_Classe() &&
	            classe.getNom_Classe().equals(c.getNom_Classe()));
	}
	
	@Override
	public Classe updateClasse(int id, Classe updatedClasse) {
        Optional<Classe> existingClasseOpt = classeRepository.findById(id);

        if (existingClasseOpt.isPresent()) {
            Classe existingClasse = existingClasseOpt.get();
            existingClasse.setNum_Classe(updatedClasse.getNum_Classe());
            existingClasse.setNom_Classe(updatedClasse.getNom_Classe());
            existingClasse.setAnnee_Classe(updatedClasse.getAnnee_Classe());

            existingClasse.setEtudiants(updatedClasse.getEtudiants());
            existingClasse.setMatieres(updatedClasse.getMatieres());

            return classeRepository.save(existingClasse);
        } else {
            throw new RuntimeException("Classe with ID " + id + " not found");
        }
    }
    @Override
	public boolean deleteClasse(int id) {
        if (classeRepository.existsById(id)) {
            classeRepository.deleteById(id);
            return true;  // Delete was successful
        }
        return false;  // Classe not found
    }
@Override
public List<Integer> getMatieresByIdClasse(int id_Classe) {
    Optional<Classe> classeOptional = classeRepository.findById(id_Classe);
    if (classeOptional.isPresent()) {
        Classe classe = classeOptional.get();
        return classe.getMatieres();  // Get the list of id matieres from the Classe object
    } else {
        throw new RuntimeException("Classe not found with id: " + id_Classe); // Handle case where Classe is not found
    }
}
@Override
public Optional<Classe> getClasseById(int id) {
    return classeRepository.findById(id);
}

@Override
public List<Integer> getClassesIdByIdMatiere(Integer matiereId) {
    return classeRepository.findClassesIdByMatiereId(matiereId);
}
@Override
public List<Classe> getClassesByIds(List<Integer> ids) {
    return classeRepository.findAllById(ids);
}
	
	
}
		
		
		
		
		
		
		
		
		