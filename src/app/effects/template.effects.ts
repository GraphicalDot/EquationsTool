import {Injectable} from "@angular/core"
import {TemplateService} from "../services/template.service"
import * as actions from '../actions/template.actions';
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
export class TemplateEffects {

    constructor(private actions$: Actions, private service: TemplateService) {}

    @Effect() Loadtemplateskton$: Observable<Action> = this.actions$
        .ofType(actions.LOAD_TEMPLATE_SKTON)
        .switchMap(() => 
              this.service.Loadtemplatesktonservice()
              .map((payload: any) => new actions.Loadtemplatesktonsuccess(payload))
              .catch(err => of(new actions.Loadtemplatesktonfailure(err)))
        )


    
    @Effect() Edittemplate$: Observable<Action> = this.actions$
        .ofType(actions.EDIT_TEMPLATE)
        .map((action: actions.Edittemplate) => action.payload)
        .switchMap((payload) => 
              this.service.Edittemplateservice(payload)
              .map((payload: any) => new actions.Edittemplatesuccess(payload))
              .catch(err => of(new actions.Edittemplatefailure(err)))
        )


            
    @Effect() Gettemplate$: Observable<Action> = this.actions$
        .ofType(actions.GET_TEMPLATE)
        .map((action: actions.Gettemplate) => action.payload)
        .switchMap((payload) => 
              this.service.Gettemplateservice(payload)
              .map((payload: any) => new actions.Gettemplatesuccess(payload))
              .catch(err => of(new actions.Gettemplatefailure(err)))
        )




   
    @Effect() Loadtemplate$: Observable<Action> = this.actions$
        .ofType(actions.LOAD_TEMPLATE)
         .map((action: actions.Loadtemplate) => action.payload)
        .switchMap((payload) => 
              this.service.Loadtemplateservice(payload)
              .map((payload: any) => new actions.Loadtemplatesuccess(payload))
              .catch(err => of(new actions.Loadtemplatefailure(err)))
        )


    @Effect() Addtemplate$: Observable<Action> = this.actions$
        .ofType(actions.ADD_TEMPLATE)
        .map((action: actions.Addtemplate) => action.payload)
        .switchMap((payload) => 
              this.service.Addtemplateservice(payload)
              .map((payload) => new actions.Addtemplatesuccess(payload))
              .catch(err => of(new actions.Addtemplatefailure(err)))
        );

    @Effect() Deletetemplate$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_TEMPLATE)
        .map((action: actions.Deletetemplate) => action.payload)
        .switchMap((payload) =>
              this.service.Deletetemplateservice(payload)
              .map((msg) => new actions.Deletetemplatesuccess(msg))
              .catch(err => of(new actions.Deletetemplatefailure(err)))
        );


}