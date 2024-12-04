import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CreerTacheService } from 'src/app/services/creer-tache.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';

@Component({
  selector: 'app-modifier-tache',
  templateUrl: './modifier-tache.component.html',
  styleUrls: ['./modifier-tache.component.css']
})
export class ModifierTacheComponent {
  tacheForm!: FormGroup;
  idEtudiant!: number;
  idTache!: number;
  matieres: any[] = []; 
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private tacheService: CreerTacheService,
    private matiereService: MatiereServiceService
  ) {}

  ngOnInit(): void {
    this.idEtudiant = Number(this.route.snapshot.paramMap.get('id')); 
    
    this.idTache = +this.route.snapshot.paramMap.get('idTache')!;
    
    
    this.tacheForm = this.fb.group({
      titre: ['', Validators.required],
      description: ['', Validators.required],
      dateLimite: ['', Validators.required]
    });

    
    this.tacheService.getTaskById(this.idTache).subscribe((data) => {
      this.tacheForm.patchValue({
        titre: data.titre,
        description: data.description,
        dateLimite: data.dateLimite
      });
    });

   
    this.matiereService.getMatieres().subscribe((data) => {
      this.matieres = data;
    });
  }

  updateTache() {
    if (this.tacheForm.valid) {
      this.tacheService.updateTaskByEtud(this.idTache, this.tacheForm.value).subscribe(() => {
        this.router.navigate(['/dashEtd', this.idEtudiant, 'listetachesEtudiants']);
        
      });
    }
  }
}

