import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import {createSelector} from "reselect"
import * as actions from '../actions/variabletemplate.actions';
import {VariabletemplateModel} from "../models/variabletemplate.model"

//Selected variable template will in the template reducer
export interface VariabletemplateState {
    variabletemplate_ids: Array<string>,
    variabletemplates: VariabletemplateModel[],
    selected_variabletemplate: VariabletemplateModel,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    variabletemplate_count?: number
}

const initialState: VariabletemplateState = {
    variabletemplate_ids: [],
    variabletemplates: [],
    selected_variabletemplate: null,
    loading: false,
    loaded: false, 
    error: null,
    pages: null,
    variabletemplate_count: null
}



export function VariabletemplateReducer(state = initialState, action: actions.Actions): VariabletemplateState {

    switch(action.type){

    
            case actions.LOAD_VARIABLE_TEMPLATE:
                {
                    return Object.assign({}, state,{ 
                    loading: true,
                    error: undefined,
                    loaded: false   
                    })
                }
            case actions.LOAD_VARIABLE_TEMPLATE_SUCCESS:
                  {
                      return Object.assign({}, state, {
                        variabletemplate_ids: action.payload.variabletemplate_ids,
                        variabletemplates: action.payload.variabletemplates,
                        loaded: true,
                        loading: false,
                        pages: action.payload.pages,
                        variabletemplate_count: action.payload.variabletemplate_count
                      })
                }             
            case actions.LOAD_VARIABLE_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                          variabletemplate_ids: undefined,
                          variabletemplates: undefined,
                          loaded: true,
                          loading: false,
                          error: action.payload._body
                     })
                }
            
            case actions.ADD_VARIABLE_TEMPLATE:
                    {
                        return Object.assign({}, state, {
                             loading: true,
                            error: undefined,
                            loaded: false
                        })
                    }
            case actions.ADD_VARIABLE_TEMPLATE_SUCCESS:
                 return Object.assign({}, state, {"variabletemplates": [...state.variabletemplates, action.payload.template],
                                  "variabletemplate_ids": [...state.variabletemplate_ids, action.payload.template_id],
                            loaded: true,
                            loading: false
                                
                                })
            case actions.ADD_VARIABLE_TEMPLATE_FAILURE:
                 return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })



            case actions.DELETE_VARIABLE_TEMPLATE:
                        console.log(action.payload)
                        const idToRemove = action.payload;
                        const new_variables = state.variabletemplates.filter((variable) => variable.variabletemplate_id !== idToRemove)
                        const new_variable_ids = state.variabletemplate_ids;
                        delete new_variable_ids[idToRemove];
                        return Object.assign({}, state, {
                            variables: new_variables, 
                            loaded: true, 
                            loading: false, 
                            variable_ids: new_variable_ids, 
                            variable_count: state.variabletemplate_count -1});

            case actions.DELETE_VARIABLE_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.DELETE_VARIABLE_TEMPLATE:{

                        return Object.assign({}, state,{ 
                            loaded: false,
                            loading: true,
                        }
                    )
                    }

            case actions.GET_VARIABLE_TEMPLATE_SUCCESS:
                        return Object.assign({}, state, {
                            loaded: true, 
                            loading: false, 
                            selected_variabletemplate: action.payload
                        });

            case actions.GET_VARIABLE_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.GET_VARIABLE_TEMPLATE:{

                        return Object.assign({}, state,{ 
                            loaded: false,
                            loading: true,
                        }
                    )
                    }



            default:
                return {
                    ...state
                }

    }
}



//This will select the list of ids of all the domains
export const Getvariabletemplateids= (state: VariabletemplateState) => state.variabletemplate_ids

//This will select the dictionary of id: User
export const Getvariabletemplates = (state: VariabletemplateState) => state.variabletemplates
export const Getvariabletemplateerror = (state: VariabletemplateState) => state.error

//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getvariabletemplatepages = (state: VariabletemplateState) => state.pages;
export const Getvariabletemplatecount = (state: VariabletemplateState) => state.variabletemplate_count;
export const Getvariabletemplateloading = (state: VariabletemplateState) => state.loading;
export const Getselectedvariabletemplate = (state: VariabletemplateState) => state.selected_variabletemplate;

/* 
//Get SElected user from the selectedUserId
export const Getselectedsubconcept = createSelector(Getsubconcepts, Getselectedsubconceptid, (entities, selectedId) => {
  return entities[selectedId];
}); */