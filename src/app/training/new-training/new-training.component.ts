import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-new-training',
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.scss',
})
export class NewTrainingComponent implements OnInit {

  @Output() onTrainingListener = new EventEmitter<void>();

  constructor() {}

  ngOnInit(): void {
    
  }

  onStartTraining(){
    this.onTrainingListener.emit();
  }



}
