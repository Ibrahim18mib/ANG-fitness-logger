import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ExerciseService } from './exercise.services';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent implements OnInit {
  onGoingTraining: boolean = false;
  exerciseSubscription!: Subscription;

  constructor(private exerciseServ: ExerciseService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.exerciseServ.exerciseChanged.subscribe(
      (obj) => {
        if (obj) {
          this.onGoingTraining = true;
        } else {
          this.onGoingTraining = false;
        }
      }
    );
  }
}
