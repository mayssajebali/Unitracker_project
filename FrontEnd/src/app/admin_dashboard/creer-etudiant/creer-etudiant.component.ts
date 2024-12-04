import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Classe } from 'src/app/classes/classe';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';

@Component({
  selector: 'app-creer-etudiant',
  templateUrl: './creer-etudiant.component.html',
  styleUrls: ['./creer-etudiant.component.css']
})
export class CreerEtudiantComponent implements OnInit {
  form!: FormGroup;
  classes: Classe[] = [];
  uniqueClasses: string[] = [];
  filteredClasses: Classe[] = [];
  alertVisible1: boolean = false; // Alert for successful submission
  alertVisible2: boolean = false; // Alert for form validation error
  alertVisible3: boolean = false; // Alert for class not found

  // Constructor to inject necessary services
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private etudiantService: EtudiantServiceService,
    private classeService: ClasseServiceService
  ) {}

  isPasswordVisible: boolean = false; // Control visibility of the password

  ngOnInit(): void {
    // Initialize form group with validation
    this.form = this.fb.group({
      nom_Etd: ['', Validators.required],
      prenom_Etd: ['', Validators.required],
      email_Etd: ['', [Validators.required]],
      mot_de_passe_Etd: ['', Validators.required], // Password will be auto-generated
      adresse_Etd: [null],
      redoublant: ['false'],
      date_de_naissance_Etd: [null],
      sexe_Etd: [null],
      telephone_Etd: [null],
      cin_Etd: [null],
      classe: ['', Validators.required],
      numClasse: [''],
      anneeClasse: ['', Validators.required],
      role:["etudiant"],
    });

    this.loadClasses(); // Load classes on component initialization
  }

  // Handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      // Process form data if valid
      const formData = { ...this.form.value };
      formData.email_Etd = formData.email_Etd.trim();
      formData.nom_Etd = formData.nom_Etd.trim();
      formData.prenom_Etd = formData.prenom_Etd.trim();

      // Ensure the 'classe' is an object before submitting
      if (typeof formData.classe === 'object' && formData.classe !== null) {
        this.etudiantService.addEtud(formData).subscribe(
          response => {
            this.alertVisible1 = true; // Show success alert
            setTimeout(() => { 
              this.alertVisible1 = false; 
              this.router.navigate(['/listeetud']); // Navigate to the list of students after submission
            }, 2000);
          },
          error => {
            this.alertVisible2 = true; // Show error alert
            setTimeout(() => { this.alertVisible2 = false; }, 2000);
          }
        );
      } else {
        console.error('Invalid class selection.');
      }
    } else {
      // Handle invalid form
      this.alertVisible2 = true;
      setTimeout(() => { this.alertVisible2 = false; }, 2000);
      this.logFormErrors();
    }
  }

  // Log form field errors for debugging
  private logFormErrors(): void {
    Object.keys(this.form.controls).forEach(key => {
      const controlErrors = this.form.get(key)?.errors;
      if (controlErrors) {
        console.error(`Error in field "${key}":`, controlErrors);
      } else {
        console.log(`Field "${key}" is valid.`);
      }
    });
  }

  // Handle class selection change
  onClasseChange(event: Event): void {
    const selectedClassValue = (event.target as HTMLSelectElement).value;
    const selectedClass = this.classes.find(c => c.nom_Classe === selectedClassValue);

    if (selectedClass) {
      // Update form with selected class data
      this.form.patchValue({
        classe: selectedClass,
        numClasse: selectedClass.num_Classe
      });
    } else {
      console.error('Class not found for the selected value.');
    }
  }

  // Filter classes based on the selected year
  onYearChange(): void {
    const selectedYear = this.form.get('anneeClasse')?.value;
    if (selectedYear) {
      this.filteredClasses = this.classes.filter(c => c.annee_Classe === selectedYear);
    } else {
      this.filteredClasses = [];
    }
  }

  // Load classes from the server
  loadClasses(): void {
    this.classeService.getClasses().subscribe((data) => {
      if (data.length === 0) {
        this.alertVisible3 = true;
      }else{
        this.alertVisible3 = false;
      }
      this.classes = data;
      this.uniqueClasses = [...new Set(this.classes.map(classe => classe.nom_Classe))]; // Ensure uniqueness
    });
  }

  // Generate a random password for the student
  generatePassword(length = 8): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*@#";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  // Toggle password visibility
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Auto-generate and set the password field
  generateAndSetPassword(): void {
    const password = this.generatePassword();
    this.form.get('mot_de_passe_Etd')?.setValue(password);
    console.log('Generated password:', password);
  }

  // Cancel form submission and navigate back to student list
  cancel(): void {
    this.router.navigate(['/listeetud']);
  }
}
