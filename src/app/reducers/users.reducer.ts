import { ActionReducer, Action, State } from '@ngrx/store';
import { UserModel} from '../models/user.model';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as UserActions from '../actions/users.actions';
import { createSelector } from 'reselect';

export interface UserState {
    user_ids?: string[] | null
    users?: {[id: string]: Array<UserModel>} | null
    selectedUserId?: string| null
    loading: boolean |null,
    loaded: boolean| null,
    error?: string | null
}

const initialState: UserState = {
    user_ids: [],
    users: {},
    selectedUserId: null,
    loading: false,
    loaded: false, 
    error: null,
}



export function UsersReducer(state = initialState, action: UserActions.Actions): UserState {

    switch(action.type){
            case UserActions.LOAD_USERS:
                    return {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    }            
            case UserActions.LOAD_USERS_SUCCESS:
                      return {
                          user_ids: action.payload.user_ids,
                          users: action.payload.users,
                          selectedUserId: null,
                          loaded: true,
                          loading: false
                      }

            case UserActions.LOAD_USERS_FAILURE:
                     return {
                          user_ids: undefined,
                          users: undefined,
                          selectedUserId: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body


                     }
            case UserActions.ADD_USER_SUCCESS:
                    return {
                        loading: true,
                        error: undefined,
                        loaded: false    

                    }

            case UserActions.ADD_USER_SUCCESS:
                    return {
                            user_ids: [ ...state.user_ids, action.payload.user_id],
                            users: Object.assign({}, state.users, { [action.payload.user_id]: action.payload}),
                            selectedUserId: state.selectedUserId,
                            loaded: true,
                            loading: false
                        };
            case UserActions.ADD_USER_FAILURE:
                    return {
                            user_ids: state.user_ids,
                            users: state.users,
                            selectedUserId: state.selectedUserId,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        };
                    
            

            case UserActions.GET_USER_SUCCESS:

            case UserActions.SELECT_USER:

            case UserActions.DELETE_USER_SUCCESS:
                /*
                state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
                */

            default:
                return state


    }
}



//This will select the list of ids of all the users
export const getUsersId= (state: UserState) => state.user_ids
//This will select the dictionary of id: User
export const getUsers = (state: UserState) => state.users

//Return list of users
/* export const getAllUsers = createSelector(getUsers, getUsersId, (entities, ids) => {
  return ids.map(id => entities[id]);
  
}); */


//select selectUserId
export const selectedUserId = (state: UserState) => state.selectedUserId;

//Get SElected user from the selectedUserId
export const getSelectedUser = createSelector(getUsers, selectedUserId, (entities, selectedId) => {
  return entities[selectedId];
});

