import { Component, OnInit } from '@angular/core';
import { Don } from '../../services/DonService';
import { DonService } from '../../services/DonService';
import { Chart, registerables } from 'chart.js';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

Chart.register(...registerables);

@Component({
  selector: 'app-statistiques',
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './stat.html',
  styleUrls: ['./stat.css']
})
export class StatistiquesComponent implements OnInit {

  dons: Don[] = [];

  totalDons = 0;
  totalArgent = 0;
  totalVetements = 0;
  totalNourriture = 0;

  /** Graphiques */
  pieChart: any;
  barChart: any;

  constructor(private donService: DonService) {}

  ngOnInit(): void {
    this.donService.getAllDons().subscribe(dons => {
      this.dons = dons;
      this.calculerStats();
      this.buildCharts();
    });
  }

  /** 🔍 Calcul des statistiques */
  calculerStats(): void {
    this.totalDons = this.dons.length;
    this.totalArgent = this.dons.filter(d => d.typeDon === 'argent').length;
    this.totalVetements = this.dons.filter(d => d.typeDon === 'vetements').length;
    this.totalNourriture = this.dons.filter(d => d.typeDon === 'nourriture').length;
  }

  /** 📊 Construction des graphiques */
  buildCharts(): void {
    this.buildPieChart();
    this.buildBarChart();
  }

  buildPieChart(): void {
    this.pieChart = new Chart('pieChart', {
      type: 'pie',
      data: {
        labels: ['Argent', 'Vêtements', 'Nourriture'],
        datasets: [{
          data: [this.totalArgent, this.totalVetements, this.totalNourriture],
          backgroundColor: ['#ff4d4d', '#ff9999', '#ffcccc']
        }]
      }
    });
  }

  buildBarChart(): void {
    this.barChart = new Chart('barChart', {
      type: 'bar',
      data: {
        labels: ['Argent', 'Vêtements', 'Nourriture'],
        datasets: [{
          label: 'Nombre de dons',
          data: [this.totalArgent, this.totalVetements, this.totalNourriture],
          backgroundColor: '#e60000'
        }]
      }
    });
  }
}
