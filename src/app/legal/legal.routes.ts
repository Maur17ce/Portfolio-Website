import { Routes } from '@angular/router';
import { DataProtectionComponent } from './data-protection/data-protection.component';
import { LiabilityCommitteeComponent } from './liability-committee/liability-committee.component';
import { ImprintComponent } from './imprint/imprint.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'data-protection',
    pathMatch: 'full',
  },
  {
    path: 'data-protection',
    component: DataProtectionComponent,
  },
  {
    path: 'liability-committee',
    component: LiabilityCommitteeComponent,
  },
  {
    path: 'imprint',
    component: ImprintComponent,
  },
  {
    path: '**',
    redirectTo: 'data-protection',
    pathMatch: 'full',
  },
];
