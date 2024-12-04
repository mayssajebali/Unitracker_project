import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Classe } from '../classes/classe';
import { Etudiant } from '../classes/etudiant';
import { Matiere } from '../classes/matiere';

@Injectable({
  providedIn: 'root'
})
export class ClasseServiceService {

  private Url = 'http://localhost:8081/classes'; 
  private Url2 = 'http://localhost:8081'; 

  constructor(private http: HttpClient) {}


  createClasse(classe: Classe): Observable<Classe> {
    console.log("Sending Classe:", classe); 
    return this.http.post<Classe>(this.Url, classe);
  }

  getClasses(): Observable<Classe[]> {
    return this.http.get<Classe[]>(this.Url);
  }


  getClassesByIds(classIds: number[]): Observable<Classe[]> {
    return this.http.post<Classe[]>(`${this.Url}/classes`, { ids: classIds });
  }
  getClassesByIdProf(idProf: number): Observable<Classe[]> {
    console.log("Making HTTP call to:", `${this.Url2}/${idProf}/classes`);
    return this.http.get<Classe[]>(`${this.Url2}/${idProf}/classes`);
  }

 // classe-service.service.ts
updateClasse(id_Classe: number, updatedClasse: Classe): Observable<Classe> {
  return this.http.put<Classe>(`${this.Url2}/classes/updateClasse/${id_Classe}`, updatedClasse);
}


  // Méthode pour supprimer une classe
  deleteClasse(id: number): Observable<void> {
    const url = `${this.Url}/deleteClasse/${id}`;
    return this.http.delete<void>(url);
  }
  getIdsMatieresByClasseId(id_Classe: number): Observable<number[]> {
    return this.http.get<number[]>(`${this.Url}/${id_Classe}/matieres`);
  }
  getClasseById(id: number): Observable<Classe> {
    return this.http.get<Classe>(`${this.Url}/${id}`);
  }



  
}


 
