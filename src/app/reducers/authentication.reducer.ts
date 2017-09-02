import * as AuthenticateActions from '../actions/authentication.actions';

// import models
import { UserModel } from "../models/user.model";


export interface AuthenticateState {
  // boolean if user is authenticated
  authenticated: boolean;
  // error message
  error?: string;
  // true if we have attempted existing auth session
  loaded: boolean;
  // true when loading
  loading: boolean;
  // the authenticated user
  user?: UserModel;
  token?: string;
}


const initialState: AuthenticateState = {
  authenticated: JSON.parse(localStorage.getItem("authenticated")),
  loaded: false,
  loading: false,
  user:  JSON.parse(localStorage.getItem("user")),
  token: localStorage.getItem("token")
};

export function AuthenticationReducer(state: any = initialState, action: AuthenticateActions.Actions): AuthenticateState {

  switch (action.type) {
    case AuthenticateActions.AUTHENTICATE:
      return Object.assign({}, state, {
        error: undefined,
        loading: true
      });

    case AuthenticateActions.AUTHENTICATE_ERROR:
      console.log("from + AUTHENTICATE_ERROR" + action.payload)
      return Object.assign({}, state, {
        authenticated: false,
        error: action.payload._body,
        loaded: true,
        loading: false
      });

    case AuthenticateActions.AUTHENTICATE_SUCCESS:
        console.log(JSON.stringify(action.payload.user))     
        localStorage.setItem('user', JSON.stringify(action.payload.user));
        localStorage.setItem('token', action.payload.token);
        localStorage.setItem('authenticated', "true");
       return Object.assign({}, state, {
        authenticated: true,
        loaded: true,
        loading: false,
        user: action.payload.user,
        token: action.payload.token
      });

    case AuthenticateActions.AUTHENTICATE_ERROR:
    

    case AuthenticateActions.AUTHENTICATE_SUCCESS:

    case AuthenticateActions.SIGN_OUT_ERROR:
      return Object.assign({}, state, {
        authenticated: true,
        error: action.payload.error.message,
        user: undefined
      });

    case AuthenticateActions.SIGN_OUT_SUCCESS:
          localStorage.clear();
          return Object.assign({}, state, {
            authenticated: false,
            error: undefined,
            user: undefined,
            token: undefined
      });


    default:
      return state;
  }
}

export const isAuthenticated = (state: AuthenticateState) => state.authenticated;


export const isAuthenticatedLoaded = (state: AuthenticateState) => state.loaded;

export const getAuthenticatedUser = (state: AuthenticateState) => state.user;
export const getAuthenticationError = (state: AuthenticateState) => state.error;

export const isLoading = (state: AuthenticateState) => state.loading;
export const getSignOutError = (state: AuthenticateState) => state.error;
export const getSignUpError = (state: AuthenticateState) => state.error;