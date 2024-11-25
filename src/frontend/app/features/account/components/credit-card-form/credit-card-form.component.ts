import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CreditCardService } from '../../services/credit-card.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-credit-card-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './credit-card-form.component.html',
  styleUrls: ['./credit-card-form.component.css']
})
export class CreditCardFormComponent implements OnInit {
  creditCardForm: FormGroup;
  isLoading = false;
  errorMessage = '';
  isEditMode = false;
  cardId?: number;

  constructor(
    private fb: FormBuilder,
    private creditCardService: CreditCardService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.creditCardForm = this.fb.group({
      card_number: ['', [Validators.required]],
      cardholder_name: ['', [Validators.required]],
      expiration_date: ['', [Validators.required]],
      cvv: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(3)]]
    });
  }

  ngOnInit(): void {
    this.cardId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.cardId) {
      this.isEditMode = true;
      this.loadCard(this.cardId);
    }
  }

  private loadCard(id: number): void {
    this.isLoading = true;
    this.creditCardService.getUserCreditCard(id).subscribe({
      next: (card) => {
        this.creditCardForm.patchValue(card);
        this.isLoading = false;
      },
      error: (error) => {
        this.errorMessage = 'Failed to load credit card';
        this.isLoading = false;
      }
    });
  }

  onSubmit(): void {
    if (this.creditCardForm.valid) {
      this.isLoading = true;
      const cardData = this.creditCardForm.value;

      const request = this.isEditMode && this.cardId
        ? this.creditCardService.updateCreditCard(this.cardId, cardData)
        : this.creditCardService.createCreditCard(cardData);

      request.subscribe({
        next: () => {
          this.router.navigate(['/profile']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to save credit card';
          this.isLoading = false;
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/profile']);
  }
} 