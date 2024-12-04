package com.dsi.projet.controllers;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.projet.entities.Classe;
import com.dsi.projet.services.IClasseService;

@RestController
@CrossOrigin(origins = "http://localhost:4200")
public class ClasseController {
	@Autowired
	private IClasseService classeService;
	
	
    @GetMapping("/classes")
	public List<Classe> allClasses() {
		// TODO Auto-generated method stub
		return classeService.allClasses();
	}

	@PostMapping("/classes")
	public Classe createClass(@RequestBody Classe c) {
		// TODO Auto-generated method stub
		return classeService.createClass(c);
	}
	 @PutMapping("classes/updateClasse/{id}")
	    public ResponseEntity<Classe> updateClasse(@PathVariable int id, @RequestBody Classe updatedClasse) {
	        try {
	            Classe classe = classeService.updateClasse(id, updatedClasse);
	            return ResponseEntity.ok(classe);
	        } catch (RuntimeException e) {
	            return ResponseEntity.notFound().build();
	        }
	    }
	 
	 @DeleteMapping("classes/deleteClasse/{id}")
	    public ResponseEntity<Void> deleteClasse(@PathVariable int id) {
	        boolean success = classeService.deleteClasse(id);
	        if (success) {
	            return ResponseEntity.noContent().build();  // 204 No Content
	        } else {
	            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // 404 Not Found
	        }
	    }
	 
	  @GetMapping("/classes/{id}/matieres")
	    public List<Integer> getMatieresByIdClasse(@PathVariable int id) {
	        return classeService.getMatieresByIdClasse(id);
	    }
	  @GetMapping("/classes/{id}")
	  public ResponseEntity<Classe> getClasseById(@PathVariable("id") int id) {
	      Optional<Classe> classe = classeService.getClasseById(id);
	      if (classe.isPresent()) {
	          return ResponseEntity.ok(classe.get());  // Return the Classe if found
	      } else {
	          return ResponseEntity.status(HttpStatus.NOT_FOUND).build();  // Return 404 if not found
	      }
	  }
	  
	  @GetMapping("classes/by-matiere/{matiereId}")
	    public ResponseEntity<List<Integer>> getClassesIdByIdMatiere(@PathVariable Integer matiereId) {
	        List<Integer> classIds = classeService.getClassesIdByIdMatiere(matiereId);
	        return ResponseEntity.ok(classIds);
	    }
	  
	  @PostMapping("/classesBy-ids")
	    public ResponseEntity<List<Classe>> getClassesByIds(@RequestBody List<Integer> ids) {
	        List<Classe> classes = classeService.getClassesByIds(ids);
	        return ResponseEntity.ok(classes);
	    }


}
