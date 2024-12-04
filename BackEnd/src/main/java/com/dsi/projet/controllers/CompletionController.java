package com.dsi.projet.controllers;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.projet.entities.Completion;
import com.dsi.projet.entities.Completion.ComplexteTache;
import com.dsi.projet.services.CompletionService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class CompletionController {
	@Autowired
	private CompletionService comServ;
	
	@GetMapping("/completion")
	public Completion getCompletion(@RequestParam int idEtd,@RequestParam int idTache){
	return comServ.Consulter(idEtd, idTache);}
	
	@PostMapping("/realisation/mark")
	public ResponseEntity<Completion> markTaskAsCompleted(@RequestParam int tacheId,@RequestParam int etudiantId, @RequestParam Boolean isCompleted) {
	    Completion c = comServ.markTaskAsCompleted(tacheId,etudiantId, isCompleted);
	    return ResponseEntity.ok(c );
	}
	
	@PostMapping("/realisation/mark/subTask")
	public ResponseEntity<Completion> markSubTaskAsCompleted(@RequestParam int tacheId,@RequestParam int etudiantId, @RequestParam Boolean isCompleted) {
	    Completion c = comServ.markSubTaskAsCompleted(tacheId,etudiantId, isCompleted);
	    return ResponseEntity.ok(c );
	}
	
	@PostMapping("/realisation/difficulty")
	public ResponseEntity<Completion> pickDifficulty(@RequestParam int tacheId,@RequestParam int etudiantId, @RequestParam ComplexteTache complexite) {
	    Completion c = comServ.pickDifficulty(tacheId,etudiantId, complexite);
	    return ResponseEntity.ok(c );
	}
	
	@GetMapping("/rappels/{id}")
	public List<String> getRappelsByEtudiant(@PathVariable("id") int id){
		return comServ.getRappelByEtudiant(id);
	}
//	@PostMapping("/task/mark")
//	public ResponseEntity<Tache> markTaskAsCompleted(@RequestParam int idTache, @RequestParam boolean isCompleted) {
//	    Tache tache = tacheService.markTaskAsCompleted(idTache, isCompleted);
//	    return ResponseEntity.ok(tache);
//	}
	@PutMapping("/realisation/comment")
	public Completion addComment(@RequestParam int tacheId,@RequestParam int etudiantId,@RequestParam String comment) {
		return comServ.addComment(tacheId, etudiantId, comment);
	}
	
    @PostMapping("/start/{tacheId}/{etudiantId}")
    public Completion startChronometre(@PathVariable int tacheId, @PathVariable int etudiantId) {
        return comServ.startChronometre(tacheId, etudiantId);
    }

    @PutMapping("/pause/{tacheId}/{etudiantId}")
    public Completion pauseChronometre(@PathVariable int tacheId, @PathVariable int etudiantId, @RequestParam Long tempsEcoule) {
        return comServ.pauseChronometre(tacheId, etudiantId, tempsEcoule);
    }

    @GetMapping("/{tacheId}/{etudiantId}")
    public Completion getChronometreState(@PathVariable int tacheId, @PathVariable int etudiantId) {
        return comServ.getChronometreState(tacheId, etudiantId);
    }
    
    @GetMapping("/completions")
	public List<Completion> getTaskCompltions(@RequestParam int idTache){
	return comServ.getTaskCompltions(idTache);}
}


