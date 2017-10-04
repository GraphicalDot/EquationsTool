import {SubconceptModel } from '../models/subconcept.model';
import {Injectable} from "@angular/core"
import {SubconceptService} from "../services/subconcept.service"
import * as actions from '../actions/subconcept.actions';
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
export class SubconceptEffects {

    constructor(private actions$: Actions, private service: SubconceptService) {}

    @Effect() Selectedsubconcept$: Observable<Action> = this.actions$
        .ofType(actions.SELECTED_SUBCONCEPT)
        .map((action: actions.Selectedsubconcept) => action.payload)
        .map((payload: SubconceptModel) => new actions.Selectedsubconceptsuccess(payload))
        

    
    @Effect() Editsubconcept$: Observable<Action> = this.actions$
        .ofType(actions.EDIT_SUBCONCEPT)
        .map((action: actions.Editsubconcept) => action.payload)
        .switchMap((payload) => 
              this.service.Editsubconceptservice(payload)
              .map((payload: SubconceptModel) => new actions.Editsubconceptsuccess(payload))
              .catch(err => of(new actions.Editsubconceptfailure(err)))
        )

   
    @Effect() Loadsubconcept$: Observable<Action> = this.actions$
        .ofType(actions.LOAD_SUBCONCEPT)
         .map((action: actions.Loadsubconcept) => action.payload)
        .switchMap((payload) => 
              this.service.Loadsubconceptservice(payload)
              .map((concepts: SubconceptModel[]) => new actions.Loadsubconceptsuccess(concepts))
              .catch(err => of(new actions.Loadsubconceptfailure(err)))
        )


    @Effect() Addsubconcept$: Observable<Action> = this.actions$
        .ofType(actions.ADD_SUBCONCEPT)
        .map((action: actions.Addsubconcept) => action.payload)
        .switchMap((payload) => 
              this.service.Addsubconceptservice(payload)
              .map((domain: SubconceptModel) => new actions.Addsubconceptsuccess(domain))
              .catch(err => of(new actions.Addsubconceptfailure(err)))
        );

    @Effect() Deletesubconcept$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_SUBCONCEPT)
        .map((action: actions.Deletesubconcept) => action.payload)
        .switchMap((payload) =>
              this.service.Deletesubconceptservice(payload)
              .map((msg) => new actions.Deletesubconceptsuccess(msg))
              .catch(err => of(new actions.Deletesubconceptfailure(err)))
        );

    @Effect() Allsubconcepts$: Observable<Action> = this.actions$
        .ofType(actions.ALL_SUBCONCEPT)
         .map((action: actions.Allsubconcept) => action.payload)
        .switchMap((payload) => 
              this.service.Allsubconcept(payload)
              .map((data) => new actions.Allsubconceptsuccess(data))
              .catch(err => of(new actions.Allsubconceptfailure(err)))
        )

}