import { Component, OnInit } from '@angular/core';
import { ClasseServiceService } from 'src/app/services/classe-service.service';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';
import { ProfServiceService } from 'src/app/services/prof-service.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  totalStudents: number = 0;
  totalProfessors: number = 0;
  totalClasses: number = 0;
  totalSubjects: number = 0;

  constructor(
    private etudiantService: EtudiantServiceService,
    private profService: ProfServiceService,
    private classeService: ClasseServiceService,
    private matiereService: MatiereServiceService
  ) {}

  ngOnInit(): void {
    this.getTotalStudents();
    this.getTotalProfessors();
    this.getTotalClasses();
    this.getTotalSubjects();
  }

  getTotalStudents() {
    this.etudiantService.getEtudiants().subscribe((students) => {
      this.totalStudents = students.length;
    });
  }

  getTotalProfessors() {
    this.profService.getProfesseurs().subscribe((professors) => {
      this.totalProfessors = professors.length;
    });
  }

  getTotalClasses() {
    this.classeService.getClasses().subscribe((classes) => {
      this.totalClasses = classes.length;
    });
  }

  getTotalSubjects() {
    this.matiereService.getMatieres().subscribe((subjects) => {
      this.totalSubjects = subjects.length;
    });
  }
}