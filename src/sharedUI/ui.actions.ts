import { Action } from '@ngrx/store';

export const START_LOADING = '[UI] start loading...';
export const STOP_LOADING = '[UI] stop loading...';

export class Start_Loading implements Action {
  readonly type = START_LOADING;
}

export class Stop_Loading implements Action {
  readonly type = STOP_LOADING;
}

export type UIActions = Start_Loading | Stop_Loading;
