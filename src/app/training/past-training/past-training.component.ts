import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.module';
import { ExerciseService } from '../exercise.services';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Observable, Subscription } from 'rxjs';

import * as fromTraining from '../exercise.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.scss',
})
export class PastTrainingComponent implements OnInit, AfterViewInit {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription!: Subscription;
  exChangedSubscription$!: Observable<any>;

  // private exChangedSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) pagin!: MatPaginator;
  @Output() stateChanged = new EventEmitter<string>();

  constructor(
    private exerciseServ: ExerciseService,
    private store: Store<fromTraining.State>
  ) {}

  ngOnInit(): void {
    this.store
      .select(fromTraining.getFinishedExercises)
      .subscribe((exercises: any[]) => {
        console.log('exerciseServ.finishedExercisesChanged', exercises);
        this.dataSource.data = exercises;
      });

    this.exerciseServ.fetchCompletedOrCancelled(); // Assuming this fetches data
  }

  ngAfterViewInit(): void {
    console.log('AfterViewinint started');

    setTimeout(() => {
      this.dataSource.sort = this.sort;

      const sortState: Sort = { active: 'name', direction: 'desc' };
      this.sort.active = sortState.active;
      this.sort.direction = sortState.direction;
      // this.sort.sortChange.emit(sortState);
    }, 1000);

    this.dataSource.paginator = this.pagin;
  }
  onFilter(event: any) {
    const value = (event.target as HTMLInputElement).value;
    console.log('Filtered value:', value);

    this.dataSource.filter = value.trim().toLowerCase();
    console.log('this.dataSource.filter :', this.dataSource.filter);
  }

  getRowClass(state: string): string {
    if (state === 'Completed') {
      return 'row-completed'; // Return class for Completed state
    } else if (state === 'Cancelled') {
      return 'row-cancelled'; // Return class for Cancelled state
    }
    return ''; // Return empty string for default case
  }
}
