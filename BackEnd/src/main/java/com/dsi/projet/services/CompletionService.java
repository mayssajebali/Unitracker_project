package com.dsi.projet.services;

import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import com.dsi.projet.entities.Completion;
import com.dsi.projet.entities.Completion.ComplexteTache;
import com.dsi.projet.entities.CompletionId;
import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Tache;
import com.dsi.projet.repositories.CompletionRepository;
import com.dsi.projet.repositories.EtudiantRepository;
import com.dsi.projet.repositories.TacheRepository;

@Service
public class CompletionService implements ICompletion{
	@Autowired
	private CompletionRepository comRep;
	
	@Autowired
	private EtudiantRepository etdRep;
	@Autowired
	private TacheRepository tacheRepo;

	@Override
	public Completion Consulter(int idEtd, int idTache) {
		List<Completion>completions=comRep.findAll();
		for (Completion completion : completions) {
			if(completion.getEtudiant()==idEtd)
				if(completion.getTache()==idTache)
					return completion;
		}
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Completion markTaskAsCompleted(int tacheId, int etudiantId, Boolean isCompleted) {
		 CompletionId idCompletion = new CompletionId(tacheId, etudiantId);
		 Completion completion = comRep.findById(idCompletion)
			        .orElseThrow(() -> new RuntimeException("Réalisation non trouvée"));
		 completion.setMarquer(isCompleted);
		Tache tache = tacheRepo.findById(tacheId)
					        .orElseThrow(() -> new RuntimeException("tache non trouvée"));
	    int p=0;
	    completion.setProgression(0);
		if( completion.getTotalSoustTaches()>0) {
			if(isCompleted) {
				p=1;
				completion.setProgression(completion.getTotalSoustTaches());
				}
		
			List<Tache>staches=tache.getSousTaches();
			for (Tache t : staches) {
				List<Completion>completions=t.getCompletions();
				for (Completion c : completions) {
					if(c.getEtudiant()==etudiantId) { c.setMarquer(isCompleted);c.setProgression(p);}
					}
		 }
			}
		if( completion.getTotalSoustTaches()<1 && isCompleted)  {completion.setProgression(1);}
		return comRep.save(completion);
	}

	@Override
	public Completion pickDifficulty(int tacheId, int etudiantId, ComplexteTache complexite) {
		CompletionId idCompletion = new CompletionId(tacheId, etudiantId);
		Optional<Completion> c = comRep.findById(idCompletion);
		if(c.isPresent()) {
			c.get().setComplexite(complexite);
			
	    return comRep.save(c.get());}
		else return null;
	
	}

	public List<String> getRappelByEtudiant(int id_etd) {
	    List<Tache> taches = comRep.findTasksByEtudiantId(id_etd); 
	    List<String> rappels = new ArrayList<>();
	    for (Tache tache : taches) {
	        String rappel = notifierSiDateProche(tache);  
	        if (rappel != null) {
	            rappels.add(rappel);
	        }
	    }
	    return rappels.isEmpty() ? null : rappels; 
	}

	public String notifierSiDateProche(Tache tache) {
	    LocalDate aujourdHui = LocalDate.now();
	    
	    if (tache.getDateLimite() == null) {
	        return null;
	    }
	    
	    LocalDate dateLimite = tache.getDateLimite().toLocalDate();
	    long joursRestants = ChronoUnit.DAYS.between(aujourdHui, dateLimite);
	    
	    if (joursRestants <= 2 && joursRestants > 0) { // jours restants pour la fin de la tâche 1 ou 2 jours
	        return "La tâche '" + tache.getTitre() + "' arrive à échéance dans " + joursRestants + " jour(s)";
	    }
	    return null;
	}
	@Override
	public Completion addComment(int tacheId, int etudiantId,String comment) {
		CompletionId idCompletion = new CompletionId(tacheId, etudiantId);
		Optional<Completion> c = comRep.findById(idCompletion);
		if(c.isPresent()) {
			//if(c.get().getCommentaires()==null) {
				List<String> comments=c.get().getCommentaires();
				if(comments==null) {comments=new ArrayList<>();}
				comments.add(comment);	
				c.get().setCommentaires(comments);
			
			
			
		    return comRep.save(c.get());
		}
		return null;
	}

	@Override
	public Completion markSubTaskAsCompleted(int tacheId, int etudiantId, Boolean isCompleted) {
		CompletionId idCompletion = new CompletionId(tacheId, etudiantId);
		 Completion completion = comRep.findById(idCompletion)
			        .orElseThrow(() -> new RuntimeException("Réalisation non trouvée"));
		 completion.setMarquer(isCompleted);
		Tache tache = tacheRepo.findById(tacheId)
					        .orElseThrow(() -> new RuntimeException("tache non trouvée"));
		if(isCompleted)  {completion.setProgression(1);}
		else {completion.setProgression(0);}
		if(tache.getTachePrincipaleId()!=null) {
			Tache tacheP = tacheRepo.findById((Integer) tache.getTachePrincipaleId())
			        .orElseThrow(() -> new RuntimeException("tache non trouvée"));
			List<Tache>staches=tacheP.getSousTaches();
			int p=0;
			for (Tache t : staches) {
				List<Completion>completions=t.getCompletions();
				for (Completion c : completions) {
					if(c.getEtudiant()==etudiantId && c.isMarquer()) {p++;}
					}
		 }
			 CompletionId idCompletionP = new CompletionId((int) tache.getTachePrincipaleId(),etudiantId);
			 System.out.println(etudiantId+""+tache.getTachePrincipaleId());
			 Completion completionP = comRep.findById(idCompletionP)
				        .orElseThrow(() -> new RuntimeException("Réalisation non trouvée"));
			 completionP.setProgression(p);
			 if(p==completionP.getTotalSoustTaches()) { completionP.setMarquer(true);}
			 else{ completionP.setMarquer(false);}
			 comRep.save(completionP);
		}
		return comRep.save(completion);
	}
	
	// Chronometre
	   public Completion startChronometre(int tacheId, int etudiantId) {
	        Completion completion = comRep.findByTacheIdAndEtudiantId(tacheId, etudiantId)
	            .orElseThrow(() -> new RuntimeException("Completion not found"));
	        completion.setEnPause(false); 
	        return comRep.save(completion);
	    }

	    public Completion pauseChronometre(int tacheId, int etudiantId, Long tempsEcoule) {
	        Completion completion = comRep.findByTacheIdAndEtudiantId(tacheId, etudiantId)
	            .orElseThrow(() -> new RuntimeException("Completion not found"));
	        completion.setTempsEcoule(tempsEcoule);
	        completion.setEnPause(true);
	        return comRep.save(completion);
	    }

	    public Completion getChronometreState(int tacheId, int etudiantId) {
	        return comRep.findByTacheIdAndEtudiantId(tacheId, etudiantId)
	            .orElseThrow(() -> new RuntimeException("Completion not found"));
	    }

	    
	    
		@Override
		public List<Completion> getTaskCompltions(int tacheId) {
			List<Completion> tc= new ArrayList<>();
			for (Completion c : comRep.findAll()) {
				if(c.getTache()==tacheId) {
					tc.add(c);
				}
			}
			return tc;
		}
	
}
