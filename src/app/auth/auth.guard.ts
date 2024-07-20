import {
  ActivatedRouteSnapshot,
  CanActivate,
  RouterStateSnapshot,
  Router,
  CanLoad,
  Route,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import * as fromRoot from '../../app.reducer';
import { Store } from '@ngrx/store';
import { take } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate, CanLoad {
  constructor(
    private authServ: AuthService,
    private router: Router,
    private store: Store<fromRoot.State>
  ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    return this.store.select(fromRoot.getisAuthenticated).pipe(take(1));
    // const isAuthenticated = this.authServ.isAuth();
    // if (isAuthenticated !== undefined && isAuthenticated) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }

  canLoad(route: Route) {
    console.log('Can Load is checked');
    return this.store.select(fromRoot.getisAuthenticated).pipe(take(1));
    // const isAuthenticated = this.authServ.isAuth();
    // if (isAuthenticated !== undefined && isAuthenticated) {
    //   return true;
    // } else {
    //   this.router.navigate(['/login']);
    //   return false;
    // }
  }
}
