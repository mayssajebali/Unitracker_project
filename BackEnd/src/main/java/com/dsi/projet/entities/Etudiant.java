package com.dsi.projet.entities;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Temporal;
import jakarta.persistence.TemporalType;

@Entity
public class Etudiant {
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private int id_Etudiant;
	private String nom_Etd;
	private String prenom_Etd;
	private String email_Etd;
	private String mot_de_passe_Etd;
	private String role;
	@ManyToOne
	@JoinColumn(name = "id_classe")
	// @JsonIgnore
	private Classe classe;
	
	
	@ManyToMany(mappedBy = "etudiants")
	@JsonIgnore
	private List<Tache> taches = new ArrayList<>();

	/*----------------------------------------------------------*/
	@ManyToMany
	@JoinTable(name = "groupeCreation", joinColumns = { @JoinColumn(name = "Etudiant_Id") }, inverseJoinColumns = {
			@JoinColumn(name = "groupe_id") })
	@JsonIgnore
	private List<Groupe> groupes = new ArrayList<>();
	/*----------------------------------------------------------*/

	/*-------------relationRealisation---------------------------------------------*/
	 @OneToMany(mappedBy = "etudiant")
	List<Completion> completions = new ArrayList<>();
	/*----------------------------------------------------------*/

	

//	@Temporal(TemporalType.DATE)
//	private LocalDate date_de_naissance_Etd;

	public Etudiant() {
		super();
	}


public Etudiant(String nom_Etd, String prenom_Etd, String email_Etd, String mot_de_passe_Etd, Classe classe,
		List<Tache> taches, List<Groupe> groupes, List<Completion> completions) {
	super();
	this.nom_Etd = nom_Etd;
	this.prenom_Etd = prenom_Etd;
	this.email_Etd = email_Etd;
	this.mot_de_passe_Etd = mot_de_passe_Etd;
	this.classe = classe;
	this.taches = taches;
	this.groupes = groupes;
	this.completions = completions;
}


//	public List<Integer> getCompletions() {
//		 List<Integer> compsIds = new ArrayList<>();
//		 for (Completion c : completions) {
//			 compsIds.add(c.getId_Completion());
//		}
//		return compsIds;
//	}

	public void setCompletions(List<Completion> completions) {
		this.completions = completions;
	}

	public void setId_Etudiant(int id_Etudiant) {
		this.id_Etudiant = id_Etudiant;
	}

	public void setGroupes(List<Groupe> groupes) {
		this.groupes = groupes;
	}


	
	public List<Integer> getTaches() {
		List<Integer> tacheIds = new ArrayList<>();
		for (Tache t : taches) {
			tacheIds.add(t.getId_Tache());
			
		}
		return tacheIds;
	}

	public void setTaches(List<Tache> taches) {
		this.taches = taches;
	}
	
	

	public String getNom_Etd() {
		return nom_Etd;
	}

	public void setNom_Etd(String nom_Etd) {
		this.nom_Etd = nom_Etd;
	}

	public String getPrenom_Etd() {
		return prenom_Etd;
	}

	public void setPrenom_Etd(String prenom_Etd) {
		this.prenom_Etd = prenom_Etd;
	}

	public String getEmail_Etd() {
		return email_Etd;
	}

	public void setEmail_Etd(String email_Etd) {
		this.email_Etd = email_Etd;
	}



//	public LocalDate getDate_de_naissance_Etd() {
//		return date_de_naissance_Etd;
//	}
//
//	public void setDate_de_naissance_Etd(LocalDate date_de_naissance_Etd) {
//		this.date_de_naissance_Etd = date_de_naissance_Etd;
//	}

	public String getMot_de_passe_Etd() {
		return mot_de_passe_Etd;
	}

	public void setMot_de_passe_Etd(String mot_de_passe_Etd) {
		this.mot_de_passe_Etd = mot_de_passe_Etd;
	}


	public int getId_Etudiant() {
		return id_Etudiant;
	}




	// public String getClasse() {
	// 		if(this.classe!=null)
	// 			return classe.getNom_Classe();
	// 		else
	// 			return null;
	// }

	// public Classe getClasse() {
	// return classe;
	// }

	// public void setClasse(String Nom_Classe) {
	// 	this.classe.setNom_Classe(Nom_Classe);
	// }
    // public void setAnneeClasse(int Annee_Classe) {
    //     this.classe.setAnnee_Classe(Annee_Classe);
    // }
	// public void setNumClasse(int Num_Classe) {
	// 	this.classe.setNum_Classe(Num_Classe);
	// }
//	public Classe getClasse1() {
//	return classe;
//}
	public String getClasse() {
		return classe.getNom_Classe();
	}
    public int getAnneeClasse() {
        return classe.getAnnee_Classe();
    }
	public int getNumClasse() {
		return classe.getNum_Classe();
	}
	

	public void setClasse(Classe classe) {
		this.classe = classe;
	}
	
	public void setClasse(String nomClasse, int anneeClasse, int numClasse) {
		this.classe.setNom_Classe(nomClasse);
		this.classe.setAnnee_Classe(anneeClasse);
		this.classe.setNum_Classe(numClasse);
	}
	
	

	public List<Groupe> getGroupes() {
		return groupes;
	}

    public void setId(int id_Etudiant) {
		this.id_Etudiant = id_Etudiant;
    }




	@Override
	public String toString() {
		return "Etudiant [id_Etudiant=" + id_Etudiant + ", nom_Etd=" + nom_Etd + ", prenom_Etd=" + prenom_Etd
				+ ", email_Etd=" + email_Etd + ", mot_de_passe_Etd=" + mot_de_passe_Etd + ", classe=" + classe
				+ ", taches=" + taches + ", groupes=" + groupes + ", completions=" + completions + "]";
	}


	public String getRole() {
		return role;
	}


	public void setRole(String role) {
		this.role = role;
	}

	/*
	 * 
	 * public void setGroupes(List<Groupe> groupes) {
	 * this.groupes = groupes;
	 * }
	 * 
	 */

}
