import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CompletionService } from 'src/app/services/completion.service';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';

@Component({
  selector: 'app-navbar-etd',
  templateUrl: './navbar-etd.component.html',
  styleUrls: ['./navbar-etd.component.css']
})
export class NavbarEtdComponent implements OnInit{
  idEtudiant!: number;
  hasNewNotifications: boolean = false;
  clicked: boolean = false;
  rappels !: string[];
  prevRappels: string[] = []; 
  notifications:string[]=[]; 
  name!: string;

  constructor(private route:ActivatedRoute,
    private compService:CompletionService,
   private etudiantServ: EtudiantServiceService
  ) {}



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
 this.getRappels(); 
 this.loadNotifications(); 
  }
  
  getRappels(): void {
    this.compService.getRappelByEtudiant(this.idEtudiant).subscribe(
      (data) => {
        this.rappels=data
        const prevRappels = JSON.parse(localStorage.getItem('prevRappels') || '[]');
        console.log('Nouveaux rappels (data) récupérés : ', data);
        if (prevRappels.length > 0) {
          if (!this.areRappelsEqual(data, prevRappels)) {
            console.log('Il y a de nouveaux rappels');
            this.rappels = data;
            this.hasNewNotifications=true  
          } else {
            console.log('Les rappels sont inchangés');
            this.hasNewNotifications=false  

          }
        } else {
          console.log('Première récupération des rappels');
          this.rappels = data;
        }

        localStorage.setItem('prevRappels', JSON.stringify(data));

      },
      (error) => {
        console.error('Erreur lors de la récupération des rappels', error);
      }
    );
   }

  areRappelsEqual(newRappels: string[], prevRappels: string[]): boolean {
    if (newRappels.length !== prevRappels.length) {
      return false;  
    }

    for (let i = 0; i < newRappels.length; i++) {
      if (newRappels[i] !== prevRappels[i]) {
        return false;  
      }
    }

    return true;  
  }
  OnclickBell(){
    this.clicked = !this.clicked;  
    if (this.clicked) {
      this.hasNewNotifications = false;
    }
  }

  loadNotifications(): void {
    this.compService.getNotifications(this.idEtudiant).subscribe(
      (data) => {
        this.notifications = data;
      },
      (error) => console.error('Erreur lors de la récupération des notifications:', error)
    );
  }

}
