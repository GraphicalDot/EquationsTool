import { ActionReducer, Action, State } from '@ngrx/store';
import { DomainModel} from '../models/ontology.models';
import {createSelector} from "reselect"
import * as DomainActions from "../actions/ontology.actions"

export interface DomainState {
    module_ids?: string[],
    modules?: {[id: string]: Array<DomainModel>}
    selectedModuleId?: string| null;
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    parent_id?: null
}

const initialState: DomainState = {
    module_ids: [],
    modules: {},
    selectedModuleId: null,
    loading: false,
    loaded: false, 
    error: null,
    parent_id: null
}



export function DomainReducer(state = initialState, action: DomainActions.Actions): DomainState {

    switch(action.type){
            case DomainActions.LOAD_DOMAIN:
                {
                    return {
                        loading: true,
                    error: undefined,
                    loaded: false   
                    }
                }


            case DomainActions.LOAD_DOMAIN_SUCCESS:
                  {
                      return {
                          module_ids: action.payload.module_ids,
                          modules: action.payload.modules,
                          selectedModuleId: null,
                            loaded: true,
                          loading: false
                      }
                }             

            case DomainActions.LOAD_DOMAIN_FAILURE:
                    return {
                          module_ids: undefined,
                          modules: undefined,
                          selectedModuleId: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body


                     }
                

            case DomainActions.ADD_DOMAIN_SUCCESS:
                 return {
                            module_ids: [ ...state.module_ids, action.payload.module_id],
                            modules: Object.assign({}, state.modules, { [action.payload.module_id]: action.payload}),
                            selectedModuleId: state.selectedModuleId,
                            loaded: true,
                            loading: false
                        };

            case DomainActions.ADD_DOMAIN_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModuleId: state.selectedModuleId,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        };


            case DomainActions.DELETE_DOMAIN:
                    {
                        return {
                                loading: true,
                                error: undefined,
                                loaded: false   
                            }
                    }


            case DomainActions.DELETE_DOMAIN_SUCCESS:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModuleId: state.selectedModuleId,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        }
            case DomainActions.DELETE_DOMAIN_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModuleId: state.selectedModuleId,
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        }


            case DomainActions.SELECTED_DOMAIN:
            case DomainActions.SELECTED_DOMAIN_FAILURE:

            case DomainActions.SELECTED_DOMAIN_SUCCESS:
            
                 return {
                        module_ids: state.module_ids,
                        modules: state.modules,
                        selectedModuleId: action.payload,
                        loaded: true,
                        loading: false
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
export const getDomainIds= (state: DomainState) => state.module_ids

//This will select the dictionary of id: User
export const getDomains = (state: DomainState) => state.modules

//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const selectedDomainId = (state: DomainState) => state.selectedModuleId;

//Get SElected user from the selectedUserId
export const getSelectedDomain = createSelector(getDomains, selectedDomainId, (entities, selectedId) => {
  return entities[selectedId];
});