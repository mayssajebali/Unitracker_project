import { Component, AfterViewInit, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Matiere } from 'src/app/classes/matiere';
import { Tache } from 'src/app/classes/tache';
import { CreerTacheService } from 'src/app/services/creer-tache.service';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';
import { MatiereServiceService } from 'src/app/services/matiere-service.service';
// Adjust the path

@Component({
  selector: 'app-dashboard-etd',
  templateUrl: './dashboard-etd.component.html',
  styleUrls: ['./dashboard-etd.component.css'],
})
export class DashboardEtdComponent implements AfterViewInit,OnInit {
  idEtudiant!: number; 

  charts = [
    {
      id: 'tasksOverviewChart',
      titre: 'Aperçu des tâches',
      description: 'Une répartition des tâches par statut.',
      type: 'doughnut',
      labels: ['To Do', 'In Progress', 'Done'],
      donnees: [30, 30, 40],
      couleurs: ['#2786e8', '#73b4e8', '#0e4178'],
    },
    {
      id: 'tasksComplexityChart',
      titre: 'Complexité des tâches',
      description: 'Catégories de complexité à travers les modules.',
      type: 'barres',
      labels: ['Web', 'Mobile', 'NodeJS', 'SOA', 'Flutter', 'Big Data'],
      ensemblesDonnees: [
        { label: 'Facile', donnees: [10, 15, 20, 25, 30, 35], couleur: '#2786e8' },
        { label: 'Moyenne', donnees: [20, 25, 30, 35, 40, 45], couleur: '#73b4e8' },
        { label: 'Difficile', donnees: [30, 35, 40, 45, 50, 55], couleur: '#0e4178' },
      ],
    },
    {
      id: 'timeSpentChart',
      titre: 'Taches par Matiére',
      description: 'Nombre des taches pour chaque matiere',
      type: 'doughnut',
      labels: ['test'],
      donnees: [10],
      couleurs: ['#00308F','#0076CE','#2786e8','#72A0C1', '#73b4e8', '#0e4178','#5072A7','#B9D9EB', '#85659e', '#cea9bc',''],
    },
    {
      id: 'timeSpentDaysChart',
      titre: 'Répartition du temps hebdomadaire',
      description: 'Comment le temps est réparti tout au long de la semaine.',
      type: 'stackedColumn',
      labels: ['Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam', 'Dim'],
      ensemblesDonnees: [
        { label: 'Temps', donnees: [20, 30, 45, 20, 35, 30, 20], couleur: '#2786e8' },
        { label: 'Moyenne', donnees: [35, 50, 40, 30, 25, 30, 30], couleur: '#73b4e8' },
      ],      
    },
  ];

  constructor(
    private creerTacheService: CreerTacheService,
    private etudiantService: EtudiantServiceService,
    private matiereService: MatiereServiceService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.idEtudiant = Number(this.route.snapshot.paramMap.get('id')); 

  }
  ngAfterViewInit() {
    this.fetchStudentDataAndRenderChart();
  }
  

  fetchStudentDataAndRenderChart() {
    const studentId = this.idEtudiant;
  
    this.matiereService.getMatieres().subscribe((matieres: Matiere[]) => {
      this.creerTacheService.getTasksByEtudiant(studentId).subscribe((tasks: Tache[]) => {
        const taskCountsByMatiere = this.aggregateTasksByMatiere(tasks, matieres);
        const taskComplexityByMatiere = this.aggregateTaskComplexityByMatiere(tasks, matieres); 
        this.updateChartData(taskCountsByMatiere, taskComplexityByMatiere); 
        this.charts.forEach((graphique) => this.renderGraphique(graphique));
      });
    });
  }
  
  aggregateTaskComplexityByMatiere(tasks: Tache[], matieres: Matiere[]): any {
    const complexityCounts: { [key: string]: { [complexity: string]: number } } = {};
  
    tasks.forEach((task) => {
      const matiere = matieres.find(m => m.id_Matiere === task.matiere);
      const matiereName = matiere ? matiere.libelle : "Perso"; 
  
      // Ensure complexity data exists
      if (!complexityCounts[matiereName]) {
        complexityCounts[matiereName] = { Facile: 0, Moyenne: 0, Difficile: 0 };
      }
  
      // Increment complexity category
      if (task.complexite === 'Facile') {
        complexityCounts[matiereName]['Facile']++;
      } else if (task.complexite === 'Moyenne') {
        complexityCounts[matiereName]['Moyenne']++;
      } else if (task.complexite === 'Difficile') {
        complexityCounts[matiereName]['Difficile']++;
      }
    });
  
    return complexityCounts;
  }
  
