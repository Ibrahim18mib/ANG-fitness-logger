import { IAuthData } from './auth-data.model';
import { User } from './user.module';
import { Subject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Injectable()
export class AuthService {
  private user!: User | null;
  authChange = new Subject<boolean>();

  constructor(
    private route: Router,
    private angularFireAuth: AngularFireAuth
  ) {}

  registerUser(authdata: IAuthData) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(authdata.email, authdata.password)
      .then((res) => {
        console.log('authregres', res);
        this.authSuccessFull();
      })
      .catch((err) => {
        console.log('authregrerr', err);
      });
  }

  login(authData: IAuthData) {
    console.log('login data', authData);
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log('authsignres', res);
        this.authSuccessFull();
      })
      .catch((err) => {
        console.log('authsignrerr', err);
      });

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

  private authSuccessFull(): void {
    this.authChange.next(true);
    this.route.navigate(['/training']);
  }
}
