import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Completion } from 'src/app/classes/completion';
import { Tache } from 'src/app/classes/tache';
import { CompletionService } from 'src/app/services/completion.service';
import { CreerTacheService } from 'src/app/services/creer-tache.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';

@Component({
  selector: 'app-listefiltree',
  templateUrl: './listefiltree.component.html',
  styleUrls: ['./listefiltree.component.css']
})
export class ListefiltreeComponent implements OnInit {
  tacheForm!: FormGroup;
  doneTasks: Tache[] = [];
  todoTasks: Tache[] = [];
  inProgressTasks: Tache[] = [];
  idEtudiant!: number; 
  marked!: Completion;
  idMatiere: number = 0; 
  comment!:String;
  selectedTacheId: number | null = null;
  totalStudentSubtasks: number = 0;
  taches2: Tache[] = [];  
 

  intervalId: any = null; // Pour stocker l'ID de l'intervalle et pouvoir le nettoyer plus tard
  timers: { [tacheId: number]: { running: boolean, tempsEcoule: number } } = {};
  selectedTask: any; // Remplacez par la structure exacte de la tâche que vous utilisez

  tempsEcoule: number = 0;
  running: boolean = false;
  
  times: { [key: number]: number } = {}; 

  
    taskUpdates$ = new BehaviorSubject<void>(undefined); // Emit changes to trigger updates


  constructor(private cd: ChangeDetectorRef,private fb: FormBuilder,private tacheService: CreerTacheService, private route: ActivatedRoute, private CompServ: CompletionService,     private matiereService: MatiereServiceService) { }

  ngOnInit(): void { 
     this.idEtudiant = Number(this.route.snapshot.paramMap.get('id')); 
     this.idMatiere = +this.route.snapshot.paramMap.get('idMatiere')!;
    this.loadTaches();

    this.tacheForm = this.fb.group({
      titre: ['', Validators.required]
    });

    
    //this.retrieveSavedTimers();
    this.loadChronometreState();
    this.calculateStudentProgression();

    this.taskUpdates$.subscribe(() => {
      this.cd.detectChanges();
      this.cd.markForCheck();

    });
  
  // Récupérer les temps sauvegardés dans localStorage
  // this.taches.forEach(tache => {
  //   const savedTime = localStorage.getItem(`timer-${tache.id_Tache}`);
  //   if (savedTime) {
  //     this.times[tache.id_Tache] = parseInt(savedTime, 10);
  //   }
  // });


      this.taskUpdates$.subscribe(() => {
      this.cd.detectChanges();
  });


    

  }



  loadTasks() {
    this.tacheService.getTasksByEtudiant(this.idEtudiant).subscribe(
      (response: Tache[]) => {
        this.taches2 = response.filter(tache => !tache.tachePrincipale);  
        this.updateTaskLists(); 
        this.taskUpdates$.next(); // Trigger view update

      },
      (error) => {
        console.error('Erreur lors de la récupération des tâches:', error);
      }
    );
  }






  loadTaches(): void {

    this.matiereService.getIdsTachesByMatiere(this.idMatiere).subscribe(
      (tachesIds) => {
        if (!tachesIds || tachesIds.length === 0) {
          console.warn('Aucune tâche trouvée pour cette matière.');
          this.taches2 = [];
          return;
        }
    
        console.log('Tâches associées à cette matière :', tachesIds);
  
        const tachesObservableArray = tachesIds.map((id) =>
          this.tacheService.getTaskById(id)
        );

        forkJoin(tachesObservableArray).subscribe(
          (tachesDetails) => {
            console.log('Détails des tâches récupérés :', tachesDetails);
            this.taches2 = tachesDetails; 
            this.taches2 = tachesDetails.filter(tache => !tache.tachePrincipale);  
            this.updateTaskLists(); 
            this.taskUpdates$.next();
          },
          (error) => {
            console.error('Erreur lors de la récupération des détails des tâches:', error);
            this.taches2 = []; 
          }
        );
      },
      (error) => {
        console.error('Erreur lors de la récupération des IDs des tâches:', error);
        this.taches2 = []; // Gère le cas où une erreur survient
      }
    );
    
  }



  

