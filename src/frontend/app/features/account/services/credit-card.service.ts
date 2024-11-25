import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { CreditCard } from '../models/credit-card.interface';
import { PaginatedResponse } from '../../../core/models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class CreditCardService {
  private path = '/payment/credit_card/';

  constructor(private apiService: ApiService) {}

  getUserCreditCards(): Observable<PaginatedResponse<CreditCard>> {
    return this.apiService.get<CreditCard>(this.path);
  }

  getUserCreditCard(id: number): Observable<CreditCard> {
    return this.apiService.getOne<CreditCard>(`${this.path}${id}/`)
  }

  createCreditCard(cardData: Partial<CreditCard>): Observable<CreditCard> {
    return this.apiService.post<CreditCard>(this.path, cardData);
  }

  updateCreditCard(id: number, cardData: Partial<CreditCard>): Observable<CreditCard> {
    return this.apiService.put<CreditCard>(`${this.path}${id}/`, cardData);
  }

  deleteCreditCard(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}${id}/`);
  }
} 