import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {

  nom: string = '';
  prenom: string = '';
  email: string = '';
  password: string = '';
  message: string = '';
  passwordError: boolean = false;

  private backendUrl = 'http://localhost:8811/api/auth/register';

  images: string[] = [
    'https://cdnfr.africanmanager.com/wp-content/uploads/2019/03/Croissant-Rouge-tunisien-640x3251.jpg',
    'https://leseco.ma/wp-content/uploads/2025/07/Croissant-Rouge.jpg',
    'https://pam.ma/fr/wp-content/uploads/2023/05/IMG_8324.jpg',
    'https://fr.al3omk.com/wp-content/uploads/2023/05/843.jpg',
    'https://www.rcrcmagazine.org/wp-content/uploads/2016/03/2016_02-page_25.jpg'
  ];

  currentImage: string = this.images[0];
  index: number = 0;

  constructor(private router: Router, private http: HttpClient) {}

  ngOnInit() {
    setInterval(() => {
      this.index = (this.index + 1) % this.images.length;
      this.currentImage = this.images[this.index];
    }, 5000);
  }

  // ✅ Vérification MOT DE PASSE FORT
  isStrongPassword(password: string): boolean {
    const strongRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,}$/;
    return strongRegex.test(password);
  }

  register() {

    // ✅ Vérification CHAMPS VIDES → POPUP
    if (!this.nom || !this.prenom || !this.email || !this.password) {
      alert('Veuillez remplir tous les champs ❌');
      return;
    }

    // ✅ Vérification EMAIL FORMAT GENERAL
    const emailRegex = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailRegex.test(this.email)) {
      this.message = "Format d'email invalide ❌ (ex: nom@domaine.com)";
      return;
    }

    // ✅ Vérification MOT DE PASSE FORT
    if (!this.isStrongPassword(this.password)) {
      this.passwordError = true;
      this.message = '';
      return;
    } else {
      this.passwordError = false;
    }

    this.http.post<any>(this.backendUrl, {
      nom: this.nom,
      prenom: this.prenom,
      email: this.email,
      password: this.password
    }).pipe(
      catchError(err => {
        this.message = 'Erreur serveur ou email déjà utilisé ❌';
        return throwError(() => err);
      })
    ).subscribe(response => {
      if (response && response.success) {
        this.message = 'Inscription réussie ✅';
        setTimeout(() => {
          this.router.navigate(['/login']);
        }, 1500);
      } else {
        this.message = 'Email déjà utilisé ❌';
      }
    });
  }
}
