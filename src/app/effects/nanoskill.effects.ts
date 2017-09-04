import {NanoskillModel} from '../models/nanoskill.model';
import {Injectable} from "@angular/core"
import {NanoskillService} from "../services/nanoskill.service"
import * as actions from '../actions/nanoskill.actions';
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
export class NanoskillEffects {

    constructor(private actions$: Actions, private service: NanoskillService) {}

    @Effect() Selectednanoskill$: Observable<Action> = this.actions$
        .ofType(actions.SELECTED_NANOSKILL)
        .map((action: actions.Selectednanoskill) => action.payload)
        .map((payload: NanoskillModel) => new actions.Selectednanoskillsuccess(payload))

    @Effect() Clearnanoskill$: Observable<Action> = this.actions$
        .ofType(actions.CLEAR_NANOSKILL)
        .map(() => new actions.Clearnanoskill())
        


    
    @Effect() Editnanoskill$: Observable<Action> = this.actions$
        .ofType(actions.EDIT_NANOSKILL)
        .map((action: actions.Editnanoskill) => action.payload)
        .switchMap((payload) => 
              this.service.Editnanoskillservice(payload)
              .map((payload: NanoskillModel) => new actions.Editnanoskillsuccess(payload))
              .catch(err => of(new actions.Editnanoskillfailure(err)))
        )

   
    @Effect() Loadnanoskill$: Observable<Action> = this.actions$
        .ofType(actions.LOAD_NANOSKILL)
         .map((action: actions.Loadnanoskill) => action.payload)
        .switchMap((payload) => 
              this.service.Loadnanoskillservice(payload)
              .map((concepts: NanoskillModel[]) => new actions.Loadnanoskillsuccess(concepts))
              .catch(err => of(new actions.Loadnanoskillfailure(err)))
        )


    @Effect() Addnanoskill$: Observable<Action> = this.actions$
        .ofType(actions.ADD_NANOSKILL)
        .map((action: actions.Addnanoskill) => action.payload)
        .switchMap((payload) => 
              this.service.Addnanoskillservice(payload)
              .map((domain: NanoskillModel) => new actions.Addnanoskillsuccess(domain))
              .catch(err => of(new actions.Addnanoskillfailure(err)))
        );

    @Effect() Deletenanoskill$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_NANOSKILL)
        .map((action: actions.Deletenanoskill) => action.payload)
        .switchMap((payload) =>
              this.service.Deletenanoskillservice(payload)
              .map((msg) => new actions.Deletenanoskillsuccess(msg))
              .catch(err => of(new actions.Deletenanoskillfailure(err)))
        );


}