import { Classe } from "./classe";

export class Matiere {
    id_Matiere?: number; 
    libelle: string;
    professeurs: number[]; 
    classes: Classe[];
    classesIds: number[];
    semestre: string;  

    constructor() {
        this.libelle = '';
        this.professeurs = [];
        this.classes = [];
        this.classesIds = []; 
        this.semestre = '';  
    }
}

