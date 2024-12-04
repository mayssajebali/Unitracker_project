import { Component } from "@angular/core";
import { Router } from "@angular/router";

// Importing necessary classes and services
import { Classe } from "src/app/classes/classe";
import { Matiere } from "src/app/classes/matiere";
import { ClasseServiceService } from "src/app/services/classe-service.service";
import { EtudiantServiceService } from "src/app/services/etudiant-service.service";
import { MatiereServiceService } from "src/app/services/matiere-service.service";
import { ProfServiceService } from "src/app/services/prof-service.service";

@Component({
  selector: "app-creer-classe",
  templateUrl: "./creer-classe.component.html",
  styleUrls: ["./creer-classe.component.css"],
})
export class CreerClasseComponent {
  // Define properties
  classe: Classe = new Classe();
  etudiants: any[] = [];
  matieres: any[] = [];
  professeurs: any[] = [];
  selectedMatiere: Matiere[] = [];
  alertVisible1: boolean = false; // Alert for success
  alertVisible2: boolean = false; // Alert for failure
  alertVisible3: boolean = false;

  // Inject services in the constructor
  constructor(
    private classeService: ClasseServiceService,
    private etudiantService: EtudiantServiceService,
    private matiereService: MatiereServiceService,
    private professeurService: ProfServiceService,
    private router: Router
  ) {}

  // Initialize component
  ngOnInit(): void {
    this.loadEtudiants(); // Load students
    this.loadMatieres(); // Load subjects
    this.loadProfesseurs(); // Load professors
  }

  // Load students from the service
  loadEtudiants(): void {
    this.etudiantService.getEtudiants().subscribe(
      (data) => {
        this.etudiants = data;
      },
      (error) => {
        console.error("Error loading students:", error);
      }
    );
  }

  // Load subjects from the service
  loadMatieres(): void {
    this.matiereService.getMatieres().subscribe(
      (data) => {
        this.matieres = data;
      },
      (error) => {
        console.error("Error loading subjects:", error);
      }
    );
  }

  // Load professors from the service
  loadProfesseurs(): void {
    this.professeurService.getProfesseurs().subscribe((data) => {
      this.professeurs = data;
    });
  }

  // Toggle subject selection for the class
  toggleSelectionMatiere(matiere: Matiere): void {
    const index = this.selectedMatiere.indexOf(matiere);
    if (index === -1) {
      this.selectedMatiere.push(matiere); // Add if not selected
    } else {
      this.selectedMatiere.splice(index, 1); // Remove if already selected
    }
  }

    // Filter subjects by semester 1

  getMatiereS1(): Matiere[] {
    const matiereS1 = this.matieres.filter((matiere) => matiere.semestre === "1");
    this.alertVisible3 = matiereS1.length === 0 && this.matieres.filter((matiere) => matiere.semestre === "2").length === 0;
    return matiereS1;
  }
  
  // Filter subjects by semester 2
  getMatiereS2(): Matiere[] {
    return this.matieres.filter((matiere) => matiere.semestre === "2");
  }
  
  // Handle form submission
  onSubmit(): void {
    // Validation checks before proceeding
    if (!this.classe.nom_Classe || !this.classe.annee_Classe || this.classe.num_Classe === 0 || this.selectedMatiere.length === 0) {
      this.alertVisible2 = true; // Show error alert if validation fails
      setTimeout(() => { 
        this.alertVisible2 = false; 
      }, 2000); // Hide after 2 seconds
      return; // Prevent form submission
    }
  
    // Assign selected subjects to the class
    this.classe.matieres = this.selectedMatiere
      .map((matiere) => matiere.id_Matiere)
      .filter((id): id is number => id !== undefined);
  
    // Submit the class creation request
    this.classeService.createClasse(this.classe).subscribe(
      (response) => {
        this.alertVisible1 = true; // Show success alert
        setTimeout(() => {
          this.alertVisible1 = false; 
          this.router.navigate(['/listeclasse']); // Redirect after 2 seconds
        }, 2000);
      },
      (error) => {
        this.alertVisible2 = true; // Show error alert on failure
        setTimeout(() => { 
          this.alertVisible2 = false; 
        }, 2000); // Hide after 2 seconds
      }
    );
  }
  

  // Navigate back to the class list page
  cancel(): void {
    this.router.navigate(["/listeclasse"]);
  }
}
