import { ActionReducer, Action, State } from '@ngrx/store';
import { SubconceptModel} from '../models/subconcept.model';
import {createSelector} from "reselect"
import * as actions from "../actions/subconcept.actions"

export interface SubconceptState {
    module_ids?: string[],
    modules?: Array<SubconceptModel>,
    selectedModule?: SubconceptModel;
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    parent_id?: null,
    pages?: number,
    module_count?: number
}

const initialState: SubconceptState = {
    module_ids: [],
    modules: [],
    selectedModule: null,
    loading: false,
    loaded: false, 
    error: null,
    parent_id: null,
    pages: null,
    module_count: null
}



export function SubconceptReducer(state = initialState, action: actions.Actions): SubconceptState {

    switch(action.type){
                case actions.SET_SUBCONCEPT_PARENT_FAILURE:
                {
                    return {
                        loading: false,
                    error: action.payload._body,
                    loaded: true,
                    parent_id: undefined,
                    }
                }
    


            case actions.SET_SUBCONCEPT_PARENT_SUCCESS:
                {
                    return Object.assign({}, state, {
                    parent_id: action.payload,  
                        })
                }
    
    
            case actions.LOAD_SUBCONCEPT:
                {
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false   
                    })
                }

            case actions.LOAD_SUBCONCEPT_SUCCESS:
                  {
                      return Object.assign({}, state, {
                          module_ids: action.payload.module_ids,
                          modules: action.payload.modules,
                          selectedModule: null,
                          loaded: true,
                          loading: false,
                          pages: action.payload.pages,
                          module_count: action.payload.module_count
                      })
                }             
            case actions.LOAD_SUBCONCEPT_FAILURE:
                    {
                    return Object.assign({}, state, {
                          module_ids: undefined,
                          modules: undefined,
                          selectedModule: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body
                     })
                    }
            
            case actions.ADD_SUBCONCEPT:
                    {
                    return Object.assign({}, state, {
                          loaded: false,
                          loading: true,
                          error: undefined
                        })
                    }
            case actions.ADD_SUBCONCEPT_SUCCESS:
                    {
                    return Object.assign({}, state, {
                          module_ids: Object.assign({}, state, state.module_ids.concat(action.payload.module_id)), 
                          modules: Object.assign({}, state, state.modules.concat(action.payload)),
                          selectedModule: null,
                          loaded: true,
                          loading: false,
                          error: undefined,
                          module_count: state.module_count +1
                     })
                    }

            case actions.ADD_SUBCONCEPT_FAILURE:
                    {
                    return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                    }
                    
            case actions.DELETE_SUBCONCEPT:
                    {
                        return {
                                loading: true,
                                error: undefined,
                                loaded: false   
                            }
                    }
            case actions.DELETE_SUBCONCEPT_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body,
                            pages: state.pages,
                            module_count: state.module_count -1
                        }
            case actions.DELETE_SUBCONCEPT_SUCCESS:
                    return {
                            module_ids: state.module_ids.filter((id) => id == action.payload.module_id),
                            modules: state.modules.filter((module) => module.module_id == action.payload.module_id),
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        }


            case actions.SELECTED_SUBCONCEPT:
                               {
                    return Object.assign({}, state, {
                          loaded: false,
                          loading: true,
                          error: undefined
                        })
                    }
            case actions.SELECTED_SUBCONCEPT_FAILURE:
                {
                    return Object.assign({}, state, {"error": "Some issues in subconcept selection"})

                }

            case actions.SELECTED_SUBCONCEPT_SUCCESS:
                {
                 return Object.assign({}, state, {
                        selectedModule: action.payload,
                        loaded: true,
                        loading: false,
                          })
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
export const Getsubconceptids= (state: SubconceptState) => state.module_ids

//This will select the dictionary of id: User
export const Getsubconcepts = (state: SubconceptState) => state.modules

//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getselectedsubconcept = (state: SubconceptState) => state.selectedModule;
export const Getsubconceptpages = (state: SubconceptState) => state.pages;
export const Getsubconceptcount = (state: SubconceptState) => state.module_count;
/* 
//Get SElected user from the selectedUserId
export const Getselectedsubconcept = createSelector(Getsubconcepts, Getselectedsubconceptid, (entities, selectedId) => {
  return entities[selectedId];
}); */