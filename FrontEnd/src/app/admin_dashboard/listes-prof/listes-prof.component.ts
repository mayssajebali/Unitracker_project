import { Component, OnInit } from '@angular/core';
import { Prof } from 'src/app/classes/prof';
import { Matiere } from 'src/app/classes/matiere';
import { ProfServiceService } from 'src/app/services/prof-service.service';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-listes-prof',
  templateUrl: './listes-prof.component.html',
  styleUrls: ['./listes-prof.component.css']
})
export class ListesProfComponent implements OnInit {
  profs: Prof[] = [];
  allMatieres: Matiere[] = [];

  constructor(private profService: ProfServiceService, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loadProfAndMatieres();
  }

  loadProfAndMatieres() {
    this.profService.getProfesseurs().subscribe(profsData => {
      this.profs = profsData;
      this.fetchAndAttachMatieres();
    }, error => {
      console.error('Erreur lors du chargement des profs', error);
    });
  }

  fetchAndAttachMatieres() {
    this.http.get<Matiere[]>('http://localhost:8081/matieres').subscribe(matieresData => {
      this.allMatieres = matieresData;

      // Attach full Matiere details to each Prof
      this.profs.forEach(prof => {
        prof.lesMatieres = this.allMatieres.filter(matiere => 
          matiere.id_Matiere !== undefined && prof.matieres.includes(matiere.id_Matiere)
        );
      });
    }, error => {
      console.error('Erreur lors du chargement des matieres', error);
    });
}


getClassesNames(prof: Prof): string {
  if (prof.lesMatieres && prof.lesMatieres.length > 0) {
    const uniqueClasses = new Set<string>();

    prof.lesMatieres.forEach(m => {
      if (m.classes && m.classes.length > 0) {
        m.classes.forEach(cls => {
          if (cls.nom_Classe) { // Ensuring that there is a class name
            uniqueClasses.add(cls.nom_Classe); 
          }
        });
      }
    });

    return uniqueClasses.size > 0 ? Array.from(uniqueClasses).join(", ") : "--";
  }
  return "--";
}

getGroupedClassesByYear(prof: Prof): string {
  if (prof.lesMatieres && prof.lesMatieres.length > 0) {
    const groupedClasses = new Map<number, Set<number>>();

    prof.lesMatieres.forEach(m => {
      if (m.classes && m.classes.length > 0) {
        m.classes.forEach(cls => {
          if (cls.annee_Classe && cls.num_Classe) { // Ensure we have valid year and class numbers
            if (!groupedClasses.has(cls.annee_Classe)) {
              groupedClasses.set(cls.annee_Classe, new Set<number>());
            }
            groupedClasses.get(cls.annee_Classe)?.add(cls.num_Classe);
          }
        });
      }
    });

    const result: string[] = [];
    groupedClasses.forEach((classNumbers, year) => {
      const yearLabel = year === 1 ? '1er' : `${year}eme`;
      result.push(`${yearLabel}: ${Array.from(classNumbers).sort().join(",")}`);
    });

    return result.length > 0 ? result.join(" / ") : "--";
  }
  return "--";
}


  modifierProf(id: number): void {
    this.router.navigate([`/edit-prof/${id}`]);
  }

  
  supprimerProf(id: number): void {
    if (confirm('Êtes-vous sûr de vouloir supprimer ce professeur ?')) {
      this.profService.deleteProf(id).subscribe(
        () => {
          this.profs = this.profs.filter(prof => prof.id_Professeur !== id);
        },
        (error) => {
          console.error('Erreur lors de la suppression du professeur', error);
        }
      );
    }
  }
}

