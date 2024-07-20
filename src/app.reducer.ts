import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromUI from './sharedUI/ui.reducer';
import * as fromAUTH from './app/auth/auth.reducer';

export interface State {
  ui: fromUI.State;
  auth: fromAUTH.State;
}

// Define reducers
export const reducers: ActionReducerMap<State> = {
  ui: fromUI.uiReducer,
  auth: fromAUTH.authReducer,
};

export const getUiState = createFeatureSelector<fromUI.State>('ui');
export const getisLoading = createSelector(getUiState, fromUI.getIsLoading);
console.log(getisLoading, 'getisLoading');
console.log(getUiState, 'getUiState');

export const getAuthState = createFeatureSelector<fromAUTH.State>('auth');
export const getisAuthenticated = createSelector(
  getAuthState,
  fromAUTH.getIsAuthenticated
);
console.log(getisAuthenticated, 'getisAuthenticated');
console.log(getAuthState, 'getAuthState');
