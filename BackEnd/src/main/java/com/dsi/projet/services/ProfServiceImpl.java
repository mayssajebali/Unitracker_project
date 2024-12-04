package com.dsi.projet.services;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsi.projet.entities.Classe;
import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Professeur;
import com.dsi.projet.repositories.EtudiantRepository;
import com.dsi.projet.repositories.MatiereRepository;
import com.dsi.projet.repositories.ProfRepository;

@Service
public class ProfServiceImpl implements IProfService{
	@Autowired
	private EtudiantRepository etdRep;
	@Autowired
	private ProfRepository profRep;
	@Autowired
	private MatiereRepository matRep;

	@Override
	public List<Professeur> getProfs() {
		// TODO Auto-generated method stub
		return profRep.findAll();
	}

	@Override
	public Professeur addProf(Professeur p) {
		// TODO Auto-generated method stub
		return profRep.save(p);
	}

	@Override
	public Professeur getProf(int idProf) {
		Optional<Professeur> p=profRep.findById(idProf);
		if(p.isPresent()) {return p.get();}
		
		
		return null;
	}
	
	public List<Classe> getClassesByProfId(int idProf) {
        return profRep.findClassesByProfId(idProf);
    }

	
    public boolean deleteProfesseur(int id) {
        Optional<Professeur> pro =  profRep.findById(id);
        
        if (pro.isPresent()) {
        	profRep.deleteById(id);
            return true; 
        }
        
        return false; 
    }

    @Override
    public Professeur editProfesseur(int id, Professeur p) {
       
        Professeur professeur = profRep.findById(id).orElseThrow(() -> new RuntimeException("Professeur introuvable"));

      
        professeur.setNom_Prof(p.getNom_Prof());
        professeur.setPrenom_Prof(p.getPrenom_Prof());
        professeur.setEmail_Prof(p.getEmail_Prof());
        professeur.setMot_de_passe_Prof(p.getMot_de_passe_Prof()); 

       
        return profRep.save(professeur);
    }

    
    @Override
    public List<Professeur> getProfsByIds(List<Integer> profIds) {
        return profRep.findAllById(profIds);
    }

	@Override
	public List<Matiere> getMatieresByProf(int idProf) {
		//Professeur professeur = profRep.findById(idProf).orElseThrow(() -> new RuntimeException("Professeur introuvable"));
		List<Matiere> matieres=new ArrayList<>();
		for (Matiere matiere : matRep.findAll()) {
			if(matiere.getProfesseurs().contains(idProf)) {
				matieres.add(matiere);
			}
		}
		return matieres;
	}
}
