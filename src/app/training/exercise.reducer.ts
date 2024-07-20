import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Exercise } from './exercise.module';
import {
  SET_AVAILABLE_TRAININGS,
  SET_FINISHED_TRAININGS,
  START_TRAINING,
  STOP_TRAINING,
} from './exercise.actions';
import * as fromRoot from '../../app.reducer';

// Define action types with payloads
export class SetAvailableTrainings implements Action {
  readonly type = SET_AVAILABLE_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class SetFinishedTrainings implements Action {
  readonly type = SET_FINISHED_TRAININGS;
  constructor(public payload: Exercise[]) {}
}

export class StartTraining implements Action {
  readonly type = START_TRAINING;
  constructor(public payload: string) {}
}

export class StopTraining implements Action {
  readonly type = STOP_TRAINING;
}

// Union type for all possible actions
export type TrainingActions =
  | SetAvailableTrainings
  | SetFinishedTrainings
  | StartTraining
  | StopTraining;

// State and reducer
export interface TrainingState {
  availableExercise: Exercise[];
  finishedExercise: Exercise[];
  activeTraining: Exercise | any;
}

export interface State extends fromRoot.State {
  training: TrainingState;
}

const initialTrainingState: TrainingState = {
  availableExercise: [],
  finishedExercise: [],
  activeTraining: null,
};

export function exerciseReducer(
  state = initialTrainingState,
  action: TrainingActions
): TrainingState {
  switch (action.type) {
    case SET_AVAILABLE_TRAININGS:
      return {
        ...state,
        availableExercise: action.payload,
      };
    case SET_FINISHED_TRAININGS:
      return {
        ...state,
        finishedExercise: action.payload,
      };
    case START_TRAINING:
      return {
        ...state,
        activeTraining: {
          ...state.availableExercise.find((ex) => ex.id === action.payload),
        },
      };
    case STOP_TRAINING:
      return {
        ...state,
        activeTraining: null,
      };
    default:
      return state;
  }
}

// Selectors
export const getTrainingState =
  createFeatureSelector<TrainingState>('training');

export const getAvailableExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.availableExercise
);
export const getFinishedExercises = createSelector(
  getTrainingState,
  (state: TrainingState) => state.finishedExercise
);
export const getActiveExercise = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining
);


export const getIsTraining = createSelector(
  getTrainingState,
  (state: TrainingState) => state.activeTraining != null
);