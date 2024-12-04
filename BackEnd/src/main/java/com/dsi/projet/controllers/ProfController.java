package com.dsi.projet.controllers;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.projet.entities.Classe;
import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Matiere;
import com.dsi.projet.entities.Professeur;
import com.dsi.projet.services.ProfServiceImpl;



@RestController
@CrossOrigin("http://localhost:4200")
public class ProfController {
	@Autowired
	private ProfServiceImpl profService;
	
	
	@GetMapping("/profs")
	public List<Professeur> getProfs(){
	return profService.getProfs();}
	
	
	@GetMapping("/prof/{idProf}")
	public Professeur getProf(@PathVariable("idProf") int id){
	return profService.getProf(id);}
	
	@GetMapping("/matieres/{idProf}")
	public List<Matiere> getMatieresByProf(@PathVariable("idProf") int id){
	return profService.getMatieresByProf(id);}
	
	
	@PostMapping("/profs")
	public Professeur addProf(@RequestBody Professeur p){
	return profService.addProf(p);
}
	
	 @GetMapping("/{idProf}/classes")
	    public List<Classe> getClassesByIdProf(@PathVariable int idProf) {
	        return profService.getClassesByProfId(idProf);
	    }
	 @PutMapping("professeurs/{id}")
	 public Professeur editProfesseur(@PathVariable int id, @RequestBody Professeur prof) {
	      Professeur p = profService.editProfesseur(id, prof);
	      if (p != null) {
	           return p;
	      }
	        return null;
	  }

	  @DeleteMapping("professeurs/{id}")
	  public boolean deleteProfesseurs(@PathVariable int id) {
	       profService.deleteProfesseur(id);
	       return true;
	      
	  }
		 @PostMapping("/getprofesseursByIds")
		    public ResponseEntity<List<Professeur>> getProfsByIds(@RequestBody List<Integer> profIds) {
		        List<Professeur> professeurs = profService.getProfsByIds(profIds);
		        return ResponseEntity.ok(professeurs);
		    }
}