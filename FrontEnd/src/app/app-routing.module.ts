import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin Dashboard Components
import { DashboardComponent } from './admin_dashboard/dashboard/dashboard.component';
import { ListesProfComponent } from './admin_dashboard/listes-prof/listes-prof.component';
import { ListesEtudiantsComponent } from './admin_dashboard/listes-etudiants/listes-etudiants.component';
import { ListeclasseComponent } from './admin_dashboard/listeclasse/listeclasse.component';
import { ListematiereComponent } from './admin_dashboard/listematiere/listematiere.component';
import { CreerProfComponent } from './admin_dashboard/creer-prof/creer-prof.component';
import { CreerEtudiantComponent } from './admin_dashboard/creer-etudiant/creer-etudiant.component';
import { CreerClasseComponent } from './admin_dashboard/creer-classe/creer-classe.component';
import { CreerMatiereComponent } from './admin_dashboard/creer-matiere/creer-matiere.component';
import { EditEtudiantComponent } from './admin_dashboard/edit-etudiant/edit-etudiant.component';

// Error Component
import { ErrorComponent } from './admin_dashboard/error/error.component';

// Professor Dashboard Components
import { CreerTacheComponent } from './prof_dashboard/creer-tache/creer-tache.component';
import { DashProfComponent } from './prof_dashboard/dash-prof/dash-prof.component';
import { ListetachesComponent } from './prof_dashboard/listetaches/listetaches.component';
import { AssignerTacheComponent } from './prof_dashboard/assigner-tache/assigner-tache.component';
import { UpdateTacheComponent } from './prof_dashboard/update-tache/update-tache.component';

// Student Dashboard Components
import { DashboardEtdComponent } from './dashboard_Etd/dashboard-etd/dashboard-etd.component';
import { CreertacheComponent } from './dashboard_Etd/creertache-perso/creertache.component';
import { ListetachepersoComponent } from './dashboard_Etd/listetacheperso/listetacheperso.component';
import { CreergroupeComponent } from './dashboard_Etd/creergroupe/creergroupe.component';
import { ModifierTacheComponent } from './dashboard_Etd/modifier-tache/modifier-tache.component';
import { UpdateClasseComponent } from './admin_dashboard/update-classe/update-classe.component';
import { EditProfComponent } from './admin_dashboard/edit-prof/edit-prof.component';
import { UpdateMatiereComponent } from './admin_dashboard/update-matiere/update-matiere.component';
import { LoginComponent } from './login/login.component';
import { AdminGuard } from './guards/admin.guard';
import { ProfGuard } from './guards/prof.guard';
import { EtudiantGuard } from './guards/etudiant.guard';
import { ListefiltreeComponent } from './dashboard_Etd/listefiltree/listefiltree.component';

const routes: Routes = [

  {path:'login',title:"S'authentifier",component:LoginComponent},


  // Admin Routes
  { path: 'dashboard', title: 'Admin', component: DashboardComponent ,canActivate: [AdminGuard]},
  { path: 'listeprof', title: 'Les Professeurs', component: ListesProfComponent,canActivate: [AdminGuard] },
  { path: 'edit-prof/:id', title: 'Modifier Professeur', component: EditProfComponent,canActivate: [AdminGuard] },
  { path: 'listeetud', title: 'Les Étudiants', component: ListesEtudiantsComponent,canActivate: [AdminGuard] },
  { path: 'edit-etudiant/:id', title: 'Modifier Étudiant', component: EditEtudiantComponent,canActivate: [AdminGuard] },
  { path: 'listeclasse', title: 'Les Classes', component: ListeclasseComponent,canActivate: [AdminGuard] },
  { path: 'listmatiere', title: 'Les Matières', component: ListematiereComponent,canActivate: [AdminGuard] },
  
  { path: 'profs', title: 'Créer Professeur', component: CreerProfComponent,canActivate: [AdminGuard] },
  { path: 'etd', title: 'Créer Étudiant', component: CreerEtudiantComponent,canActivate: [AdminGuard] },
  { path: 'classe', title: 'Créer Classe', component: CreerClasseComponent,canActivate: [AdminGuard] },
  { path: 'mat', title: 'Créer Matière', component: CreerMatiereComponent,canActivate: [AdminGuard] },
  { path: 'updateClasse/:id', title: 'updateClasse', component: UpdateClasseComponent,canActivate: [AdminGuard] },
  { path: 'updateMatiere/:id', title: 'updateClasse', component: UpdateMatiereComponent,canActivate: [AdminGuard] },

  // Professor Routes
  { path: 'dashboardProf/:id/creerTache', title: 'Créer Tâche', component: CreerTacheComponent,canActivate: [ProfGuard] },
  { path: 'dashboardProf/:id', title: 'Professeur', component: DashProfComponent,canActivate: [ProfGuard] },
  { path: 'dashboardProf/:id/listetaches', title: 'Liste des Tâches', component: ListetachesComponent,canActivate: [ProfGuard] },
  { path: 'dashboardProf/:id/listetaches/:idMatiere', title: 'Liste des Tâches', component: ListetachesComponent,canActivate: [ProfGuard] },
  { path: 'assignerTache/:id', title: 'Attribuer Tâche', component: AssignerTacheComponent,canActivate: [ProfGuard] },
  { path: 'dashboardProf/:id/taches/:idTache', title: 'Modifier Tâche', component: UpdateTacheComponent,canActivate: [ProfGuard] },

  // Student Routes
  { path: 'dashEtd/:id', title: 'Étudiant', component: DashboardEtdComponent,canActivate: [EtudiantGuard] },
  { path: 'dashEtd/:id/creertacheperso', title: 'Créer Tâche ', component: CreertacheComponent,canActivate: [EtudiantGuard] },
  { path: 'dashEtd/:id/listetachesEtudiants', title: 'Liste des Tâches', component: ListetachepersoComponent,canActivate: [EtudiantGuard] },
  { path: 'dashEtd/:id/listetachesEtudiants/:idMatiere', title: 'Liste des Tâches', component: ListetachepersoComponent,canActivate: [EtudiantGuard] },
  { path: 'dashEtd/:id/personelTache/:varPersonnelle', title: 'Liste des Tâches', component: ListetachepersoComponent,canActivate: [EtudiantGuard] },
  { path: 'creerGroupe', title: 'Créer Groupe', component: CreergroupeComponent ,canActivate: [EtudiantGuard]},
  { path: 'dashboardEtud/:id/taches/:idTache', title: 'Modifier Tâche', component: ModifierTacheComponent,canActivate: [EtudiantGuard] },
  {
    path: 'dashEtd/:idEtudiant/listreFiltrée/:idMatiere', 
    component: ListefiltreeComponent, canActivate: [EtudiantGuard] 
  },

  // Default and Error Routes
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: '**', title: 'Erreur', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
