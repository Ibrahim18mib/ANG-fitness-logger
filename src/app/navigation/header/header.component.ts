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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Output() sidenavListener = new EventEmitter<void>();
  isAuth: boolean = false;
  authSubscription!: Subscription;

  constructor(private authServ: AuthService) {}

  ngOnInit(): void {
    this.authSubscription = this.authServ.authChange.subscribe((authStatus) => {
      this.isAuth = authStatus;
    });
  }
  onSidenavToggle() {
    console.log('sidenav emitting from header');
    this.sidenavListener.emit();
  }

  onLogout(){
    this.authServ.logout();
  }

  ngOnDestroy(): void {
    if (this.authSubscription) {
      this.authSubscription.unsubscribe();
    }
    
  }
}
