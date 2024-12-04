import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  constructor(private router: Router) {}

  filterByAnnee(annee: number | null): void {
    this.router.navigate(['/listeclasse'], { queryParams: { annee: annee } });
  }
  filterByAnneeMatiere(annee: number | null): void {
    if (annee !== null) {
    this.router.navigate(['/listmatiere'], { queryParams: { annee: annee } });}
  }
}
