import { NgModule } from '@angular/core';
import { CurrentTrainingComponent } from './current-training/current-training.component';
import { NewTrainingComponent } from './new-training/new-training.component';
import { PastTrainingComponent } from './past-training/past-training.component';
import { TrainingComponent } from './training.component';
import { TimestampDatePipe } from '../custom-date.pipe';
import { StopTrainingComponent } from './current-training/stop-training.component';
import { SharedModule } from '../../sharedUI/shared.module';
import { TrainingRoutingModule } from './training-routing.module';
import { StoreModule } from '@ngrx/store';
import { exerciseReducer } from './exercise.reducer';

@NgModule({
  declarations: [
    TimestampDatePipe,
    TrainingComponent,
    CurrentTrainingComponent,
    NewTrainingComponent,
    PastTrainingComponent,
    StopTrainingComponent,
  ],
  imports: [
    SharedModule,
    TrainingRoutingModule,
    StoreModule.forFeature('training', exerciseReducer),
  ],
  exports: [],
  providers: [TimestampDatePipe],
})
export class TrainingModule {}
