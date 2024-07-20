import { Action } from '@ngrx/store';

export const SET_AUTHENTICATED = '[AUTH] User is Authenticated';
export const SET_UNAUTHENTICATED = '[AUTH] User is Unauthenticated';

export class SetAuthenticated implements Action {
  readonly type = SET_AUTHENTICATED;
}

export class SetUnauthenticated implements Action {
  readonly type = SET_UNAUTHENTICATED;
}

export type AUTHActions = SetAuthenticated | SetUnauthenticated;
