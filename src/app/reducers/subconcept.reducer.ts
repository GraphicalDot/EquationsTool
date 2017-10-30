import { ActionReducer, Action, State } from '@ngrx/store';
import { SubconceptModel} from '../models/subconcept.model';
import {createSelector} from "reselect"
import * as actions from "../actions/subconcept.actions"
import * as _ from 'lodash';



export interface SubconceptState {
    module_ids?: string[],
    modules?: Array<SubconceptModel>
    allmodules?: Array<SubconceptModel>
    selectedModule?: SubconceptModel| null,
    parent_id?: string| null,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    module_count?: number,
    message?: string
}

const initialState: SubconceptState = {
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


export function SubconceptReducer(state = initialState,  action: actions.Actions): SubconceptState {

    switch(action.type){
            case actions.ALL_SUBCONCEPT:
                        return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.ALL_SUBCONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            


            case actions.ALL_SUBCONCEPT_SUCCESS:
                    return Object.assign({}, state, {
                        loading: false,
                        allmodules: action.payload,
                        loaded: true,
                    })
            

            case actions.SET_SUBCONCEPT_PARENT_SUCCESS:

                    return Object.assign({}, state, {
                        loading: false,
                        error: undefined,
                        loaded: true,
                        parent_id: action.payload   
                    })

            case actions.LOAD_SUBCONCEPT:

                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.LOAD_SUBCONCEPT_SUCCESS:
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

            case actions.LOAD_SUBCONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })

            case actions.ADD_SUBCONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.ADD_SUBCONCEPT_SUCCESS:

                    return Object.assign({}, state, {"modules": [...state.modules, action.payload.module],
                                  "module_ids": [...state.module_ids, action.payload.module_id],
                                   // "allmodules": [...state.allmodules, {"module_id": action.payload.module_id, "module_name": action.payload.module.module_name }],
                                  
                            loaded: true,
                            loading: false,
                            message: action.payload.message, 
                                                        module_count: state.module_count +1,
                            pages: Math.ceil((state.module_count+1)/15), 
                            
                                })

            case actions.ADD_SUBCONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })


            case actions.DELETE_SUBCONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })


            case actions.DELETE_SUBCONCEPT_SUCCESS:
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
            case actions.DELETE_SUBCONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            case actions.SELECTED_SUBCONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.SELECTED_SUBCONCEPT_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            case actions.SELECTED_SUBCONCEPT_SUCCESS:
                    return Object.assign({}, state, {
                        loading: false,
                        selectedModule: action.payload,
                        loaded: true,
                    })


            case actions.EDIT_SUBCONCEPT:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })


            case actions.EDIT_SUBCONCEPT_SUCCESS:
                        let estateclone = _.cloneDeep(state);
                        
                        var newModules = estateclone.modules
                        var indexOfObject = newModules.findIndex(id => id.module_id === action.payload.module.module_id);

                        newModules[indexOfObject] = action.payload.module

                        return Object.assign({}, state, {
                            modules: newModules, loaded: true, loading: false, 
                        });

            case actions.EDIT_SUBCONCEPT_FAILURE:
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
export const Getsubconceptids= (state: SubconceptState) => state.module_ids

//This will select the dictionary of id: User
export const Getsubconcepts = (state: SubconceptState) => state.modules

//Return list of domains in a list format
/* export const getAllConcepts = createSelector(getConcepts, getConceptIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
 */

//select selectUserId
export const Getselectedsubconcept = (state: SubconceptState) => state.selectedModule;
export const Getsubconceptpages = (state: SubconceptState) => state.pages;
export const Getsubconceptcount = (state: SubconceptState) => state.module_count;
export const Getsubconcepterror = (state: SubconceptState) => state.error;
export const Getsubconceptloading = (state: SubconceptState) => state.loading;
export const Getallsubconcepts = (state: SubconceptState) => state.allmodules;
export const Getsubconceptmessage = (state: SubconceptState) => state.message;

