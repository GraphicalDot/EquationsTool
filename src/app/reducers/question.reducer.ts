import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import { QuestionModel} from '../models/question.model';
import {createSelector} from "reselect"
import * as actions from '../actions/question.actions';
import * as _ from 'lodash';

/*  


*/


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
    message?: string
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
    module_count: null,
    message: null
}



export function QuestionReducer(state = initialState, action: actions.Actions): QuestionState {

    switch(action.type){
                case actions.DELETE_QUESTION_OPTION_SUCCESS:
                    {
                        let stateclone = _.cloneDeep(state);
                        const idToRemove = action.payload.index;
                        
                        const options = stateclone.selectedModule.options.filter((_object) => _object.option != action.payload.index)
                        
                        var selectedModuleObject = Object.assign({}, state.selectedModule, {"options": options})
                    return Object.assign({}, state, 
                    {
                        selectedModule: selectedModuleObject,
                        loaded: true,
                        loading: false,

                    })
                    
                    }                    
            case actions.DELETE_QUESTION_OPTION:
            {
                 return Object.assign({}, state, {
                        loaded: false,
                        loading: true,
                        error: undefined
                        })
                }
            case actions.DELETE_QUESTION_OPTION_FAILURE:
            {
                 return Object.assign({}, state, {
                        loaded: true,
                        loading: false,
                        error: "Question option couldnt be deleted, Please try again later or contact administrator"
                        })
                }                
            case actions.ADD_QUESTION_OPTION_SUCCESS:
            {
                        var optionindex = action.payload.option -1
                        let estateclone = _.cloneDeep(state);
                        
                        var options = estateclone.selectedModule.options

                        options[optionindex] = action.payload
                 
                return Object.assign({}, state, {
                         selectedModule: Object.assign({}, state.selectedModule, {"options": options}),
                        loaded: true,
                        loading: false,
                        error: undefined
                        })
                }

            case actions.ADD_QUESTION_OPTION:
            {
                 return Object.assign({}, state, {
                        loaded: false,
                        loading: true,
                        error: undefined
                        })
                }
            case actions.ADD_QUESTION_OPTION_FAILURE:
            {
                 return Object.assign({}, state, {
                        loaded: true,
                        loading: false,
                        error: "Question option couldnt be added, Please try again later or contact administrator"
                        })
                }
                    
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
                return Object.assign({}, state, {"modules": [...state.modules, action.payload.module],
                                  "module_ids": [...state.module_ids, action.payload.module_id],
                            loaded: true,
                            loading: false,
                            message: action.payload.message, 
                            module_count: state.module_count +1,
                            pages: Math.ceil((state.module_count+1)/15), 
                                
                                })

            case actions.ADD_QUESTION_FAILURE:
                    {
                    return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                    }


            case actions.DELETE_QUESTION:
                    {
                        return Object.assign({}, state, {
                                loading: true,
                                error: undefined,
                                loaded: false   
                            })
                    }
            case actions.DELETE_QUESTION_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.DELETE_QUESTION_SUCCESS:

                                    console.log(action.payload)
                        console.log(action.payload.module_id)
                        let stateclone = _.cloneDeep(state);
                        
                        const idToRemove = action.payload.module_id;
                        
                        const ids = stateclone.module_ids.filter((id) => id != action.payload.module_id)
                        
                        const newEntities = stateclone.modules.filter((id) => id.module_id != action.payload.module_id)


                        return Object.assign({}, state, {
                            modules: newEntities, loaded: true, loading: false, 
                            module_ids: ids,
                            module_count: state.module_count -1,
                            pages: Math.ceil((state.module_count-1)/15), 
                            message: action.payload.message
                        });

            case actions.SELECTED_QUESTION:
            {
                 return Object.assign({}, state, {
                        loaded: false,
                        loading: true,
                        error: undefined
                        })
                }
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

            case actions.ADD_QUESTION_TEXT:
            {
                 return Object.assign({}, state, {
                         selectedModule: Object.assign({}, state.selectedModule, {"question_text": action.payload.content}),
                        loaded: false,
                        loading: true,
                        error: undefined
                        })
                }

            case actions.ADD_QUESTION_TEXT_SUCCESS:
            {
                 return Object.assign({}, state, {
                        loaded: true,
                        loading: false,
                        error: undefined
                        })
                }
            case actions.ADD_QUESTION_TEXT_FAILURE:
            {
                 return Object.assign({}, state, {
                        loaded: true,
                        loading: false,
                        error: "Question text couldnt be added, Please try again later or contact administrator"
                        })
                }


            case actions.EDIT_QUESTION_SUCCESS:
                {
                        console.log(action.payload)
                        let estateclone = _.cloneDeep(state);
                        
                        var newModules = estateclone.modules
                        var indexOfObject = newModules.findIndex(id => id.module_id === action.payload.module.module_id);

                        newModules[indexOfObject] = action.payload.module

                        return Object.assign({}, state, {
                            modules: newModules, 
                            loaded: true, 
                            loading: false,
                            message: action.payload.message
                        });
            
                }

            case actions.EDIT_QUESTION:
            {
                 return Object.assign({}, state, {
                        loaded: true,
                        loading: false,
                        error: undefined
                        })
                }
            case actions.EDIT_QUESTION_FAILURE:
            {
                 return Object.assign({}, state, {
                        loaded: true,
                        loading: false,
                        error: action.payload._body
                        })
                }


            /*state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
            */

            default:
                return {
                    ...state
                }


    }
}



//This will select the list of ids of all the domains
export const Getquestionids= (state: QuestionState) => state.module_ids

//This will select the dictionary of id: User
export const Getquestions = (state: QuestionState) => state.modules
export const Getquestionerror = (state: QuestionState) => state.error
export const Getquestionloading = (state: QuestionState) => state.loading


//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getselectedquestion = (state: QuestionState) => state.selectedModule;
export const Getquestionpages = (state: QuestionState) => state.pages;
export const Getquestioncount = (state: QuestionState) => state.module_count;
export const Getquestionmessage = (state: QuestionState) => state.message;
/* 
//Get SElected user from the selectedUserId
export const Getselectedsubconcept = createSelector(Getsubconcepts, Getselectedsubconceptid, (entities, selectedId) => {
  return entities[selectedId];
}); */