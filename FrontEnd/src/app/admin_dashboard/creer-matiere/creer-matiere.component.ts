import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { Matiere } from "src/app/classes/matiere";
import { Prof } from "src/app/classes/prof";
import { Etudiant } from "src/app/classes/etudiant";
import { Classe } from "src/app/classes/classe";
import { MatiereServiceService } from "src/app/services/matiere-service.service";
import { EtudiantServiceService } from "src/app/services/etudiant-service.service";
import { ClasseServiceService } from "src/app/services/classe-service.service";
import { ProfServiceService } from "src/app/services/prof-service.service";

@Component({
  selector: "app-creer-matiere",
  templateUrl: "./creer-matiere.component.html",
  styleUrls: ["./creer-matiere.component.css"],
})
export class CreerMatiereComponent {
  // Properties for the form and lists
  matiere: Matiere = new Matiere();
  professeurs: Prof[] = [];
  etudiants: Etudiant[] = [];
  classes: Classe[] = [];

  selectedClassYear: number = 0; // Selected year for class
  selectedProfesseurs: Prof[] = []; // Selected professors for the subject
  selectedClasses: Classe[] = []; // Selected classes for the subject

  alertVisible1: boolean = false; // Success alert visibility
  alertVisible2: boolean = false; // Error alert visibility
  alertVisible3: boolean = false; // Validation error alert visibility

  // Constructor to inject required services
  constructor(
    private matiereService: MatiereServiceService,
    private router: Router,
    private etudiantService: EtudiantServiceService,
    private classeService: ClasseServiceService,
    private profService: ProfServiceService
  ) {}

  // OnInit lifecycle hook to load initial data
  ngOnInit(): void {
    this.loadProfesseurs();
    this.loadEtudiants();
    this.loadClasses();
  }

  // Load professors data
  loadProfesseurs() {
    this.profService.getProfesseurs().subscribe((data) => {
      if (data.length === 0) {
        this.alertVisible3 = true;
      } else {
        this.alertVisible3 = false;
        this.professeurs = data.map((prof) => ({ ...prof, selected: false }));
      }
    });
  }
  

  // Load classes data
  loadClasses() {
    this.classeService.getClasses().subscribe(
      (data) => {
        this.classes = data;
      },
      (error) => {
        console.error("Error loading classes", error);
      }
    );
  }

  // Load students data
  loadEtudiants() {
    this.etudiantService.getEtudiants().subscribe(
      (data) => {
        this.etudiants = data;
      },
      (error) => {
        console.error("Error loading students", error);
      }
    );
  }

  // Toggle selection of a professor
  toggleSelectionProf(prof: Prof) {
    const index = this.selectedProfesseurs.indexOf(prof);
    if (index === -1) {
      this.selectedProfesseurs.push(prof);
    } else {
      this.selectedProfesseurs.splice(index, 1);
    }
  }

  // Toggle selection of a class
  toggleSelectionClasse(classe: Classe) {
    const index = this.selectedClasses.indexOf(classe);
    if (index === -1) {
      this.selectedClasses.push(classe);
    } else {
      this.selectedClasses.splice(index, 1);
    }
  }

  // Handle form submission with validation
  onSubmit() {
    // Validation checks
    if (
      !this.matiere.libelle ||
      !this.selectedClassYear ||
      !this.matiere.semestre ||
      this.selectedProfesseurs.length === 0
    ) {
      this.alertVisible2 = true; // Show error alert
      setTimeout(() => {
        this.alertVisible2 = false;
      }, 2000);
      return; // Prevent form submission
    }

    // If all fields are valid, proceed with the form submission
    this.matiere.classes = this.selectedClasses;
    this.matiere.professeurs = this.selectedProfesseurs.map(
      (prof) => prof.id_Professeur
    );

    // Sending Matiere data to the server
    this.matiereService.addMatiere(this.matiere).subscribe(
      (response) => {
        this.alertVisible1 = true; // Show success alert
        setTimeout(() => {
          this.alertVisible1 = false;
          this.router.navigate(["/listmatiere"]);
        }, 2000);
      },
      (error) => {
        this.alertVisible2 = true; // Show error alert if submission fails
        setTimeout(() => {
          this.alertVisible2 = false;
        }, 2000);
      }
    );
  }

  // Cancel and navigate back to the list of subjects
  cancel() {
    this.router.navigate(["/listmatiere"]);
  }
}
