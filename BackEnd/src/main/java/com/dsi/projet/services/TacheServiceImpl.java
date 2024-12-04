package com.dsi.projet.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.dsi.projet.entities.Classe;
import com.dsi.projet.entities.Completion;
import com.dsi.projet.entities.CompletionId;
import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Professeur;
import com.dsi.projet.entities.Tache;
import com.dsi.projet.repositories.CompletionRepository;
import com.dsi.projet.repositories.EtudiantRepository;
import com.dsi.projet.repositories.MatiereRepository;
import com.dsi.projet.repositories.ProfRepository;
import com.dsi.projet.repositories.TacheRepository;

@Service
public class TacheServiceImpl implements ITacheService{
	@Autowired
	private CompletionRepository compRep;
	@Autowired
	private TacheRepository tacherep;
	@Autowired
    private EtudiantRepository etudiantRepo;
	@Autowired
    private ProfRepository profRep;
	@Autowired
    private MatiereRepository matRep;
    private static final Map<Integer, List<String>> notificationsMap = new HashMap<>();

	@Override
	public Tache addTacheByProf(Tache t,int idProf) {
		List<Professeur> profs=profRep.findAll();
		for (Professeur professeur : profs) {
			if(professeur.getId_Professeur()==idProf) {
				
				t.setProfesseur(professeur);
				return tacherep.save(t);}
		}
		
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Tache assignTaskToStudents(int idTache, List<Integer> idsEtudiants) {
		 Tache tache = tacherep.findById(idTache).orElseThrow(() -> new RuntimeException("Tâche non trouvée"));
		 for (Integer idEtudiant : idsEtudiants) {
			 Etudiant etudiant = etudiantRepo.findById(idEtudiant).orElseThrow(() -> new RuntimeException("Étudiant non trouvé"));
			 boolean isAlreadyAssigned = tache.getEtudiants().stream()
                     .anyMatch(e -> e.getId_Etudiant()==etudiant.getId_Etudiant());
					 
			 if(!isAlreadyAssigned) {
				 tache.getEtudiants().add(etudiant);
			     Tache t=tacherep.save(tache);
//			     Completion c=new Completion(false,etudiant,t);
//			     compRep.save(c);
			 }
			 
		}
		return tacherep.save(tache);
	}

	@Override
	public List<Tache> getAll() {
		// TODO Auto-generated method stub
		return tacherep.findAll();
	}

	@Override
	public Tache addTachebyEtudiant(Tache t, int idEtudiant) {
		//List<Completion> c=compRep.findAll();
		List<Etudiant> etudiants=etudiantRepo.findAll();
		for (Etudiant etudiant : etudiants) {
			if(etudiant.getId_Etudiant()==idEtudiant) {
				t.getEtudiants().add(etudiant);
				Tache tache=tacherep.save(t);
				
//				for (Completion completion : c) {
//					if(completion.getTache()==t.getId_Tache() && completion.getEtudiant()==idEtudiant) {compRep.save(completion.setMarquer(false));}
//				}
				
				return tache; }
		}
		return null;
	}

	@Override
	public List<Tache> getTasksByEtudiant(int idEtudiant) {
		List<Tache> tachesByEtd= new ArrayList<>();
		Optional<Etudiant> etd=etudiantRepo.findById(idEtudiant);
		List<Tache> taches=tacherep.findAll();
		if(etd.isPresent()) {
			for (Tache tache : taches) {
			if(tache.getEtudiants().contains(etd.get())) {tachesByEtd.add(tache);}
		}
			return tachesByEtd;
			}
		else {return null;}
	}


	@Override
	public List<Tache> getTasksByProf(int id_Professeur) {
		Optional<Professeur> p= profRep.findById(id_Professeur);
		if(p.isPresent()) {
	        return tacherep.findByProfesseurId(id_Professeur);
		}
		return null;
	}

	@Override
	public boolean deleteTaskByProf(int idTache, int idProf) {
	    Optional<Tache> tacheOpt = tacherep.findById(idTache);
	    List<Completion> c=compRep.findAll();
	    if(tacheOpt.get().getSousTaches()!=null) {
	    	 List<Tache>st=tacheOpt.get().getSousTaches();
	    	 for (Tache t : st) {
					List<Completion>completions=t.getCompletions();
					for (Completion comp : completions) {
						compRep.deleteById(comp.getId_Completion());
					} tacherep.deleteById(t.getId_Tache());
					}
	    }
	    
	    if (tacheOpt.isPresent() && tacheOpt.get().getProfesseur().getId_Professeur() == idProf) {
	    	for (Completion completion : c) {
				if(completion.getTache()==idTache) {compRep.deleteById(completion.getId_Completion());}
			}
	        tacherep.deleteById(idTache);
	        return true; 
	    }
	    
	    return false; 
	}

	@Override
	public Tache updateTaskByProf(int idTache, Tache tache) {
	    Optional<Tache> tacheExistante = tacherep.findById(idTache);
	    if (tacheExistante.isPresent()) {
	        Tache t = tacheExistante.get();
	        t.setTitre(tache.getTitre()); 
            t.setDescription(tache.getDescription()); 
            t.setDateLimite(tache.getDateLimite());
            String message = "La tâche '" + t.getTitre() + "' a été mise à jour. Veuillez vérifier les détails!";
            List<Etudiant> etudiantsAssocies = t.getEtudiants();
            for (Etudiant etudiant : etudiantsAssocies) {
                notifierEtudiant(etudiant,message);
        	    System.out.println(message);

            }
            return tacherep.save(t);
            
	        }
		return null;
	}

	@Override
	public Tache getTaskById(int idTask) {
		Optional<Tache> t =tacherep.findById(idTask);
		if(t.isPresent()) {
			return t.get();
		}
		return null;
	}

	@Override
	public Tache updateTaskByEtud(int idTache, Tache tache) {
	    	   
	    Optional<Tache> tacheExistante = tacherep.findById(idTache);
	    

	    if (tacheExistante.isPresent()) {
	       
	        if (tacheExistante.get().getProfesseur() == null ) {
	            
	            
	            Tache t = tacheExistante.get(); 
	            t.setTitre(tache.getTitre()); 
	            t.setDescription(tache.getDescription()); 
	            t.setDateLimite(tache.getDateLimite());
	            
	           
	            return tacherep.save(t);
	        } else {
	           
	            return null; 
	        }
	    }
	    
	  
	    return null;
	}

	@Override
	public boolean deleteTaskByEtud(int idTache, int id_etud) {
		// TODO Auto-generated method stub
		
		/*
		 * Optional<Tache> tacheOpt = tacherep.findById(idTache);
		 * 
		 * if (tacheOpt.isPresent()) { Tache tache = tacheOpt.get(); List<Etudiant>
		 * etudiants = tache.getEtudiants();
		 * 
		 * 
		 * boolean isEtudiantAssociated = false; for (Etudiant e : etudiants) { if
		 * (e.getId_Etudiant() == id_etud) { isEtudiantAssociated = true; break; } }
		 * 
		 * if (isEtudiantAssociated) {
		 * 
		 * List<Completion> c = compRep.findAll(); for (Completion completion : c) {
		 * if(completion.getTache()==idTache)
		 * {compRep.deleteById(completion.getId_Completion());} }
		 * tacherep.deleteById(idTache); return true;
		 * 
		 * 
		 * 
		 * } }
		 * 
		 * return false;
		 */	
		 Optional<Tache> tacheOpt = tacherep.findById(idTache);
		    List<Completion> c=compRep.findAll();
		   
		    if(tacheOpt.get().getSousTaches()!=null) {
		    	 List<Tache>st=tacheOpt.get().getSousTaches();
		    	 for (Tache t : st) {
						List<Completion>completions=t.getCompletions();
						for (Completion comp : completions) {
							if(comp.getEtudiant()==id_etud) {compRep.deleteById(comp.getId_Completion());} 
						} tacherep.deleteById(t.getId_Tache());
						}
		    }
		    if (tacheOpt.isPresent() ) {
		    	for (Completion completion : c) {
					if(completion.getTache()==idTache) {compRep.deleteById(completion.getId_Completion());}
				}
		        tacherep.deleteById(idTache);
		        return true; 
		    }
		    
		    return false; 
	
	
	}
	
	@Override
	public String getMatiereByTache(int idTache) {
		Optional<Tache> tacheOpt = tacherep.findById(idTache);
		if(tacheOpt.isPresent()) {
			Tache tache = tacheOpt.get();
	        Professeur p = tache.getProfesseur();

	        Classe c = tache.getEtudiants().stream()
	            .findFirst()
	            .map(etudiant -> new Classe(etudiant.getNumClasse(), etudiant.getClasse(), etudiant.getAnneeClasse()))
	            .orElse(null);
			if(c!=null) {
			List<Matiere> matieres=matRep.findAll();
			for (Matiere matiere : matieres) {
				if(matiere.getProfesseurs().contains(p.getId_Professeur()) && matiere.getClasses().contains(c) ) {
					return matiere.getLibelle();
				}
			}
			}
			return null;
			
		}
		return null;
	}

	@Override
	public Tache addSubTask(Tache t, int idEtudiant, int idTacheP) {
				List<Etudiant> etudiants=etudiantRepo.findAll();
				for (Etudiant etudiant : etudiants) {
					if(etudiant.getId_Etudiant()==idEtudiant) {
						t.getEtudiants().add(etudiant);
						Tache tacheP = tacherep.findById(idTacheP)
							        .orElseThrow(() -> new RuntimeException("tache non trouvée"));
						CompletionId idCompletion = new CompletionId(idTacheP, idEtudiant);
						Completion completion = compRep.findById(idCompletion)
							        .orElseThrow(() -> new RuntimeException("Réalisation non trouvée"));
						completion.setTotalSoustTaches(completion.getTotalSoustTaches()+1);
						compRep.save(completion);
						t.setTachePrincipale(tacheP);
						Tache tache=tacherep.save(t);
						return tacheP; }
				}
				return null;
	}

	private void notifierEtudiant(Etudiant etudiant, String message) {
	    this.ajouterNotification(etudiant.getId_Etudiant(), message);
	}
	 public void ajouterNotification(int etudiantId, String message) {
	        notificationsMap.computeIfAbsent(etudiantId, k -> new ArrayList<>()).add(message);
	    }

	    public List<String> getNotifications(int etudiantId) {
	        return notificationsMap.getOrDefault(etudiantId, new ArrayList<>());
	    }
	    public void clearNotifications(int etudiantId) {
	        notificationsMap.remove(etudiantId);
	    }
	    
@Override
public List<Integer> getTachesIdsForMatiere(int idMatiere) {
    return this.tacherep.getIdsTachesByIdMatiere(idMatiere);
}

	}

