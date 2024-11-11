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

  // Function to retrieve CSRF token by making a GET request to the /csrf/ endpoint
  private getCsrfToken(): Observable<void> {
    return this.http.get(`${this.apiUrl}/csrf/`, { 
      withCredentials: true 
    }).pipe(map(() => void 0));
  }

  // Helper function to retrieve a specific cookie by name
  private getCookie(name: string): string | null {
    const matches = document.cookie.match(new RegExp(
      `(?:^|; )${name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1')}=([^;]*)`
    ));
    return matches ? decodeURIComponent(matches[1]) : null;
  }

  // Login function, first retrieves CSRF token, then performs login with credentials
  login(credentials: LoginCredentials): Observable<AuthResponse> {
    return this.getCsrfToken().pipe(
      switchMap(() => {
        const csrfToken = this.getCookie('csrftoken');
        const headers = new HttpHeaders({
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken || ''
        });
        return this.http.post<AuthResponse>(`${this.apiUrl}/login/`, credentials, {
          headers,
          withCredentials: true
        });
      }),
      tap((response: AuthResponse) => {
        this.authStatus.next(true);
        this.currentUser.next(response.user);
      })
    );
  }

  // Logout function to log out the user
  logout(): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/logout/`, {}, { withCredentials: true })
      .pipe(
        tap(() => {
          this.authStatus.next(false);
          this.currentUser.next(null);
        })
      );
  }

  // Function to check if the user is authenticated
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

  // Returns the current authentication status as a boolean
  isAuthenticated(): boolean {
    return this.authStatus.value;
  }

  // Observable to get authentication status
  getAuthStatus(): Observable<boolean> {
    return this.authStatus.asObservable();
  }

  // Observable to get the current user
  getCurrentUser(): Observable<any> {
    return this.currentUser.asObservable();
  }
}
