import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Flight } from '../models/flight.interface';

@Injectable({
  providedIn: 'root'
})
export class FlightService {
  private path = '/flights';

  constructor(private apiService: ApiService) {}

  getFlights(): Observable<Flight[]> {
    return this.apiService.get<Flight[]>(this.path);
  }

  getFlight(id: number): Observable<Flight> {
    return this.apiService.get<Flight>(`${this.path}/${id}`);
  }

  createFlight(flight: Partial<Flight>): Observable<Flight> {
    return this.apiService.post<Flight>(this.path, flight);
  }

  updateFlight(id: number, flight: Partial<Flight>): Observable<Flight> {
    return this.apiService.put<Flight>(`${this.path}/${id}`, flight);
  }

  deleteFlight(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }
} 