import { ActionReducer, Action, State } from '@ngrx/store';
import { VariableModel} from '../models/variable.model';
import {createSelector} from "reselect"
import * as VariableActions from "../actions/variable.actions"

export interface VariableState {
    variable_ids?: Array<string>,
    variables?: Array<any>
    selectedVariable?: VariableModel| null;
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    variable_count?: number
}

const initialState: VariableState = {
    variable_ids: [],
    variables: [],
    selectedVariable: null,
    loading: false,
    loaded: false, 
    error: null,
    pages: null,
    variable_count: null
}



export function VariableReducer(state = initialState, action: VariableActions.Actions): VariableState {

    switch(action.type){
            case VariableActions.LOAD_VARIABLE:
                {
                    return {
                        loading: true,
                        error: undefined,
                        loaded: false,   
                        pages: undefined,
                        variable_count: undefined
                    }
                }


            case VariableActions.LOAD_VARIABLE_SUCCESS:
                  {
                      return {
                          variable_ids: action.payload.variable_ids,
                          variables: action.payload.variables,
                          selectedVariable: state.selectedVariable,
                          loaded: true,
                          loading: false,
                          pages: action.payload.pages,
                          variable_count: action.payload.variable_count

                        }
                }             

            case VariableActions.LOAD_VARIABLE_FAILURE:
                    return {
                          variable_ids: undefined,
                          variables: undefined,
                          selectedVariable: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body


                     }
            
            case VariableActions.ADD_VARIABLE:
                    {
                        return {
                             loading: true,
                            error: undefined,
                            loaded: false
                        }
                    }

            case VariableActions.ADD_VARIABLE_SUCCESS:
                console.log(action.payload.module_id)
                console.log(action.payload)
/* 
                ({module} = action.payload);
                state.devices.push(action.payload.module_id)
                return Object.assign({}, state, { 
                            variable_ids: someids ,
                            variables: newstate,
                            selectedVariable: state.selectedVariable,
                            loaded: true,
                            loading: false
                        });
 */
                return Object.assign({}, state, {"variables": [...state.variables, action.payload.variables],
                                  "variable_ids": [...state.variable_ids, action.payload.module_id],
                                                            selectedVariable: state.selectedVariable,
                            loaded: true,
                            loading: false
                                
                                })

            case VariableActions.ADD_VARIABLE_FAILURE:
                    return {
                            variable_ids: state.variable_ids,
                            variables: state.variables,
                            selectedVariable: state.selectedVariable,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        };


            case VariableActions.DELETE_VARIABLE:
                    {
                        return {
                                loading: true,
                                error: undefined,
                                loaded: false   
                            }
                    }


            case VariableActions.DELETE_VARIABLE_SUCCESS:
                        const idToRemove = action.payload.module_id;
                        const ids = state.variable_ids.filter((id) => id == action.payload.module_id)
                        const newEntities = state.variable_ids;
                        delete newEntities[idToRemove];
                        return Object.assign({}, state, {
                            variables: newEntities, loaded: true, loading: false, variable_ids: ids
                        });
            case VariableActions.DELETE_VARIABLE_FAILURE:
                    return {
                            variable_ids: state.variable_ids,
                            variables: state.variables,
                            selectedVariable: state.selectedVariable,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        }


            case VariableActions.SELECTED_VARIABLE:
            case VariableActions.SELECTED_VARIABLE_FAILURE:

            case VariableActions.SELECTED_VARIABLE_SUCCESS:
            
                 return {
                        variable_ids: state.variable_ids,
                        variables: state.variables,
                        selectedVariable: action.payload,
                        loaded: true,
                        loading: false,
                        pages: state.pages,
                        variable_count: state.variable_count
                          }

            /*state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
            */

            default:
                return state


    }
}



//This will select the list of ids of all the domains
export const Getdomainids= (state: VariableState) => state.variable_ids

//This will select the dictionary of id: User
export const Getdomains = (state: VariableState) => state.variables

//Return list of domains in a list format
//export const getAllVariables = createSelector(getVariables, getVariableIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getselecteddomain = (state: VariableState) => state.selectedVariable;
export const Getdomainpages = (state: VariableState) => state.pages;
export const Getdomaincount = (state: VariableState) => state.variable_count;
/* 
//Get SElected user from the selectedUserId
export const getSelectedVariable = createSelector(getVariables, selectedVariableId, (entities, selectedId) => {
  return entities[selectedId];
}); */