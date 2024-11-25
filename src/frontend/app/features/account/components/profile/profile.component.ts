import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AddressService } from '../../services/address.service';
import { User } from '../../models/user.interface';
import { Address } from '../../models/address.interface';
import { switchMap } from 'rxjs';
import { CreditCardService } from '../../services/credit-card.service';
import { CreditCard } from '../../models/credit-card.interface';

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
  creditCards: CreditCard[] = [];
  isLoadingCards: boolean = true;
  errorCards: string = '';

  constructor(
    private userService: UserService,
    private addressService: AddressService,
    private creditCardService: CreditCardService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadUserData();
    this.loadCreditCards();
  }

  private loadUserData(): void {
    this.userService.getCurrentUser().pipe(
      switchMap(user => {
        this.user = user;
        return this.addressService.getUserAddresses(user.id);
      })
    ).subscribe({
      next: (response) => {
        this.addresses = Array.isArray(response) ? response : [];
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

  private loadCreditCards(): void {
    this.creditCardService.getUserCreditCards().subscribe({
      next: (cards) => {
        this.creditCards = cards.results;
        this.isLoadingCards = false;
      },
      error: (error) => {
        this.errorCards = 'Failed to load credit cards';
        this.isLoadingCards = false;
        console.error('Error loading credit cards:', error);
      }
    });
  }

  navigateToAddressForm(): void {
    this.router.navigate(['/address/edit']);
  }

  onEditAddress(address: Address): void {
    this.router.navigate(['/address/edit', address.id]);
  }

  onDeleteAddress(address: Address): void {
    if (confirm('Are you sure you want to delete this address?')) {
      this.addressService.deleteAddress(address.id).subscribe({
        next: () => {
          this.addresses = this.addresses.filter(a => a.id !== address.id);
        },
        error: (error) => {
          this.error = 'Failed to delete address';
          console.error('Error deleting address:', error);
        }
      });
    }
  }



  navigateToCreditCardForm(): void {
    this.router.navigate(['/credit-card/edit']);
  }
}
