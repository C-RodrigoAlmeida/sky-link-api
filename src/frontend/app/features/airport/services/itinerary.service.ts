import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Itinerary } from '../models/itinerary.interface';
import { PaginatedResponse } from '../../../core/models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ItineraryService {
  private path = '/airport/itineraries/';

  constructor(private apiService: ApiService) {}

  getItineraries(): Observable<PaginatedResponse<Itinerary>> {
    return this.apiService.get<Itinerary>(this.path);
  }

  getItinerary(id: number): Observable<Itinerary> {
    return this.apiService.getOne<Itinerary>(`${this.path}${id}/`);
  }

  createItinerary(itinerary: Partial<Itinerary>): Observable<Itinerary> {
    return this.apiService.post<Itinerary>(this.path, itinerary);
  }

  updateItinerary(id: number, itinerary: Partial<Itinerary>): Observable<Itinerary> {
    return this.apiService.put<Itinerary>(`${this.path}${id}/`, itinerary);
  }

  deleteItinerary(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}${id}/`);
  }
} 