import { Routes } from '@angular/router';
import { ProfileComponent } from './features/account/components/profile/profile.component';
import { RegisterComponent } from './features/auth/components/register/register.component';

export const routes: Routes = [
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'profile',
    component: ProfileComponent
  },
//   {
//     path: 'address',
//     loadChildren: () => import('./features/account/routes/address.routes')
//       .then(m => m.addressRoutes)
//   },
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
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];
