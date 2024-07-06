import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  OnDestroy,
} from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrl: './sidenav-list.component.scss',
})
export class SidenavListComponent implements OnInit, OnDestroy {
  @Output() closeNavListener = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription!: Subscription;

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authServ.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }

  onclose() {
    console.log('closing event emiiter from sidenav');
    this.closeNavListener.emit();
  }

  onLogout() {
    this.onclose();
    this.authServ.logout();
  }

  ngOnDestroy(): void {
    if(this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    
  }
}
