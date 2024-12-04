import { Tache } from "./tache";

export class Completion {
  public etudiantName: String;
  public tache_id: number;
  public marquer: boolean;
  public complexite: String;
  public etudiant: number;
  public tache: Tache;
  public commentaires: String[];
  public progression: number;
  public totalSoustTaches: number;
  public tempsEcoule: number;
  public enPause: boolean;

  constructor(
    tache_id: number,
    marquer: boolean,
    complexite: String,
    etudiant: number,
    tache: Tache,
    commentaires: String[],
    etudiantName: String,
    progression: number,
    totalSoustTaches: number,
    tempsEcoule: number = 0,
    enPause: boolean = true
  ) {
    this.tache_id = tache_id;
    this.marquer = marquer;
    this.complexite = complexite;
    this.etudiant = etudiant;
    this.tache = tache;
    this.commentaires = [];
    this.etudiantName = etudiantName;
    this.progression = progression;
    this.totalSoustTaches = totalSoustTaches;

    this.tempsEcoule = tempsEcoule;
    this.enPause = enPause;
  }
}
