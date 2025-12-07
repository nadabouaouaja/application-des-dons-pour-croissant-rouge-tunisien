import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Don {
  id?: number;
  typeDon: string;
  montant?: number;
  dateDon?: string;
  description?: string;
  donateurId?: number;
  elementId?: number;
}

export interface Element {
  id: number;
  nom: string;
  description?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DonService {

  private baseUrl = 'http://localhost:8811/api/donnateurs';

  constructor(private http: HttpClient) {}

  /** 🔹 Récupérer les éléments d’un donateur */
  getElements(donateurId: number): Observable<Element[]> {
    return this.http.get<Element[]>(`${this.baseUrl}/${donateurId}`);
  }

  /** 🔹 Récupérer les dons d’un donateur */
  getDons(donateurId: number): Observable<Don[]> {
    return this.http.get<Don[]>(`${this.baseUrl}/${donateurId}/dons`);
  }

  /** 🔹 Créer un don */
  createDon(donateurId: number, elementId: number, don: Don): Observable<Don> {
    return this.http.post<Don>(`${this.baseUrl}/${donateurId}/dons?elementId=${elementId}`, don);
  }

  /** 🔹 Supprimer un don */
  deleteDon(donateurId: number, donId: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${donateurId}/dons/${donId}`);
  }

  /** 🔹 Récupérer tous les dons (admin) */
  getAllDons(): Observable<Don[]> {
    return this.http.get<Don[]>('http://localhost:8811/api/admin/dons');
  }

  /** 🔹 Récupérer les dons d’un donateur (pour la page Mes Dons) */
  getDonsByDonateur(donateurId: number): Observable<Don[]> {
    return this.http.get<Don[]>(`${this.baseUrl}/${donateurId}/dons`);
  }

  // src/app/services/DonService.ts
getDonById(donateurId: number, donId: number) {
  return this.http.get<Don>(`${this.baseUrl}/${donateurId}/dons/${donId}`);
}

updateDon(donateurId: number, donId: number, don: Don) {
  return this.http.put<Don>(`${this.baseUrl}/${donateurId}/dons/${donId}`, don);
}


}
