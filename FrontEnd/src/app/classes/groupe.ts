import { Etudiant } from "./etudiant";

export class Groupe {
    constructor(
        public etudiants: number[],
        public libelle_Groupe:string,
        public id_groupe?:number,
    ){}
}
