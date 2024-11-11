import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../../../core/services/api.service';
import { Address } from '../models/address.interface';

@Injectable({
  providedIn: 'root'
})
export class AddressService {
  private path = '/addresses';

  constructor(private apiService: ApiService) {}

  getAddresses(): Observable<Address[]> {
    return this.apiService.get<Address[]>(this.path);
  }

  getAddress(id: number): Observable<Address> {
    return this.apiService.get<Address>(`${this.path}/${id}`);
  }

  createAddress(address: Partial<Address>): Observable<Address> {
    return this.apiService.post<Address>(this.path, address);
  }

  updateAddress(id: number, address: Partial<Address>): Observable<Address> {
    return this.apiService.put<Address>(`${this.path}/${id}`, address);
  }

  deleteAddress(id: number): Observable<void> {
    return this.apiService.delete<void>(`${this.path}/${id}`);
  }
} 