import { Routes } from '@angular/router';
import { ProfileComponent } from './features/account/components/profile/profile.component';
import { RegisterComponent } from './features/auth/components/register/register.component';
import { FlightListComponent } from './features/flight/components/flight-list/flight-list.component';
import { ReservationComponent } from './features/flight/components/reservation/reservation.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/components/login/login.component')
      .then(m => m.LoginComponent)
  },
  {
    path: 'address/edit',
    loadComponent: () => import('./features/account/components/address-form/address-form.component')
      .then(m => m.AddressFormComponent)
  },
  {
    path: 'address/edit/:id',
    loadComponent: () => import('./features/account/components/address-form/address-form.component')
      .then(m => m.AddressFormComponent)
  },
  {
    path: 'flights',
    component: FlightListComponent
  },
  {
    path: 'flights/:id/reserve',
    component: ReservationComponent
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
