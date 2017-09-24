import { ActionReducer, Action, State } from '@ngrx/store';
import { DomainModel} from '../models/ontology.models';
import {createSelector} from "reselect"
import * as DomainActions from "../actions/ontology.actions"

export interface DomainState {
    module_ids?: Array<string>,
    modules?: Array<any>
    selectedModule?: DomainModel| null;
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    parent_id?: null
    pages?: number,
    module_count?: number
}

const initialState: DomainState = {
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



export function DomainReducer(state = initialState, action: DomainActions.Actions): DomainState {

    switch(action.type){
            case DomainActions.LOAD_DOMAIN:
                {
                    return {
                        loading: true,
                        error: undefined,
                        loaded: false,   
                        pages: undefined,
                        module_count: undefined
                    }
                }


            case DomainActions.LOAD_DOMAIN_SUCCESS:
                  {
                      return {
                          module_ids: action.payload.module_ids,
                          modules: action.payload.modules,
                          selectedModule: state.selectedModule,
                          loaded: true,
                          loading: false,
                          pages: action.payload.pages,
                          module_count: action.payload.module_count

                        }
                }             

            case DomainActions.LOAD_DOMAIN_FAILURE:
                    return {
                          module_ids: undefined,
                          modules: undefined,
                          selectedModule: null,
                          loaded: true,
                          loading: false,
                          error: action.payload._body


                     }
            
            case DomainActions.ADD_DOMAIN:
                    {
                        return {
                             loading: true,
                            error: undefined,
                            loaded: false
                        }
                    }

            case DomainActions.ADD_DOMAIN_SUCCESS:
                console.log(action.payload.module_id)
                console.log(action.payload)
/* 
                ({module} = action.payload);
                state.devices.push(action.payload.module_id)
                return Object.assign({}, state, { 
                            module_ids: someids ,
                            modules: newstate,
                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false
                        });
 */
                return Object.assign({}, state, {"modules": [...state.modules, action.payload.modules],
                                  "module_ids": [...state.module_ids, action.payload.module_id],
                                                            selectedModule: state.selectedModule,
                            loaded: true,
                            loading: false
                                
                                })

            case DomainActions.ADD_DOMAIN_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
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
                        const idToRemove = action.payload.module_id;
                        const ids = state.module_ids.filter((id) => id == action.payload.module_id)
                        const newEntities = state.module_ids;
                        delete newEntities[idToRemove];
                        return Object.assign({}, state, {
                            modules: newEntities, loaded: true, loading: false, module_ids: ids,
                            module_count: state.module_count -1,
                            pages: Math.ceil((state.module_count+1)/15), 
                        });
            case DomainActions.DELETE_DOMAIN_FAILURE:
                    return {
                            module_ids: state.module_ids,
                            modules: state.modules,
                            selectedModule: state.selectedModule,
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
                        selectedModule: action.payload,
                        loaded: true,
                        loading: false,
                        pages: state.pages,
                        module_count: state.module_count
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
export const Getdomainids= (state: DomainState) => state.module_ids

//This will select the dictionary of id: User
export const Getdomains = (state: DomainState) => state.modules

//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getselecteddomain = (state: DomainState) => state.selectedModule;
export const Getdomainpages = (state: DomainState) => state.pages;
export const Getdomaincount = (state: DomainState) => state.module_count;
export const Getdomainerror = (state: DomainState) => state.error;

export const Getdomainloading = (state: DomainState) => state.loading;

/* 
//Get SElected user from the selectedUserId
export const getSelectedDomain = createSelector(getDomains, selectedDomainId, (entities, selectedId) => {
  return entities[selectedId];
}); */