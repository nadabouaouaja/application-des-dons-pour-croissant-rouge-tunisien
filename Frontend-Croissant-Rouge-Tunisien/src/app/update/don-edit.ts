// src/app/don-edit/don-edit.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonService } from '../services/DonService';
import { Don } from '../models/element.model';

@Component({
  selector: 'app-don-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './don-edit.html',
  styleUrls: ['./don-edit.css']
})
export class DonEditComponent implements OnInit {

  donId!: number;
  donateurId!: number;

  donType: string = 'argent';
  montant: number | null = null;
  description: string = '';
  elementId!: number;

  loading = true;
  message = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private donService: DonService
  ) {}

  ngOnInit(): void {

    const storedId = localStorage.getItem('donateurId');
    if (!storedId) {
      this.message = 'Vous devez être connecté pour modifier un don ❌';
      this.loading = false;
      return;
    }
    this.donateurId = Number(storedId);

    this.donId = Number(this.route.snapshot.paramMap.get('id'));

    this.loadDon();
  }

  loadDon(): void {
    this.donService.getDonById(this.donateurId, this.donId).subscribe({
      next: (don: any) => {
        this.donType = don.typeDon;
        this.montant = don.montant;
        this.description = don.description;
        this.elementId = don.element?.id;
        this.loading = false;
      },
      error: () => {
        this.message = 'Erreur lors du chargement du don ❌';
        this.loading = false;
      }
    });
  }

  saveChanges(): void {

    if (this.donType === 'argent' && (!this.montant || this.montant <= 0)) {
      this.message = 'Veuillez entrer un montant valide ❌';
      return;
    }

    if (!this.description.trim()) {
      this.message = 'Veuillez ajouter une description ❌';
      return;
    }

    const don: any = {
      typeDon: this.donType,
      montant: this.donType === 'argent' ? this.montant : null,
      description: this.description
    };

    this.donService.updateDon(this.donateurId, this.donId, don).subscribe({
      next: () => {
        this.message = 'Don modifié avec succès ✅';
        setTimeout(() => this.router.navigate(['/donlist']), 800);
      },
      error: () => {
        this.message = 'Erreur lors de la modification ❌';
      }
    });
  }

  cancel(): void {
    this.router.navigate(['/donlist']);
  }
}
