import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Etudiant } from '../classes/etudiant';

@Injectable({
  providedIn: 'root'
})
export class EtudiantServiceService {
  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8081';

  addEtud(newEtud:Etudiant):Observable<Etudiant>{
    return this.http.post<Etudiant>(`${this.baseUrl}/etd`,newEtud);
  }
  
  getEtudiants(): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>('http://localhost:8081/etd').pipe(
      catchError(err => {
          console.error('Erreur lors du chargement des étudiants', err);
          return throwError(err);
      })
  );;
  }
  getEtudiantById(id:number): Observable<Etudiant> {
    return this.http.get<Etudiant>(`http://localhost:8081/etd/${id}`);
  }

  getEtudiantsByIdClasse(classeId: number): Observable<Etudiant[]> {
    return this.http.get<Etudiant[]>(`${this.baseUrl}/Etudiants/byClasse/${classeId}`);
  }
  updateEtudiant(id: number, etudiant: Etudiant): Observable<Etudiant> {
    return this.http.put<Etudiant>(`${this.baseUrl}/etudiants/${id}`, etudiant);
  }
 
   deleteEtudiant(id_Etudiant: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/etudiants/${id_Etudiant}`);
  }
}
