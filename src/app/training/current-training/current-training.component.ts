import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';
import { ExerciseService } from '../exercise.services';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.scss',
})
export class CurrentTrainingComponent implements OnInit {
  progress: number = 0;
  timer!: any;

  constructor(
    private dialog: MatDialog,
    private exerciseServ: ExerciseService
  ) {}

  ngOnInit(): void {
    this.startorResume();
  }

  startorResume() {
    const runningExercise = this.exerciseServ.getRunningExercise();
    if (runningExercise && runningExercise.duration !== undefined) {
      const stepSec = (runningExercise.duration / 100) * 1000;
      console.log('deuration in start or resume', stepSec);
      this.timer = setInterval(() => {
        this.progress = this.progress + 1;
        if (this.progress >= 100) {
          this.exerciseServ.completeExercise();
          clearInterval(this.timer);
        }
      }, stepSec);
    } else {
      console.error('No running exercise or duration is not defined.');
    }
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {
        progress: this.progress,
      },
    });

    dialogRef.afterClosed().subscribe((res) => {
      console.log('after closed yes', res);
      if (res) {
        this.exerciseServ.cancelExercise(this.progress);
      } else {
        this.startorResume();
      }
    });
  }
}
