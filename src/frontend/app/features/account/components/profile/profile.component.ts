import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { User } from '../../models/user.interface';
import { Address } from '../../models/address.interface';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  user: User | null = null;
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
    this.loadAddresses();
  }

  private loadUserData(): void {
    // Assuming we can get the current user's ID from somewhere
    // You might need to modify this based on how you store the current user's ID
    this.userService.getUser(1).subscribe({
      next: (user) => {
        this.user = user;
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load user data';
        this.isLoading = false;
      }
    });
  }

  private loadAddresses(): void {
    this.addressService.getAddresses().subscribe({
      next: (addresses) => {
        this.addresses = addresses;
      },
      error: (error) => {
        this.error = 'Failed to load addresses';
      }
    });
  }

  navigateToAddressForm(): void {
    this.router.navigate(['/address/edit']);
  }
} 