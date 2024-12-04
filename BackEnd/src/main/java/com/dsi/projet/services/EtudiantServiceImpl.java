package com.dsi.projet.services;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.dsi.projet.entities.Classe;
import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Tache;
import com.dsi.projet.repositories.ClasseRepository;
import com.dsi.projet.repositories.EtudiantRepository;
import com.dsi.projet.repositories.TacheRepository;

@Service
public class EtudiantServiceImpl implements IEtudiantService {
	@Autowired
	private EtudiantRepository etdRep;
	
	@Autowired
	private ClasseRepository classeRepository;
	@Autowired
	private TacheRepository tacheRep;
	
	
	
	@Override
	public Etudiant addEtudiant(Etudiant e) {
		List<Etudiant> etudiants = etdRep.findAll();
		
		
		for (Etudiant etudiant : etudiants) {
			if (String.valueOf(etudiant.getEmail_Etd()).equals(e.getEmail_Etd())) {
				return null;

			}
		}
		//e.setId(0);
		return etdRep.save(e);

		// java.util.Optional<Etudiant> etudiant = etdRep.findByCin_Etd(e.getCin_Etd());
		// if (etudiant.isPresent()) {
		// return null;
		// }
		// return etdRep.save(e);
	}

	@Override
	public List<Etudiant> getAll() {
		return etdRep.findAll();
	}
	 public List<Etudiant> getEtudiantsByIdClasse(int classeId) {
	        return etdRep.findEtudiantsByClasseId(classeId);
	    }
	 
	  

	 @Override
	 public Etudiant editEtudiant(Etudiant e, int id) {
	  
	     Etudiant etudiantExistant = etdRep.findById(id)
	             .orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));

	    
	     etudiantExistant.setNom_Etd(e.getNom_Etd());
	     etudiantExistant.setPrenom_Etd(e.getPrenom_Etd());
	     etudiantExistant.setEmail_Etd(e.getEmail_Etd());
	     etudiantExistant.setMot_de_passe_Etd(e.getMot_de_passe_Etd());

	    
	        String nomClasse = e.getClasse();  
//	        String anneeClasse = e.getClasse();
	        
	        int numeroClasse = e.getNumClasse();
	        int anneeClasse = e.getAnneeClasse();
	   
	        Classe classe = classeRepository.findByNameAndYearAndNumber(nomClasse, anneeClasse, numeroClasse)
	                .orElseThrow(() -> new RuntimeException("Classe non trouvée"));

	     etudiantExistant.setClasse(classe);

	 
	     return etdRep.save(etudiantExistant);
	 }


	    @Override
	    public boolean deleteEtudiant(int id) {
	    
	        if (!etdRep.existsById(id)) {
	            throw new RuntimeException("Étudiant non trouvé");
	        }
	        
	      
	        etdRep.deleteById(id);
	        return true; 
	    }

		@Override
		public Etudiant getEtudiantById(int id) {
			// TODO Auto-generated method stub
			return etdRep.findById(id).get();
		}

	

		public Set<Integer> getIdsMatieresByIdEtudiant(int idEtudiant) {
		    // Récupérer l'étudiant par son ID
		    Etudiant etudiant = etdRep.findById(idEtudiant).orElse(null);
		    if (etudiant == null) {
		        throw new RuntimeException("Etudiant non trouvé");
		    }

		    // Créer un Set pour stocker les IDs des matières
		    Set<Integer> matieresIds = new HashSet<>();

		    // Parcourir les IDs des tâches de l'étudiant
		    for (Integer idTache : etudiant.getTaches()) {
		        // Chercher la tâche par son ID
		        Tache tache = tacheRep.findById(idTache).orElse(null);
		        if (tache != null) {
		            // Récupérer l'ID de la matière associée à la tâche
		            int matiereId = tache.getMatiere();  // Utilisez getMatiere() pour obtenir l'ID de la matière
		            if (matiereId != -1) {
		                matieresIds.add(matiereId);  // Ajouter l'ID de la matière au Set
		            }
		        }
		    }

		    return matieresIds;
		}


		







}
