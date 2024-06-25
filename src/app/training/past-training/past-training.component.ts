import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.module';
import { ExerciseService } from '../exercise.services';
import { MatSort, Sort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrl: './past-training.component.scss',
})
export class PastTrainingComponent implements OnInit, AfterViewInit, OnDestroy {
  displayedColumns = ['date', 'name', 'duration', 'calories', 'state'];
  dataSource = new MatTableDataSource<Exercise>();
  private exChangedSubscription!: Subscription;

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) pagin!: MatPaginator;

  constructor(private exerciseServ: ExerciseService) {}

  ngOnInit(): void {
    this.exChangedSubscription =
      this.exerciseServ.finishedExercisesChanged.subscribe((exercise: any) => {
        console.log('exerciseServ.finishedExercisesChanged', exercise);
        this.dataSource.data = exercise;
      });
    console.log('Completeed Datasource data', this.dataSource.data);

    this.exerciseServ.fetchCompletedOrCancelled();
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

  ngOnDestroy(): void {
    this.exChangedSubscription.unsubscribe();
  }
}
