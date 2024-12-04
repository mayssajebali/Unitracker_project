package com.dsi.projet.services;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.dsi.projet.entities.Classe;
import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Professeur;
import com.dsi.projet.repositories.ClasseRepository;
import com.dsi.projet.repositories.MatiereRepository;
import com.dsi.projet.repositories.ProfRepository;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class MatiereServiceImpl implements IMatiereService {

    @Autowired
    private MatiereRepository matiereRepository;

    @Autowired
    private ProfRepository professeurRepository;

    @Autowired
    private ClasseRepository classeRepository;

    @Override
    public List<Matiere> allMatieres() {
        return matiereRepository.findAll();
    }

    @Override
    public Matiere createMatiere(Matiere m) {
        // Fetch existing classes and set them
        List<Classe> classes = new ArrayList<>();
        if (m.getClasseIds() != null) {
            for (Integer classeId : m.getClasseIds()) {
                classeRepository.findById(classeId).ifPresent(classes::add);
            }
        }
        m.setClasses(classes); // Assuming you have a setClasses method in Matiere

        // Save the Matiere
        Matiere savedMatiere = matiereRepository.save(m);

        // Associate Professors
        if (m.getProfesseurs() != null) {
            for (Integer profId : m.getProfesseurs()) {
                professeurRepository.findById(profId).ifPresent(professeur -> {
                    professeur.getMatieres().add(savedMatiere.getId_Matiere());
                    professeurRepository.save(professeur);
                });
            }
        }

        return savedMatiere;
    }
    
    @Override
    public List<Matiere> getMatieresByIds(List<Integer> ids) {
        return ids.stream()
                  .map(id -> matiereRepository.findById(id)
                      .orElseThrow(() -> new RuntimeException("Matiere not found with id: " + id)))
                  .collect(Collectors.toList());
    }

    @Override
    public Matiere getMatiereById(int id) {
        return matiereRepository.findById(id)
                .orElseThrow();
    }
    @Override
    public List<Integer> getProfIdsByIdMatiere(int idMatiere) {
        Optional<Matiere> matiereOpt = matiereRepository.findById(idMatiere);
        return matiereOpt.map(Matiere::getProfesseurs)
                         .orElse(Collections.emptyList());
    }
    
  
    @Override
    public void deleteMatiereById(int idMatiere) {
        matiereRepository.deleteById(idMatiere);  // Deletes Matiere by ID
    }

	
    @Override
public Matiere updateMatiere(int idMatiere, Matiere matiereDetails) {
    // Check if the Matiere exists
    Optional<Matiere> existingMatiereOpt = matiereRepository.findById(idMatiere);
    
    if (existingMatiereOpt.isPresent()) {
        Matiere existingMatiere = existingMatiereOpt.get();
        existingMatiere.setLibelle(matiereDetails.getLibelle());
        existingMatiere.setSemestre(matiereDetails.getSemestre());
        existingMatiere.setProfesseurs(matiereDetails.getProfesseurs());
        existingMatiere.setClasses(matiereDetails.getClasses());

        return matiereRepository.save(existingMatiere);
    }
    
    throw new RuntimeException("Matiere not found with id: " + idMatiere);
}  
	
    
    
}
