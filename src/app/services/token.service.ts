import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

const ACCESS_TOKEN:string = 'access_token';
const REFRESH_TOKEN:string = 'refresh_token';

@Injectable({
  providedIn: 'root'
})

export class TokenService {
  constructor() { }

  getToken(): string | null{
    return localStorage.getItem(ACCESS_TOKEN);
  }

  getRefreshToken():string | null{
    return localStorage.getItem(REFRESH_TOKEN);
  }

  saveToken(token?: string): void{
    token ? localStorage.setItem(ACCESS_TOKEN, token) : localStorage.setItem(ACCESS_TOKEN, '')
  }

  saveRefreshToken(refreshToken: string): void{
    localStorage.setItem(REFRESH_TOKEN, refreshToken);
  }

  removeToken(): void{
    localStorage.removeItem(ACCESS_TOKEN);
  }

  removeRefreshToken(): void{
    localStorage.removeItem(REFRESH_TOKEN);
  }

  getDecodedToken(): any {
    const token = this.getToken();
    if (token) {
      return jwtDecode(token);
    }
    return null;
  }

  getUsername(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.sub : null;
  }

  getEmail(): string | null {
    const decodedToken = this.getDecodedToken();
    return decodedToken ? decodedToken.email : null;
  }

  isTokenExpired(): boolean {
    const decodedToken = this.getDecodedToken();
    if (decodedToken) {
      const expirationDate = new Date(0);
      expirationDate.setUTCSeconds(decodedToken.exp);
      return expirationDate < new Date();
    }
    return true;
  }
}




