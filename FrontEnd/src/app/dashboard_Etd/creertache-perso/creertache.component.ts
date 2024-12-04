import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Matiere } from 'src/app/classes/matiere';
import { Tache } from 'src/app/classes/tache';
import { CreerTacheService } from 'src/app/services/creer-tache.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-creertache',
  templateUrl: './creertache.component.html',
  styleUrls: ['./creertache.component.css']
})
export class CreertacheComponent implements OnInit {
  tacheForm!: FormGroup;
  idEtudiant!: number; 
  taches: Tache[] = []
  matieres:Matiere[]=[];
  minDate!: string;
  constructor(private fb: FormBuilder, private router: Router, private tacheService: CreerTacheService,
    private route: ActivatedRoute,private matService:MatiereServiceService,private toastr: ToastrService) { }

  ngOnInit(): void {
    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateLimite: ['', Validators.required],
      // matiere: [''],
    });

    const today = new Date();
    this.minDate = today.toISOString().slice(0, 16);
    this.idEtudiant = Number(this.route.snapshot.paramMap.get('id')); 
    this.matService.getMatieres().subscribe(
      (data) => {
        this.matieres = data;
    
      },
      (error) => {
        console.error("Erreur lors du chargement des matières", error);
        console.log("matieres")
      }
    );
    console.log(this.idEtudiant);
  }
  addTache(): void {
    if (this.tacheForm.valid) {
      const formData = {
        ...this.tacheForm.value,  
        dateLimite: new Date(this.tacheForm.value.dateLimite).toISOString(), 
      };
      const tache = this.tacheForm.value;
      this.tacheService.createTaskByEtudiant(this.idEtudiant, tache).subscribe(
        response => {
          if(response==null){alert("Tâche non ajoutée");console.log('Tâche non ajoutée:', tache);}
          else{console.log('Tâche ajoutée avec succès:', response);
            this.toastr.success('Tâche crée avec succès!');
            this.router.navigate(['/dashEtd', this.idEtudiant, 'listetachesEtudiants']);}
          
        },
        error => {
          console.error('Erreur lors de l\'ajout de la tâche:', error,tache);
        }
      );
    } else {
      console.log('Formulaire invalide, veuillez corriger les erreurs.');
    }
  }

 
}
