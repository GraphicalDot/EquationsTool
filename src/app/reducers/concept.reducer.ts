import { ActionReducer, Action, State } from '@ngrx/store';
import { ConceptModel} from '../models/ontology.models';
import * as ConceptActions from "../actions/ontology.actions"
import {createSelector} from "reselect"

export interface ConceptState {
    module_ids?: string[],
    modules?: Array<ConceptModel>
    selectedModule?: ConceptModel| null,
    parent_id?: string| null,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    module_count?: number

}

const initialState: ConceptState = {
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


export function ConceptReducer(state = initialState,  action: ConceptActions.Actions): ConceptState {

    switch(action.type){
        case ConceptActions.SET_CONCEPT_PARENT_SUCCESS:

              {
                    return {
                        loading: true,
                        error: undefined,
                        loaded: false,
                        parent_id: action.payload   
                    }
                }

            case ConceptActions.LOAD_CONCEPT:

              {
                    return {
                        loading: true,
                        error: undefined,
                        loaded: false,
                    }
                }

            case ConceptActions.LOAD_CONCEPT_SUCCESS:
                     {
                      return {
                          module_ids: action.payload.module_ids,
                          modules: action.payload.modules,
                          selectedModule: null,
                            loaded: true,
                          loading: false,
                          parent_id: state.parent_id,
                        pages: action.payload.pages,
                          module_count: action.payload.module_count
                      }
                }              

            case ConceptActions.LOAD_CONCEPT_FAILURE:
                    return {
                          module_ids: undefined,
                          modules: undefined,
                          selectedModule: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body,
                          parent_id: state.parent_id


                     }
                        

            case ConceptActions.ADD_CONCEPT:
                    {
                        return {
                             loading: true,
                            error: undefined,
                            loaded: false
                        }
                    }
            case ConceptActions.ADD_CONCEPT_SUCCESS:
                 return {
                            module_ids: [ ...state.module_ids, action.payload.module_id],
                            modules: Object.assign({}, state.modules, { [action.payload.module_id]: action.payload}),
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            parent_id: state.parent_id,
                            pages: state.pages,
                            module_count: state.module_count

                        };

            case ConceptActions.ADD_CONCEPT_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body,
                            parent_id: state.parent_id,
                            pages: state.pages,
                            module_count: state.module_count
                            
                        };


            case ConceptActions.DELETE_DOMAIN:
                    {
                        return {
                                loading: true,
                                error: undefined,
                                loaded: false,   
                                parent_id: state.parent_id

                            }
                    }


            case ConceptActions.DELETE_CONCEPT_SUCCESS:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body,
                            parent_id: state.parent_id
                            
                        }
            case ConceptActions.DELETE_CONCEPT_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false,
                            error: action.payload._body,
                            parent_id: state.parent_id
                            
                        }
            case ConceptActions.SELECTED_CONCEPT:
            case ConceptActions.SELECTED_CONCEPT_FAILURE:
             case ConceptActions.SELECTED_CONCEPT_SUCCESS:
            
                 return {
                        module_ids: state.module_ids,
                        modules: state.modules,
                        selectedModule: action.payload,
                        parent_id: state.parent_id,
                        loaded: true,
                        loading: false,
                        pages: state.pages,
                        module_count: state.module_count

                          }  

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

/* 
//Get SElected user from the selectedUserId
export const getSelectedConceptId = createSelector(getConcepts, selectedConceptId, (entities, selectedId) => {
  return entities[selectedId];
}); */