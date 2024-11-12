import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Seat } from '../models/seat.interface';
import { PaginatedResponse } from '../../../core/models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private path = '/flight/seats/';

  constructor(private apiService: ApiService) {}

  getSeats(): Observable<PaginatedResponse<Seat>> {
    return this.apiService.get<Seat>(this.path);
  }

  getSeat(id: number): Observable<Seat> {
    return this.apiService.getOne<Seat>(`${this.path}${id}/`);
  }

  createSeat(seat: Partial<Seat>): Observable<Seat> {
    return this.apiService.post<Seat>(this.path, seat);
  }

  updateSeat(id: number, seat: Partial<Seat>): Observable<Seat> {
    return this.apiService.put<Seat>(`${this.path}${id}/`, seat);
  }

  deleteSeat(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}${id}/`);
  }
} 