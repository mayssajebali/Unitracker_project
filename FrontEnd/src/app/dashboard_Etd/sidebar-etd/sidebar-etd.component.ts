import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Matiere } from 'src/app/classes/matiere';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';

@Component({
  selector: 'app-sidebar-etd',
  templateUrl: './sidebar-etd.component.html',
  styleUrls: ['./sidebar-etd.component.css']
})
export class SidebarEtdComponent implements OnInit{
  idEtudiant!:number;
  name!: string;
  matieres: Matiere[] = []; 
  varPersonnelle:string= "personnelle";
  constructor(private route:ActivatedRoute, private etudiantServ: EtudiantServiceService, private matiereService: MatiereServiceService ){}
  ngOnInit(): void {
    this.idEtudiant = Number(this.route.snapshot.paramMap.get('id'));
    this.etudiantServ.getEtudiantById(this.idEtudiant).subscribe(
      (response) => {
        console.log('etd', response);
        this.name = response.nom_Etd + ' ' + response.prenom_Etd;
  
      },
      (error) => {
        console.error('Erreur', error);
     
      }
    );

    this.loadMatieres();
  }

  loadMatieres(): void {
    // Étape 1 : Récupérer les IDs des matières de l'étudiant
    this.matiereService.getIdsMatieresByEtudiant(this.idEtudiant).subscribe(
      (idsMatieres) => {
      
        this.matiereService.getMatieresByIds(idsMatieres).subscribe(
          (matieres) => {
            this.matieres = matieres;  // Stocker les matières récupérées dans le tableau
          },
          (error) => {
            console.error('Erreur lors de la récupération des matières:', error);
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des IDs de matières:', error);
      }
    );
  }


 
}
