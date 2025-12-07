import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ElementCard } from '../element-card/element-card';
import { ElementService } from '../services/element.service';
import { Subscription } from 'rxjs';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ElementCard, RouterModule],
  templateUrl: './home.html',
  styleUrls: ['./home.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  groupedElements: any[] = [];
  loading = true;
  errorMessage = '';
  subscription!: Subscription;

  quotes: string[] = [
    "Chaque don est un battement de cœur pour quelqu’un dans le besoin.",
    "Un petit geste peut sauver une grande vie.",
    "L’humanité commence là où le don devient un acte d’amour.",
    "Donner, c’est semer l’espoir."
  ];

  currentQuote = this.quotes[0];
  quoteIndex = 0;
  quoteInterval: any;

  donateurId!: number;

  constructor(
    private elementService: ElementService,
    private router: Router       // ❗ OBLIGATOIRE pour logout()
  ) {}

  ngOnInit(): void {

    const storedId = localStorage.getItem('donateurId');

    if (storedId) {
      this.donateurId = Number(storedId);
    } else {
      // Aucun utilisateur connecté → pas d'éléments personnels
      this.donateurId = 0;
    }

    this.loadAndGroupElements();
    this.startQuoteRotation();
  }

  loadAndGroupElements() {

    // Si pas connecté → ne pas appeler le service
    if (this.donateurId === 0) {
      this.loading = false;
      return;
    }

    this.subscription = this.elementService.getElements(this.donateurId)
      .subscribe({
        next: (elements: any[]) => {
          this.groupedElements = this.groupByType(elements);
          this.loading = false;
        },
        error: () => {
          this.errorMessage = "Erreur lors du chargement ❌";
          this.loading = false;
        }
      });
  }

  groupByType(elements: any[]) {
    const map: any = {};

    elements.forEach(el => {
      if (!map[el.type]) {
        map[el.type] = [];
      }
      map[el.type].push(el);
    });

    return Object.keys(map).map(type => ({
      type,
      items: map[type]
    }));
  }

  startQuoteRotation() {
    this.quoteInterval = setInterval(() => {
      this.quoteIndex = (this.quoteIndex + 1) % this.quotes.length;
      this.currentQuote = this.quotes[this.quoteIndex];
    }, 5000);
  }

  ngOnDestroy(): void {
    if (this.quoteInterval) clearInterval(this.quoteInterval);
    if (this.subscription) this.subscription.unsubscribe();
  }

  logout() {
    localStorage.removeItem('donateurId');
    this.router.navigate(['/login']);
  }
}