  updateChartData(taskCounts: { [key: string]: number }, taskComplexityByMatiere: any) {
    const labels = Object.keys(taskCounts);
    const data = Object.values(taskCounts);
  
    this.charts[2].labels = labels;
    this.charts[2].donnees = data;
  
    /*this.charts[1].labels = labels;
    if (this.charts[1] && this.charts[1].ensemblesDonnees) {
      this.charts[1].ensemblesDonnees[0].donnees = labels.map(label => taskComplexityByMatiere[label]?.Facile ?? 0);
      this.charts[1].ensemblesDonnees[1].donnees = labels.map(label => taskComplexityByMatiere[label]?.Moyenne ?? 0);
      this.charts[1].ensemblesDonnees[2].donnees = labels.map(label => taskComplexityByMatiere[label]?.Difficile ?? 0);
  }*/
  
  }
  

  aggregateTasksByMatiere(tasks: Tache[], matieres: Matiere[]): { [key: string]: number } {
    const taskCounts: { [key: string]: number } = {};
  
    tasks.forEach((task) => {
      const matiere = matieres.find(m => m.id_Matiere === task.matiere);
        const matiereName = matiere ? matiere.libelle : "Perso"; 
        if (taskCounts[matiereName]) {
        taskCounts[matiereName]++;
      } else {
        taskCounts[matiereName] = 1;
      }
    });
  
    return taskCounts;
  }
  
  

  renderGraphique(graphique: any) {
    const canvas = <HTMLCanvasElement>document.getElementById(graphique.id);
    const ctx = canvas.getContext('2d');

    if (graphique.type === 'doughnut') {
      this.renderDoughnut(ctx, graphique.donnees, graphique.couleurs, graphique.labels);
    }else if (graphique.type === 'barres') {
      this.renderBarres(ctx, graphique.labels, graphique.ensemblesDonnees);
    } else if (graphique.type === 'stackedColumn') {
      this.renderStackedColumn(ctx, graphique.labels, graphique.ensemblesDonnees); 
    }
  }

