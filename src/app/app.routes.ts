//app-routing.module.ts
import { AppComponent } from './app';
import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Contactos } from './pages/contactos/contactos';
import { Servicios } from './pages/servicios/servicios';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'contactos', component: Contactos },
  { path: 'servicios', component: Servicios }
];