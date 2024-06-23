import { Exercise } from './exercise.module';
import { Subject } from 'rxjs';

export class ExerciseService {
  private availableExercises: Exercise[] = [
    { id: 'Fajr', name: 'Fajr', duration: 40, calories: 10 },
    { id: 'Luhr', name: 'Luhr', duration: 50, calories: 15 },
    { id: 'Asar', name: 'Asar', duration: 10, calories: 12 },
    { id: 'Maghrib', name: 'Maghrib', duration: 80, calories: 18 },
    { id: 'Isha', name: 'Isha', duration: 100, calories: 30 },
  ];

  getAvailableExercise() {
    return this.availableExercises.slice();
  }

  getCompletedOrCancelled() {
    return this.exercises.slice();
  }

  private runningExercise: Exercise | null = null;
  private exercises: Exercise[] = [];
  exerciseChanged = new Subject<Exercise | null>();

  startExercise(selectedId: string) {
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
      this.exercises.push(completedExercise);
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
      this.exercises.push(completedExercise);
      this.runningExercise = null;
      this.exerciseChanged.next(null);
    } else {
      console.log('after completer error');
    }
  }

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