  renderDoughnut(
    ctx: CanvasRenderingContext2D | null,
    donnees: number[],
    couleurs: string[],
    labels: string[]
  ) {
    if (!ctx) return;
  
    const total = donnees.reduce((acc, val) => acc + val, 0);
    let angleDepart = 10;
    const rayonExterieur = 70;
    const rayonInterieur = 40;
  
    donnees.forEach((valeur, index) => {
      const angleTranche = (valeur / total) * 2 * Math.PI;
      ctx.beginPath();
      ctx.moveTo(320, 80); 
      ctx.arc(320, 80, rayonExterieur, angleDepart, angleDepart + angleTranche);
      ctx.arc(320, 80, rayonInterieur, angleDepart + angleTranche, angleDepart, true);
      ctx.closePath();
  
      const gradient = ctx.createLinearGradient(160, 0, 160, 240);
      gradient.addColorStop(0, couleurs[index]);
  
      ctx.fillStyle = gradient;
      ctx.fill();
  
      angleDepart += angleTranche;
    });
  
    const labelStartX = 10;
    const labelStartY = 10;
    const boxSize = 12;
    const labelSpacing = 20;
  
    labels.forEach((label, index) => {
      const percentage = ((donnees[index] / total) * 100).toFixed(2); 
      const labelWithPercentage = `${label} > ${percentage}%`; 
      //const labelWithPercentage = `${label}  > ${donnees[index]}`
  
      ctx.fillStyle = couleurs[index];
      ctx.fillRect(labelStartX, labelStartY + index * labelSpacing, boxSize, boxSize);
      ctx.fillStyle = '#000';
      ctx.font = '14px cursive';
      ctx.fillText(labelWithPercentage, labelStartX + boxSize + 5, labelStartY + index * labelSpacing + 10);
    });
  }
  renderBarres(ctx: CanvasRenderingContext2D | null, labels: string[], ensemblesDonnees: any[]) {
    if (!ctx) return;

    const hauteurBarre = 10; // Bar height
    const espacementBarre = 9; // Reduced bar spacing
    const yDepart = 10; // Starting Y position for the first bar
    const maxWidth = 300; // Maximum width for the bars

    labels.forEach((label, index) => {
        let yOffset = yDepart + index * (hauteurBarre + espacementBarre); // Position each bar vertically
        let currentX = 90; // Start from the left edge for each bar

        ensemblesDonnees.forEach((ensemble) => {
            // Create gradient for each section of the stacked bar
            const gradient = ctx.createLinearGradient(currentX, yOffset, currentX + ensemble.donnees[index] * 2, yOffset);
            gradient.addColorStop(0, ensemble.couleur);

            // Draw the rectangle for each section of the stacked bar
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(currentX, yOffset, ensemble.donnees[index] * 2, hauteurBarre, 3);
            ctx.fill();

            // Update the currentX to stack the next bar segment horizontally
            currentX += ensemble.donnees[index] * 2;
        });

        // Add label next to the bar
        ctx.fillStyle = '#6c757d';
        ctx.font = '14px cursive';
        ctx.fillText(label, 10, yOffset + hauteurBarre / 1.5);
    });

    // Add labels with color indicators for 'Facile', 'Moyenne', 'Difficile' (from ensemblesDonnees)
    const labelStartX = 420; // X position for labels on the side
    const labelStartY = 10; // Y position to start the list of labels
    const boxSize = 12; // Size of the color indicator box
    const labelSpacing = 20; // Space between each label and box

    ensemblesDonnees.forEach((ensemble, index) => {
        // Draw the color box next to the label
        ctx.fillStyle = ensemble.couleur;
        ctx.fillRect(labelStartX, labelStartY + index * labelSpacing, boxSize, boxSize);

        // Draw the label text (Facile, Moyenne, Difficile) next to the color box
        ctx.fillStyle = '#000';
        ctx.font = '14px cursive';
        ctx.fillText(ensemble.label, labelStartX + boxSize + 5, labelStartY + index * labelSpacing + 10);
    });
}

  renderStackedColumn(ctx: CanvasRenderingContext2D | null, labels: string[], ensemblesDonnees: any[]) {
    if (!ctx) return;

    const columnWidth = 20; // Width of each column
    const columnSpacing = 10; // Space between columns
    const maxHeight = 100; // Max height for columns
    const yStart = 10; // Starting Y position for the first column
    const barBorderRadius = 5; // Radius for rounded corners

    labels.forEach((label, index) => {
        let currentY = maxHeight; // Start from the top for each column

        ensemblesDonnees.forEach((ensemble) => {
            const barHeight = ensemble.donnees[index];
            const gradient = ctx.createLinearGradient(0, currentY, 0, currentY - barHeight);
            gradient.addColorStop(0, ensemble.couleur);

            // Draw each section of the column with rounded corners
            ctx.fillStyle = gradient;
            ctx.beginPath();
            ctx.roundRect(40 + index * (columnWidth + columnSpacing), currentY - barHeight, columnWidth, barHeight, barBorderRadius);
            ctx.fill();

            // Update currentY to stack the next column segment vertically
            currentY -= barHeight;
        });

        // Add label below each column
        ctx.fillStyle = '#6c757d';
        ctx.font = '14px cursive';
        ctx.fillText(label, 40 + index * (columnWidth + columnSpacing), yStart + maxHeight + 10);
    });

    // Add labels with color indicators on the side
    const labelStartX = 420; // X position for labels on the side
    const labelStartY = 10; // Y position to start the list of labels
    const boxSize = 12; // Size of the color indicator box
    const labelSpacing = 20; // Space between each label and box
  
// Update the labels for stacked columns
ensemblesDonnees.forEach((ensemble, index) => {
  // Draw the color box next to the label
  ctx.fillStyle = ensemble.couleur;
  ctx.fillRect(labelStartX, labelStartY + index * labelSpacing, boxSize, boxSize);

  // Update the label text for 'Moyenne' and 'Votre temps'
  ctx.fillStyle = '#000';
  ctx.font = '14px cursive';
  ctx.fillText(ensemble.label, labelStartX + boxSize + 5, labelStartY + index * labelSpacing + 10);
});

}

  
}
