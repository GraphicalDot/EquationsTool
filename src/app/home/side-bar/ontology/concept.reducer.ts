import { ActionReducer, Action, State } from '@ngrx/store';
import { ConceptModel} from './ontology.models';
import {ONTOLOGY_ACTIONS} from "./ontology.actions";


export function ConceptReducer(state: Array<any> = [], {type, payload}): Array<any> {

    switch(type){
            case ONTOLOGY_ACTIONS.LOAD_CONCEPT:
                return Array.prototype.concat(payload);                

            case ONTOLOGY_ACTIONS.ADD_CONCEPT:
                return [payload, ...state];

            case ONTOLOGY_ACTIONS.DELETE_CONCEPT:
                state.splice(state.indexOf(payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);


            case ONTOLOGY_ACTIONS.EDIT_CONCEPT:
                 return state.map(item => {
                        return item.concept_id === payload.concept_id ? Object.assign({}, item, payload) : item;
                  });

            default:
                return state


    }
}