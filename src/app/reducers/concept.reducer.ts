import { ActionReducer, Action, State } from '@ngrx/store';
import { ConceptModel} from '../models/ontology.models';
import * as ConceptActions from "../actions/ontology.actions"
import {createSelector} from "reselect"
import * as _ from 'lodash';

export interface ConceptState {
    module_ids?: string[],
    modules?: Array<ConceptModel>
    allmodules?: Array<ConceptModel>
    selectedModule?: ConceptModel| null,
    parent_id?: string| null,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    module_count?: number,
    message?: string
}

const initialState: ConceptState = {
    module_ids: [],
    modules: [],
    allmodules: [],
    selectedModule: null,
    loading: false,
    loaded: false, 
    error: null,
    parent_id: null,
    pages: null,
    module_count: null,
    message: null
}


export function ConceptReducer(state = initialState,  action: ConceptActions.Actions): ConceptState {

    switch(action.type){
            case ConceptActions.ALL_CONCEPT:
                        return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case ConceptActions.ALL_CONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            


            case ConceptActions.ALL_CONCEPT_SUCCESS:
                    return Object.assign({}, state, {
                        loading: false,
                        allmodules: action.payload,
                        loaded: true,
                    })
            

            case ConceptActions.SET_CONCEPT_PARENT_SUCCESS:

                    return Object.assign({}, state, {
                        loading: false,
                        error: undefined,
                        loaded: true,
                        parent_id: action.payload   
                    })

            case ConceptActions.LOAD_CONCEPT:

                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case ConceptActions.LOAD_CONCEPT_SUCCESS:
                      return Object.assign({}, state, {
                          module_ids: action.payload.module_ids,
                          modules: action.payload.modules,
                          selectedModule: null,
                            loaded: true,
                          loading: false,
                          parent_id: state.parent_id,
                            pages: action.payload.pages,
                          module_count: action.payload.module_count
                      })

            case ConceptActions.LOAD_CONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })

            case ConceptActions.ADD_CONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case ConceptActions.ADD_CONCEPT_SUCCESS:

                    return Object.assign({}, state, {"modules": [...state.modules, action.payload.module],
                                  "module_ids": [...state.module_ids, action.payload.module_id],
                                    "allmodules": [...state.allmodules, {"module_id": action.payload.module_id, "module_name": action.payload.module.module_name }],
                                  
                            loaded: true,
                            loading: false,
                            message: action.payload.message, 
                                                        module_count: state.module_count +1,
                            pages: Math.ceil((state.module_count+1)/15), 
                            
                                })

            case ConceptActions.ADD_CONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })


            case ConceptActions.DELETE_CONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })


            case ConceptActions.DELETE_CONCEPT_SUCCESS:
                        console.log(action.payload)
                        console.log(action.payload.module_id)
                        let stateclone = _.cloneDeep(state);
                        
                        const idToRemove = action.payload.module_id;
                        
                        const ids = stateclone.module_ids.filter((id) => id != action.payload.module_id)
                        
                        const newEntities = stateclone.modules.filter((id) => id.module_id != action.payload.module_id)

                        const newallmodules = stateclone.allmodules.filter((module) => module.module_id != action.payload.module_id)

                        return Object.assign({}, state, {
                            modules: newEntities, loaded: true, loading: false, 
                            module_ids: ids,
                            allmodules: newallmodules,
                            module_count: state.module_count -1,
                            pages: Math.ceil((state.module_count-1)/15), 
                            message: action.payload.message
                        });
            case ConceptActions.DELETE_CONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            case ConceptActions.SELECTED_CONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case ConceptActions.SELECTED_CONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            case ConceptActions.SELECTED_CONCEPT_SUCCESS:
                    return Object.assign({}, state, {
                        loading: false,
                        selectedModule: action.payload,
                        loaded: true,
                    })


            case ConceptActions.EDIT_CONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })


            case ConceptActions.EDIT_CONCEPT_SUCCESS:
                        console.log(action.payload)
                        let estateclone = _.cloneDeep(state);
                        
                        var newModules = estateclone.modules
                        var indexOfObject = newModules.findIndex(id => id.module_id === action.payload.module_id);

                        newModules[indexOfObject] = action.payload

                        return Object.assign({}, state, {
                            modules: newModules, loaded: true, loading: false, 
                        });

            case ConceptActions.EDIT_CONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            

            default:
                return state


    }
}


//This will select the list of ids of all the domains
export const Getconceptids= (state: ConceptState) => state.module_ids

//This will select the dictionary of id: User
export const Getconcepts = (state: ConceptState) => state.modules

//Return list of domains in a list format
/* export const getAllConcepts = createSelector(getConcepts, getConceptIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
 */

//select selectUserId
export const Getselectedconcept = (state: ConceptState) => state.selectedModule;
export const Getconceptpages = (state: ConceptState) => state.pages;
export const Getconceptcount = (state: ConceptState) => state.module_count;
export const Getconcepterror = (state: ConceptState) => state.error;
export const Getconceptloading = (state: ConceptState) => state.loading;
export const Getallconcepts = (state: ConceptState) => state.allmodules;
export const Getconceptmessage = (state: ConceptState) => state.message;


/* 
//Get SElected user from the selectedUserId
export const getSelectedConceptId = createSelector(getConcepts, selectedConceptId, (entities, selectedId) => {
  return entities[selectedId];
}); */