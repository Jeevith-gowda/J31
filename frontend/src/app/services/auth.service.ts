import { Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';

const TOKEN_KEY = 'j31_token';
const API_BASE = 'http://localhost:3000';

@Injectable({ providedIn: 'root' })
export class AuthService {
  token = signal<string | null>(localStorage.getItem(TOKEN_KEY));

  constructor(private http: HttpClient) {}

  login(username: string, password: string) {
    return this.http.post<{ token: string }>(`${API_BASE}/auth/login`, { username, password });
  }

  setToken(token: string) {
    localStorage.setItem(TOKEN_KEY, token);
    this.token.set(token);
  }

  getToken(): string | null {
    return this.token();
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(TOKEN_KEY);
    this.token.set(null);
  }
}
