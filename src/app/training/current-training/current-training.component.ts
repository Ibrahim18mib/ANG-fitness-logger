import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.scss',
})
export class CurrentTrainingComponent implements OnInit {
  @Output() trainExitListener = new EventEmitter<void>();

  progress: number = 0;
  timer!: any;

  constructor(private dialog: MatDialog) {}

  ngOnInit(): void {
    this.startorResume();
  }

  startorResume() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer);
      }
    }, 1000);
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log(res);
      if (res) {
        this.trainExitListener.emit();
      } else {
        this.startorResume();
      }
    });
  }
}
