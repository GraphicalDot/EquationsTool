import { ActionReducer, Action, State } from '@ngrx/store';
import { UserModel} from '../models/user.model';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as UserActions from '../actions/users.actions';


export function UsersReducer(state: Array<any> = [], action: UserActions.Actions): UserModel[] {

    switch(action.type){
            case UserActions.LOAD_USERS_SUCCESS:
                return action.payload;                

            case UserActions.ADD_USER_SUCCESS:
                return [action.payload, ...state];
            
            case UserActions.GET_USER_SUCCESS:
                return [...state];

            case UserActions.DELETE_USER_SUCCESS:
                state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
            
            case UserActions.DELETE_USER_SUCCESS:
                return [...state];          

            default:
                return state


    }
}