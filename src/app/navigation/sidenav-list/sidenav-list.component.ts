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
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent implements OnInit {
  @Output() closeNavListener = new EventEmitter<void>();
  // isAuth: boolean = false;
  isAuth$!: Observable<boolean>;
  authSubscription!: Subscription;

  constructor(private authServ: AuthService,private store:Store<FromRoot.State>) {}

  ngOnInit(): void {

    this.isAuth$ = this.store.select(FromRoot.getisAuthenticated);
    // this.authSubscription = this.authServ.authChange.subscribe((authStatus) => {
    //   this.isAuth = authStatus;
    // });
  }

  onclose() {
    console.log('closing event emiiter from sidenav');
    this.closeNavListener.emit();
  }

  onLogout() {
    this.onclose();
    this.authServ.logout();
  }

  // ngOnDestroy(): void {
  //   if(this.authSubscription) {
  //     this.authSubscription.unsubscribe();
  //   }  
  // }


}
