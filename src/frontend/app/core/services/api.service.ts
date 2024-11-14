import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PaginatedResponse } from '../models/paginated-response.interface';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}


  get<T>(path: string, params: HttpParams = new HttpParams()): Observable<PaginatedResponse<T>> {
    return this.http.get<PaginatedResponse<T>>(`${this.apiUrl}${path}`, { params, withCredentials: true });
  }

  getOne<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.apiUrl}${path}`, { withCredentials: true} );
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}${path}`, body);
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}${path}`, body);
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}${path}`);
  }
}
