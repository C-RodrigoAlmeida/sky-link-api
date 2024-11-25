import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { BaggageType } from '../models/baggage-type.interface';
import { PaginatedResponse } from '../../../core/models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class BaggageTypeService {
  private path = '/flight/baggage_type/';

  constructor(private apiService: ApiService) {}

  getBaggageTypes(): Observable<PaginatedResponse<BaggageType>> {
    return this.apiService.get<BaggageType>(this.path);
  }

  getBaggageType(id: number): Observable<BaggageType> {
    return this.apiService.getOne<BaggageType>(`${this.path}${id}/`);
  }

  createBaggageType(baggage: Partial<BaggageType>): Observable<BaggageType> {
    return this.apiService.post<BaggageType>(this.path, baggage);
  }

  updateBaggageType(id: number, baggage: Partial<BaggageType>): Observable<BaggageType> {
    return this.apiService.put<BaggageType>(`${this.path}${id}/`, baggage);
  }

  deleteBaggageType(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}${id}/`);
  }
} 