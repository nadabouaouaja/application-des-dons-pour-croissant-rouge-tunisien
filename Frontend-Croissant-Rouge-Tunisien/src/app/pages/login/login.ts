import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login {

  email: string = '';
  password: string = '';
  message: string = '';

  private backendUrl = 'http://localhost:8811/api/auth/login';

  constructor(private router: Router, private http: HttpClient) {}

  login() {

    // ------- 1️⃣ Vérification ADMIN locale --------
    if (this.email === 'admin' && this.password === 'admin') {
      localStorage.setItem('role', 'admin');
      this.router.navigate(['/stat']);
      return;
    }

    // ------- 2️⃣ Vérifier champs remplis --------
    if (!this.email || !this.password) {
      this.message = 'Veuillez remplir tous les champs.';
      return;
    }

    // ------- 3️⃣ Login normal via backend --------
    this.http.post<any>(this.backendUrl, { email: this.email, password: this.password })
      .pipe(
        catchError(err => {
          this.message = 'Erreur serveur ou email/mot de passe incorrect.';
          return throwError(() => err);
        })
      )
      .subscribe(response => {

        if (response.success) {
          console.log("ID reçu du backend :", response.id);

          localStorage.setItem('donateurId', response.id.toString());
          localStorage.setItem('role', 'user');

          this.router.navigate(['/']);
        } else {
          this.message = 'Email ou mot de passe incorrect ❌';
        }
      });
  }

  // ------- CARROUSEL D'IMAGES --------
  images: string[] = [
    'https://cdnfr.africanmanager.com/wp-content/uploads/2019/03/Croissant-Rouge-tunisien-640x3251.jpg',
    'https://leseco.ma/wp-content/uploads/2025/07/Croissant-Rouge.jpg',
    'https://pam.ma/fr/wp-content/uploads/2023/05/IMG_8324.jpg',
    'https://fr.al3omk.com/wp-content/uploads/2023/05/843.jpg',
    'https://www.rcrcmagazine.org/wp-content/uploads/2016/03/2016_02-page_25.jpg'
  ];

  currentImage: string = this.images[0];
  index: number = 0;

  ngOnInit() {
    setInterval(() => {
      this.index = (this.index + 1) % this.images.length;
      this.currentImage = this.images[this.index];
    }, 5000);
  }
}

