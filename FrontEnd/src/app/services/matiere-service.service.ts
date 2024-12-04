import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Matiere } from '../classes/matiere';
import { catchError, Observable, throwError } from 'rxjs';
import { Classe } from '../classes/classe';

@Injectable({
  providedIn: 'root'
})
export class MatiereServiceService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8081';

  addMatiere(newMat:Matiere):Observable<Matiere>{
    return this.http.post<Matiere>(`${this.baseUrl}/matieres`,newMat);
  }
  
  getMatieres(): Observable<Matiere[]> {
    return this.http.get<Matiere[]>(`${this.baseUrl}/matieres`);
}
getMatieresByProf(idProf:number): Observable<Matiere[]> {
  return this.http.get<Matiere[]>(`${this.baseUrl}/matieres/${idProf}`);
}
// getMatiereById(id: number): Observable<Matiere> {
//   return this.http.get<Matiere>(`/matiere/${this.baseUrl}/${id}`);
// }

getMatieresByIds(ids: number[]): Observable<Matiere[]> {
  const url = `${this.baseUrl}/getMatieres`;
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  return this.http.post<Matiere[]>(url, ids, { headers }).pipe(
    catchError((error) => {
      console.error('Erreur lors de la récupération des Matières:', error);
      return throwError(() => new Error('Erreur lors de la récupération des Matières.'));
    })
  );
}

getClassesIdByMatiere(matiereId: number): Observable<number[]> {
  return this.http.get<number[]>(`${this.baseUrl}/classes/by-matiere/${matiereId}`);
}

getClassesByIds(ids: number[]): Observable<Classe[]> {
  return this.http.post<Classe[]>(`${this.baseUrl}/classesBy-ids`, ids);
}


getMatiereById(id: number): Observable<Matiere> {
  return this.http.get<Matiere>(`${this.baseUrl}/matiere/${id}`);
}


getProfIdsByMatiereId(idMatiere: number): Observable<number[]> {
  return this.http.get<number[]>(`${this.baseUrl}/matiere/${idMatiere}/professeurs`);
}

deleteMatiere(id: number): Observable<string> {
  return this.http.delete<string>(`${this.baseUrl}/Matiere/${id}`);
}

updateMatiere(id: number, matiere: Matiere): Observable<Matiere> {
  const url = `${this.baseUrl}/matiere/${id}`;
  const headers = new HttpHeaders({
    'Content-Type': 'application/json'
  });

  return this.http.put<Matiere>(url, matiere, { headers }).pipe(
    catchError(error => {
      console.error('Error updating matiere:', error);
      return throwError(() => new Error('Error updating matiere'));
    })
  );
}
getIdsTachesByMatiere(idMatiere: number): Observable<number[]> {
  return this.http.get<number[]>(`${this.baseUrl}/${idMatiere}/taches`);
}

// Méthode pour récupérer les IDs des Matières d'un Etudiant
getIdsMatieresByEtudiant(idEtudiant: number): Observable<number[]> {
  return this.http.get<number[]>(`${this.baseUrl}/etudiants/${idEtudiant}/matieres`);
}

}
