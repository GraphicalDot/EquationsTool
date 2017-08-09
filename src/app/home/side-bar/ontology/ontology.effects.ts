import { DomainModel } from './ontology.models';
import { OntologyReducer } from './ontology.reducer';
import {Injectable} from "@angular/core"
import {OntologyService} from "./ontology.service"
import * as OntologyActions from './ontology.actions';
import {Effect, Actions} from "@ngrx/effects"
import {Action} from "@ngrx/store"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { of } from 'rxjs/observable/of';

/*
It is recommended to use NGRX Effects. When you implement NGRX Effects along with the Store,
any HTTP side effects are handled by the Effects, which in turn, will use an Action in the Store to update the data.
An Effect listens for the Action and uses the payload of
the Action to perform a side-effect(HTTP). When the Effect finishes,
it calls a new Action(either an Action for success 
or an action for failure) with a new payload, thus updating the data in the Store.
*/

@Injectable()
export class OntologyEffects {

    constructor(private actions$: Actions, private service: OntologyService) {}

    @Effect() loadDomains$: Observable<Action> = this.actions$
        .ofType(OntologyActions.LOAD_DOMAIN)
        .startWith(new OntologyActions.Loaddomain())
        .switchMap(() => 
              this.service.loadDomains()
              .map((domains: DomainModel[]) => new OntologyActions.Loaddomainsuccess(domains))
              .catch(err => of(new OntologyActions.Loaddomainfailure(err)))
        );

    @Effect() createDomain$: Observable<Action> = this.actions$
        .ofType(OntologyActions.ADD_DOMAIN)
        .map((action: OntologyActions.Adddomain) => action.payload)
        .switchMap((payload) => 
              this.service.addDomain(payload)
              .map((domain: DomainModel) => new OntologyActions.Adddomainsuccess(domain))
              .catch(err => of(new OntologyActions.Adddomainfailure(err)))
        );

    @Effect() deleteDomain$: Observable<Action> = this.actions$
        .ofType(OntologyActions.DELETE_DOMAIN)
        .map((action: OntologyActions.Deletedomain) => action.payload)
        .switchMap((domain) =>
             
              this.service.deleteDomain(domain)
              .map((msg: any) => new OntologyActions.Deletedomainsuccess(msg))
              .catch(err => of(new OntologyActions.Deletedomainfailure(err)))
        );



}


