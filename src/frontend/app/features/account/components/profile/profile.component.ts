import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { User } from '../../models/user.interface';
import { Address } from '../../models/address.interface';
import { switchMap } from 'rxjs';
import { PaginatedResponse } from '../../../../core/models/paginated-response.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
  addressResponse: Address[] = [];
  addresses: Address[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
  }

  private loadUserData(): void {
    this.userService.getCurrentUser().pipe(
      switchMap(user => {
        this.user = user;
        return this.addressService.getUserAddresses(user.id);
      })
    ).subscribe({
      next: (response) => {
        if (Array.isArray(response)) {
          this.addresses = response;
        } else if (response && Array.isArray(response.results)) {
          this.addresses = response.results; // Paginated response
        } else {
          this.addresses = [];
        }
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load user data or addresses';
        this.addresses = [];
        this.isLoading = false;
        console.error('Error loading user data:', error);
      }
    });
  }
  

  navigateToAddressForm(): void {
    this.router.navigate(['/address/edit']);
  }
}
