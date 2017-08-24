import { DomainModel, ConceptModel } from '../models/ontology.models';
import {Injectable} from "@angular/core"
import {OntologyService} from "../services/ontology.service"
import * as OntologyActions from '../actions/ontology.actions';
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

//Beautiful article explaning error handling in observables 
//https://blog.iamturns.com/continue-rxjs-streams-when-errors-occur-c6a031f9a6cf

@Injectable()
export class OntologyEffects {

    constructor(private actions$: Actions, private service: OntologyService) {}

    @Effect() SelectedDomain$: Observable<Action> = this.actions$
        .ofType(OntologyActions.SELECTED_DOMAIN)
        .map((action: OntologyActions.Selecteddomain) => action.payload)
        .map((payload: DomainModel) => new OntologyActions.Selecteddomainsuccess(payload))
        




    @Effect() loadDomains$: Observable<Action> = this.actions$
        .ofType(OntologyActions.LOAD_DOMAIN)
        .map((action: OntologyActions.Loaddomain) => action.payload)
        .switchMap((payload) => 
              this.service.loadDomain_service(payload)
              .map((domains: DomainModel[]) => new OntologyActions.Loaddomainsuccess(domains))
              .catch(err => of(new OntologyActions.Loaddomainfailure(err)))
        )

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
              .map((msg) => new OntologyActions.Deletedomainsuccess(msg))
              .catch(err => of(new OntologyActions.Deletedomainfailure(err)))
        );



    
    @Effect() loadConcepts$: Observable<Action> = this.actions$
        .ofType(OntologyActions.LOAD_CONCEPT)
         .map((action: OntologyActions.Loadconcept) => action.payload)
        .switchMap((payload) => 
              this.service.loadConcepts(payload)
              .map((concepts: ConceptModel[]) => new OntologyActions.Loadconceptsuccess(concepts))
              .catch(err => of(new OntologyActions.Loadconceptfailure(err)))
        )

    @Effect() createConcept$: Observable<Action> = this.actions$
        .ofType(OntologyActions.ADD_CONCEPT)
        .map((action: OntologyActions.Addconcept) => action.payload)
        .switchMap((payload) => 
              this.service.addConcept(payload)
              .map((concept: ConceptModel) => new OntologyActions.Addconceptsuccess(concept))
              .catch(err => of(new OntologyActions.Addconceptfailure(err)))
        );


}


