import { Injectable } from '@angular/core';

@Injectable()
export class AuthService {
  public getJwt() {
    const jwt: string = localStorage.getItem('jwt') || '';
    return jwt;
  }

  public refreshJwt() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const jwt = Math.random().toString();
        this.setJwt(jwt);
        resolve(jwt);
      }, 1000);
    });
  }

  public setJwt(jwt: string) {
    localStorage.setItem('jwt', jwt);
  }

  public setJwtByUserType(type: string) {
    const jwt = type;
    this.setJwt(jwt);
  }

  public clear() {
    localStorage.removeItem('jwt');
  }
}
