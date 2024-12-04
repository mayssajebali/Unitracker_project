import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { CreerTacheService } from 'src/app/services/creer-tache.service';

@Component({
  selector: 'app-update-tache',
  templateUrl: './update-tache.component.html',
  styleUrls: ['./update-tache.component.css']
})
export class UpdateTacheComponent implements OnInit{
  idProf!:number;
  tacheId!: number;
  form!:FormGroup;
  constructor(private tacheService:CreerTacheService,private route:ActivatedRoute, private router: Router,
    private formBuilder:FormBuilder
  ){}
ngOnInit(): void {
  this.idProf = Number(this.route.snapshot.paramMap.get('id'));
  this.tacheId =Number(this.route.snapshot.paramMap.get('idTache')); 

  this.form = this.formBuilder.group({
    id: [this.tacheId],
    titre: ['', Validators.required],
    description: ['', Validators.required],
    dateLimite: ['', Validators.required]
  });

  this.loadTache();
}
  loadTache(){
    this.tacheService.getTaskById(this.tacheId).subscribe(tache => {
      this.form.patchValue({
        titre: tache.titre,
        description: tache.description,
        dateLimite: tache.dateLimite
      });
      
    });
  }
  onSubmit(): void {
    if (this.form.valid) {
      this.tacheService.updateTaskByProf(this.tacheId,this.form.value).subscribe(
        response => {
          console.log('Tâche mise à jour avec succès !');
          this.Submited();
          setTimeout(() => {
          this.router.navigate(['/dashboardProf', this.idProf, 'listetaches']);},2000);
        },
        error => {
          console.error('Erreur lors de la mise à jour de la tâche', error);
          this.errorSubmit();
        }
      );
    }
    else{
      console.log('Formulaire invalide, veuillez corriger les erreurs.');
      this.errorSubmit();
    }
  }
  alertVisible0 = false;
  alertVisible1 = false;

  Submited() {
    this.alertVisible1 = true;
    setTimeout(() => { this.alertVisible1 = false;}, 2000);
  }
  errorSubmit() {
    this.alertVisible0 = true;
    setTimeout(() => { this.alertVisible0 = false;}, 3000);
  }

}
