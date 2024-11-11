import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { AirlineCompany } from '../models/airline.interface';

@Injectable({
  providedIn: 'root'
})
export class AirlineService {
  private path = '/airlines';

  constructor(private apiService: ApiService) {}

  getAirlines(): Observable<AirlineCompany[]> {
    return this.apiService.get<AirlineCompany[]>(this.path);
  }

  getAirline(id: number): Observable<AirlineCompany> {
    return this.apiService.get<AirlineCompany>(`${this.path}/${id}`);
  }

  createAirline(airline: Partial<AirlineCompany>): Observable<AirlineCompany> {
    return this.apiService.post<AirlineCompany>(this.path, airline);
  }

  updateAirline(id: number, airline: Partial<AirlineCompany>): Observable<AirlineCompany> {
    return this.apiService.put<AirlineCompany>(`${this.path}/${id}`, airline);
  }

  deleteAirline(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }
} 