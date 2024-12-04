import { Component, OnInit  } from "@angular/core";
import { ActivatedRoute, Route, Router } from "@angular/router";
import { firstValueFrom } from "rxjs";
import { Matiere } from "src/app/classes/matiere";
import { MatiereServiceService } from "src/app/services/matiere-service.service";

@Component({
  selector: "app-listematiere",
  templateUrl: "./listematiere.component.html",
  styleUrls: ["./listematiere.component.css"],
})
export class ListematiereComponent implements OnInit{
  matieres: Matiere[] = [];
  selectedAnnee: number | null = null;
  filteredMatieres!:Matiere[];

  constructor(private matiereService: MatiereServiceService, private router:Router , private route: ActivatedRoute) {}

  async ngOnInit(): Promise<void> {
    try {

      await this.loadMatieres();  
      this.route.queryParams.subscribe(params => {
        console.log('Query Param5555555555555s:', params); 
        this.selectedAnnee = params['annee'] ? +params['annee'] : null;
        console.log('Query esssssssssssss:', this.selectedAnnee); 
        this.applyFilter(); 
      });
    } catch (error) {
      console.error("Erreur lors du chargement des matières:", error);
    }
  }
  applyFilter(): void {
    if (this.selectedAnnee !== null) {
      console.log("seleeeeeeeeect", this.selectedAnnee)
      this.filteredMatieres = this.matieres.filter(matiere => 
        matiere.classes.some(classe => classe.annee_Classe === this.selectedAnnee)
      );
    } else {
      this.filteredMatieres = [...this.matieres]; 
    }
    console.log('Filtered matieres:', this.filteredMatieres);
  }
  
  
  getClassesNames(matiere: Matiere): string {
    if (matiere.classes && matiere.classes.length > 0) {
      const uniqueClasses = new Map<string, Set<string>>();
  
      matiere.classes.forEach(c => {
        if (!uniqueClasses.has(c.nom_Classe)) {
          uniqueClasses.set(c.nom_Classe, new Set<string>());
        }
        uniqueClasses.get(c.nom_Classe)?.add(c.num_Classe.toString());
      });
  
      const result: string[] = [];
      uniqueClasses.forEach((numbers, name) => {
        result.push(`${name}: ${Array.from(numbers).join(",")}`);
      });
  
      return result.join("/ ");
    }
    return "Aucune classe";
  }
  
  getClassesYear(matiere: Matiere): string[] {
    if (matiere.classes && matiere.classes.length > 0) {
      const uniqueYears = new Set<number>();
  
      matiere.classes.forEach(c => {
        uniqueYears.add(c.annee_Classe); 
      });
  
      const yearsWithSuffix: string[] = Array.from(uniqueYears).map(year => {
        switch (year) {
          case 1:
            return `${year}er`;
          default:
            return `${year}eme`; 
        }
      });
  
      return yearsWithSuffix;
    }
    return ["Aucune Année"];
  }
  

  async loadMatieres(): Promise<void> {
    try {
      // Convert the Observable to a Promise using firstValueFrom
      const data = await firstValueFrom(this.matiereService.getMatieres());
      this.matieres = data;
      console.log("Les matières:", this.matieres);
    } catch (error) {
      console.error("Erreur lors du chargement des matières", error);
    }
  }
  deleteMatiere(id_Matiere: number): void {
    if (confirm('Are you sure you want to delete this matière?')) {
      this.matiereService.deleteMatiere(id_Matiere).subscribe(
        () => {
          alert('Matière deleted successfully');
  
          this.router.navigate(['/listmatiere']); 
        },
        (error) => {
          console.error('Error deleting matière:', error);
         
        }
      );
    }
  }
}

