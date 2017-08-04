import { ActionReducer, Action, State } from '@ngrx/store';
import { DomainModel} from './domain.model';
import {DOMAIN_ACTIONS} from "./domain.actions";


export function DomainReducer(state: Array<DomainModel> = [], {type, payload}): Array<DomainModel> {

    switch(type){
            case DOMAIN_ACTIONS.LOAD_DOMAIN:
                console.log(payload)
                return Array.prototype.concat(payload);                

            case DOMAIN_ACTIONS.ADD_DOMAIN:
                return [payload, ...state];

            case DOMAIN_ACTIONS.DELETE_DOMAIN:
                state.splice(state.indexOf(payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);


            case DOMAIN_ACTIONS.EDIT_DOMAIN:
                 return state.map(item => {
                        return item.domain_id === payload.nanoskill_id ? Object.assign({}, item, payload) : item;
                  });

            default:
                return state


    }



}


