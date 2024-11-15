import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Reservation } from '../models/reservation.interface';
import { PaginatedResponse } from '../../../core/models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {
  private path = '/flight/reservations/';

  constructor(private apiService: ApiService) {}

  getReservations(): Observable<PaginatedResponse<Reservation>> {
    return this.apiService.get<Reservation>(this.path);
  }

  getReservation(id: number): Observable<Reservation> {
    return this.apiService.getOne<Reservation>(`${this.path}${id}/`);
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