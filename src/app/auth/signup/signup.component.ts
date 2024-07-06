import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subscription } from 'rxjs';
import { UIService } from '../../../sharedUI/ui.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss',
})
export class SignupComponent implements OnInit, OnDestroy {
  maxDate: any;
  signInForm!: FormGroup;

  isLoading = false;
  private loadSubject!: Subscription;

  constructor(private authServ: AuthService, private uiServ: UIService) {}

  ngOnInit(): void {
    this.loadSubject = this.uiServ.loadingStateChanged.subscribe((isLoaded) => {
      this.isLoading = isLoaded;
    });
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  onSubmit(form: NgForm) {
    console.log('SignupForm', form);

    this.authServ.registerUser({
      email: form.value.email,
      password: form.value.password,
    });
  }

  ngOnDestroy(): void {
    this.loadSubject.unsubscribe();
  }
}
