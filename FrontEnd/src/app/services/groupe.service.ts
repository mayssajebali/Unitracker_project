import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Groupe } from '../classes/groupe';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GroupeService {

  constructor(private http:HttpClient) { }
  private baseUrl = 'http://localhost:8081';

  addGroupe(groupe: Groupe): Observable<Groupe> {
    return this.http.post<Groupe>(`${this.baseUrl}/createGroupe`, groupe);
  }
}
