package com.dsi.projet.controllers;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.scheduling.config.Task;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.projet.entities.Etudiant;
import com.dsi.projet.entities.Tache;
import com.dsi.projet.repositories.TacheRepository;
import com.dsi.projet.services.IMatiereService;
import com.dsi.projet.services.ITacheService;

@RestController
@CrossOrigin("http://localhost:4200")
public class TacheController {
	@Autowired
	private ITacheService tacheService;

	
	@PostMapping("/createTaskByProf")
	public Tache CreateTache(@RequestParam int idProf,@RequestBody Tache tache) {
		return this.tacheService.addTacheByProf(tache, idProf);
	}
	
	@PostMapping("/createTaskByEtdudiant")
	public Tache CreateTacheByEtdudiant(@RequestParam int idEtudiant,@RequestBody Tache tache) {
		return this.tacheService.addTachebyEtudiant(tache, idEtudiant);
	}
	
	@PostMapping("/addSubTask")
	public Tache addSubTask(@RequestBody Tache t,@RequestParam int idEtudiant,@RequestParam int idTacheP) {
		return this.tacheService.addSubTask(t, idEtudiant, idTacheP);
	}
	

	@PostMapping("/task/assign")
	public ResponseEntity<?> assignTask(@RequestParam int idTache, @RequestBody List<Integer> idsEtudiants) {
	    Tache tache = tacheService.assignTaskToStudents(idTache, idsEtudiants);
	    return ResponseEntity.ok(tache);
	}
	
	@GetMapping("/tasks")
	public List<Tache> getAll(){
	return tacheService.getAll();}
	
	@GetMapping("/tasksByEtudiant")
	public List<Tache> getTasksByEtudiant(@RequestParam int idEtd){
	return tacheService.getTasksByEtudiant(idEtd);}
	

	
	@GetMapping("/tasksByProf")
	public List<Tache> getTasksByProf(@RequestParam int idProf){
		return tacheService.getTasksByProf(idProf);
	}
	
	@DeleteMapping("/tasksByProf/{id}")
	public boolean deleteTaskByProf(@PathVariable("id") int id,@RequestParam int idProf){
		return tacheService.deleteTaskByProf(id, idProf);
	}

	@PutMapping("/tasksByProf/{id}")
	public Tache updateTache(@PathVariable int id, @RequestBody Tache tache) {
		return tacheService.updateTaskByProf(id, tache);
	}
	@GetMapping("/task/{id}")
	public Tache getTaskById(@PathVariable int id) {
		return tacheService.getTaskById(id);
	}
	@GetMapping("/matiereBytask/{id}")
	public String getMatiereByTask(@PathVariable int id) {
		return tacheService.getMatiereByTache(id);
	}
	
	@PutMapping("/tasksByEtud/{id}")
	public Tache updateTacheByEtud(@PathVariable int id, @RequestBody Tache tache) {
		return tacheService.updateTaskByEtud(id, tache);
	}
	
	@DeleteMapping("/tasksByEtud/{id}")
	public boolean deleteTaskByEtud(@PathVariable("id") int id,@RequestParam int idEtud){
		return tacheService.deleteTaskByEtud(id, idEtud);
	}

	@GetMapping("/notifications/{id}")
    public List<String> getNotifications(@PathVariable int id) {
        List<String> notifications = tacheService.getNotifications(id);
        return notifications;
    }
	
	@GetMapping("/{idMatiere}/taches")
    public List<Integer> getTachesIdsByMatiere(@PathVariable int idMatiere) {
        return tacheService.getTachesIdsForMatiere(idMatiere);
    }


}
