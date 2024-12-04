import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Matiere } from 'src/app/classes/matiere';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';

@Component({
  selector: 'app-sidebar-prof',
  templateUrl: './sidebar-prof.component.html',
  styleUrls: ['./sidebar-prof.component.css']
})
export class SidebarProfComponent implements OnInit{
  idProf!:number;
  constructor(private route:ActivatedRoute, private profServ: ProfServiceService, private matService: MatiereServiceService){}
  name!:string;
  matieres:Matiere[]=[];
ngOnInit(): void {
  this.idProf = Number(this.route.snapshot.paramMap.get('id'));
  
  this.profServ.getProf(this.idProf).subscribe(
    (response) => {
      console.log('prof', response);
      this.name = response.nom_Prof + ' ' + response.prenom_Prof;

    },
    (error) => {
      console.error('Erreur', error);
   
    }
  );
  this.matService.getMatieresByProf(this.idProf).subscribe(
    (data) => {
      this.matieres = data;
    },
    (error) => {
      console.error("Erreur lors du chargement des matières", error);
    }
  );
}
}
