import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Gate } from '../models/gate.interface';

@Injectable({
  providedIn: 'root'
})
export class GateService {
  private path = '/gates';

  constructor(private apiService: ApiService) {}

  getGates(): Observable<Gate[]> {
    return this.apiService.get<Gate[]>(this.path);
  }

  getGate(id: number): Observable<Gate> {
    return this.apiService.get<Gate>(`${this.path}/${id}`);
  }

  createGate(gate: Partial<Gate>): Observable<Gate> {
    return this.apiService.post<Gate>(this.path, gate);
  }

  updateGate(id: number, gate: Partial<Gate>): Observable<Gate> {
    return this.apiService.put<Gate>(`${this.path}/${id}`, gate);
  }

  deleteGate(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }
} 