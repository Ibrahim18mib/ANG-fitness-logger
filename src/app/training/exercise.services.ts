import { Exercise } from './exercise.module';
import { Subject, Subscription, map } from 'rxjs';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Injectable } from '@angular/core';
import { UIService } from '../../sharedUI/ui.service';

@Injectable()
export class ExerciseService {
  private availableExercises: Exercise[] = [];
  private runningExercise: Exercise | null = null;

  private fbSubs: Subscription[] = [];
  // private exercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise | null>();
  exercisesChanged = new Subject<Exercise[] | null>();
  finishedExercisesChanged = new Subject<Exercise[] | any>();

  constructor(private db: AngularFirestore, private uiServ: UIService) {}

  // getAvailableExercise() {
  //   return this.availableExercises.slice();
  // }

  fetchAvailableExercise() {
    this.uiServ.loadingStateChanged.next(true);
    this.fbSubs.push(
      this.db
        .collection('availableExercises')
        .snapshotChanges()
        .pipe(
          map((docArray) => {
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
        .subscribe((exercises: Exercise[]) => {
          // console.log("fetched exercisess",exercises);
          this.uiServ.loadingStateChanged.next(false);
          this.availableExercises = exercises;
          this.exercisesChanged.next([...this.availableExercises]);
        })
    );
  }

  fetchCompletedOrCancelled() {
    this.fbSubs.push(
      this.db
        .collection('finishedExercise')
        .valueChanges()
        .subscribe((exercise: any[]) => {
          console.log('fetchCompletedOrCancelled', exercise);
          this.finishedExercisesChanged.next(exercise);
        })
    );
  }

  cancelledSubscriptions() {
    this.fbSubs.forEach((sub) => {
      sub.unsubscribe();
    });
  }

  startExercise(selectedId: string) {
    // this.db
    //   .doc('availableExercises/' + selectedId)
    //   .update({ lastSeen: new Date() });
    const checkExercise = this.availableExercises.find(
      (existing) => existing.id === selectedId
    );
    if (checkExercise) {
      this.runningExercise = checkExercise;
      this.exerciseChanged.next({ ...this.runningExercise });
    } else {
      // Handle the case where no exercise with the given id is found
      console.error('Exercise with id ' + selectedId + ' not found!');
    }
  }

  completeExercise() {
    if (this.runningExercise) {
      const completedExercise: Exercise = {
        ...this.runningExercise,
        date: new Date(),
        state: 'Completed',
      };
      this.addDataToDatabase(completedExercise);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    } else {
      console.log('after completer error');
    }
  }

  cancelExercise(progress: number) {
    console.log('The progress closed number', progress);
    if (this.runningExercise) {
      const completedExercise: Exercise = {
        id: this.runningExercise.id || '',
        name: this.runningExercise.name || '',
        duration: this.runningExercise.duration * (progress / 100),
        calories: this.runningExercise.calories * (progress / 100),
        date: new Date(),
        state: 'Cancelled',
      };
      console.log('The progress closed number', completedExercise.duration);
      this.addDataToDatabase(completedExercise);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    } else {
      console.log('after completer error');
    }
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }

  private addDataToDatabase(exercise: Exercise) {
    console.log('addDataToDatabase', exercise);
    this.db.collection('finishedExercise').add(exercise);
  }
}
