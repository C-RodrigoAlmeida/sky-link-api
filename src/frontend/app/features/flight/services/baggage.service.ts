import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Baggage } from '../models/baggage.interface';

@Injectable({
  providedIn: 'root'
})
export class BaggageService {
  private path = '/baggage';

  constructor(private apiService: ApiService) {}

  getBaggages(): Observable<Baggage[]> {
    return this.apiService.get<Baggage[]>(this.path);
  }

  getBaggage(id: number): Observable<Baggage> {
    return this.apiService.get<Baggage>(`${this.path}/${id}`);
  }

  createBaggage(baggage: Partial<Baggage>): Observable<Baggage> {
    return this.apiService.post<Baggage>(this.path, baggage);
  }

  updateBaggage(id: number, baggage: Partial<Baggage>): Observable<Baggage> {
    return this.apiService.put<Baggage>(`${this.path}/${id}`, baggage);
  }

  deleteBaggage(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }
} 