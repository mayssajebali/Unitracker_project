import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Etudiant } from 'src/app/classes/etudiant';
import { Matiere } from 'src/app/classes/matiere';
import { Prof } from 'src/app/classes/prof';
import { CreerTacheService } from 'src/app/services/creer-tache.service';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';

@Component({
  selector: 'app-assigner-tache',
  templateUrl: './assigner-tache.component.html',
  styleUrls: ['./assigner-tache.component.css']
})
export class AssignerTacheComponent implements OnInit{
  prof!:Prof;
  idProf!:number;
  tacheId!: number; // ID de la tâche à attribuer
  etudiants: Etudiant[] = []; // Liste des étudiants
  selectedEtudiants: number[] = []; 
  tabClassNames!:string[];
  constructor(private profService: ProfServiceService,private route:ActivatedRoute,private etudiantService:EtudiantServiceService,private tacheService:CreerTacheService){}
  ngOnInit(): void {
    this.loadEtudiants();
    this.tabClassNames=this.getClassesNames(this.prof);
    this.idProf = Number(this.route.snapshot.paramMap.get('id'));
    this.profService.getProf(this.idProf).subscribe(data=>{this.prof=data;},error => {
      console.error(error);
    })
    
  }
 

  loadEtudiants() {
    this.etudiantService.getEtudiants().subscribe(
      data => {
        this.etudiants = data;
      },
      error => {
        console.error('Erreur lors du chargement des étudiants', error);
      }
    );
  }

  assignTask() {
    if (this.tacheId && this.selectedEtudiants.length > 0) {
      this.tacheService.assignTask(this.tacheId, this.selectedEtudiants).subscribe(
        response => {
          console.log('Tâche assignée avec succès:', response);
          alert('Tâche assignée avec succès');
        },
        error => {
          console.error('Erreur lors de l\'attribution de la tâche:', error);
        }
      );
    } else {
      console.log('Veuillez sélectionner au moins un étudiant et entrer l\'ID de la tâche.');
    }
  }
  onEtudiantChange(event: any) {
    const idEtudiant = parseInt(event.target.value, 10);
    if (event.target.checked) {
      this.selectedEtudiants.push(idEtudiant);
    } else {
      this.selectedEtudiants = this.selectedEtudiants.filter(id => id !== idEtudiant);
    }
  }
  getClassesNames(prof: Prof): string[] {
    if (prof.lesMatieres && prof.lesMatieres.length > 0) {
      const uniqueClasses = new Set<string>();

      prof.lesMatieres.forEach(m => {
        if (m.classes && m.classes.length > 0) {
          m.classes.forEach(cls => {
            uniqueClasses.add(cls.nom_Classe); 
          });
        }
      });

      return Array.from(uniqueClasses);
    }
    return [];
  }

  
}
