import { Exercise } from './exercise.module';
import { Subject } from 'rxjs';

export class ExerciseService {
  private availableExercises: Exercise[] = [
    { id: 'Fajr', name: 'Fajr', duration: 40, calories: 10 },
    { id: 'Luhr', name: 'Luhr', duration: 50, calories: 15 },
    { id: 'Asar', name: 'Asar', duration: 60, calories: 12 },
    { id: 'Maghrib', name: 'Maghrib', duration: 80, calories: 18 },
    { id: 'Isha', name: 'Isha', duration: 100, calories: 30 },
  ];

  getAvailableExercise() {
    return this.availableExercises.slice();
  }

  private runningExercise!: Exercise;
  exerciseChanged = new Subject<Exercise>();

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

  getRunningExercise() {
    return { ...this.runningExercise };
  }
}
