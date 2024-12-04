package com.dsi.projet.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.dsi.projet.entities.Groupe;

import com.dsi.projet.services.GroupeService;

@CrossOrigin(origins = "*")
@RestController
public class GroupeController {
	@Autowired
	public GroupeService GroupeService;


	@PostMapping("/createGroupe")
	public Groupe CreateGroupe(@RequestBody Groupe g) {
		return this.GroupeService.addGroupe(g);
	}
	
}
