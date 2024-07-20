import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ExerciseService } from './exercise.services';
import { Store } from '@ngrx/store';
import * as fromTraining from './exercise.reducer';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent implements OnInit {
  // onGoingTraining: boolean = false;

  onGoingTraining$!: Observable<boolean>;

  constructor(
    private exerciseServ: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.onGoingTraining$ = this.store.select(fromTraining.getIsTraining);
    // this.exerciseSubscription = this.exerciseServ.exerciseChanged.subscribe(
    //   (obj) => {
    //     if (obj) {
    //       this.onGoingTraining = true;
    //     } else {
    //       this.onGoingTraining = false;
    //     }
    //   }
    // );
  }

  
}
