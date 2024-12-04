package com.dsi.projet.controllers;

import java.util.List;
import java.util.Set;

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

import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.services.EtudiantServiceImpl;


@RestController
@CrossOrigin("http://localhost:4200")
public class EtudiantController {
	@Autowired
	private EtudiantServiceImpl etdServ;
	
	@GetMapping("/etd")
	public List<Etudiant> getAll(){
	return etdServ.getAll();}
	
	@GetMapping("/etd/{id}")
	public Etudiant getEtudiantById(@PathVariable("id") int id){
	return etdServ.getEtudiantById(id);}
	
	
	@PostMapping("/etd")
	public Etudiant addEtudiant(@RequestBody Etudiant e){
	return etdServ.addEtudiant(e);	}
	
	
	@GetMapping("Etudiants/byClasse/{classeId}")
    public List<Etudiant> getEtudiantsByIdClasse(@PathVariable int classeId) {
        return etdServ.getEtudiantsByIdClasse(classeId);
    }
	

	 @PutMapping("etudiants/{id}")
	 public Etudiant updateEtudiant(@PathVariable int id, @RequestBody Etudiant etd) {
	      Etudiant etudiant = etdServ.editEtudiant(etd,id);
	      if (etudiant != null) {
	           return etudiant;
	      }
	        return null;
	  }

	  @DeleteMapping("etudiants/{id}")
	  public boolean deleteEtudiant(@PathVariable int id) {
	       etdServ.deleteEtudiant(id);
	       return true;
	      
	  }
	  
	  @GetMapping("/etudiants/{idEtudiant}/matieres")
	    public Set<Integer> getIdsMatieresByEtudiant(@PathVariable int idEtudiant) {
	        return etdServ.getIdsMatieresByIdEtudiant(idEtudiant);
	    }
	  

}
