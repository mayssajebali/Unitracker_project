import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Classe } from 'src/app/classes/classe';
import { Matiere } from 'src/app/classes/matiere';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';

@Component({
  selector: 'app-update-classe',
  templateUrl: './update-classe.component.html',
  styleUrls: ['./update-classe.component.css']
})
export class UpdateClasseComponent implements OnInit {
  classe: Classe = new Classe();
  matieres: Matiere[] = [];          // All matieres available in the system
  matieresS1: Matiere[] = [];        // Matiere filter for semester 1
  matieresS2: Matiere[] = [];        // Matiere filter for semester 2
  selectedMatiereIds: number[] = []; // Matiere IDs associated with the class

  constructor(
    private classeService: ClasseServiceService,
    private matiereService: MatiereServiceService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const classeId = Number(this.route.snapshot.paramMap.get('id')); 


    this.classeService.getClasseById(classeId).subscribe((classe) => {
      this.classe = classe;


      this.classeService.getIdsMatieresByClasseId(classeId).subscribe((matieresIds) => {
        this.selectedMatiereIds = matieresIds; // Set the selected matieres IDs

        // Get all available matieres
        this.matiereService.getMatieres().subscribe((allMatieres) => {
          this.matieres = allMatieres;

          // Filter matieres based on the semester
          this.matieresS1 = allMatieres.filter(m => m.semestre === "1");
          this.matieresS2 = allMatieres.filter(m => m.semestre === "2");
        });
      });
    });
  }

 
  onSubmit(): void {
    if (!this.classe.id_Classe) {
      console.error('ID de la classe manquant');
      return;
    }

 
    this.classe.matieres = this.selectedMatiereIds;

  
    const updatedClasse = {
      num_Classe: this.classe.num_Classe,
      nom_Classe: this.classe.nom_Classe,
      annee_Classe: this.classe.annee_Classe,
      etudiants: this.classe.etudiants,
      matieres: this.classe.matieres  
    };

    this.classeService.updateClasse(this.classe.id_Classe, updatedClasse).subscribe(
      (response) => {
        console.log('Classe mise à jour', response);
        this.router.navigate(['/listeclasse']);
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la classe', error);
      }
    );
  }

  onMatiereChange(matiereId: number, event: Event): void {
    const inputElement = event.target as HTMLInputElement;
    const isChecked = inputElement.checked;

    if (isChecked) {
      this.selectedMatiereIds.push(matiereId); 
    } else {
      this.selectedMatiereIds = this.selectedMatiereIds.filter(id => id !== matiereId); 
    }
  }

  // Handle cancellation of the update
  onCancel(): void {
    this.router.navigate(['/listeclasse']); 
  }
}