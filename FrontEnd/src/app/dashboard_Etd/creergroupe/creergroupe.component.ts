import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Etudiant } from 'src/app/classes/etudiant';
import { Groupe } from 'src/app/classes/groupe';
import { EtudiantServiceService } from 'src/app/services/etudiant-service.service';
import { GroupeService } from 'src/app/services/groupe.service';

@Component({
  selector: 'app-creergroupe',
  templateUrl: './creergroupe.component.html',
  styleUrls: ['./creergroupe.component.css']
})
export class CreergroupeComponent implements OnInit {
  form!: FormGroup;
  etudiants: Etudiant[] = [];
  selectedEtudiants: {id_Etudiant:number; nom_Etd: string; prenom_Etd: string }[] = [];
  selectedValues!: [];
  idEtudiant!: number; 

  constructor(
    private fb: FormBuilder,
    private groupeService: GroupeService,
    private etudiantService: EtudiantServiceService, private route: ActivatedRoute,private toastr: ToastrService
    ,private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      libelle_Groupe: ['', Validators.required],
      etudiants: [[], Validators.required]  
    });
    this.idEtudiant = Number(this.route.snapshot.paramMap.get('id')); 
    this.loadEtudiants();
  }

  loadEtudiants() {
    this.etudiantService.getEtudiants().subscribe((data) => {
      this.etudiants = data;
    });
  }


  onSelectEtudiants() {
    this.selectedValues = this.form.get('etudiants')?.value; // Retrieve selected values from form control
    console.log("Selected values:", this.selectedValues); // This should show all selected IDs
    console.log("Full form value:", this.form.value);

    if (this.selectedValues && this.selectedValues.length > 0) {
        this.selectedValues.forEach((id: any) => {
            const etudiant = this.etudiants.find(e => e.id_Etudiant === id); // Find student by ID
            if (etudiant) {
              const alreadySelected = this.selectedEtudiants.some(e => e.nom_Etd === etudiant.nom_Etd && e.prenom_Etd === etudiant.prenom_Etd);
                if (!alreadySelected) {
                this.selectedEtudiants.push(
                  { id_Etudiant: etudiant.id_Etudiant,
                    nom_Etd: etudiant.nom_Etd,
                    prenom_Etd: etudiant.prenom_Etd
                });}
            }
        });
    }

    console.log("Updated selectedEtudiants:", this.selectedEtudiants); 
    console.log("Number of selected students:", this.selectedEtudiants.length); 
}



  onSubmit(): void {
    console.log("les etudiants selectionnées :", this.selectedEtudiants);
    const selectedIds: number[] = this.selectedEtudiants.map(etudiant => etudiant.id_Etudiant);
    console.log("Selected student IDs:", selectedIds);
    const groupe = new Groupe(
      selectedIds,
      this.form.get('libelle_Groupe')?.value, 
     
    );

  
    this.groupeService.addGroupe(groupe).subscribe(
      (response) => {
        console.log("Group added successfully:", response);
        this.toastr.success('Group created with success!');

         
    this.selectedEtudiants=[];
    this.form.get('libelle_Groupe')?.reset('');
      },
      (error) => {
        console.error("Error adding group:", error);
      }
    );

   

  }


  
}