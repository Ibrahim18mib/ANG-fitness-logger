import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Observable, Subscription } from 'rxjs';

import * as FromRoot from '../../../app.reducer';
import { Store } from '@ngrx/store';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit {
  @Output() sidenavListener = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$!: Observable<boolean>;
  authSubscription!: Subscription;

  constructor(
    private authServ: AuthService,
    private store: Store<FromRoot.State>
  ) {}

  ngOnInit(): void {
    this.isAuth$ = this.store.select(FromRoot.getisAuthenticated);
    // this.authSubscription = this.authServ.authChange.subscribe((authStatus) => {
    //   this.isAuth = authStatus;
    // });
  }
  onSidenavToggle() {
    console.log('sidenav emitting from header');
    this.sidenavListener.emit();
  }

  onLogout() {
    this.authServ.logout();
  }

  // ngOnDestroy(): void {
  //   if (this.authSubscription) {
  //     this.authSubscription.unsubscribe();
  //   }
  // }
}
