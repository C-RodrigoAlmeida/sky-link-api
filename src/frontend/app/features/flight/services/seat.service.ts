import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Seat } from '../models/seat.interface';

@Injectable({
  providedIn: 'root'
})
export class SeatService {
  private path = '/seats';

  constructor(private apiService: ApiService) {}

  getSeats(): Observable<Seat[]> {
    return this.apiService.get<Seat[]>(this.path);
  }

  getSeat(id: number): Observable<Seat> {
    return this.apiService.get<Seat>(`${this.path}/${id}`);
  }

  createSeat(seat: Partial<Seat>): Observable<Seat> {
    return this.apiService.post<Seat>(this.path, seat);
  }

  updateSeat(id: number, seat: Partial<Seat>): Observable<Seat> {
    return this.apiService.put<Seat>(`${this.path}/${id}`, seat);
  }

  deleteSeat(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }
} 