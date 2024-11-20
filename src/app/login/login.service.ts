import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Login } from './login.model';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class LoginService {
  private baseUrl = 'http://localhost:5000';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: Login): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, credentials).pipe(
      tap((response) => {
        // Handle the response here, including setting the cookie and redirecting
        const cookie = response.cookie;
        document.cookie = cookie;
        this.router.navigate(['/lista-de-asistentes']);
      })
    );
  }

  logout(): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/logout`).pipe(
      tap(() => {
        this.router.navigate(['/login']);
      })
    );
  }

  isAuthenticated(): boolean {
    // Verifica si hay un token en el almacenamiento local
    // y si es válido para continuar con la navegación
    // (ej: verificar el tiempo de expiración del token)
    // const token = localStorage.getItem('access_token');
    // return!!token && this.validateToken(token);
    if(!localStorage.getItem('access_token')) return false;
    return true;
  }
}
