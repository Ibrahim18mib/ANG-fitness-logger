import { Action } from '@ngrx/store';
import { AUTHActions,SET_AUTHENTICATED,SET_UNAUTHENTICATED  } from './auth.actions';

export interface State {
  isAuthenticated: any;
}

const intialAuthState: State = {
  isAuthenticated: false,
};

export function authReducer(state = intialAuthState, action: Action) {
  console.log("AuthIsload Check",state)
  console.log("Authaction check",action)
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        isAuthenticated: true
      };
    case SET_UNAUTHENTICATED:
      return {
        isAuthenticated: false
      };
    default: {
      return state;
    }
  }
}

export const getIsAuthenticated = (state: State) => state.isAuthenticated;
