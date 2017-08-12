import { ActionReducer, Action, State } from '@ngrx/store';
import { ConceptModel} from './ontology.models';
import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as OntologyActions from "./ontology.actions"


export function ConceptReducer(state: Array<any> = [],  action: OntologyActions.Actions): Array<any> {

    switch(action.type){
            case OntologyActions.LOAD_CONCEPT_SUCCESS:
                return action.payload;                

            case OntologyActions.ADD_CONCEPT_SUCCESS:
                return [action.payload, ...state];

            case OntologyActions.DELETE_CONCEPT_SUCCESS:
                state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);


            case OntologyActions.EDIT_CONCEPT_SUCCESS:
                 return state.map(item => {
                        return item.concept_id === action.payload.concept_id ? Object.assign({}, item, action.payload) : item;
                  });

                  
            default:
                return state


    }
}