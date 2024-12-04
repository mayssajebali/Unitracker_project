import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProfServiceService } from 'src/app/services/prof-service.service';

@Component({
  selector: 'app-navbar-prof',
  templateUrl: './navbar-prof.component.html',
  styleUrls: ['./navbar-prof.component.css']
})
export class NavbarProfComponent implements OnInit{
  idProf!:number;
  constructor(private route:ActivatedRoute, private profServ: ProfServiceService){}
  name!:string;
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
}
}
