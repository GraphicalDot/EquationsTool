import { Selecteddomain } from '../actions/ontology.actions';
import { compose } from '@ngrx/store';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import {Observable} from "rxjs/Observable";
import {State, Store, } from "@ngrx/store"
import 'rxjs/add/operator/let'; 

import {
  ActionReducerMap,
  createSelector,
  createFeatureSelector,
  ActionReducer,
} from '@ngrx/store';

import * as fromDomain from './domain.reducer';
import * as fromConcept from './concept.reducer';
import * as fromUser from './users.reducer';


export interface AppState {
  domains: fromDomain.DomainState;
  concepts: fromConcept.ConceptState;
  users: fromUser.UserState;
}




export const reducer: ActionReducerMap<AppState>  = {
  domains: fromDomain.DomainReducer,
  concepts: fromConcept.ConceptReducer,
  users: fromUser.UsersReducer,
};


export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}





export const getUserAppState =  createFeatureSelector<AppState>('users'); 
export const getDomainAppState = createFeatureSelector<AppState>('domains'); 
export const getConceptAppState = createFeatureSelector<AppState>('concepts'); 


/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
 */
export const getUserState = createSelector(
  getUserAppState,
  (state: AppState) => state.users
);

export const getDomainState = createSelector(
  getDomainAppState,
  (state: AppState) => state.domains
);

export const getConceptState = createSelector(
  getConceptAppState,
  (state: AppState) => state.concepts
);



export const getUsers = createSelector(getUserState, fromUser.getAllUsers)
export const getUserIds = createSelector(getUserState, fromUser.getUsersId)
export const getSelectdUserId = createSelector(getUserState, fromUser.selectedUserId)
export const getSelectedUser = createSelector(getUserState, fromUser.getSelectedUser)


export const getDomains = createSelector(getDomainState, fromDomain.getAllDomains)
export const getDomainIds = createSelector(getDomainState, fromDomain.getDomainIds)
export const getSelectdDomainId = createSelector(getDomainState, fromDomain.selectedDomainId)
export const getSelectedDomain = createSelector(getDomainState, fromDomain.getSelectedDomain)


export const getConcepts = createSelector(getConceptState, fromConcept.getAllConcepts)
export const getConceptIds = createSelector(getConceptState, fromConcept.getConceptIds)
export const getSelectdConceptId = createSelector(getConceptState, fromConcept.selectedConceptId)
export const getSelectedConcept = createSelector(getConceptState, fromConcept.getSelectedConcept )



//export const reducer: ActionReducer<AppState> = combineReducers(reducers);
