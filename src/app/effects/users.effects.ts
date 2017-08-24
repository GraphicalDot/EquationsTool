import { UserModel} from '../models/user.model';
import { UsersReducer } from '../reducers/users.reducer';
import {Injectable} from "@angular/core"
import {UsersService} from "../services/users.service"
import * as ObjectActions from '../actions/users.actions';
import {Effect, Actions, toPayload} from "@ngrx/effects"
import {Action} from "@ngrx/store"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { of } from 'rxjs/observable/of';
import { Database } from '@ngrx/db';
import { defer } from 'rxjs/observable/defer';

import { go } from '@ngrx/router-store';

/*
It is recommended to use NGRX Effects. When you implement NGRX Effects along with the Store,
any HTTP side effects are handled by the Effects, which in turn, will use an Action in the Store to update the data.
An Effect listens for the Action and uses the payload of
the Action to perform a side-effect(HTTP). When the Effect finishes,
it calls a new Action(either an Action for success 
or an action for failure) with a new payload, thus updating the data in the Store.

@Effect navigateHome$: any = this.updates$
    .whenAction(LoginActions.LOGIN_SUCCEEDED)
    .do(this.router.navigate('/home'))
    .ignoreElements();

//Beautiful article explaning error handling in observables 
//https://blog.iamturns.com/continue-rxjs-streams-when-errors-occur-c6a031f9a6cf
*/

@Injectable()
export class UsersEffects {



    // @Effect() logInUser$: Observable<Action> = this.actions$
    // .ofType(ObjectActions.LOGIN_USER)
    // .map((action: ObjectActions.Loginuser) => action.payload)
    // .switchMap(payload => {
    //     return this.service.loginUser(payload)
    //     .map((user: any) =>  new ObjectActions.Loginusersuccess(user))
    //     .catch(err => of(new ObjectActions.Loadusersfailure(err)))
              

    // });

    @Effect() loadUsers$: Observable<Action> = this.actions$
        .ofType(ObjectActions.LOAD_USERS)
        .startWith(new ObjectActions.Loadusers())
        .switchMap(() => 
              this.service.loadUsers()
              .map((users: UserModel[]) =>  new ObjectActions.Loaduserssuccess(users))
              .catch(err => of(new ObjectActions.Loadusersfailure(err)))
              .finally(() => console.log("Request is done"))
        )

    @Effect() AddUser$: Observable<Action> = this.actions$
        .ofType(ObjectActions.ADD_USER)
        .map(toPayload)
        .switchMap((payload: UserModel) => 
              this.service.addUser(payload)
              .map((user: UserModel) => new ObjectActions.Addusersuccess(user))
              .catch(err => of(new ObjectActions.Adduserfailure(err)))
        );

    @Effect() deleteUser$: Observable<Action> = this.actions$
        .ofType(ObjectActions.DELETE_USER)
        .map((action: ObjectActions.Deleteuser) => action.payload)
        .switchMap((payload: UserModel) =>
             
              this.service.deleteUser(payload)
              .map((msg: any) => new ObjectActions.Deleteusersuccess(msg))
              .catch(err => of(new ObjectActions.Deleteuserfailure(err)))
        );


    @Effect() getUser$: Observable<Action> = this.actions$
        .ofType(ObjectActions.GET_USER)
        .map((action: ObjectActions.Getuser) => action.payload)
        .switchMap((payload) =>
             
              this.service.getUser(payload)
              .map((msg: any) => new ObjectActions.Getusersuccess(msg))
              .catch(err => of(new ObjectActions.Getuserfailure(err)))
        );

    @Effect() editUser$: Observable<Action> = this.actions$
        .ofType(ObjectActions.EDIT_USER)
        .map((action: ObjectActions.Edituser) => action.payload)
        .switchMap((payload) =>
             
              this.service.deleteUser(payload)
              .map((msg: any) => new ObjectActions.Deleteusersuccess(msg))
              .catch(err => of(new ObjectActions.Deleteuserfailure(err)))
        );

    constructor(private actions$: Actions, private service: UsersService) {}
    


}
