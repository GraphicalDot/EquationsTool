import { ActionReducer, Action, State } from '@ngrx/store';
import { DomainModel} from './ontology.models';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as OntologyActions from "./ontology.actions"

export function OntologyReducer(state: Array<any> = [], action: OntologyActions.Actions): Array<any> {

    switch(action.type){
            case OntologyActions.LOAD_DOMAIN:
                return Array.prototype.concat(action);                

            case OntologyActions.ADD_DOMAIN:
                return [action.payload, ...state];

            default:
                return state


    }
}