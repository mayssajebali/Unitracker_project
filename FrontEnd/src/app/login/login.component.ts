import { Component } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) { }
  login() {
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        this.authService.saveToken(response.token);
        this.redirectBasedOnRole(); // Appel de la méthode pour rediriger en fonction du rôle
      },
      error: () => {
        this.errorMessage = 'Votre Email ou mot de passe incorrect';
      }
    });
  }

  redirectBasedOnRole() {
    const role = this.authService.getRole(); 
    const userId = this.authService.getUserId(); // Récupérer l'ID de l'utilisateur depuis le token
  
    if (role === 'prof') {
      this.router.navigate([`/dashboardProf/${userId}/listetaches`]); 
    } else if (role === 'etudiant') {
      this.router.navigate([`/dashEtd/${userId}/listetachesEtudiants`]);
    } else if (role === 'admin') {
      this.router.navigate(['/dashboard']); 
    } else {
      this.router.navigate(['/login']); 
  }
}
}
