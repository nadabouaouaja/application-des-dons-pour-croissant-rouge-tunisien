// src/app/models/element.model.ts
export interface Element {
  id?: number;                // optionnel, généré par la BDD
  label: string;
  description: string;
  image: string;
  type?: string | null;       // 🔹 optionnel + peut être null

  created_at?: string;
  updated_at?: string;
}




export interface Don {
  id?: number;
  typeDon?: string;
  montant?: number | null;
  description?: string;
  dateDon?: string;
  donateurId?: number;
  elementId?: number;
}



export interface Donnateur {
  id: number;
  nom: string;
  prenom?: string;       // correspond à la colonne prenom, peut être optionnel selon usage
  email: string;
  groupe_sanguin?: string;
  ville?: string;
  telephone?: string;
  password?: string;
}
