//import { RouterState } from '@angular/router';
import { Selecteddomain } from '../actions/ontology.actions';
import { combineReducers } from '@ngrx/store';
import { storeFreeze } from 'ngrx-store-freeze';
import {Observable} from "rxjs/Observable";
import {State, Store, } from "@ngrx/store"
import { compose } from '@ngrx/core/compose';
import 'rxjs/add/operator/let'; 
import { ActionReducer } from '@ngrx/store';
import { createSelector } from 'reselect';
import * as fromDomain from './domain.reducer';
import * as fromConcept from './concept.reducer';
import * as fromSubconcept from './subconcept.reducer';
import* as fromNanoskill from "./nanoskill.reducer"
import* as fromQuestion from "./question.reducer"
import* as fromPermission from "./permission.reducer"
import* as fromTemplate from "./template.reducer"


import * as fromUser from './users.reducer';
import * as fromAuthentication from "./authentication.reducer"
import * as fromRouter from '@ngrx/router-store';

export interface AppState {
  domains: fromDomain.DomainState,
  concepts: fromConcept.ConceptState,
  subconcepts: fromSubconcept.SubconceptState,
  nanoskills: fromNanoskill.NanoskillState,
  questions: fromQuestion.QuestionState,
  permission: fromPermission.PermissionState,
  template: fromTemplate.TemplateState,


  users: fromUser.UserState,
  router: fromRouter.RouterState,
  authentication: fromAuthentication.AuthenticateState
}




export const reducers  = {
  domains: fromDomain.DomainReducer,
  concepts: fromConcept.ConceptReducer,
  subconcepts: fromSubconcept.SubconceptReducer,
  nanoskills: fromNanoskill.NanoskillReducer,
  questions: fromQuestion.QuestionReducer,
  permission: fromPermission.PermissionReducer, 
  template: fromTemplate.TemplateReducer,

  users: fromUser.UsersReducer,
  router: fromRouter.routerReducer,
  authentication: fromAuthentication.AuthenticationReducer

};


export function logger(reducer: ActionReducer<AppState>): ActionReducer<AppState> {
  return function(state: AppState, action: any): AppState {
    console.log('state', state);
    console.log('action', action);

    return reducer(state, action);
  };
}




export const reducer: ActionReducer<AppState> = compose(storeFreeze, combineReducers)(reducers);

export const getUserAppState =   (state: AppState) => state.users;
export const getDomainAppState =  (state: AppState) => state.domains;
export const SubconceptAppState =  (state: AppState) => state.subconcepts;
export const NanoskillAppState =  (state: AppState) => state.nanoskills;
export const QuestionAppState =  (state: AppState) => state.questions;
export const PermissionAppState =  (state: AppState) => state.permission;
export const TemplateAppState =  (state: AppState) => state.template;


export const getConceptAppState =  (state: AppState) => state.concepts;
export const getAuthAppState =  (state: AppState) => state.authentication;


/**
 * Every reducer module exports selector functions, however child reducers
 * have no knowledge of the overall state tree. To make them useable, we
 * need to make new selectors that wrap them.
 *
 * The createSelector function creates very efficient selectors that are memoized and
 * only recompute when arguments change. The created selectors can also be composed
 * together to select different pieces of state.
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
 */


export const getAuthenticatedUser = createSelector(getAuthAppState, fromAuthentication.getAuthenticatedUser);
export const getAuthenticationError = createSelector(getAuthAppState, fromAuthentication.getAuthenticationError);
export const isAuthenticated = createSelector(getAuthAppState, fromAuthentication.isAuthenticated);
export const isAuthenticatedLoaded = createSelector(getAuthAppState, fromAuthentication.isAuthenticatedLoaded);
export const isAuthenticationLoading = createSelector(getAuthAppState, fromAuthentication.isLoading);

export const getDomainPermission = createSelector(PermissionAppState, fromPermission.PermissionDomain);
export const getDomainPermissionError = createSelector(PermissionAppState, fromPermission.PermissionDomainError);



export const getConceptPermission = createSelector(PermissionAppState, fromPermission.PermissionConcept);
export const getConceptPermissionError = createSelector(PermissionAppState, fromPermission.PermissionConceptError);

