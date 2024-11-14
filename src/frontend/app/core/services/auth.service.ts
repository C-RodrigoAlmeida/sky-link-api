import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap, switchMap } from 'rxjs/operators';
import { LoginCredentials, AuthResponse } from '../../features/auth/models/auth.model';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = `${environment.apiUrl}/account`;
  private authStatus = new BehaviorSubject<boolean>(false);
  private currentUser = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
    this.checkAuthStatus();
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
    return this.http.post<void>(`${this.apiUrl}/logout/`, {}, { 
      withCredentials: true 
      }).pipe(
        tap(() => {
          this.authStatus.next(false);
          this.currentUser.next(null);
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
}

  // isAuthenticated(): boolean {
  //   return this.authStatus.value;
  // }

  // getAuthStatus(): Observable<boolean> {
  //   return this.authStatus.asObservable();
  // }

  // getCurrentUser(): Observable<any> {
  //   return this.currentUser.asObservable();
  // }
// }
