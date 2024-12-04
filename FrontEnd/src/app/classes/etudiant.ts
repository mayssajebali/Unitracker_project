import { Classe } from "./classe";
import { Groupe } from "./groupe";

export class Etudiant {
        constructor(
            public id_Etudiant:number,
            public nom_Etd:string,
            public prenom_Etd:string,
            public email_Etd:string,
            public mot_de_passe_Etd:string,

            public classe:Classe,
            public nomClasse :string,
            public numClasse :number,
            public anneeClasse:number,
            public role:string,
            public groupes: Groupe[]
        ) {}
    }
    

