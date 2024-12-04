import { AfterViewInit, Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-dash-prof',
  templateUrl: './dash-prof.component.html',
  styleUrls: ['./dash-prof.component.css']
})
export class DashProfComponent  implements AfterViewInit {
  charts = [
    {
      id: 'taskCompletionOverviewChart',
      titre: 'Aperçu de la Complétion des Tâches',
      description: 'Répartition des tâches par statut de complétion.',
      type: 'doughnut',
      labels: ['Complet', 'Incomplet'],
      donnees: [40, 60],
      couleurs: ['#2786e8', '#73b4e8'],
    },
    {
      id: 'tasksPerSubjectChart',
      titre: 'Tâches par Matière',
      description: 'Répartition des tâches selon les matières.',
      type: 'doughnut',
      labels: ['Web', 'Mobile', 'Java', 'Data', 'AI'],
      donnees: [50, 30, 40, 20, 60],
      couleurs: ['#2786e8', '#73b4e8', '#0e4178', '#85659e', '#cea9bc'],
    },
    {
      id: 'tasksCompletionRateChart',
      titre: 'Taux de Complétion des Tâches par Matière',
      description: 'État de complétion des tâches par matière.',
      type: 'barres',
      labels: ['Web', 'Mobile', 'Java', 'Data ', 'AI'],
      ensemblesDonnees: [
        { label: 'Complet', donnees: [30, 15, 20, 10, 35], couleur: '#2786e8' },
        { label: 'Incomplet', donnees: [20, 15, 20, 10, 25], couleur: '#73b4e8' },
      ],
    },
    {
      id: 'studentsPerTaskChart',
      titre: 'Étudiants Assignés par Tâche',
      description: 'Nombre d\'étudiants assignés à chaque tâche.',
      type: 'stackedColumn',
      labels: ['Tâche 1', 'Tâche 2', 'Tâche 3', 'Tâche 4', 'Tâche 5'],
      ensemblesDonnees: [
        { label: 'Étudiants Assignés', donnees: [65, 50, 75, 35, 45 ], couleur: '#2786e8' },
      ],
    },
  ];

  ngAfterViewInit() {
    this.charts.forEach((graphique) => this.renderGraphique(graphique));
  }

  renderGraphique(graphique: any) {
    const canvas = <HTMLCanvasElement>document.getElementById(graphique.id);
    const ctx = canvas.getContext('2d');

    if (graphique.type === 'doughnut') {
      this.renderDoughnut(ctx, graphique.donnees, graphique.couleurs, graphique.labels); 
    } else if (graphique.type === 'barres') {
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
      ctx.moveTo(220, 80); 
      ctx.arc(220, 80, rayonExterieur, angleDepart, angleDepart + angleTranche);
      ctx.arc(220, 80, rayonInterieur, angleDepart + angleTranche, angleDepart, true);
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
    const labelStartX = 320; // X position for labels on the side
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

    const columnWidth = 30; // Width of each column
    const columnSpacing = 30 ; // Space between columns
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
            ctx.roundRect(10 + index * (columnWidth + columnSpacing), currentY - barHeight, columnWidth, barHeight, barBorderRadius);
            ctx.fill();

            // Update currentY to stack the next column segment vertically
            currentY -= barHeight;
        });

        // Add label below each column
        ctx.fillStyle = '#6c757d';
        ctx.font = '14px cursive';
        ctx.fillText(label, 3 + index * (columnWidth + columnSpacing), yStart + maxHeight + 10);
    });

    // Add labels with color indicators on the side
    const labelStartX = 320; // X position for labels on the side
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



