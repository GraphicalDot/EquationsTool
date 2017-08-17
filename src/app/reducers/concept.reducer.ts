import { ActionReducer, Action, State } from '@ngrx/store';
import { ConceptModel} from '../models/ontology.models';
import * as ConceptActions from "../actions/ontology.actions"
import {createSelector} from "reselect"

export interface ConceptState {
    concept_ids: string[],
    concepts: {[id: string]: Array<ConceptModel>}
    selectedConceptId: string| null;
}

const initialState: ConceptState = {
    concept_ids: [],
    concepts: {},
    selectedConceptId: null
}


export function ConceptReducer(state = initialState,  action: ConceptActions.Actions): ConceptState {

    switch(action.type){
            case ConceptActions.LOAD_CONCEPT_SUCCESS:
                   {
                      return {
                          concept_ids: action.payload.concept_ids,
                          concepts: action.payload.concepts,
                          selectedConceptId: null
                      }
                }        
            case ConceptActions.ADD_CONCEPT_SUCCESS:
                 return {
                            concept_ids: [ ...state.concept_ids, action.payload.concept_id],
                            concepts: Object.assign({}, state.concepts, { [action.payload.concept_id]: action.payload}),
                            selectedConceptId: state.selectedConceptId
                        };

            case ConceptActions.DELETE_CONCEPT_SUCCESS:
                /*
                state.splice(state.indexOf(action.payload), 1);
                // We need to create another reference
                return Array.prototype.concat(state);
                */

            case ConceptActions.EDIT_CONCEPT_SUCCESS:
                /* 
                return state.map(item => {
                        return item.concept_id === action.payload.concept_id ? Object.assign({}, item, action.payload) : item;
                  });
                */
             case ConceptActions.SELECTED_CONCEPT_SUCCESS:
            
                 return {
                        concept_ids: state.concept_ids,
                        concepts: state.concepts,
                        selectedConceptId: action.payload,
                          }  

            default:
                return state


    }
}


//This will select the list of ids of all the domains
export const getConceptIds= (state: ConceptState) => state.concept_ids

//This will select the dictionary of id: User
export const getConcepts = (state: ConceptState) => state.concepts

//Return list of domains in a list format
export const getAllConcepts = createSelector(getConcepts, getConceptIds, (entities, ids) => {
  return ids.map(id => entities[id]);
});


//select selectUserId
export const selectedConceptId = (state: ConceptState) => state.selectedConceptId;

//Get SElected user from the selectedUserId
export const getSelectedConcept = createSelector(getConcepts, selectedConceptId, (entities, selectedId) => {
  return entities[selectedId];
});