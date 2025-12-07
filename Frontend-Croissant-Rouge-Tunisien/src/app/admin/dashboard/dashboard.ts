// src/app/admin/dashboard/admin-elements.component.ts
import { Component, OnInit } from '@angular/core';
import { ElementService } from '../../services/element.service';
import { Element } from '../../models/element.model';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-elements',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class AdminElementsComponent implements OnInit {

  elements: Element[] = [];

  newElement: Element = {
    label: '',
    description: '',
    image: '',
    type: null
  };

  editMode = false;
  message = '';

  constructor(private elementService: ElementService) {}

  ngOnInit(): void {
    this.loadElements();
  }

  loadElements(): void {
    this.elementService.getAllElements().subscribe({
      next: (data) => this.elements = data,
      error: () => this.message = '❌ Erreur de chargement'
    });
  }

  addElement(): void {
    if (!this.newElement.label.trim() || !this.newElement.image.trim()) {
      this.message = '⚠ Le label et l’image sont obligatoires.';
      return;
    }

    const elementToSend: Partial<Element> = {
      label: this.newElement.label.trim(),
      description: this.newElement.description?.trim() || '',
      image: this.newElement.image.trim(),
      type: null                           // 🔹 on force à null
    };

    this.elementService.addElement(elementToSend).subscribe({
      next: () => {
        this.message = '✔ Élément ajouté.';
        this.resetForm();
        this.loadElements();
      },
      error: () => this.message = "❌ Erreur lors de l'ajout"
    });
  }

  deleteElement(id: number | undefined): void {
    if (!id) { return; }

    if (confirm('Supprimer cet élément ?')) {
      this.elementService.deleteElement(id).subscribe({
        next: () => {
          this.message = '🗑 Élément supprimé.';
          this.loadElements();
        },
        error: () => this.message = '❌ Erreur lors de la suppression'
      });
    }
  }

  enableEdit(el: Element): void {
    this.newElement = { ...el };
    this.editMode = true;
  }

  saveEdit(): void {
    if (!this.newElement.id) { return; }

    const elementToSend: Partial<Element> = {
      label: this.newElement.label.trim(),
      description: this.newElement.description?.trim() || '',
      image: this.newElement.image.trim(),
      type: null                           // 🔹 reste null
    };

    this.elementService.updateElement(this.newElement.id, elementToSend).subscribe({
      next: () => {
        this.message = '✔ Élément modifié.';
        this.editMode = false;
        this.resetForm();
        this.loadElements();
      },
      error: () => this.message = '❌ Erreur de modification'
    });
  }

  resetForm(): void {
    this.newElement = {
      label: '',
      description: '',
      image: '',
      type: null
    };
  }
}