  addSubTask(tache:Tache){
    this.selectedTacheId = tache.id_Tache;
    if (this.tacheForm.valid) {
      
      const t = this.tacheForm.value;
      this.tacheService.addSubTask(t,this.idEtudiant,tache.id_Tache).subscribe(
        (updatedTache: Tache) => {
          
          tache.completions=updatedTache.completions;
          tache.sousTaches = [...updatedTache.sousTaches];
          console.log('soustache ajoutee avec succee', tache.completions);
          this.updateMainTaskCompletion(tache,this.idEtudiant);
          this.cd.detectChanges();
          this.cd.markForCheck();

          this.tacheForm.reset();
                
        },
      error => {
        console.error('Erreur lors de l\'ajout de la tâche:', error,t);
      }
    );
    
  
  } else {
    console.log('Formulaire invalide, veuillez corriger les erreurs.');
  }
  }
  updateTaskLists() {
    this.doneTasks = this.taches2.filter(tache => 
      tache.completions.some(completion => completion.marquer === true && completion.etudiant === this.idEtudiant)
    );
    
    this.todoTasks = this.taches2.filter(tache => 
      tache.sousTaches.every(subtask => 
        !subtask.completions.some(completion => completion.marquer === true && completion.etudiant === this.idEtudiant)
      )
    );
   

    this.inProgressTasks = this.taches2.filter(tache => 
      tache.sousTaches.some(subtask => 
        subtask.completions.some(completion => completion.marquer === true && completion.etudiant === this.idEtudiant)
      ) &&
      !tache.sousTaches.every(subtask => 
        subtask.completions.some(completion => completion.marquer === true && completion.etudiant === this.idEtudiant)
      )
    );
  }
  updateMainTaskCompletion(task: Tache, etudiantId: number) {
     
    let totalCompleted = 0;
    let totalSubtasks = task.sousTaches.length;
  
    // Calculate how many subtasks are marked as completed
    task.sousTaches.forEach(subtask => {
      const subtaskCompletion = subtask.completions.find(c => c.etudiant === etudiantId);
      if (subtaskCompletion && subtaskCompletion.marquer) {
        totalCompleted++;
        
      }
      this.updateTaskLists();

    });
  
    // Update the main task's completion progress
    const mainCompletion = task.completions.find(c => c.etudiant === etudiantId);
    if (mainCompletion) {
      mainCompletion.progression = totalCompleted;
      mainCompletion.marquer = totalCompleted === totalSubtasks;
      this.taskUpdates$.next();
      this.cd.markForCheck();
      this.updateTaskLists();

    }
  }

  deleteTask(idTache: number, idEtudiant: number): void {
    this.tacheService.deleteTaskByEtud(idTache, idEtudiant).subscribe(
      (response: boolean) => {
        if (response) {
          console.log('Tâche supprimée avec succès.');
          this.taches2 = this.taches2.filter(tache => tache.id_Tache !== idTache);
          this.updateTaskLists();
          this.selectedTask = null;
        } else {
          console.log('La tâche n\'a pas été trouvée ou n\'appartient pas au professeur.');
        }
      },
      error => {
        console.error('Erreur lors de la suppression de la tâche:', error);
      }
    );
  }

  markTaskAsCompleted(tacheId: number, etudiantId: number, isCompleted: boolean) {

    this.CompServ.markTaskAsCompleted(tacheId, etudiantId, isCompleted).subscribe(
      
      (updatedCompletion: Completion) => {
        this.loadTaches;
        this.updateTaskLists();
        this.cd.detectChanges();
        this.cd.markForCheck();

        const task = this.taches2.find(t => t.id_Tache === tacheId);
        if (task) {
          // Update the main task completion (marquer and progression)
          const completion = task.completions.find(c => c.etudiant === etudiantId);
          if (completion) {
            completion.marquer = updatedCompletion.marquer;
            completion.progression = updatedCompletion.progression;
            
          }
    
          // Now handle the subtasks
          task.sousTaches.forEach(subtask => {
            const subtaskCompletion = subtask.completions.find(c => c.etudiant === etudiantId);
            if (subtaskCompletion) {
              subtaskCompletion.marquer = isCompleted;
              subtaskCompletion.progression = isCompleted ? subtaskCompletion.totalSoustTaches : 0;
            }
          });
          
          console.log('Tâche marquée comme complétée:', updatedCompletion);
          this.updateTaskLists();
          this.cd.detectChanges();
          this.cd.markForCheck();

    }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la tâche:', tacheId, etudiantId, isCompleted, error);
      }
      
    );
  }
  markSubTaskAsCompleted(tacheId: number, etudiantId: number, isCompleted: boolean) {
    this.CompServ.markSubTaskAsCompleted(tacheId, etudiantId, isCompleted).subscribe(
      (updatedCompletion: Completion) => {
        const task = this.taches2.find(t => t.id_Tache === tacheId);
        if (task) {
          // Update the main task completion (marquer and progression)
          const completion = task.completions.find(c => c.etudiant === etudiantId);
          if (completion) {
            completion.marquer = updatedCompletion.marquer;
            completion.progression = updatedCompletion.progression;
          }
    
          // Now handle the subtasks
          task.sousTaches.forEach(subtask => {
            const subtaskCompletion = subtask.completions.find(c => c.etudiant === etudiantId);
            if (subtaskCompletion) {
              subtaskCompletion.marquer = isCompleted;
              subtaskCompletion.progression = isCompleted ? subtaskCompletion.totalSoustTaches : 0;
            }
          });
          
          console.log('Tâche marquée comme complétée:', updatedCompletion);
          this.updateTaskLists();
          this.taskUpdates$.next();  // Trigger view update
          this.cd.detectChanges();
          this.cd.markForCheck();
      

    }
      },
      (error) => {
        console.error('Erreur lors de la mise à jour de la tâche:', tacheId, etudiantId, isCompleted, error);
      }
    );
  }
  chooseDiff(c: Completion,tacheId: number)  {
    const difficulty=c.complexite;
    this.CompServ.chooseDiff(tacheId,c.etudiant,difficulty).subscribe((updatedCompletion: Completion) => {
      c.complexite = updatedCompletion.complexite; 
      console.log('difficultee choisit:', updatedCompletion);
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de la tâche:', error, tacheId,c.etudiant,difficulty);
    });
    
  }

