import { ActionReducer, Action, State } from '@ngrx/store';
import { DomainModel} from '../models/ontology.models';
import {createSelector} from "reselect"
import * as DomainActions from "../actions/ontology.actions"

export interface DomainState {
    domain_ids: string[],
    domains: {[id: string]: Array<DomainModel>}
    selectedDomainId: string| null;
}

const initialState: DomainState = {
    domain_ids: [],
    domains: {},
    selectedDomainId: null
}



export function DomainReducer(state = initialState, action: DomainActions.Actions): DomainState {

    switch(action.type){
            case DomainActions.LOAD_DOMAIN_SUCCESS:
                  {
                      return {
                          domain_ids: action.payload.domain_id,
                          domains: action.payload.domains,
                          selectedDomainId: null
                      }
                }             
                

            case DomainActions.ADD_DOMAIN_SUCCESS:
                return {
                            domain_ids: [ ...state.domain_ids, action.payload.domain_id],
                            domains: Object.assign({}, state.domains, { [action.payload.domain_id]: action.payload}),
                            selectedDomainId: state.selectedDomainId
                        };

            case DomainActions.ADD_DOMAIN_FAILURE:

            case DomainActions.DELETE_DOMAIN_SUCCESS:
                
            case DomainActions.SELECTED_DOMAIN_SUCCESS:
            
                 return {
                        domain_ids: state.domain_ids,
                        domains: state.domains,
                        selectedDomainId: action.payload,
                          }

            /*state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
            */
            case DomainActions.DELETE_DOMAIN_FAILURE:

            default:
                return state


    }
}



//This will select the list of ids of all the domains
export const getDomainIds= (state: DomainState) => state.domain_ids

//This will select the dictionary of id: User
export const getDomains = (state: DomainState) => state.domains

//Return list of domains in a list format
export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});


//select selectUserId
export const selectedDomainId = (state: DomainState) => state.selectedDomainId;

//Get SElected user from the selectedUserId
export const getSelectedDomain = createSelector(getDomains, selectedDomainId, (entities, selectedId) => {
  return entities[selectedId];
});