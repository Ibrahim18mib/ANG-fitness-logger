import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../exercise.services';
import { Exercise } from '../exercise.module';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit {
  @Output() onTrainingListener = new EventEmitter<void>();

  exerciseLists!: Observable<any[]>;

  constructor(
    private ExerciseServ: ExerciseService,
    private db: AngularFirestore
  ) {}

  ngOnInit(): void {
    // this.exerciseLists = this.ExerciseServ.getAvailableExercise();
    this.exerciseLists = this.db
      .collection('availableExercises')
      .valueChanges();
    
    // .subscribe((res) => {
    //   console.log(res, 'fireste');
    // });
  }

  onStartTraining(form: NgForm) {
    // this.onTrainingListener.emit();
    this.ExerciseServ.startExercise(form.value.exercise);
  }
}
