import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DonService } from '../services/DonService';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-don',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './donlist.html',
  styleUrls: ['./donlist.css']
})
export class ListDonComponent implements OnInit {

  dons: any[] = [];
  loading = true;
  message = '';
  donateurId!: number;  // ← plus de valeur fixe

  constructor(
    private donService: DonService,
    private router: Router
  ) {}

  ngOnInit(): void {

    // 👉 récupérer l’ID du donateur connecté
    const storedId = localStorage.getItem('donateurId');

    if (!storedId) {
      this.message = "Vous devez vous connecter pour voir vos dons 🚫";
      this.loading = false;
      return;
    }

    this.donateurId = Number(storedId);

    this.loadDons();
  }

  loadDons() {
    this.loading = true;
    this.donService.getDonsByDonateur(this.donateurId).subscribe({
      next: (data) => {
        this.dons = data;
        this.loading = false;
      },
      error: () => {
        this.message = "Erreur lors du chargement des dons ❌";
        this.loading = false;
      }
    });
  }

  addDon() {
    this.router.navigate(['/donform']);
  }

  editDon(donId: number) {
  this.router.navigate(['/don-edit', donId]);
}


  deleteDon(donId: number) {
    if (!confirm('Voulez-vous vraiment supprimer ce don ?')) return;

    this.donService.deleteDon(this.donateurId, donId).subscribe({
      next: () => {
        this.message = 'Don supprimé ✔️';
        this.loadDons();
      },
      error: () => {
        this.message = 'Erreur de suppression ❌';
      }
    });
  }
}
