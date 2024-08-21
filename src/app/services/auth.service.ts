import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable, tap } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private tokenService: TokenService) { }

  login(username: string, password: string): Observable<any> {
    return this.http.post<{ token: string }>(`${environment.api_url_endpoint}/auth/login`, { username, password })
      .pipe(
        tap(response => {
          this.tokenService.saveToken(response.token);
        })
      );
  }

  logout(): void {
    this.tokenService.removeToken();
    this.tokenService.removeRefreshToken();
  }

  isAuthenticated(): boolean {
    return !!this.tokenService.getToken();
  }
}
