import { ActionReducer, Action, State } from '@ngrx/store';
import { UserModel} from '../models/user.model';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as UserActions from '../actions/users.actions';
import { createSelector } from 'reselect';

export interface UserState {
    user_ids: string[]
    users: {[id: string]: Array<UserModel>}
    selectedUserId: string| null;
}

const initialState: UserState = {
    user_ids: [],
    users: {},
    selectedUserId: null
}

export interface LoginState {
    user_id: string
    username: string
    token: string| null;
    user_type: string;
    first_name: string;
    last_name: string;
}


const LoginState: LoginState = {
    user_id: null,
    username: null,
    token: null,
    user_type: null,
    first_name: null,
    last_name: null,
}



export function LoginReducer(state = initialState, action: UserActions.Actions): LoginState {

    switch(action.type){
            case UserActions.LOGIN_USER_SUCCESS:
                      return {
                           user_id: action.payload.user_id,
                            username: action.payload.username,
                            token: action.payload.token,
                            user_type: action.payload.user_type,
                            first_name: action.payload.first_name,
                            last_name: action.payload.last_name
}
            case UserActions.LOGIN_USER_FAILURE:
                console.log("failure in loging user")
            
            case UserActions.LOGOUT_USER:
                     console.log("error")
    }
}


export function UsersReducer(state = initialState, action: UserActions.Actions): UserState {

    switch(action.type){
            case UserActions.LOAD_USERS_SUCCESS:
                      return {
                          user_ids: action.payload.user_ids,
                          users: action.payload.users,
                          selectedUserId: null
                      }

            case UserActions.LOAD_USERS_FAILURE:
                     console.log("error")

            case UserActions.ADD_USER_SUCCESS:
                    return {
                            user_ids: [ ...state.user_ids, action.payload.user_id],
                            users: Object.assign({}, state.users, { [action.payload.user_id]: action.payload}),
                            selectedUserId: state.selectedUserId
                        };
            case UserActions.ADD_USER_FAILURE:
                    
            

            case UserActions.GET_USER_SUCCESS:

            case UserActions.SELECT_USER:
                      return {
                        user_ids: state.user_ids,
                        users: state.users,
                        selectedUserId: action.payload,
                          }

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


export const userId= (state: LoginState) => state.user_id
export const userType= (state: LoginState) => state.user_type
export const userName= (state: LoginState) => state.username

//This will select the list of ids of all the users
export const getUsersId= (state: UserState) => state.user_ids
//This will select the dictionary of id: User
export const getUsers = (state: UserState) => state.users

//Return list of users
export const getAllUsers = createSelector(getUsers, getUsersId, (entities, ids) => {
  return ids.map(id => entities[id]);
});


//select selectUserId
export const selectedUserId = (state: UserState) => state.selectedUserId;

//Get SElected user from the selectedUserId
export const getSelectedUser = createSelector(getUsers, selectedUserId, (entities, selectedId) => {
  return entities[selectedId];
});

