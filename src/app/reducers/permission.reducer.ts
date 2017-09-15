import { ActionReducer, Action, State } from '@ngrx/store';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as PermissionActions from '../actions/permissions.actions';
import { createSelector } from 'reselect';

export interface PermissionState {
    domain: Object,
    concept: Object,
    nanoskill: Object,
    question: Object,
    domainerror: string | null
}

const initialState: PermissionState = {
    domain: null,
    concept: null,
    nanoskill: null,
    question: null,
    domainerror: null
}



export function PermissionReducer(state = initialState, action: PermissionActions.Actions): PermissionState {

    switch(action.type){
            case PermissionActions.LOAD_PERMISSION_DOMAIN:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    })
                   }            
            case PermissionActions.LOAD_PERMISSION_DOMAIN_SUCCESS:
                      {
                        return Object.assign({}, state, {
                            domain: action.payload,
                          loaded: true,
                          loading: false,
                          })
                      }

            case PermissionActions.LOAD_PERMISSION_DOMAIN_FAILURE:
                     {
                         return Object.assign({}, state, {
                          user_id: undefined,
                          domain: undefined,
                          loading: false,
                          error: action.payload._body
                     })
                     }

            case PermissionActions.EDIT_PERMISSION_DOMAIN:
                    {
                        return Object.assign({}, state, {
                          loading: true,
                          domainerror: undefined
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_DOMAIN_FAILURE:
                    {
                        return Object.assign({}, state, {
                          domain: undefined,
                          loading: false,
                          domainerror: action.payload._body
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_DOMAIN_SUCCESS:
                    {
                        return Object.assign({}, state, {
                          loading: false,
                          domainerror: action.payload._body
                     })
                     }

            default:
                return state


    }
}



//This will select the list of ids of all the users
//This will select the dictionary of id: Permission
export const PermissionDomain = (state: PermissionState) => state.domain
export const PermissionDomainError = (state: PermissionState) => state.domainerror

//Return list of users
/* export const getAllPermissions = createSelector(getPermissions, getPermissionsId, (entities, ids) => {
  return ids.map(id => entities[id]);
  
}); */


//select selectPermissionId

