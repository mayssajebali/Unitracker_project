package com.dsi.projet.entities;



import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.OneToMany;


@Entity
public class Professeur {
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int id_Professeur;
	private String nom_Prof;
	private String prenom_Prof;
	private String email_Prof;
	private String cin_Prof;
	private String sexe_Prof;
	private String telephone_Prof;
	private String mot_de_passe_Prof;
	private String role;
	
	@ManyToMany(mappedBy = "professeurs")
	private List<Matiere> lesMatieres =new ArrayList<>();
	
	
	@OneToMany(mappedBy = "professeur")
	private List<Tache> lesTaches =new ArrayList<>();
	
	
	public Professeur(String nom_Prof, String prenom_Prof, String email_Prof, String cin_Prof, String sexe_Prof,
			String telephone_Prof, String mot_de_passe_Prof, List<Matiere> lesMatieres, List<Tache> lesTaches) {
		super();
		this.nom_Prof = nom_Prof;
		this.prenom_Prof = prenom_Prof;
		this.email_Prof = email_Prof;
		this.cin_Prof = cin_Prof;
		this.sexe_Prof = sexe_Prof;
		this.telephone_Prof = telephone_Prof;
		this.mot_de_passe_Prof = mot_de_passe_Prof;
		this.lesMatieres = lesMatieres;
		this.lesTaches = lesTaches;
	}
	

	@Override
	public int hashCode() {
		return Objects.hash(cin_Prof, email_Prof, id_Professeur, mot_de_passe_Prof, nom_Prof, prenom_Prof, sexe_Prof,
				telephone_Prof);
	}



	public Professeur(int id_Professeur, String nom_Prof, String prenom_Prof, String email_Prof, String cin_Prof,
			String sexe_Prof, String telephone_Prof, String mot_de_passe_Prof, List<Matiere> lesMatieres,
			List<Tache> lesTaches) {
		super();
		this.id_Professeur = id_Professeur;
		this.nom_Prof = nom_Prof;
		this.prenom_Prof = prenom_Prof;
		this.email_Prof = email_Prof;
		this.cin_Prof = cin_Prof;
		this.sexe_Prof = sexe_Prof;
		this.telephone_Prof = telephone_Prof;
		this.mot_de_passe_Prof = mot_de_passe_Prof;
		this.lesMatieres = lesMatieres;
		this.lesTaches = lesTaches;
	}


	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Professeur other = (Professeur) obj;
		return Objects.equals(cin_Prof, other.cin_Prof) && Objects.equals(email_Prof, other.email_Prof)
				&& id_Professeur == other.id_Professeur && Objects.equals(mot_de_passe_Prof, other.mot_de_passe_Prof)
				&& Objects.equals(nom_Prof, other.nom_Prof) && Objects.equals(prenom_Prof, other.prenom_Prof)
				&& Objects.equals(sexe_Prof, other.sexe_Prof) && Objects.equals(telephone_Prof, other.telephone_Prof);
	}

	
	@Override
	public String toString() {
		return "Professeur [id_Professeur=" + id_Professeur + ", nom_Prof=" + nom_Prof + ", prenom_Prof=" + prenom_Prof
				+ ", email_Prof=" + email_Prof + ", cin_Prof=" + cin_Prof + ", sexe_Prof=" + sexe_Prof
				+ ", telephone_Prof=" + telephone_Prof + ", mot_de_passe_Prof=" + mot_de_passe_Prof + ", lesMatieres="
				+ lesMatieres + ", lesTaches=" + lesTaches + "]";
	}

	public Professeur() {
		super();
		// TODO Auto-generated constructor stub
	}
	public String getNom_Prof() {
		return nom_Prof;
	}
	public void setNom_Prof(String nom_Prof) {
		this.nom_Prof = nom_Prof;
	}
	public String getPrenom_Prof() {
		return prenom_Prof;
	}
	public void setPrenom_Prof(String prenom_Prof) {
		this.prenom_Prof = prenom_Prof;
	}
	public String getEmail_Prof() {
		return email_Prof;
	}
	public List<Integer> getMatieres() {
	    List<Integer> matiereIds = new ArrayList<>();
	        for (Matiere matiere : lesMatieres) {
	            matiereIds.add(matiere.getId_Matiere());
	        }
	    
	    return matiereIds;
	}


	

	public void setLesMatieres(List<Matiere> lesMatieres) {
		this.lesMatieres = lesMatieres;
	}


	public List<Integer> getLesTaches() {
		List<Integer> tachesIds = new ArrayList<>();
		for (Tache t : lesTaches) {
			tachesIds.add(t.getId_Tache());
			
		}
		return tachesIds;
	}


	public void setLesTaches(List<Tache> lesTaches) {
		this.lesTaches = lesTaches;
	}


	public void setId_Professeur(int id_Professeur) {
		this.id_Professeur = id_Professeur;
	}


	public void setEmail_Prof(String email_Prof) {
		this.email_Prof = email_Prof;
	}
	public String getSexe_Prof() {
		return sexe_Prof;
	}
	public void setSexe_Prof(String sexe_Prof) {
		this.sexe_Prof = sexe_Prof;
	}
	public String getTelephone_Prof() {
		return telephone_Prof;
	}
	public void setTelephone_Prof(String telephone_Prof) {
		this.telephone_Prof = telephone_Prof;
	}
	public String getMot_de_passe_Prof() {
		return mot_de_passe_Prof;
	}
	public void setMot_de_passe_Prof(String mot_de_passe_Prof) {
		this.mot_de_passe_Prof = mot_de_passe_Prof;
	}
	public int getId_Professeur() {
		return id_Professeur;
	}

	public String getCin_Prof() {
		return cin_Prof;
	}

	public void setCin_Prof(String cin_Prof) {
		this.cin_Prof = cin_Prof;
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}


	

}
