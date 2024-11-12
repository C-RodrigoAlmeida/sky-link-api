import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Airport } from '../models/airport.interface';
import { PaginatedResponse } from '../../../core/models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class AirportService {
  private path = '/airport/airports/';

  constructor(private apiService: ApiService) {}

  getAirports(): Observable<PaginatedResponse<Airport>> {
    return this.apiService.get<Airport>(this.path);
  }

  getAirport(id: number): Observable<Airport> {
    return this.apiService.getOne<Airport>(`${this.path}${id}/`);
  }

  createAirport(airport: Partial<Airport>): Observable<Airport> {
    return this.apiService.post<Airport>(this.path, airport);
  }

  updateAirport(id: number, airport: Partial<Airport>): Observable<Airport> {
    return this.apiService.put<Airport>(`${this.path}${id}/`, airport);
  }

  deleteAirport(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}${id}/`);
  }
} 