// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './home/home';
import { DonForm } from './don-form/don-form';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ListDonComponent } from './element/donlist';
import { DonEditComponent } from './update/don-edit';
import { StatistiquesComponent } from './admin/stat/stat';
import { AdminElementsComponent } from './admin/dashboard/dashboard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'donform/:elementId', component: DonForm },

  { path: 'don-edit/:id', component: DonEditComponent },

  { path: 'login', component: Login },
  { path: 'register', component: Register },

  // 👉 La liste des dons doit pointer ici
  { path: 'mes-dons', component: ListDonComponent },

  // 👉 alias si tu veux garder donlist
  { path: 'donlist', component: ListDonComponent },

  { path: 'stat', component: StatistiquesComponent},
  { path: 'admin', component: AdminElementsComponent },

  // 👉 TOUJOURS en dernier
  { path: '**', redirectTo: '' }
];

