import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public getJwt() {
    const jwt: string = localStorage.getItem('jwt') || '';
    return `Bearer ${jwt}`;
  }
}
