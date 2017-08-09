import { ActionReducer, Action, State } from '@ngrx/store';
import { DomainModel} from './ontology.models';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as OntologyActions from "./ontology.actions"

export function OntologyReducer(state: Array<any> = [], action: OntologyActions.Actions): Array<any> {

    switch(action.type){
            case OntologyActions.LOAD_DOMAIN_SUCCESS:
                return action.payload;                

            case OntologyActions.ADD_DOMAIN_SUCCESS:
                return [action.payload, ...state];
            
            case OntologyActions.ADD_DOMAIN_FAILURE:
                return [...state];

            case OntologyActions.DELETE_DOMAIN_SUCCESS:
                state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
            
            case OntologyActions.DELETE_DOMAIN_FAILURE:
                return [...state];


            default:
                return state


    }
}