  // retrieveSavedTimers() {
  //   this.todoTasks.forEach(task => {
  //     this.tacheService.getTimerForTask(task.id_Tache, this.idEtudiant).subscribe(
  //       (timerData: { elapsedTime: number }) => {
  //         if (timerData) {
  //           this.times[task.id_Tache] = timerData.elapsedTime;
  //         }
  //       },
  //       error => {
  //         console.error('Erreur lors de la récupération des minuteries:', error);
  //       }
  //     );
  //   });
  // }
  // toggleTimer(tacheId: number): void {
  //   if (this.timers[tacheId] && this.timers[tacheId].running) {
  //     this.pauseChronometre();
  //   } else {
  //     this.startChronometre(); // Lancer le chronomètre
  //   }
  // }
 
  loadChronometreState(): void {
    
    const savedState = JSON.parse(localStorage.getItem('timers') || '{}');
    const savedTask = savedState[this.selectedTask.id_Tache];
  console.log("savedState", savedState);
  console.log("savedTask", savedTask);

    if (savedTask) {
      // Restore from localStorage
      this.timers[this.selectedTask.id_Tache] = {
        running: savedTask.running,
        tempsEcoule: savedTask.tempsEcoule || 0
      };
      this.tempsEcoule = this.timers[this.selectedTask.id_Tache].tempsEcoule;
  
      if (this.timers[this.selectedTask.id_Tache].running) {
        this.startUpdatingTempsEcoule();
      }
      this.cd.detectChanges();
    }
  
    // Then, make a backend call to ensure the state is up-to-date
    this.CompServ.getChronometreState(this.selectedTask.id_Tache, this.idEtudiant).subscribe(
      (response: any) => {
        if (response) {
          this.timers[this.selectedTask.id_Tache] = {
            running: response.running,
            tempsEcoule: response.tempsEcoule || 0
          };
          this.tempsEcoule = this.timers[this.selectedTask.id_Tache].tempsEcoule;
  
          if (this.timers[this.selectedTask.id_Tache].running) {
            this.startUpdatingTempsEcoule();
          }
  
          // Sync the state with localStorage
          const timersState = JSON.parse(localStorage.getItem('timers') || '{}');
          timersState[this.selectedTask.id_Tache] = {
            running: response.running,
            tempsEcoule: response.tempsEcoule || 0
          };
          localStorage.setItem('timers', JSON.stringify(timersState));
  
          this.cd.detectChanges();
        }
      },
      (error) => {
        console.error("Erreur lors du chargement de l'état du chronomètre", error);
      }
    );
  }
  

  startChronometre(): void {
    // Check if there is an existing timer state in localStorage
    const savedTimers = JSON.parse(localStorage.getItem('timers') || '{}');
    const savedTask = savedTimers[this.selectedTask.id_Tache];
  
    if (savedTask && savedTask.running) {
      // If the task is already running, do not restart it, just resume
      this.tempsEcoule = savedTask.tempsEcoule; // Set elapsed time to saved value
    } else {
      // If it's not running, start from the current time
      this.tempsEcoule = this.tempsEcoule || 0;
    }
  
    // Mark the timer as running and save it back to localStorage
    this.timers[this.selectedTask.id_Tache] = { running: true, tempsEcoule: this.tempsEcoule };
    savedTimers[this.selectedTask.id_Tache] = this.timers[this.selectedTask.id_Tache];
    localStorage.setItem('timers', JSON.stringify(savedTimers));
  
    // Start the chronometer
    this.CompServ.startChronometre(this.selectedTask.id_Tache, this.idEtudiant).subscribe(
      (response) => {
        this.startUpdatingTempsEcoule(); // Démarrer la mise à jour du temps écoulé
      },
      (error) => {
        console.error('Erreur lors du démarrage du chronomètre', error);
      }
    );
  }
  

