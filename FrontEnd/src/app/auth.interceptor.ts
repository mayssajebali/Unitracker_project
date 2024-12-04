import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './services/auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // Récupérer le token d'authentification dans le service AuthService
    const token = this.authService.getToken();  // Assurez-vous que la méthode getToken() existe et renvoie le token

    // Si le token est disponible, ajouter un en-tête Authorization
    if (token) {
      const clonedRequest = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });

      // Passer la requête modifiée au prochain gestionnaire
      return next.handle(clonedRequest);
    }

    // Si aucun token, simplement passer la requête sans modification
    return next.handle(req);
  }
}