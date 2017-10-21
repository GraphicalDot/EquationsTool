import { ActionReducer, Action, State } from '@ngrx/store';
import { UserModel} from '../models/user.model';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as UserActions from '../actions/users.actions';
import { createSelector } from 'reselect';
import * as _ from 'lodash';

export interface UserState {
    user_ids?: string[] | null
    users?: Array<UserModel>
    selectedUser?: string| null
    loading: boolean |null,
    loaded: boolean| null,
    error?: string | null,
        pages?: number,
    module_count?: number
}

const initialState: UserState = {
    user_ids: [],
    users: [],
    selectedUser: null,
    loading: false,
    loaded: false, 
    error: null,    
    pages: null,
    module_count: null
}



export function UsersReducer(state = initialState, action: UserActions.Actions): UserState {

    switch(action.type){
            case UserActions.LOAD_USERS:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    })
                   }            
            case UserActions.LOAD_USERS_SUCCESS:
                      {
                        return Object.assign({}, state, {
                          user_ids: action.payload.user_ids,
                          users: action.payload.users,
                          selectedUserId: null,
                          loaded: true,
                          loading: false,
                          pages: action.payload.pages,
                          module_count: action.payload.user_count
                          })
                      }

            case UserActions.LOAD_USERS_FAILURE:
                     {
                         return Object.assign({}, state, {
                          user_ids: undefined,
                          users: undefined,
                          selectedUserId: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body
                     })

                     }

            case UserActions.ADD_USER:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    

                    })
                   }

            case UserActions.ADD_USER_SUCCESS:
            {
                    console.log(action.payload)
                    const old_ids = state.user_ids
                    old_ids.concat(action.payload.user_id)

                    const old_users = state.users
                    old_users.concat(action.payload)
                    
                return Object.assign({}, state, {
                            user_ids: old_ids.concat(action.payload.user_id), 
                            users: old_users.concat(action.payload),
                            selectedUserId: state.selectedUser,
                            loaded: true,
                            loading: false,
                            module_count: state.module_count +1, 
                            pages: Math.ceil((state.module_count+1)/15),                        })
            }
            case UserActions.USER_ERROR:
                    {   console.log(action.payload)
                        return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                    }
                    
            

            case UserActions.GET_USER_SUCCESS:

            case UserActions.SELECT_USER:

            case UserActions.SELECT_USER_FAILURE:
                {
                 return Object.assign({}, state, {
                        selectedUser: undefined,
                        error: "Module cannot be selected"
                        })
                }

            case UserActions.SELECT_USER_SUCCESS:
                {
                 return Object.assign({}, state, {
                        selectedUser: action.payload,
                        loaded: true,
                        loading: false,
                        })
                }


            case UserActions.DELETE_USER_SUCCESS:
                {

                        return Object.assign({}, state,{ 
                            user_ids: state.user_ids.filter((id) => id != action.payload),
                            users: state.users.filter((module) => module.user_id != action.payload),
                            module_count: state.module_count -1, 
                            pages: Math.ceil((state.module_count-1)/15),
                            selectedModule: undefined,
                            loaded: true,
                            loading: false,
                        }
                    )
                    }
                /*
                state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
                */
            
            case UserActions.EDIT_USER:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })


            case UserActions.EDIT_USER_SUCCESS:
                        console.log(action.payload)
                        let estateclone = _.cloneDeep(state);
                        
                        var newModules = estateclone.users
                        var indexOfObject = newModules.findIndex(id => id.user_id === action.payload.user_id);

                        newModules[indexOfObject] = action.payload

                        return Object.assign({}, state, {
                            modules: newModules, loaded: true, loading: false, 
                        });

            case UserActions.EDIT_USER_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })

            default:
                return state


    }
}



//This will select the list of ids of all the users
export const Getuserids= (state: UserState) => state.user_ids
//This will select the dictionary of id: User
export const Getusers = (state: UserState) => state.users
export const Getusererror = (state: UserState) => state.error

//Return list of users
/* export const getAllUsers = createSelector(getUsers, getUsersId, (entities, ids) => {
  return ids.map(id => entities[id]);
  
}); */


//select selectUserId
export const Getselecteduser = (state: UserState) => state.selectedUser;


export const Getuserpages = (state: UserState) => state.pages;
export const Getusercount = (state: UserState) => state.module_count;

