import { NanoskillModule } from './nanoskill.module';


import { ActionReducer, Action, State } from '@ngrx/store';
import { NanoskillModel} from './nanoskill.model';
import {ADD_NANOSKILL, DELETE_NANOSKILL, EDIT_NANOSKILL, ADD_CHILDREN} from "./nanoskill.actions";




export function NanoskillReducer(state, action) {

    switch(action.type){
            case ADD_NANOSKILL:
                const operation: NanoskillModel = action.payload;
                return [...state, operation];

            case DELETE_NANOSKILL:
                return state.filter(NanoskillModel=>{

                        return NanoskillModel.id !== action.payload.id;

                })


            case EDIT_NANOSKILL:
                 return state.map(item => {
                        return item.id === action.payload.id ? Object.assign({}, item, action.payload) : item;
                  });


            case ADD_CHILDREN:


            default:
                return state


    }



}




