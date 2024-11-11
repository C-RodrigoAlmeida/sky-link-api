import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { AddressService } from '../../services/address.service';
import { Address } from '../../models/address.interface';

@Component({
  selector: 'app-address-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './address-form.component.html',
  styleUrls: ['./address-form.component.css']
})
export class AddressFormComponent implements OnInit {
  addressForm: FormGroup;
  isLoading = false;
  error = '';
  addressId?: number;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private addressService: AddressService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.addressForm = this.fb.group({
      street: ['', Validators.required],
      neighborhood: ['', Validators.required],
      city: ['', Validators.required],
      state: ['', Validators.required],
      country: ['BR', [Validators.required, Validators.pattern('^[A-Z]{2}$')]],
      zip_code: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.addressId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.addressId) {
      this.isEditMode = true;
      this.loadAddress(this.addressId);
    }
  }

  private loadAddress(id: number): void {
    this.isLoading = true;
    this.addressService.getAddress(id).subscribe({
      next: (address) => {
        this.addressForm.patchValue(address);
        this.isLoading = false;
      },
      error: (error) => {
        this.error = 'Failed to load address';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.addressForm.valid) {
      this.isLoading = true;
      const addressData = this.addressForm.value;

      const request = this.isEditMode && this.addressId
        ? this.addressService.updateAddress(this.addressId, addressData)
        : this.addressService.createAddress(addressData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          this.error = 'Failed to save address';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/account/addresses']);
  }
} 