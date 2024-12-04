package com.dsi.projet.entities;



import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;

@Entity
public class Completion {
	@EmbeddedId
//	@Id
//	@GeneratedValue(strategy=GenerationType.AUTO)
	private CompletionId id_Completion;
	@Column(nullable = false, columnDefinition = "boolean default false")
	private boolean marquer=false;
	public enum ComplexteTache{
		Easy,
		Medium,
		Hard
	}
	private ComplexteTache complexite;
	private List<String> commentaires = new ArrayList<>();
	@Column(nullable = false,columnDefinition = "int default 0")
	private int progression=0;
	@Column(nullable = false,columnDefinition = "int default 0")
	private int totalSoustTaches=0;
	//=new ArrayList<String>();

	
	private Long tempsEcoule = 0L; // En millisecondes, valeur par défaut 0
	@Column(nullable = false, columnDefinition = "BOOLEAN DEFAULT false")
	private boolean enPause = true; // Indique si le chronomètre est en pause, par défaut "en pause"    

	@Override
	public String toString() {
		return "Completion [id_Completion=" + id_Completion + ", etudiant=" + etudiant + ", tache=" + tache + "]";
	}



	public Completion(boolean marquer, ComplexteTache complexite, List<String> commentaires, int progression,
			int totalSoustTaches, Long tempsEcoule, boolean enPause, Etudiant etudiant, Tache tache) {
		super();
		this.marquer = marquer;
		this.complexite = complexite;
		this.commentaires = commentaires;
		this.progression = progression;
		this.totalSoustTaches = totalSoustTaches;
		this.tempsEcoule = tempsEcoule;
		this.enPause = enPause;
		this.etudiant = etudiant;
		this.tache = tache;
	}



	public int getTotalSoustTaches() {
		return totalSoustTaches;
	}

	public void setTotalSoustTaches(int totalSoustTaches) {
		this.totalSoustTaches = totalSoustTaches;
	}



	@ManyToOne(cascade = CascadeType.REMOVE)
	@MapsId("etudiant_id") // Mappe l'ID composite à l'association
    @JoinColumn(name = "etudiant_id", insertable = false, updatable = false) // Désactiver insertable et updatable
	//@JoinColumn(name = "etudiant_id")
	//@JsonIgnore
	private Etudiant etudiant;
	
	@ManyToOne
	@MapsId("tache_id") // Mappe l'ID composite à l'association
    @JoinColumn(name = "tache_id", insertable = false, updatable = false) // Désactiver insertable et updatable
	//@JoinColumn(name = "tache_id")
	//@JsonIgnore
	private Tache tache;

	public Completion() {
		super();
		this.commentaires= new ArrayList<>();
	}

	public Completion(boolean marquer, Etudiant etudiant, Tache tache) {
		super();
		this.commentaires=new ArrayList<String>();
		this.marquer = marquer;
		this.etudiant = etudiant;
		this.tache = tache;
		this.progression=0;
		this.totalSoustTaches=0;
	}

	public boolean isMarquer() {
		return marquer;
	}

	public void setMarquer(boolean marquer) {
		this.marquer = marquer;
	}

	public Integer getEtudiant() {
		
		return etudiant.getId_Etudiant();
	}
	public String  getEtudiantName() {
		return etudiant.getNom_Etd()+" "+etudiant.getPrenom_Etd();
	}

	public void setEtudiant(Etudiant etudiant) {
		this.etudiant = etudiant;
	}

	public Integer getTache() {
		return tache.getId_Tache();
	}

	public void setTache(Tache tache) {
		this.tache = tache;
	}

	public CompletionId getId_Completion() {
		return id_Completion;
	}
	
	public ComplexteTache getComplexite() {
		return complexite;
	}
	public void setComplexite(ComplexteTache complexite) {
		this.complexite = complexite;
	}

	

	public void setCommentaires(List<String> commentaires) {
		this.commentaires = commentaires;
	}

	public List<String> getCommentaires() {
		return commentaires;
	}
	
	public void setProgression(int progression) {
		this.progression = progression;
	}

	public int getProgression() {
		return progression;
	}



	public Long getTempsEcoule() {
		return tempsEcoule;
	}



	public void setTempsEcoule(Long tempsEcoule) {
		this.tempsEcoule = tempsEcoule;
	}



	public boolean isEnPause() {
		return enPause;
	}



	public void setEnPause(boolean enPause) {
		this.enPause = enPause;
	}

  
	
}
