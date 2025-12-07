import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DonService } from '../services/DonService';

@Component({
  selector: 'app-don-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './don-form.html',
  styleUrls: ['./don-form.css']
})
export class DonForm implements OnInit {

  elementId!: number;        // Élément du don
  donateurId!: number;       // Donateur connecté

  donType: string = 'argent';        // Type du don (argent, nourriture, vêtements)
  montant: number | null = null;     // Montant si don en argent
  description: string = '';          // Description du don
  message: string = '';              // Message de confirmation / erreur

  constructor(
    private donService: DonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // 🔹 Récupérer le donateur connecté
    const storedId = localStorage.getItem('donateurId');
    if (!storedId) {
      this.message = 'Vous devez être connecté pour faire un don ❌';
      return;
    }
    this.donateurId = Number(storedId);

    // 🔹 Récupérer l’elementId depuis l’URL: /donform/:elementId
    const elId = this.route.snapshot.paramMap.get('elementId');
    if (!elId) {
      this.message = 'Aucun élément sélectionné pour le don ❌';
      return;
    }
    this.elementId = Number(elId);
  }

  /** Méthode appelée lors du submit du formulaire */
  submitDon(): void {

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

    this.donService.createDon(this.donateurId, this.elementId, don)
      .subscribe({
        next: () => {
          this.message = 'Don enregistré avec succès ❤️';
          this.montant = null;
          this.description = '';
          this.donType = 'argent';

          // Optionnel : retour à la liste
          this.router.navigate(['/donlist']);
        },
        error: () => {
          this.message = 'Erreur lors de l’enregistrement ❌';
        }
      });
  }
}
