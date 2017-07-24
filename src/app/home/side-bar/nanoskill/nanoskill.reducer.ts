import { NanoskillModule } from './nanoskill.module';


import { ActionReducer, Action, State } from '@ngrx/store';
import { NanoskillModel} from './nanoskill.model';
import {NANOSKILLS_ACTIONS} from "./nanoskill.actions";



export function NanoskillReducer(state: Array<NanoskillModel> = [], {type, payload}): Array<NanoskillModel> {

    switch(type){
            case NANOSKILLS_ACTIONS.LOAD_NANOSKILL:
                console.log(payload)
                return Array.prototype.concat(payload);                

            case NANOSKILLS_ACTIONS.ADD_NANOSKILL:
                return [...state, payload];

            case NANOSKILLS_ACTIONS.DELETE_NANOSKILL:
                state.splice(state.indexOf(payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);


            case NANOSKILLS_ACTIONS.EDIT_NANOSKILL:
                 return state.map(item => {
                        return item.nanoskill_id === payload.nanoskill_id ? Object.assign({}, item, payload) : item;
                  });


            case NANOSKILLS_ACTIONS.ADD_CHILDREN:


            default:
                return state


    }



}




