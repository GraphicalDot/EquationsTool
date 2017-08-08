import { ActionReducer, Action, State } from '@ngrx/store';
import { DomainModel} from './ontology.models';
import {ONTOLOGY_ACTIONS} from "./ontology.actions";


export function OntologyReducer(state: Array<any> = [], {type, payload}): Array<any> {

    switch(type){
            case ONTOLOGY_ACTIONS.LOAD_DOMAIN:
                return Array.prototype.concat(payload);                

            case ONTOLOGY_ACTIONS.ADD_DOMAIN:
                return [payload, ...state];

            case ONTOLOGY_ACTIONS.DELETE_DOMAIN:
                state.splice(state.indexOf(payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);


            case ONTOLOGY_ACTIONS.EDIT_DOMAIN:
                 return state.map(item => {
                        return item.domain_id === payload.nanoskill_id ? Object.assign({}, item, payload) : item;
                  });

            case ONTOLOGY_ACTIONS.ADD_CONCEPT:
                    return payload
            default:
                return state


    }
}