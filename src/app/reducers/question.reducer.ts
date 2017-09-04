import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import { QuestionModel} from '../models/question.model';
import {createSelector} from "reselect"
import * as actions from '../actions/question.actions';

export interface QuestionState {
    module_ids?: string[],
    modules?: Array<QuestionModel>,
    selectedModule?: QuestionModel| null;
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    parent_id?: null
    pages?: number,
    module_count?: number
}

const initialState: QuestionState = {
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



export function QuestionReducer(state = initialState, action: actions.Actions): QuestionState {

    switch(action.type){
                case actions.CLEAR_QUESTION:
                    {
                    return Object.assign({}, state, initialState) 
                    }
                case actions.SET_QUESTION_PARENT_FAILURE:
                    {
                        return Object.assign({}, state, {
                            loading: false,
                            error: action.payload._body,
                            loaded: true,
                            parent_id: undefined,
                        })
                    }
    


            case actions.SET_QUESTION_PARENT_SUCCESS:
                {
                    return Object.assign({}, state, {
                        loading: false,
                    error: undefined,
                    loaded: true,
                    parent_id: action.payload,  
                    })
                }
    
    
            case actions.LOAD_QUESTION:
                {
                    return Object.assign({}, state,{ 
                        loading: true,
                    error: undefined,
                    loaded: false   
                    })
                }
            case actions.LOAD_QUESTION_SUCCESS:
                  {
                      return Object.assign({}, state, {
                          module_ids: action.payload.module_ids,
                          modules: action.payload.modules,
                            loaded: true,
                          loading: false,
                          pages: action.payload.pages,
                          module_count: action.payload.module_count
                      })
                }             
            case actions.LOAD_QUESTION_FAILURE:
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
            
            case actions.ADD_QUESTION:
                    {
                        return Object.assign({}, state, {
                             loading: true,
                            error: undefined,
                            loaded: false
                        })
                    }
            case actions.ADD_QUESTION_SUCCESS:
                 return {
                            module_ids: [ ...state.module_ids, action.payload.module_id],
                            modules: Object.assign({}, state.modules, { [action.payload.module_id]: action.payload}),
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            pages: state.pages,
                            module_count: state.module_count + 1
                        };

            case actions.ADD_QUESTION_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        };


            case actions.DELETE_QUESTION:
                    {
                        return {
                                loading: true,
                                error: undefined,
                                loaded: false   
                            }
                    }
            case actions.DELETE_QUESTION_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        }
            case actions.DELETE_QUESTION_SUCCESS:
                    return {
                            module_ids: state.module_ids.filter((id) => id == action.payload.module_id),
                            modules: state.modules.filter((module) => module.module_id == action.payload.module_id),
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        }


            case actions.SELECTED_QUESTION:
            case actions.SELECTED_QUESTION_FAILURE:
                {
                 return Object.assign({}, state, {
                        selectedModule: undefined,
                        error: "Module cannot be selected"
                        })
                }

            case actions.SELECTED_QUESTION_SUCCESS:
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
export const Getquestionids= (state: QuestionState) => state.module_ids

//This will select the dictionary of id: User
export const Getquestions = (state: QuestionState) => state.modules

//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getselectedquestion = (state: QuestionState) => state.selectedModule;
export const Getquestionpages = (state: QuestionState) => state.pages;
export const Getquestioncount = (state: QuestionState) => state.module_count;
/* 
//Get SElected user from the selectedUserId
export const Getselectedsubconcept = createSelector(Getsubconcepts, Getselectedsubconceptid, (entities, selectedId) => {
  return entities[selectedId];
}); */