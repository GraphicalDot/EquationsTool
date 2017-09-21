import {Injectable} from "@angular/core"
import {VariableService} from "../services/variable.service"
import * as actions from '../actions/variable.actions';
import {Effect, Actions} from "@ngrx/effects"
import {Action} from "@ngrx/store"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { of } from 'rxjs/observable/of'




@Injectable()
export class VariableEffects {

    constructor(private actions$: Actions, private service: VariableService) {}

    // @Effect() Loadtemplateskton$: Observable<Action> = this.actions$
    //     .ofType(actions.LOAD_TEMPLA_SKTON)
    //     .switchMap(() => 
    //           this.service.Loadtemplatesktonservice()
    //           .map((payload: any) => new actions.Loadtemplatesktonsuccess(payload))
    //           .catch(err => of(new actions.Loadtemplatesktonfailure(err)))
    //     )
   
    @Effect() Loadvariable$: Observable<Action> = this.actions$
        .ofType(actions.LOAD_VARIABLE)
         .map((action: actions.Loadvariable) => action.payload)
        .switchMap((payload) => 
              this.service.Loadvariableservice(payload)
              .map((payload: any) => new actions.Loadvariablesuccess(payload))
              .catch(err => of(new actions.Loadvariablefailure(err)))
        )


    
    @Effect() Editvariable$: Observable<Action> = this.actions$
        .ofType(actions.EDIT_VARIABLE)
        .map((action: actions.Editvariable) => action.payload)
        .switchMap((payload) => 
              this.service.Editvariableservice(payload)
              .map((payload: any) => new actions.Editvariablesuccess(payload))
              .catch(err => of(new actions.Editvariablefailure(err)))
        )



    @Effect() Addvariable$: Observable<Action> = this.actions$
        .ofType(actions.ADD_VARIABLE)
        .map((action: actions.Addvariable) => action.payload)
        .switchMap((payload) => 
                
              this.service.Addvariableservice(payload)
              .map((payload) => new actions.Addvariablesuccess(payload))
              .catch(err => of(new actions.Addvariablefailure(err)))
        );

    @Effect() Deletevariable$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_VARIABLE)
        .map((action: actions.Deletevariable) => action.payload)
        .switchMap((payload) =>
              this.service.Deletevariableservice(payload)
              .map((msg) => new actions.Deletevariablesuccess(msg))
              .catch(err => of(new actions.Deletevariablefailure(err)))
        );


}