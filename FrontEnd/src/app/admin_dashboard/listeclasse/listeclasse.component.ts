import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { Classe } from "src/app/classes/classe";
import { Matiere } from "src/app/classes/matiere";
import { ClasseServiceService } from "src/app/services/classe-service.service";
import { MatiereServiceService } from "src/app/services/matiere-service.service"; 

@Component({
  selector: "app-listeclasse",
  templateUrl: "./listeclasse.component.html",
  styleUrls: ["./listeclasse.component.css"],
})
export class ListeclasseComponent {
  classes: Classe[] = [];
  allMatieres: Matiere[] = [];
  selectedAnnee: number | null = null;
  filteredClasses: Classe[] = [];

  constructor(
    private classeService: ClasseServiceService,
    private matiereService: MatiereServiceService, private route: ActivatedRoute 
  ) {}

  async ngOnInit(): Promise<void> {
    try {
 
      await this.loadClasses();
      this.route.queryParams.subscribe((params: { [x: string]: string | number; }) => {
        this.selectedAnnee = params['annee'] ? +params['annee'] : null;
        this.applyFilter();
      });
    } catch (error) {
      console.error('Erreur lors du chargement des classes:', error);
    }
  }
  applyFilter(): void {
    if (this.selectedAnnee !== null) {
      this.filteredClasses = this.classes.filter(classe => classe.annee_Classe === this.selectedAnnee);
    } else {
      this.filteredClasses = this.classes;
    }
  }
  async loadClasses(): Promise<void> {
    try {
      const data = await firstValueFrom(this.classeService.getClasses());
      console.log("Raw classes data:", data);
      if (!Array.isArray(data)) {
        console.error("Expected an array of classes");
        return;
      }
      this.classes = data.map((classe: Classe) => ({
        ...classe,
        nombreMatieres: Array.isArray(classe.matieres) ? classe.matieres.length : 0,
        nombreEtudiants: Array.isArray(classe.etudiants) ? classe.etudiants.length : 0,
        nombreProfesseurs: 0, 
      }));

      this.fetchMatiereDetails();
    } catch (error) {
      console.error("Error retrieving classes:", error);
    }
  }

  fetchMatiereDetails() {
    this.matiereService.getMatieres().subscribe(
      (matieresData: Matiere[]) => {
        this.allMatieres = matieresData;

        this.classes.forEach((classe) => {
          const uniqueProfessors = new Set<number>();

          classe.matieres.forEach((matiereId) => {
            const matiere = this.allMatieres.find((m) => m.id_Matiere === matiereId);
            if (matiere) {
              matiere.professeurs.forEach((profId) => uniqueProfessors.add(profId));
            }
          });
          classe.nombreProfesseurs = uniqueProfessors.size;
        });

        console.log("Classes with professor counts:", this.classes);
      },
      (error) => {
        console.error("Error retrieving matieres:", error);
      }
    );
  }
  deleteClasse(id: number): void {
    if (confirm('Are you sure you want to delete this class?')) {
      this.classeService.deleteClasse(id).subscribe(
        () => {
          console.log('Class deleted successfully');
          this.loadClasses(); // Refresh the class list
        },
        (error) => {
          console.error('Error deleting class:', error);
        }
      );
    }
  }
}
