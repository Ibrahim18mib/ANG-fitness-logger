import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../../sharedUI/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit,OnDestroy {
  loginForm!: FormGroup;

  isLoading = false;
  private loadSubject!: Subscription;

  constructor(private authService: AuthService,private uiServ:UIService) {}

  ngOnInit() {
   this.loadSubject =  this.uiServ.loadingStateChanged.subscribe( isLoaded => {
    this.isLoading = isLoaded;
   })
    this.loginForm = new FormGroup({
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      password: new FormControl('', { validators: [Validators.required] }),
    });
  }

  onSubmit() {
    console.log('LoginForm', this.loginForm);
    this.authService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password,
    });
  }


  ngOnDestroy(): void {
    if(this.loadSubject){
      this.loadSubject.unsubscribe();
    }
    
  }
}
