package com.dsi.projet.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;


import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;

@Entity
public class Tache {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id_Tache;
	private String titre;
	private String description;
	private LocalDateTime dateLimite;
	
	
	@ManyToOne
	@JoinColumn(name = "id_Professeur")
	private Professeur professeur;
	
	
	//realisation
	@ManyToMany
	@JoinTable(name = "completion",joinColumns = {@JoinColumn(name="tache_id")},inverseJoinColumns = {@JoinColumn(name="etudiant_id")})
	@JsonIgnore
	private List<Etudiant> etudiants=new ArrayList<>();
	
	

	 @ManyToOne
	 @JoinColumn(name = "id_Matiere") private Matiere matiere;
	
	
	/*-------------relationRealisation---------------------------------------------*/
	@OneToMany(mappedBy = "tache")
	List<Completion>completions=new ArrayList<>();
	/*----------------------------------------------------------*/
	
	
	/*-------------relationSoustaches---------------------------------------------*/
	@OneToMany(mappedBy = "tachePrincipale")
	List<Tache>sousTaches=new ArrayList<>();
	/*----------------------------------------------------------*/
	
	/*-------------relationSoustaches---------------------------------------------*/
	@ManyToOne
	@JoinColumn(name = "id_TacheP")
	private Tache tachePrincipale;
	/*----------------------------------------------------------*/
	
	public void setTachePrincipale(Tache tachePrincipale) {
		this.tachePrincipale = tachePrincipale;
	}

	public String getTachePrincipale() {
		if(tachePrincipale!=null) {return tachePrincipale.getTitre();}
		return null;
		
	}
	public Object getTachePrincipaleId() {
		if(tachePrincipale!=null) {return tachePrincipale.getId_Tache();}
		return null;
		
	}

	public List<Tache> getSousTaches() {
		return sousTaches;
	}

	public Tache() {
		super();
		// TODO Auto-generated constructor stub
	}
	
	public int getMatiere() {
	    if (matiere != null) {
	        return matiere.getId_Matiere();
	    } else {
	        return -1;  
	    }
	}
	

	 
	 public Tache(int id_Tache, String titre, String description, LocalDateTime dateLimite, Professeur professeur,
			List<Etudiant> etudiants, Matiere matiere, List<Completion> completions, List<Tache> sousTaches,
			Tache tachePrincipale) {
		super();
		this.id_Tache = id_Tache;
		this.titre = titre;
		this.description = description;
		this.dateLimite = dateLimite;
		this.professeur = professeur;
		this.etudiants = etudiants;
		this.matiere = matiere;
		this.completions = completions;
		this.sousTaches = sousTaches;
		this.tachePrincipale = tachePrincipale;
	}

	public void setMatiere(Matiere matiere) { this.matiere = matiere; }
	 

//	public List<Integer> getCompletions() {
//		 List<Integer> compsIds = new ArrayList<>();
//		 for (Completion c : completions) {
//			 compsIds.add(c.getId_Completion());
//		}
//		return compsIds;
//	}
	
	public List<Completion> getCompletions() {
		return completions;
	}
	
	

	public void setCompletions(List<Completion> completions) {
		this.completions = completions;
	}

	public void setId_Tache(int id_Tache) {
		this.id_Tache = id_Tache;
	}

	public Tache(int id_Tache, String titre, String description, LocalDateTime dateLimite, Professeur professeur,
			List<Etudiant> etudiants, Matiere matiere, List<Completion> completions) {
		super();
		this.id_Tache = id_Tache;
		this.titre = titre;
		this.description = description;
		this.dateLimite = dateLimite;
		this.professeur = professeur;
		this.etudiants = etudiants;

		this.completions = completions;
	}

	public Tache(String titre, String description, LocalDateTime dateLimite) {
		super();
		this.titre = titre;
		this.description = description;
		this.dateLimite = dateLimite;
		//this.marquer=false;
	}
	
	public Tache(String titre) {
		super();
		this.titre = titre;
		
	}
	
	
	@Override
	public String toString() {
		return "Tache [id_Tache=" + id_Tache + ", titre=" + titre + ", description=" + description + ", dateLimite="
				+ dateLimite + ", professeur=" + professeur + ", etudiants=" + etudiants 
				+ ", completions=" + completions + "]";
	}

	public String getTitre() {
		return titre;
	}
	public void setTitre(String titre) {
		this.titre = titre;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public LocalDateTime getDateLimite() {
		return dateLimite;
	}
	public void setDateLimite(LocalDateTime dateLimite) {
		this.dateLimite = dateLimite;
	}
	
	public int getId_Tache() {
		return id_Tache;
	}
    ////pas fait au debut
	public Professeur getProfesseur() {
		return professeur;
	}

	public void setProfesseur(Professeur professeur) {
		this.professeur = professeur;
	}

	

	public List<Etudiant> getEtudiants() {
		return etudiants;
	}

	public void setEtudiants(List<Etudiant> etudiants) {
		this.etudiants = etudiants;
	}

	public void setSousTaches(List<Tache> sousTaches) {
		this.sousTaches = sousTaches;
	}

	
	
	

//	public boolean isMarquer() {
//		return marquer;
//	}
//
//	public void setMarquer(boolean marquer) {
//		this.marquer = marquer;
//	}
	
		
	

}
