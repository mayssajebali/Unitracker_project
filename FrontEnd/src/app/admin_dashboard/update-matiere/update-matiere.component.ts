import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Classe } from 'src/app/classes/classe';
import { Matiere } from 'src/app/classes/matiere';
import { Prof } from 'src/app/classes/prof';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';

@Component({
  selector: 'app-update-matiere',
  templateUrl: './update-matiere.component.html',
  styleUrls: ['./update-matiere.component.css']
})
export class UpdateMatiereComponent implements OnInit {
  matiere: Matiere = new Matiere();
  professeurs: Prof[] = []; // To hold all professors
  classes: Classe[] = [];   // To hold all classes
  selectedClasses: Classe[] = [];  // To hold selected classes' IDs
  selectedProfessors: number[] = [];   // To hold selected professors' IDs
   matiereId = this.activatedRoute.snapshot.params['id'];
  constructor(
    private matiereService: MatiereServiceService,
    private profServ: ProfServiceService,
    private classeServ: ClasseServiceService,

    private activatedRoute: ActivatedRoute,private router: Router
  ) { }

  ngOnInit(): void {

    this.loadAllProfessors();
    this.loadAllClasses();
    this.loadMatiereDetails();
  }

  // Load all professors from the backend
  loadAllProfessors(): void {
    this.profServ.getProfesseurs().subscribe((professors: Prof[]) => {
      this.professeurs = professors;
    });
  }

  // Load all classes from the backend
  loadAllClasses(): void {
    this.classeServ.getClasses().subscribe((classes: Classe[]) => {
      this.classes = classes;
    });
  }

  // Load the specific Matiere details, including associated professors and classes
  loadMatiereDetails(): void {
  

    // Fetch matiere details
    this.matiereService.getMatiereById(this.matiereId).subscribe((matiereData: Matiere) => {
      this.matiere = matiereData;
      this.selectedProfessors = [];  // Reset selected professors
      this.selectedClasses = [];    // Reset selected classes

      // Load professors associated with this matiere
      this.loadProfesseurs();

      // Load classes associated with this matiere
      this.loadClasses();
    });
  }

  // Load professors associated with this matiere
  loadProfesseurs(): void {
    this.matiereService.getProfIdsByMatiereId(this.matiere.id_Matiere!).subscribe((profIds: number[]) => {
      this.selectedProfessors = profIds || [];
    });
  }

  loadClasses(): void {
    this.matiereService.getClassesIdByMatiere(this.matiere.id_Matiere!).subscribe((classIds: number[]) => {
      this.selectedClasses = this.classes.filter(classe => classIds.includes(classe.id_Classe!));
    });
  }


  // Submit the form with modified data
  onSubmit(): void {
    // Prepare the updated matiere object with selected professors and classes
    this.matiere.professeurs = this.selectedProfessors;
    this.matiere.classes = this.selectedClasses;
    console.log("profs", this.matiere.professeurs);
    console.log("classes", this.matiere.classesIds);

    // Call the service to update the matiere data
    const matiereId = this.matiere.id_Matiere!;  // Ensure this is set correctly
    this.matiereService.updateMatiere(matiereId, this.matiere).subscribe(
      (response) => {
        console.log('Matiere updated successfully:', response);
        this.router.navigate(["/listmatiere"]);
      },
      (error) => {
        console.log("teeeest",this.matiere)
        console.error('Error updating matiere:', error);
        // Handle error
      }
    );
  }

  // Handle professor checkbox change
  onProfChange(event: any, profId: number): void {
    if (event.target.checked) {
      this.selectedProfessors.push(profId);
    } else {
      const index = this.selectedProfessors.indexOf(profId);
      if (index > -1) {
        this.selectedProfessors.splice(index, 1);
      }
    }
  }

  // Handle class checkbox change
  onClassChange(event: any, classe: Classe): void {
    if (event.target.checked) {
   
      const exists = this.selectedClasses.some(c => c.id_Classe === classe.id_Classe);
      if (!exists) {
        this.selectedClasses.push(classe);
      }
    }
   
  }
  

 
  onCancel(): void {
    this.selectedProfessors = [];
    this.selectedClasses = [];
    this.router.navigate(['/listmatiere']); 
  }
}
