
import { Action } from "@ngrx/store";
// import models
import {UserModel} from "../models/user.model";



export const AUTHENTICATE = "[Authentication] Authenticate"
export class AuthenticateAction implements Action {
        readonly type = AUTHENTICATE;

  constructor(public payload: {email: string, password: string}) {}
}

/**
 * Checks if user is authenticated.
 * @class AuthenticatedAction
 * @implements {Action}
 */

export const AUTHENTICATED = "[Authentication] Authenticated"
export class AuthenticatedAction implements Action {
        readonly type = AUTHENTICATED;

  constructor(public payload?: {token?: string}) {}
}

/**
 * Authenticated check success.
 * @class AuthenticatedSuccessAction
 * @implements {Action}
 */
export const AUTHENTICATED_SUCCESS = "[Authentication] Authenticated success"

export class AuthenticatedSuccessAction implements Action {
        readonly type = AUTHENTICATED_SUCCESS;
    constructor(public payload: {authenticated: boolean, user: UserModel}) {}
}

export const AUTHENTICATED_ERROR= "[Authentication] Authenticated error"
export class AuthenticatedErrorAction implements Action {
        readonly type = AUTHENTICATED_ERROR;
        constructor(public payload?: any) {}
}

export const AUTHENTICATE_ERROR = "[Authentication] Authenticate error"
export class AuthenticationErrorAction implements Action {
        readonly type = AUTHENTICATE_ERROR;
        constructor(public payload?: any) {}
}

export const AUTHENTICATE_SUCCESS = "[Authentication] Authenticate success"
export class AuthenticationSuccessAction implements Action {
        readonly type = AUTHENTICATE_SUCCESS;
        constructor(public payload: { user: UserModel }) {}
}

export const SIGN_OUT = "[Authentication] Sign out success"
export class SignOutAction implements Action {
        readonly type = SIGN_OUT;
        constructor(public payload?: any) {}
}


export const SIGN_OUT_SUCCESS = "[Authentication] Sign out success"
export class SignOutSuccessAction implements Action {
        readonly type: string = SIGN_OUT_SUCCESS;
        constructor(public payload?: any) {}
}

/**
 * Sign out success.
 * @class SignOutSuccessAction
 * @implements {Action}
 */
export const SIGN_OUT_ERROR = "[Authentication] Sign out error"
 export class SignOutErrorAction implements Action {
  public type: string = SIGN_OUT_ERROR;
  constructor(public payload?: any) {}
}

export type Actions
  =
  AuthenticateAction
  | AuthenticatedAction
  | AuthenticatedErrorAction
  | AuthenticatedSuccessAction
  | AuthenticationErrorAction
  | AuthenticationSuccessAction
  | SignOutAction
  | SignOutSuccessAction
  | SignOutErrorAction