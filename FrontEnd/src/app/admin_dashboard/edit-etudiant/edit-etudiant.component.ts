import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Classe } from 'src/app/classes/classe';
import { Etudiant } from 'src/app/classes/etudiant';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';

@Component({
  selector: 'app-modifier-etudiant',
  templateUrl: './edit-etudiant.component.html',
  styleUrls: ['./edit-etudiant.component.css']
})
export class EditEtudiantComponent implements OnInit {
  form!: FormGroup;
  classes: Classe[] = [];
  filteredClasses: Classe[] = [];
  etudiant!: Etudiant;
  etudiantId!: string;
  selectedYear: number | null = null;
  years = [1, 2, 3];  // Define available years
  isPasswordVisible: boolean = false;


  constructor(
    private fb: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute, 
    private etudiantService: EtudiantServiceService,
    private classeService: ClasseServiceService
  ) {}

  ngOnInit(): void {
    this.etudiantId = this.activatedRoute.snapshot.paramMap.get('id')!;
    
    this.form = this.fb.group({
      nom_Etd: ['', Validators.required],
      prenom_Etd: ['', Validators.required],
      email_Etd: ['', [Validators.required, Validators.email]],
      mot_de_passe_Etd: ['', Validators.required], 
      classe: ['', Validators.required],
      numClasse: [''],
      anneeClasse: ['', Validators.required]
    });
  
    this.loadClasses();
    this.loadEtudiant(Number(this.etudiantId));
  
    // Listen for changes in the 'anneeClasse' form control
    this.form.get('anneeClasse')?.valueChanges.subscribe((year) => {
      this.selectedYear = year;
      this.filterClasses();  // Filter classes whenever the year changes
    });
  }
  loadEtudiant(id: number) {
    this.etudiantService.getEtudiantById(id).subscribe(
      (etudiant: Etudiant) => {
        this.etudiant = etudiant;
        
        this.form.patchValue({
          nom_Etd: this.etudiant.nom_Etd,
          prenom_Etd: this.etudiant.prenom_Etd,
          email_Etd: this.etudiant.email_Etd,
          mot_de_passe_Etd: this.etudiant.mot_de_passe_Etd,
          classe: this.etudiant.classe,  // Ensure the class object is correctly set
          numClasse: this.etudiant.numClasse,
          anneeClasse: this.etudiant.anneeClasse
        });
  
        // Set selected year based on etudiant's current class year
        this.selectedYear = this.etudiant.anneeClasse;
        this.filterClasses();  // Filter classes initially based on etudiant's year
      },
      (error) => {
        console.error('Erreur lors du chargement de l\'étudiant:', error);
      }
    );
  }
  
  loadClasses() {
    this.classeService.getClasses().subscribe(
      (data) => {
        this.classes = data;
  
        // Ensure filter is applied only when classes and selectedYear are both available
        if (this.selectedYear !== null) {
          this.filterClasses();
        }
      },
      (error) => {
        console.error('Erreur lors du chargement des classes:', error);
      }
    );
  }

  onYearChange(year: number) {
    this.selectedYear = year;
    this.filterClasses();  
  }

  filterClasses() {
    if (this.selectedYear !== null) {
      this.filteredClasses = this.classes.filter(
        (classe) => classe.annee_Classe.toString() === this.selectedYear?.toString()
      );
    }
  }

  onSubmit(): void {
    console.log('Tentative de soumission du formulaire...');

    if (this.form.valid) {
        console.log('Formulaire valide. Préparation des données pour l\'envoi...');

        const formData = { ...this.form.value };

        formData.email_Etd = formData.email_Etd.trim();
        formData.nom_Etd = formData.nom_Etd.trim();
        formData.prenom_Etd = formData.prenom_Etd.trim();

        if (typeof formData.classe === 'object' && formData.classe !== null) {
            console.log('Classe correcte reçue comme objet:', formData.classe);
        } else {
            console.error('Erreur: la classe n\'est pas un objet valide. Valeur actuelle:', formData.classe);
            return;  
        }

        console.log('Données du formulaire après validation:', formData);

        this.etudiantService.updateEtudiant(Number(this.etudiantId),formData ).subscribe(
            response => {
                console.log('Étudiant ajouté avec succès:', response);
                this.router.navigate(['/listeetud']);
            },
            error => {
                console.error('Erreur lors de l\'ajout de l\'étudiant:', error);
            }
        );
    } else {
        console.error('Formulaire invalide. Veuillez corriger les erreurs suivantes :');

        Object.keys(this.form.controls).forEach(key => {
            const controlErrors = this.form.get(key)?.errors;
            if (controlErrors) {
                console.error(`Erreur dans le champ "${key}":`, controlErrors);
            } else {
                console.log(`Le champ "${key}" est valide.`);
            }
        });

        console.log('Contenu actuel du formulaire:', this.form.value);
    }
}

togglePasswordVisibility(): void {
  this.isPasswordVisible = !this.isPasswordVisible;
}

  // Cancel form submission and navigate back to student list
  cancel(): void {
    this.router.navigate(['/listeetud']);
  }
}