import { ActionReducer, Action, State } from '@ngrx/store';
import { ConceptModel} from '../models/ontology.models';
import * as ConceptActions from "../actions/ontology.actions"
import {createSelector} from "reselect"

export interface ConceptState {
    module_ids?: string[],
    modules?: {[id: string]: Array<ConceptModel>}
    selectedModuleId?: string| null;
    parent_id?: string| null,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string

}

const initialState: ConceptState = {
    module_ids: [],
    modules: {},
    selectedModuleId: null,
    loading: false,
    loaded: false, 
    error: null,
    parent_id: null,
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
                          selectedModuleId: null,
                            loaded: true,
                          loading: false,
                          parent_id: state.parent_id
                      }
                }              

            case ConceptActions.LOAD_CONCEPT_FAILURE:
                    return {
                          module_ids: undefined,
                          modules: undefined,
                          selectedModuleId: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body,
                          parent_id: state.parent_id


                     }
                        
            case ConceptActions.ADD_CONCEPT_SUCCESS:
                 return {
                            module_ids: [ ...state.module_ids, action.payload.module_id],
                            modules: Object.assign({}, state.modules, { [action.payload.module_id]: action.payload}),
                            selectedModuleId: state.selectedModuleId,
                            loaded: true,
                            loading: false,
                            parent_id: state.parent_id
                        };

            case ConceptActions.ADD_CONCEPT_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModuleId: state.selectedModuleId,
                            loaded: true,
                            loading: false,
                            error: action.payload._body,
                            parent_id: state.parent_id
                            
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
                            selectedModuleId: state.selectedModuleId,
                            loaded: true,
                            loading: false,
                            error: action.payload._body,
                            parent_id: state.parent_id
                            
                        }
            case ConceptActions.DELETE_CONCEPT_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModuleId: state.selectedModuleId,
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
                        selectedModuleId: action.payload,
                        parent_id: state.parent_id,
                        loaded: true,
                        loading: false,
                        
                          }  

            default:
                return state


    }
}


//This will select the list of ids of all the domains
export const getConceptIds= (state: ConceptState) => state.module_ids

//This will select the dictionary of id: User
export const getConcepts = (state: ConceptState) => state.modules

//Return list of domains in a list format
/* export const getAllConcepts = createSelector(getConcepts, getConceptIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});
 */

//select selectUserId
export const selectedConceptId = (state: ConceptState) => state.selectedModuleId;

//Get SElected user from the selectedUserId
export const getSelectedConcept = createSelector(getConcepts, selectedConceptId, (entities, selectedId) => {
  return entities[selectedId];
});