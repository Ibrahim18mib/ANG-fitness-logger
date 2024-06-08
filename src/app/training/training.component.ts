import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-training',
  templateUrl: './training.component.html',
  styleUrl: './training.component.scss',
})
export class TrainingComponent implements OnInit {
  onGoingTraining: boolean = false;

  constructor() {}

  ngOnInit(): void {
    
  }
}
