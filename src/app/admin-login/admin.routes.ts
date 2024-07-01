import { CanMatchFn, Routes } from '@angular/router';
import { AdminLoginComponent } from './admin-login.component';
import { inject } from '@angular/core';
import { WebService } from '@services/web.service';
import { AdminComponent } from './admin/admin.component';
import { catchError, map, of } from 'rxjs';
import { PortfolioManagementComponent } from './admin/portfolio-management/portfolio-management.component';
import { MessagesComponent } from './admin/messages/messages.component';

const hasAdminSession: CanMatchFn = () => {
  const webSrv = inject(WebService);
  const httpOptions = {
    headers: {
      Authorization: 'Bearer ' + sessionStorage.getItem('app.token'),
    },
  };
  return webSrv.post('admin/authenticated', null, httpOptions).pipe(
    map((res) => {
      return res.statusCode === 'OK';
    }),
    catchError(() => {
      return of(false);
    }),
  );
};
export const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canMatch: [hasAdminSession],
    children: [
      {
        path: 'portfolio-management',
        component: PortfolioManagementComponent,
      },
      {
        path: 'messages',
        component: MessagesComponent,
      },
    ],
  },
  {
    path: 'login',
    component: AdminLoginComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
