import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { each } from "jquery";
import { Classe } from "src/app/classes/classe";
import { Etudiant } from "src/app/classes/etudiant";
import { ClasseServiceService } from "src/app/services/classe-service.service";
import { EtudiantServiceService } from "src/app/services/etudiant-service.service";

@Component({
  selector: "app-listes-etudiants",
  templateUrl: "./listes-etudiants.component.html",
  styleUrls: ["./listes-etudiants.component.css"],
})
export class ListesEtudiantsComponent implements OnInit {
  constructor(
    private etudiantService: EtudiantServiceService,
    private classService: ClasseServiceService,
    private router: Router
  ) {}
  etudiants: Etudiant[] = [];
  classes: Classe[] = [];
  ngOnInit(): void {
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.etudiantService.getEtudiants().subscribe(
      (data) => {
        this.etudiants = data;
      },
      (error) => {
        console.error("Erreur lors du chargement des etudiants", error);
      }
    );
  }

 // Méthode pour éditer un étudiant
 editEtudiant(etudiant: Etudiant) {
  // Naviguer vers la page d'édition d'un étudiant avec l'ID de l'étudiant
  this.router.navigate([`/edit-etudiant/${etudiant.id_Etudiant}`]);
}

// Méthode pour supprimer un étudiant
deleteEtudiant(id_Etudiant: number) {
  // Appel à un service de suppression (à ajouter dans le service)
  this.etudiantService.deleteEtudiant(id_Etudiant).subscribe(
    () => {
      this.loadEtudiants(); // Recharger la liste après suppression
      alert('Étudiant supprimé avec succès!');
    },
    (error) => {
      console.error("Erreur lors de la suppression de l'étudiant", error);
    }
  );
}
}