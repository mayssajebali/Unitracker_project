package com.dsi.projet.entities;
import java.io.Serializable;
import java.util.Objects;

import jakarta.persistence.Embeddable;

@Embeddable
public class CompletionId implements Serializable {
	private int tache_id;
    private int etudiant_id;

    // Default constructor
    public CompletionId() {}

    // Parameterized constructor
  
    public CompletionId(int tache_id, int etudiant_id) {
		super();
		this.tache_id = tache_id;
		this.etudiant_id = etudiant_id;
	}

	
   

    // Override hashCode and equals for proper comparison
//    @Override
//    public boolean equals(Object o) {
//        if (this == o) return true;
//        if (o == null || getClass() != o.getClass()) return false;
//        CompletionId that = (CompletionId) o;
//        return tache_id == that.tache_id && etudiant_id == that.etudiant_id;
//    }
    @Override
    public boolean equals(Object o) {
        if (this == o) return true; // Check if they are the same instance
        if (o == null) return false; // Check if o is null
        if (getClass() != o.getClass()) return false; // Check if classes are the same

        CompletionId that = (CompletionId) o; // Safe to cast now
        return tache_id == that.tache_id && etudiant_id == that.etudiant_id;
    }

 // Getters and setters
    public int getTache_id() {
		return tache_id;
	}

	public void setTache_id(int tache_id) {
		this.tache_id = tache_id;
	}

	public int getEtudiant_id() {
		return etudiant_id;
	}

	public void setEtudiant_id(int etudiant_id) {
		this.etudiant_id = etudiant_id;
	}

	@Override
    public int hashCode() {
        return Objects.hash(tache_id, etudiant_id);
    }


}
