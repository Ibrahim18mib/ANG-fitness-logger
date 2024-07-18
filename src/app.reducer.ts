import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUI from './sharedUI/ui.reducer';

export interface State {
  ui: fromUI.State;
}

// Define reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getisLoading = createSelector(getUiState, fromUI.getIsLoading);
console.log(getisLoading);
console.log(getUiState, '^^^^^^^^^^^^^^^^^^^^^^^^^^');
