package com.dsi.projet.services;



import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Groupe;
import com.dsi.projet.entities.Matiere;
import com.dsi.projet.repositories.GroupeRepository;
import com.dsi.projet.repositories.MatiereRepository;
import com.dsi.projet.repositories.EtudiantRepository;


@Service
public class GroupeServiceImpl implements GroupeService {
	@Autowired
	private GroupeRepository Repository;
	@Autowired
	private EtudiantRepository EtudiantRepository;

	
	@Override
	public Groupe addGroupe(Groupe g) {
	  
	    List<Integer> etudiantIds = g.getEtudiants(); 
	    List<Etudiant> etudiants = new ArrayList<>();
	    
	    for (Integer etudiantId : etudiantIds) {
	        EtudiantRepository.findById(etudiantId).ifPresent(etudiant -> {
	            etudiant.getGroupes().add(g);
	            etudiants.add(etudiant);      
	        });
	    }
	    g.setEtudiants(etudiantIds); 
	    return Repository.save(g);
	}


	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	}
