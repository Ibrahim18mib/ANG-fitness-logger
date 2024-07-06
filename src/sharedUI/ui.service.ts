import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';

@Injectable()
export class UIService {
  constructor(private snackBar: MatSnackBar) {}
  loadingStateChanged = new Subject<boolean>();

  showSnackbar(getMessage: any, getAction: any, getDuration: any) {
    this.snackBar.open(getMessage, getAction, {
      duration: getDuration,
    });
  }
}
