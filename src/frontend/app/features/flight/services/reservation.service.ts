import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Reservation, RetrieveReservation } from '../models/reservation.interface';
import { PaginatedResponse } from '../../../core/models/paginated-response.interface';
import { HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private path = '/flight/reservations/';

  constructor(private apiService: ApiService) {}

  getReservations(params: HttpParams): Observable<PaginatedResponse<RetrieveReservation>> {
    return this.apiService.get<RetrieveReservation>(this.path, params);
  }

  getReservation(id: number): Observable<RetrieveReservation> {
    return this.apiService.getOne<RetrieveReservation>(`${this.path}${id}/`);
  }

  createReservation(reservation: Partial<Reservation>): Observable<Reservation> {
    return this.apiService.post<Reservation>(this.path, reservation);
  }

  updateReservation(id: number, reservation: Partial<Reservation>): Observable<Reservation> {
    return this.apiService.put<Reservation>(`${this.path}${id}/`, reservation);
  }

  deleteReservation(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}${id}/`);
  }
} 