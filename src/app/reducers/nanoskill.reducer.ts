import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import { NanoskillModel} from '../models/nanoskill.model';
import {createSelector} from "reselect"
import * as actions from '../actions/nanoskill.actions';
import * as _ from 'lodash';



export interface NanoskillState {
    module_ids?: string[],
    modules?: Array<NanoskillModel>
    allmodules?: Array<NanoskillModel>
    selectedModule?: NanoskillModel| null,
    parent_id?: string| null,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    module_count?: number,
    message?: string
}

const initialState: NanoskillState = {
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



export function NanoskillReducer(state = initialState, action: actions.Actions): NanoskillState {

    switch(action.type){
            case actions.ALL_NANOSKILL:
                        return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.ALL_NANOSKILL_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            


            case actions.ALL_NANOSKILL_SUCCESS:
                    return Object.assign({}, state, {
                        loading: false,
                        allmodules: action.payload,
                        loaded: true,
                    })
            

            case actions.SET_NANOSKILL_PARENT_SUCCESS:

                    return Object.assign({}, state, {
                        loading: false,
                        error: undefined,
                        loaded: true,
                        parent_id: action.payload   
                    })

            case actions.LOAD_NANOSKILL:

                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.LOAD_NANOSKILL_SUCCESS:
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

            case actions.LOAD_NANOSKILL_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })

            case actions.ADD_NANOSKILL:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.ADD_NANOSKILL_SUCCESS:

                    return Object.assign({}, state, {"modules": [...state.modules, action.payload.module],
                                  "module_ids": [...state.module_ids, action.payload.module_id],
                                    "allmodules": [...state.allmodules, {"module_id": action.payload.module_id, "module_name": action.payload.module.module_name }],
                                  
                            loaded: true,
                            loading: false,
                            message: action.payload.message, 
                                                        module_count: state.module_count +1,
                            pages: Math.ceil((state.module_count+1)/15), 
                            
                                })

            case actions.ADD_NANOSKILL_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })


            case actions.DELETE_NANOSKILL:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })


            case actions.DELETE_NANOSKILL_SUCCESS:
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
            case actions.DELETE_NANOSKILL_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            case actions.SELECTED_NANOSKILL:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })

            case actions.SELECTED_NANOSKILL_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            case actions.SELECTED_NANOSKILL_SUCCESS:
                    return Object.assign({}, state, {
                        loading: false,
                        selectedModule: action.payload,
                        loaded: true,
                    })


            case actions.EDIT_NANOSKILL:
                    return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    })


            case actions.EDIT_NANOSKILL_SUCCESS:
                        console.log(action.payload)
                        let estateclone = _.cloneDeep(state);
                        
                        var newModules = estateclone.modules
                        var indexOfObject = newModules.findIndex(id => id.module_id === action.payload.module_id);

                        newModules[indexOfObject] = action.payload

                        return Object.assign({}, state, {
                            modules: newModules, loaded: true, loading: false, 
                        });

            case actions.EDIT_NANOSKILL_FAILURE:
                    return Object.assign({}, state, {
                        loading: false,
                          error: action.payload._body,
                        loaded: true,
                    })
            

            default:
                return state


    }
}


export const Getnanoskillids= (state: NanoskillState) => state.module_ids

export const Getnanoskills = (state: NanoskillState) => state.modules
export const Getselectednanoskill = (state: NanoskillState) => state.selectedModule;
export const Getnanoskillpages = (state: NanoskillState) => state.pages;
export const Getnanoskillcount = (state: NanoskillState) => state.module_count;

export const Getnanoskillerror = (state: NanoskillState) => state.error;
export const Getnanoskillloading = (state: NanoskillState) => state.loading;
export const Getallnanoskills = (state: NanoskillState) => state.allmodules;
export const Getnanoskillmessage = (state: NanoskillState) => state.message;
