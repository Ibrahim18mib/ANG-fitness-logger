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
import { ExerciseService } from '../training/exercise.services';

@Injectable()
export class AuthService {
  private user!: User | null;
  authChange = new Subject<boolean>();

  private isAuthenticated = false;

  constructor(
    private route: Router,
    private angularFireAuth: AngularFireAuth,
    private exerciseServ: ExerciseService
  ) {}

  initAuthListener() {
    this.angularFireAuth.authState.subscribe((user) => {
      if (user) {
        this.isAuthenticated = true;
        this.authChange.next(true);
        this.route.navigate(['/training']);
      } else {
        this.exerciseServ.cancelledSubscriptions();
        this.user = null;
        this.authChange.next(false);
        this.route.navigate(['/login']);
        this.isAuthenticated = false;
      }
    });
  }

  registerUser(authdata: IAuthData) {
    this.angularFireAuth
      .createUserWithEmailAndPassword(authdata.email, authdata.password)
      .then((res) => {
        console.log('authsignres', res);
        // this.authSuccessFull();
      })
      .catch((err) => {
        console.log('authsignerr', err);
      });
  }

  login(authData: IAuthData) {
    console.log('login data', authData);
    this.angularFireAuth
      .signInWithEmailAndPassword(authData.email, authData.password)
      .then((res) => {
        console.log('authloginres', res);
        // this.authSuccessFull();
      })
      .catch((err) => {
        console.log('authloginerr', err);
      });

    // this.authChange.next(true);
    // this.route.navigate(['/training']);
  }
  logout() {
    this.angularFireAuth.signOut();
    // this.exerciseServ.cancelledSubscriptions();
    // this.user = null;
    // this.authChange.next(false);
    // this.route.navigate(['/login']);
    // this.isAuthenticated = false;
  }

  // getUser() {
  //   return { ...this.user };
  // }

  isAuth() {
    console.log('thisuserauth', this.user);
    console.log('this.isAuthenticated', this.isAuthenticated);
    return this.isAuthenticated;
  }

  // private authSuccessFull(): void {
  //   this.isAuthenticated = true;
  //   this.authChange.next(true);
  //   this.route.navigate(['/training']);
  // }
}
