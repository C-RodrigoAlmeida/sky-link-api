import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  protected baseUrl: string = environment.apiUrl;

  constructor(private http: HttpClient) {}

  private getCsrfToken(): string | null {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )csrftoken=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  private addCsrfHeader(headers: HttpHeaders = new HttpHeaders()): HttpHeaders {
    const csrfToken = this.getCsrfToken();
    if (csrfToken) {
      headers = headers.set('X-CSRFToken', csrfToken);
    }
    return headers;
  }

  get<T>(path: string): Observable<T> {
    return this.http.get<T>(`${this.baseUrl}${path}`, {
      headers: this.addCsrfHeader(),
      withCredentials: true
    });
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.http.post<T>(`${this.baseUrl}${path}`, body, {
      headers: this.addCsrfHeader(),
      withCredentials: true
    });
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.http.put<T>(`${this.baseUrl}${path}`, body, {
      headers: this.addCsrfHeader(),
      withCredentials: true
    });
  }

  delete<T>(path: string): Observable<T> {
    return this.http.delete<T>(`${this.baseUrl}${path}`, {
      headers: this.addCsrfHeader(),
      withCredentials: true
    });
  }
}
