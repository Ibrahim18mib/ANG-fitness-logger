import { Action } from '@ngrx/store';
import { Exercise } from './exercise.module';

export const SET_AVAILABLE_TRAININGS = '[TRAINING] AVAILABLE_TRAININGS';
export const SET_FINISHED_TRAININGS = '[TRAINING] FINISHED_TRAININGS';
export const START_TRAINING = '[TRAINING] START_TRAINING';
export const STOP_TRAINING = '[TRAINING] STOP_TRAINING';

export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  //passing with payloads:
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  //passing with payloads:
  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  //passing with payloads:
  constructor(public payload: Exercise) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;

  //already has active training in ngrx.
  //   constructor(public payload: Exercise) {}
}

export type EXERCISEActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;
