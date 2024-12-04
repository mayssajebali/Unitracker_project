import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8081'; 
  private tokenKey = 'auth-token';

  constructor(private http: HttpClient) { }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }
  saveToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

   // Vérifier si l'utilisateur est authentifié
   isAuthenticated(): boolean {
    return this.getToken() !== null;
  }
  getRole(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
      return payload.role; // Récupérer le rôle
    }
    return null;
  }
  getUserId(): string | null {
    const token = this.getToken();
    if (token) {
      const payload = JSON.parse(atob(token.split('.')[1])); // Décoder le payload
      return payload.id; // Récupérer l'ID de l'utilisateur (en supposant qu'il est présent dans le token)
    }
    return null;
  }
  // Ajouter le token aux headers des requêtes HTTP
  createAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token'); // Récupération du token
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json' // Optionnel selon les besoins
    });
  }
}
