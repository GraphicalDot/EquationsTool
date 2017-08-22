import { Injectable } from "@angular/core";

// import @ngrx
import { Effect, Actions, toPayload } from "@ngrx/effects";
import { Action } from "@ngrx/store";

// import rxjs
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/debounceTime";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";

// import services
import {AuthenticationService} from "../services/authentication.service";
import * as ObjectActions from '../actions/authentication.actions';

// import models
import {UserModel} from "../models/user.model";




@Injectable()
export class AuthenticationEffects {

  @Effect()
  public authenticate: Observable<Action> = this.actions
    .ofType(ObjectActions.AUTHENTICATE)
    .debounceTime(500)
    .map(toPayload)
    .switchMap(payload => {
      return this.service.authentication(payload)
        .map((user: any) => new ObjectActions.AuthenticationSuccessAction(user))
        .catch(error => Observable.of(new ObjectActions.AuthenticationErrorAction(error)));
    });

//   @Effect()
//   public authenticated: Observable<Action> = this.actions
//     .ofType(ObjectActions.AUTHENTICATE)
//     .map(toPayload)
//     .switchMap(payload => {
//       return this.service.authentication(payload)
//         .map(user => new ObjectActions.AuthenticationSuccessAction(user))
//         .catch(error => Observable.of(new ObjectActions.AuthenticationErrorAction({ error: error })));
//     });

// /*
//   @Effect()
//   public createUser: Observable<Action> = this.actions
//     .ofType(ActionTypes.SIGN_UP)
//     .debounceTime(500)
//     .map(toPayload)
//     .switchMap(payload => {
//       return this.userService.create(payload.user)
//         .map(user => new SignUpSuccessAction({ user: user }))
//         .catch(error => Observable.of(new SignUpErrorAction({ error: error })));
//     });
// */
// @Effect()
// public signOut: Observable<Action> = this.actions
//     .ofType(ObjectActions.SIGN_OUT)
//     .map(toPayload)
//     .switchMap(payload => {
//       return this.service.signout()
//         .map(value => new ObjectActions.SignOutSuccessAction())
//         .catch(error => Observable.of(new ObjectActions.SignOutErrorAction({ error: error })));
//     });

  constructor(
    private actions: Actions,
    private service: AuthenticationService
  ) { }
}