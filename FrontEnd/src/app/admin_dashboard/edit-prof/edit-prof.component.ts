import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProfServiceService } from 'src/app/services/prof-service.service';

@Component({
  selector: 'app-edit-prof',
  templateUrl: './edit-prof.component.html',
  styleUrls: ['./edit-prof.component.css']
})
export class EditProfComponent {
  form!: FormGroup;
  profId!: string; 

  isPasswordVisible: boolean = false;

  constructor(
    private fb: FormBuilder,
    private profService: ProfServiceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
 
    this.profId = this.route.snapshot.paramMap.get("id") || '';

    this.form = this.fb.group({
      nom_Prof: ["", Validators.required],
      prenom_Prof: ["", Validators.required],
      email_Prof: ["", [Validators.required, Validators.email]],
      mot_de_passe_Prof: ["", Validators.required],
    });

  
    this.loadProfDetails();
  }

  loadProfDetails(): void {
    
    this.profService.getProf(Number(this.profId)).subscribe(
      (prof) => {
       
        this.form.patchValue({
          nom_Prof: prof.nom_Prof,
          prenom_Prof: prof.prenom_Prof,
          email_Prof: prof.email_Prof,
          mot_de_passe_Prof: prof.mot_de_passe_Prof,
        });
      },
      (error) => {
        console.error("Erreur lors de la récupération des données du professeur:", error);
      }
    );
  }

  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;
      this.profService.updateProf(Number(this.profId), formData).subscribe(
        (response) => {
          console.log("Professeur modifié avec succès:", response);
          this.router.navigate(["/listeprof"]);
        },
        (error) => {
          console.error("Erreur lors de la modification du professeur:", error);
        }
      );
    } else {
      console.log("Formulaire invalide, veuillez corriger les erreurs.");
    }
  }

  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  generatePassword(length = 8): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*@#";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  generateAndSetPassword(): void {
    const password = this.generatePassword();
    this.form.get("mot_de_passe_Prof")?.setValue(password);
    console.log("Generated password:", password);
  }

  cancel(): void {
    this.router.navigate(["/listeprof"]);
  }
}
