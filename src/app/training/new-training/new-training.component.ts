import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { ExerciseService } from '../exercise.services';
import { Exercise } from '../exercise.module';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { UIService } from '../../../sharedUI/ui.service';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit, OnDestroy {
  @Output() onTrainingListener = new EventEmitter<void>();

  exerciseLists!: Exercise[] | null;
  private exerciseSubscription!: Subscription;
  private loadSubscription!: Subscription;

  isLoading = true;

  constructor(
    private ExerciseServ: ExerciseService,
    private db: AngularFirestore,
    private uiServ: UIService
  ) {}

  ngOnInit(): void {
    this.loadSubscription = this.uiServ.loadingStateChanged.subscribe(
      (isLoaded) => {
        this.isLoading = isLoaded;
      }
    );
    this.exerciseSubscription = this.ExerciseServ.exercisesChanged.subscribe(
      (exercises) => {
        console.log('exerciseesl', exercises);
        this.exerciseLists = exercises;
        // this.isLoading = false
      }
    );
    this.fetchExercise();
  }

  fetchExercise() {
    console.log('Fetching OR REtry Fetch Clicked');
    this.ExerciseServ.fetchAvailableExercise();
  }

  onStartTraining(form: NgForm) {
    // this.onTrainingListener.emit();
    this.ExerciseServ.startExercise(form.value.exercise);
  }

  ngOnDestroy(): void {
    this.exerciseSubscription.unsubscribe();
    this.loadSubscription.unsubscribe();
  }
}
