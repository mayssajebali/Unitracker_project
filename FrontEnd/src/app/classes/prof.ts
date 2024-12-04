import { Matiere } from "./matiere";

export class Prof {
    public matieres: number[]; 
    constructor(
        public id_Professeur: number,
        public nom_Prof: string,
        public prenom_Prof: string,
        public email_Prof: string,
        public mot_de_passe_Prof: string,
        public cin_Prof: string,
        public sexe_Prof: string,
        public telephone_Prof: string,
        public role:string,
        public lesMatieres: Matiere[] 
    ) {
        this.matieres = []; 
    }
}
