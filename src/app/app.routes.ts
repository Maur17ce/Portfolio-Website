import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { HireMeComponent } from './hire-me/hire-me.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'admin',
    loadChildren: () => import('./admin-login/admin.routes').then((m) => m.routes),
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'hire-me',
    component: HireMeComponent,
  },
  {
    path: 'portfolio',
    component: PortfolioComponent,
  },
  {
    path: 'legal',
    loadChildren: () => import('./legal/legal.routes').then((m) => m.routes),
  },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];
