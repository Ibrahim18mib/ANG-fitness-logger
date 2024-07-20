import { Exercise } from './exercise.module';
import { Subscription, map, take } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { UIService } from '../../sharedUI/ui.service';

import * as fromTraining from '../../app/training/exercise.reducer';
import * as Training from '../../app/training/exercise.actions';
import * as UI from '../../sharedUI/ui.actions';
import { Store } from '@ngrx/store';

@Injectable()
export class ExerciseService {
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;

  private fbSubs: Subscription[] = [];
  // private exercises: Exercise[] = [];

  constructor(
    private db: AngularFirestore,
    private uiServ: UIService,
    private store: Store<fromTraining.State>
  ) {}

  // getAvailableExercise() {
  //   return this.availableExercises.slice();
  // }

  fetchAvailableExercise() {
    // this.uiServ.loadingStateChanged.next(true);
    this.store.dispatch(new UI.StartLoading());
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
            // throw new Error();

            return docArray.map((doc) => {
              const id = doc.payload.doc.id;
              const data: any = doc.payload.doc.data();
              //  console.log("xxxssss",doc.payload.doc.data())
              return {
                id,
                name: data.name,
                duration: data.duration,
                calories: data.calories,
              };
            });
          })
        )
        .subscribe(
          (exercises: Exercise[]) => {
            // console.log("fetched exercisess",exercises);
            this.store.dispatch(new UI.StopLoading());
            // this.uiServ.loadingStateChanged.next(false);
            this.store.dispatch(new Training.SetAvailableTrainings(exercises));
            // this.availableExercises = exercises;
            // this.exercisesChanged.next([...this.availableExercises]);
          },
          (error) => {
            // this.uiServ.loadingStateChanged.next(false);
            this.store.dispatch(new UI.StopLoading());
            this.uiServ.showSnackbar(
              'Error in Fetching DAta,Please try again ',
              undefined,
              3000
            );
          }
        )
    );
  }

  fetchCompletedOrCancelled() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercise')
        .valueChanges()
        .subscribe((exercises: any[]) => {
          console.log('fetchCompletedOrCancelled', exercises);
          this.store.dispatch(new Training.SetFinishedTrainings(exercises));
          // this.finishedExercisesChanged.next(exercise);
        })
    );
  }

  cancelledSubscriptions() {
    this.fbSubs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  startExercise(selectedId: string | any) {
    // this.db
    //   .doc('availableExercises/' + selectedId)
    //   .update({ lastSeen: new Date() });

    this.store.dispatch(new Training.StartTraining(selectedId));
  }

  completeExercise() {
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe((finished) => {
        if (finished) {
          const completedExercise: Exercise = {
            ...finished,
            date: new Date(),
            state: 'Completed',
          };
          this.addDataToDatabase(completedExercise);
          this.store.dispatch(new Training.StopTraining());
          // this.runningExercise = null;
          // this.exerciseChanged.next(null);
        } else {
          console.log('after completer error');
        }
      });
  }

  cancelExercise(progress: number) {
    console.log('The progress closed number', progress);
    this.store
      .select(fromTraining.getActiveExercise)
      .pipe(take(1))
      .subscribe((finished) => {
        if (finished) {
          const completedExercise: Exercise = {
            ...finished,
            duration: finished.duration * (progress / 100),
            calories: finished.calories * (progress / 100),
            date: new Date(),
            state: 'Cancelled',
          };
          this.addDataToDatabase(completedExercise);
          this.store.dispatch(new Training.StopTraining());
          // this.runningExercise = null;
          // this.exerciseChanged.next(null);
        } else {
          console.log('after completer error');
        }
      });
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  private addDataToDatabase(exercise: Exercise) {
    console.log('addDataToDatabase', exercise);
    this.db.collection('finishedExercise').add(exercise);
  }
}
