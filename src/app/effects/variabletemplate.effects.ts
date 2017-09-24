import {Injectable} from "@angular/core"
import {VariabletemplateService} from "../services/variabletemplate.service"
import * as actions from '../actions/variabletemplate.actions';
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
export class VariabletemplateEffects {

    constructor(private actions$: Actions, private service: VariabletemplateService) {}

    // @Effect() Loadtemplateskton$: Observable<Action> = this.actions$
    //     .ofType(actions.LOAD_TEMPLA_SKTON)
    //     .switchMap(() => 
    //           this.service.Loadtemplatesktonservice()
    //           .map((payload: any) => new actions.Loadtemplatesktonsuccess(payload))
    //           .catch(err => of(new actions.Loadtemplatesktonfailure(err)))
    //     )

    
    @Effect() Addvariablecategorytext$: Observable<Action> = this.actions$
        .ofType(actions.ADD_VARIABLE_CATEGORY_TEXT)
        .map((action: actions.Addvariablecategorytext) => action.payload)
        .map((payload: any) => new actions.Addvariablecategorytextsuccess(payload))
              .catch(err => of(new actions.Addvariablecategorytextfailure(err))
            )
        





    @Effect() Addvariablecategoryimages$: Observable<Action> = this.actions$
        .ofType(actions.ADD_VARIABLE_CATEGORY_IMAGES)
        .map((action: actions.Addvariablecategoryimages) => action.payload)
        .switchMap((payload) => 
              this.service.Addvariablecategoryimages(payload)
              .map((payload: any) => new actions.Addvariablecategoryimagessuccess(payload))
              .catch(err => of(new actions.Addvariablecategoryimagesfailure(err)))
        )


    @Effect() Deletevariablecategoryimages$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_VARIABLE_CATEGORY_IMAGES)
        .map((action: actions.Deletevariablecategoryimages) => action.payload)
        .switchMap((payload) => 
              this.service.Deletevariablecategoryimages(payload)
              .map((payload: any) => new actions.Deletevariablecategoryimagessuccess(payload))
              .catch(err => of(new actions.Deletevariablecategoryimagesfailure(err)))
        )


    @Effect() Selectedvariabletemplate$: Observable<Action> = this.actions$
        .ofType(actions.SELECTED_VARIABLE_TEMPLATE)
        .map((action: actions.Selectedvariabletemplate) => action.payload)
        .map((payload: any) => new actions.Selectedvariabletemplatesuccess(payload))
              .catch(err => of(new actions.Selectedvariabletemplatefailure(err))
        )






    @Effect() Editvariabletemplate$: Observable<Action> = this.actions$
        .ofType(actions.EDIT_VARIABLE_TEMPLATE)
        .map((action: actions.Editvariabletemplate) => action.payload)
        .switchMap((payload) => 
              this.service.Editvariabletemplateservice(payload)
              .map((payload: any) => new actions.Editvariabletemplatesuccess(payload))
              .catch(err => of(new actions.Editvariabletemplatefailure(err)))
        )
   
    @Effect() Loadvariabletemplate$: Observable<Action> = this.actions$
        .ofType(actions.LOAD_VARIABLE_TEMPLATE)
         .map((action: actions.Loadvariabletemplate) => action.payload)
        .switchMap((payload) => 
              this.service.Loadvariabletemplateservice(payload)
              .map((payload: any) => new actions.Loadvariabletemplatesuccess(payload))
              .catch(err => of(new actions.Loadvariabletemplatefailure(err)))
        )


    @Effect() Addvariabletemplate$: Observable<Action> = this.actions$
        .ofType(actions.ADD_VARIABLE_TEMPLATE)
        .map((action: actions.Addvariabletemplate) => action.payload)
        .switchMap((payload) => 
              this.service.Addvariabletemplateservice(payload)
              .map((payload) => new actions.Addvariabletemplatesuccess(payload))
              .catch(err => of(new actions.Addvariabletemplatefailure(err)))
        );

    @Effect() Deletevariabletemplate$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_VARIABLE_TEMPLATE)
        .map((action: actions.Deletevariabletemplate) => action.payload)
        .switchMap((payload) =>
              this.service.Deletevariabletemplateservice(payload)
              .map((msg) => new actions.Deletevariabletemplatesuccess(msg))
              .catch(err => of(new actions.Deletevariabletemplatefailure(err)))
        );


}