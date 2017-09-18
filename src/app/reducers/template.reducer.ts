import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import {createSelector} from "reselect"
import * as actions from '../actions/template.actions';

export interface TemplateState {
    template_ids: Array<string>,
    templates: Array<Object>,
    template: Object,
    templateSkeleton: Object,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    template_count?: number
}

const initialState: TemplateState = {
    template_ids: [],
    templates: [],
    templateSkeleton: null,
    template: null,
    loading: false,
    loaded: false, 
    error: null,
    pages: null,
    template_count: null
}



export function TemplateReducer(state = initialState, action: actions.Actions): TemplateState {

    switch(action.type){

    
            case actions.LOAD_TEMPLATE:
                {
                    return Object.assign({}, state,{ 
                    loading: true,
                    error: undefined,
                    loaded: false   
                    })
                }
            case actions.LOAD_TEMPLATE_SUCCESS:
                  {
                      return Object.assign({}, state, {
                        template_ids: action.payload.template_ids,
                        templates: action.payload.templates,
                        loaded: true,
                        loading: false,
                        pages: action.payload.pages,
                        template_count: action.payload.template_count
                      })
                }             
            case actions.LOAD_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                          template_ids: undefined,
                          templates: undefined,
                          loaded: true,
                          loading: false,
                          error: action.payload._body
                     })
                }
            
            case actions.ADD_TEMPLATE:
                    {
                        return Object.assign({}, state, {
                             loading: true,
                            error: undefined,
                            loaded: false
                        })
                    }
            case actions.ADD_TEMPLATE_SUCCESS:
                 return Object.assign({}, state, {"templates": [...state.templates, action.payload.template],
                                  "template_ids": [...state.template_ids, action.payload.template_id],
                            loaded: true,
                            loading: false
                                
                                })
            case actions.ADD_TEMPLATE_FAILURE:
                 {return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })}



            case actions.DELETE_TEMPLATE:
                        const idToRemove = action.payload.template_id;
                        const ids = state.template_ids.filter((id) => id == action.payload.template_id)
                        const newEntities = state.templates;
                        delete newEntities[idToRemove];
                        return Object.assign({}, state, {
                            templates: newEntities, 
                            loaded: true, 
                            loading: false, 
                            template_ids: ids,
                            template_count: state.template_count-1
                        });

            case actions.DELETE_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.DELETE_TEMPLATE:{

                        return Object.assign({}, state,{ 
                            loaded: false,
                            loading: true,
                        }
                    )
                    }
            case actions.GET_TEMPLATE_SUCCESS:
                        return Object.assign({}, state, {
                            loaded: true, 
                            loading: false, 
                            template: action.payload
                        });

            case actions.GET_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.GET_TEMPLATE:{

                        return Object.assign({}, state,{ 
                            loaded: false,
                            loading: true,
                        }
                    )
                    }

            case actions.LOAD_TEMPLATE_SKTON_SUCCESS:
                        return Object.assign({}, state, {
                            loaded: true, 
                            loading: false, 
                            templateSkeleton: [...action.payload]
                        });

            case actions.LOAD_TEMPLATE_SKTON_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.LOAD_TEMPLATE_SKTON:{

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
export const Gettemplateids= (state: TemplateState) => state.template_ids

//This will select the dictionary of id: User
export const Gettemplates = (state: TemplateState) => state.templates
export const Gettemplateerror = (state: TemplateState) => state.error

//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Gettemplatepages = (state: TemplateState) => state.pages;
export const Gettemplatecount = (state: TemplateState) => state.template_count;
export const Gettemplateloading = (state: TemplateState) => state.loading;
export const Gettemplateskton = (state: TemplateState) => state.templateSkeleton;
/* 
//Get SElected user from the selectedUserId
export const Getselectedsubconcept = createSelector(Getsubconcepts, Getselectedsubconceptid, (entities, selectedId) => {
  return entities[selectedId];
}); */