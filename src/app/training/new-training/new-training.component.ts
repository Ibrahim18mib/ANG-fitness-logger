import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ExerciseService } from '../exercise.services';
import { Exercise } from '../exercise.module';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit {

  @Output() onTrainingListener = new EventEmitter<void>();

 exerciseLists:Exercise[] = [];

  constructor(private ExerciseServ:ExerciseService) {}

  ngOnInit(): void {
    this.exerciseLists = this.ExerciseServ.getAvailableExercise();
    
  }

  onStartTraining(form:NgForm){
    // this.onTrainingListener.emit();
    this.ExerciseServ.startExercise(form.value.exercise);
  }



}