  pauseChronometre(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId); // Stop updating elapsed time
    }
  
    // Save the paused state to localStorage
    const savedTimers = JSON.parse(localStorage.getItem('timers') || '{}');
    this.timers[this.selectedTask.id_Tache].running = false; // Mark the timer as paused
    savedTimers[this.selectedTask.id_Tache] = this.timers[this.selectedTask.id_Tache]; // Save updated state
    localStorage.setItem('timers', JSON.stringify(savedTimers));
  
    // Make API call to pause the chronometer
    this.CompServ.pauseChronometre(this.selectedTask.id_Tache, this.idEtudiant, this.tempsEcoule).subscribe(
      (response) => {
        console.log('Chronometer paused successfully');
        this.cd.detectChanges(); // Update the UI
      },
      (error) => {
        console.error('Error while pausing the chronometer', error);
      }
    );
  }
  

  startUpdatingTempsEcoule(): void {
    this.intervalId = setInterval(() => {
      this.tempsEcoule++;
      this.timers[this.selectedTask.id_Tache].tempsEcoule = this.tempsEcoule;
  
      // Save the updated state to localStorage
      const timersState = JSON.parse(localStorage.getItem('timers') || '{}');
      timersState[this.selectedTask.id_Tache] = {
        running: true,
        tempsEcoule: this.tempsEcoule,
      };
      localStorage.setItem('timers', JSON.stringify(timersState));
  
      this.cd.detectChanges();
    }, 1000);
  }

  formatTime(time: number): string {
    const hours = Math.floor(time / 3600).toString().padStart(2, '0');
    const minutes = Math.floor((time % 3600) / 60).toString().padStart(2, '0');
    const seconds = (time % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }
addComment(idTache: number,comment:String,c:Completion){
  
  console.log(comment);
  this.CompServ.addComment(idTache,this.idEtudiant,comment).subscribe(
    (updatedCompletion: Completion) => {
      c.commentaires = updatedCompletion.commentaires;
      this.comment=""; 
      this.taskUpdates$.next(); // Trigger view update

      console.log('commentaire ajoutee avec succee', updatedCompletion);
            
    },
    (error) => {
      console.error('Erreur lors de la mise à jour de la tâche:', idTache,this.idEtudiant,error);
    }
  );
}


calculateStudentProgression() {
  // Filtrer les sous-tâches pour cet étudiant uniquement
  const studentSubtasks = this.selectedTask.sousTaches.filter((subtask: any) =>
    subtask.completions.some((completion: any) => completion.etudiant === this.idEtudiant)
  );

  // Calculer le total de sous-tâches pour cet étudiant
  this.totalStudentSubtasks = studentSubtasks.length;
}

openTaskDetails(tache: Tache): void {
  this.selectedTask = tache;

  // Retrieve saved timers from localStorage
  const savedTimers = JSON.parse(localStorage.getItem('timers') || '{}');
  const savedTask = savedTimers[this.selectedTask.id_Tache];

  if (savedTask) {
    // Restore the timer state but pause it
    this.timers[this.selectedTask.id_Tache] = {
      running: false, // Ensure the timer is paused
      tempsEcoule: savedTask.tempsEcoule || 0
    };
    this.tempsEcoule = this.timers[this.selectedTask.id_Tache].tempsEcoule;
  } else {
    // If no saved state is found, initialize the timer for this task
    this.timers[this.selectedTask.id_Tache] = { running: false, tempsEcoule: 0 };
    this.tempsEcoule = 0;
  }

  // Save the updated (paused) state back to localStorage
  savedTimers[this.selectedTask.id_Tache] = this.timers[this.selectedTask.id_Tache];
  localStorage.setItem('timers', JSON.stringify(savedTimers));

  this.cd.detectChanges(); // Update the UI
}

  closeTaskDetails() {
    this.selectedTask = null;
    this.taskUpdates$.next();
    this.cd.detectChanges();
    this.cd.markForCheck();
    this.updateTaskLists();
  }
}
