import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { LoginResponse } from '../models/login.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:3000';  // URL do backend

  constructor(private http: HttpClient) {}

  // Método de login
  login(email: string, password: string): Observable<LoginResponse> {
    const url = `${this.apiUrl}/login`;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const body = { email, password };

    return this.http.post<LoginResponse>(url, body, { headers }).pipe(
      tap(response => {
        // Salva o access_token no localStorage
        localStorage.setItem('authToken', response.access_token);
      })
    );
  }

  // Método para verificar se o usuário está logado
  isLoggedIn(): boolean {
    return !!localStorage.getItem('authToken');
  }

  // Método para deslogar o usuário
  logout(): void {
    localStorage.removeItem('authToken');
  }
}