export const getSubconceptPermission = createSelector(PermissionAppState, fromPermission.PermissionSubconcept);
export const getSubconceptPermissionError = createSelector(PermissionAppState, fromPermission.PermissionSubconceptError);

export const getNanoskillPermission = createSelector(PermissionAppState, fromPermission.PermissionNanoskill);
export const getNanoskillPermissionError = createSelector(PermissionAppState, fromPermission.PermissionNanoskillError);

export const getQuestionPermission = createSelector(PermissionAppState, fromPermission.PermissionQuestion);
export const getQuestionPermissionError = createSelector(PermissionAppState, fromPermission.PermissionQuestionError);





export const getUsers = createSelector(getUserAppState, fromUser.Getusers)
export const getUserIds = createSelector(getUserAppState, fromUser.Getuserids)
export const getSelectdUserId = createSelector(getUserAppState, fromUser.Getselecteduser)
export const getUserPages = createSelector(getUserAppState, fromUser.Getuserpages)
export const getUserCount = createSelector(getUserAppState, fromUser.Getusercount)
export const getUserError = createSelector(getUserAppState, fromUser.Getusererror)


export const getDomains = createSelector(getDomainAppState, fromDomain.Getdomains)
export const getDomainIds = createSelector(getDomainAppState, fromDomain.Getdomainids)
export const getSelectedDomain = createSelector(getDomainAppState, fromDomain.Getselecteddomain)
export const getDomainPages = createSelector(getDomainAppState, fromDomain.Getdomainpages)
export const getDomainCount = createSelector(getDomainAppState, fromDomain.Getdomaincount)


export const getConcepts = createSelector(getConceptAppState, fromConcept.Getconcepts)
export const getConceptIds = createSelector(getConceptAppState, fromConcept.Getconceptids)
export const getSelectedConcept = createSelector(getConceptAppState, fromConcept.Getselectedconcept )
export const getConceptPages = createSelector(getConceptAppState, fromConcept.Getconceptpages)
export const getConceptCount = createSelector(getConceptAppState, fromConcept.Getconceptcount)



export const getSubConcepts = createSelector(SubconceptAppState, fromSubconcept.Getsubconcepts)
export const getSubConceptIds = createSelector(SubconceptAppState, fromSubconcept.Getsubconceptids)
export const getSelectedSubConcept = createSelector(SubconceptAppState, fromSubconcept.Getselectedsubconcept )
export const getSubconceptPages = createSelector(SubconceptAppState, fromSubconcept.Getsubconceptpages)
export const getSubconceptCount = createSelector(SubconceptAppState, fromSubconcept.Getsubconceptcount)


export const getNanoskills = createSelector(NanoskillAppState, fromNanoskill.Getnanoskills)
export const getNanoskillIds = createSelector(NanoskillAppState, fromNanoskill.Getnanoskillids)
export const getSelectedNanoskill = createSelector(NanoskillAppState, fromNanoskill.Getselectednanoskill )
export const getNanoskillPages = createSelector(NanoskillAppState, fromNanoskill.Getnanoskillpages)
export const getNanoskillCount = createSelector(NanoskillAppState, fromNanoskill.Getnanoskillcount)



export const getQuestions = createSelector(QuestionAppState, fromQuestion.Getquestions)
export const getQuestionIds = createSelector(QuestionAppState, fromQuestion.Getquestionids)
export const getSelectedQuestion = createSelector(QuestionAppState, fromQuestion.Getselectedquestion)
export const getQuestionPages = createSelector(QuestionAppState, fromQuestion.Getquestionpages)
export const getQuestionCount = createSelector(QuestionAppState, fromQuestion.Getquestioncount)
export const getQuestionError = createSelector(QuestionAppState, fromQuestion.Getquestionerror)



export const getTemplates = createSelector(TemplateAppState, fromTemplate.Gettemplates)
export const getTemplateIds = createSelector(TemplateAppState, fromTemplate.Gettemplateids)
export const getTemplatePages = createSelector(TemplateAppState, fromTemplate.Gettemplatepages)
export const getTemplateCount = createSelector(TemplateAppState, fromTemplate.Gettemplatecount)
export const getTemplateError = createSelector(TemplateAppState, fromTemplate.Gettemplateerror)


//export const reducer: ActionReducer<AppState> = combineReducers(reducers);