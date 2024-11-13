import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap, map } from 'rxjs/operators';
import { LoginCredentials, AuthResponse } from '../../features/auth/models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8000/api/account';
  private authStatus = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
  }

  private getCsrfToken(): Observable<void> {
    return this.http.get(`${this.apiUrl}/csrf/`, { 
      withCredentials: true 
    }).pipe(map(() => void 0));
  }

  private getCookie(name: string): string | null {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, credentials, {
      withCredentials: true
    }).pipe(
      tap((response: AuthResponse) => {
        this.authStatus.next(true);
        this.currentUser.next(response.user);
      })
    );
  }

  logout(): Observable<void> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const csrfToken = this.getCookie('csrftoken');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || ''
        });
        
        return this.http.post<void>(`${this.apiUrl}/logout/`, {}, { 
          headers,
          withCredentials: true 
        }).pipe(
          tap(() => {
            this.authStatus.next(false);
            this.currentUser.next(null);
          })
        );
      })
    );
  }

  checkAuthStatus(): void {
    this.http.get<AuthResponse>(`${this.apiUrl}/session/`, { withCredentials: true })
      .subscribe({
        next: (response) => {
          this.authStatus.next(true);
          this.currentUser.next(response.user);
        },
        error: () => {
          this.authStatus.next(false);
          this.currentUser.next(null);
        }
      });
  }

  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
