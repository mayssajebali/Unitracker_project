import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { ProfServiceService } from "src/app/services/prof-service.service";

@Component({
  selector: "app-creer-prof",
  templateUrl: "./creer-prof.component.html",
  styleUrls: ["./creer-prof.component.css"],
})
export class CreerProfComponent implements OnInit {
  form!: FormGroup;
  isPasswordVisible: boolean = false;
  alertVisible1: boolean = false;
  alertVisible2: boolean = false;

  // Inject services and dependencies through constructor
  constructor(
    private fb: FormBuilder,  // FormBuilder to manage the form
    private profService: ProfServiceService, // Service to handle Prof data
    private router: Router // Router to navigate between pages
  ) {}

  // Initialize the form group and set up validation
  ngOnInit(): void {
    this.form = this.fb.group({
      nom_Prof: ["", Validators.required],
      prenom_Prof: ["", Validators.required],
      email_Prof: ["", [Validators.required, Validators.email]],
      cin_Prof: [null],
      sexe_Prof: [null],
      telephone_Prof: [null],
      mot_de_passe_Prof: ["", Validators.required],
      role:["prof"],
    });
  }

  // Handle form submission
  onSubmit(): void {
    if (this.form.valid) {
      const formData = this.form.value;

      // Call the service to add the professor data
      this.profService.addProf(formData).subscribe(
        (response) => {
          this.showSuccessAlert();
        },
        (error) => {
          this.showErrorAlert();
        }
      );
    } else {
      this.showErrorAlert();
    }
  }

  // Display success alert and navigate to the list page
  private showSuccessAlert(): void {
    this.alertVisible1 = true;
    setTimeout(() => {
      this.alertVisible1 = false;
      this.router.navigate(["/listeprof"]);
    }, 2000);
  }

  // Display error alert
  private showErrorAlert(): void {
    this.alertVisible2 = true;
    setTimeout(() => {
      this.alertVisible2 = false;
    }, 2000);
  }

  // Generate a random password with the specified length
  private generatePassword(length = 8): string {
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789*@#";
    let password = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  // Toggle the visibility of the password field
  togglePasswordVisibility(): void {
    this.isPasswordVisible = !this.isPasswordVisible;
  }

  // Generate a password and set it in the form
  generateAndSetPassword(): void {
    const password = this.generatePassword();
    this.form.get("mot_de_passe_Prof")?.setValue(password);
    console.log("Generated password:", password);
  }

  // Navigate to the professor list page without submitting
  cancel(): void {
    this.router.navigate(["/listeprof"]);
  }
}
