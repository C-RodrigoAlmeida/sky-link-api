import { Component } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { NavbarComponent } from './core/components/navbar/navbar.component';
import { CommonModule } from '@angular/common';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent, CommonModule],
  template: `
    <app-navbar *ngIf="showNavbar"></app-navbar>
    <div [class.has-navbar]="showNavbar">
      <router-outlet />
    </div>
  `,
  styles: [`
    .has-navbar {
      padding-top: 4rem;
    }
  `]
})
export class AppComponent {
  showNavbar = false;

  constructor(private router: Router) {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.showNavbar = !['/login', '/register'].includes(event.urlAfterRedirects);
    });
  }
}
