// src/app/services/element.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Element, Don, Donnateur } from '../models/element.model';

@Injectable({
  providedIn: 'root'
})
export class ElementService {
  private baseDonateurUrl = 'http://localhost:8811/api/donnateurs';

  constructor(private http: HttpClient) {}

  /** Récupère les éléments pour un donnateur spécifique */
  getElements(donateurId: number): Observable<Element[]> {
    return this.http.get<Element[]>(`${this.baseDonateurUrl}/${donateurId}`);
  }

  /** Récupère les dons d’un donnateur */
  getDonsByDonateur(donateurId: number): Observable<Don[]> {
    return this.http.get<Don[]>(`${this.baseDonateurUrl}/${donateurId}/dons`);
  }

  /** Crée un don pour un élément spécifique */
  createDon(donateurId: number, elementId: number, don: Don): Observable<Don> {
    return this.http.post<Don>(
      `${this.baseDonateurUrl}/${donateurId}/dons?elementId=${elementId}`,
      don
    );
  }

  /** Récupère un donnateur par son id */
  getDonateur(donateurId: number): Observable<Donnateur> {
    return this.http.get<Donnateur>(`${this.baseDonateurUrl}/${donateurId}`);
  }



  private baseUrl = 'http://localhost:8811/api/elements';


   /* ====== PARTIE ADMIN / ELEMENTS ====== */
  getAllElements(): Observable<Element[]> {
    return this.http.get<Element[]>(this.baseUrl);
  }

  addElement(element: Partial<Element>): Observable<Element> {
    return this.http.post<Element>(this.baseUrl, element);
  }

  deleteElement(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }

  updateElement(id: number, el: Partial<Element>): Observable<Element> {
    return this.http.put<Element>(`${this.baseUrl}/${id}`, el);
  }
}
