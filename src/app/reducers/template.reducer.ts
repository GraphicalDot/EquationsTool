import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import {createSelector} from "reselect"
import * as actions from '../actions/template.actions';

export interface TemplateState {
    template_ids: Array<string>,
    templates: Array<Object>,
    template: Object,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    module_count?: number
}

const initialState: TemplateState = {
    template_ids: [],
    templates: [],
    template: null,
    loading: false,
    loaded: false, 
    error: null,
    pages: null,
    module_count: null
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
                        templates: action.payload.template,
                        template: undefined,
                        loaded: true,
                        loading: false,
                        pages: action.payload.pages,
                        module_count: action.payload.module_count
                      })
                }             
            case actions.LOAD_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                          template_ids: undefined,
                          templates: undefined,
                            template: undefined,
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
                 {
                     return Object.assign({}, state, {
                                template_ids: Object.assign({}, state.template_ids, action.payload.template_id),
                                templates: Object.assign({}, state.templates, action.payload.template),
                            loaded: true,
                            loading: false,
                        })
                 }
            case actions.ADD_TEMPLATE_FAILURE:
                 {return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })}



            case actions.DELETE_TEMPLATE:
                        const idToRemove = action.payload.module_id;
                        const ids = state.template_ids.filter((id) => id == action.payload.module_id)
                        const newEntities = state.templates;
                        delete newEntities[idToRemove];
                        return Object.assign({}, state, {
                            templates: newEntities, 
                            loaded: true, 
                            loading: false, 
                            template_ids: ids
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
export const Gettemplatecount = (state: TemplateState) => state.module_count;
export const Gettemplateloading = (state: TemplateState) => state.loading;
/* 
//Get SElected user from the selectedUserId
export const Getselectedsubconcept = createSelector(Getsubconcepts, Getselectedsubconceptid, (entities, selectedId) => {
  return entities[selectedId];
}); */