import { AuthData } from './auth-data.model';
import { User } from './user.module';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  private user!: User | null;
  authChange = new Subject<boolean>();

  constructor(private route: Router) {}

  registerUser(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessFull();
    // this.authChange.next(true);
    // this.route.navigate(['/training']);
  }

  login(authdata: AuthData) {
    this.user = {
      email: authdata.email,
      userId: Math.round(Math.random() * 10000).toString(),
    };
    this.authSuccessFull();
    // this.authChange.next(true);
    // this.route.navigate(['/training']);
  }
  logout() {
    this.user = null;
    this.authChange.next(false);
    this.route.navigate(['/login']);
  }

  getUser() {
    return { ...this.user };
  }

  isAuth() {
    console.log('thisuserauth', this.user);
    return this.user != null;
  }

  private authSuccessFull() {
    this.authChange.next(true);
    this.route.navigate(['/training']);
  }
}
