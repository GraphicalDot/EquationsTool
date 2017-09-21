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
                        return Object.assign({}, state, {
                             loading: true,
                            error: undefined,
                            loaded: false
                        })

            case VariableActions.ADD_VARIABLE_SUCCESS:
                return Object.assign({}, state, {"variables": [...state.variables, action.payload.variable],
                                  "variable_ids": [...state.variable_ids, action.payload.variable_id],
                            loaded: true,
                            loading: false,
                            variable_count: state.variable_count +1,                                
                                })
            case VariableActions.ADD_VARIABLE_FAILURE:
                    return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        
                        });

            case VariableActions.DELETE_VARIABLE:
                        return Object.assign({}, state, {
                                loading: true,
                                error: undefined,
                                loaded: false   
                            })


            case VariableActions.DELETE_VARIABLE_SUCCESS:

                        console.log(action.payload)
                        const idToRemove = action.payload;
                        const new_variables = state.variables.filter((variable) => variable.variable_id !== idToRemove)
                        const new_variable_ids = state.variable_ids;
                        delete new_variable_ids[idToRemove];
                        return Object.assign({}, state, {
                            variables: new_variables, 
                            loaded: true, 
                            loading: false, 
                            variable_ids: new_variable_ids, 
                            variable_count: state.variable_count -1});


            case VariableActions.DELETE_VARIABLE_FAILURE:
                    return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        
                        });

            case VariableActions.SELECTED_VARIABLE:
            case VariableActions.SELECTED_VARIABLE_FAILURE:

            case VariableActions.SELECTED_VARIABLE_SUCCESS:
                {
                 return {
                        variable_ids: state.variable_ids,
                        variables: state.variables,
                        selectedVariable: action.payload,
                        loaded: true,
                        loading: false,
                        pages: state.pages,
                        variable_count: state.variable_count
                          }
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
export const Getvariableids= (state: VariableState) => state.variable_ids

//This will select the dictionary of id: User
export const Getvariables = (state: VariableState) => state.variables

//Return list of domains in a list format
//export const getAllVariables = createSelector(getVariables, getVariableIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getvariablepages = (state: VariableState) => state.pages;
export const Getvariablecount = (state: VariableState) => state.variable_count;
export const Getvariableerror = (state: VariableState) => state.error;
export const Getvariableloading = (state: VariableState) => state.loading;

/* 
//Get SElected user from the selectedUserId
export const getSelectedVariable = createSelector(getVariables, selectedVariableId, (entities, selectedId) => {
  return entities[selectedId];
}); */