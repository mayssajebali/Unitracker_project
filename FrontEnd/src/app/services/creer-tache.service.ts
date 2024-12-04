import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Tache } from '../classes/tache';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CreerTacheService {
  private baseUrl = 'http://localhost:8081';

  constructor(private http: HttpClient ) {}

  addTache(newTache: Tache, idProf: number): Observable<Tache> {
    let params = new HttpParams().set('idProf', idProf.toString());
    return this.http.post<Tache>(`${this.baseUrl}/createTaskByProf`, newTache, { params });
  }
  createTaskByEtudiant(idEtudiant: number, tache: Tache): Observable<Tache> {
    let params=new HttpParams().set('idEtudiant', idEtudiant.toString());
    return this.http.post<Tache>(`${this.baseUrl}/createTaskByEtdudiant`, tache, { params });
  }
  addSubTask(t: Tache,idEtudiant: number, idTacheP:number): Observable<Tache> {
    const url = `${this.baseUrl}/addSubTask?idEtudiant=${idEtudiant}&idTacheP=${idTacheP}`;
    return this.http.post<Tache>(url, t);
  }
  createTacheByEtudiant(idEtudiant: number, tache: Tache): Observable<Tache> {
    const url = `${this.baseUrl}/createTaskByEtdudiant?idEtudiant=${idEtudiant}`;
    return this.http.post<Tache>(url, tache);
  }
  getTaches(): Observable<Tache[]> {
    return this.http.get<Tache[]>('http://localhost:8081/tasks');
  }
  assignTask(idTache: number, selectedEtudiants: number[]): Observable<Tache> {
    return this.http.post<Tache>(`${this.baseUrl}/task/assign?idTache=${idTache}`, selectedEtudiants);
  }
  getTasksByEtudiant(idEtudiant: number): Observable<Tache[]> {
    const url = `${this.baseUrl}/tasksByEtudiant?idEtd=${idEtudiant}`;
    return this.http.get<Tache[]>(url);
  }
  markTaskAsCompleted(idTache: number, isCompleted: boolean): Observable<Tache> {
    const url = `${this.baseUrl}/task/mark?idTache=${idTache}&isCompleted=${isCompleted}`;
    return this.http.post<Tache>(url, null); 
  }
  getTasksByProf(idProf:number):Observable<Tache[]>{
    const url = `${this.baseUrl}/tasksByProf?idProf=${idProf}`;
    return this.http.get<Tache[]>(url);
  }

  deleteTaskByProf(idTache: number, idProf: number): Observable<boolean> {
    const url = `${this.baseUrl}/tasksByProf/${idTache}?idProf=${idProf}`;
    return this.http.delete<boolean>(url);
  }
  updateTaskByProf(idTache:number,tache:Tache):Observable<Tache>{
    const url = `${this.baseUrl}/tasksByProf/${idTache}`;
    return  this.http.put<Tache>(url,tache);

  }
  getTaskById(idtache:number):Observable<Tache>{
    const url = `${this.baseUrl}/task/${idtache}`;
    return this.http.get<Tache>(url);
  }
  updateTaskByEtud(idTache:number,tache:Tache):Observable<Tache>{
    const url = `${this.baseUrl}/tasksByEtud/${idTache}`;
    return  this.http.put<Tache>(url,tache);

  }

  deleteTaskByEtud(idTache: number, idEtud: number): Observable<boolean> {
    const url = `${this.baseUrl}/tasksByEtud/${idTache}?idEtud=${idEtud}`;
    return this.http.delete<boolean>(url);
  }

  

}
