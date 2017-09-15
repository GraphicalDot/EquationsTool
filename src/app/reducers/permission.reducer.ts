import { ActionReducer, Action, State } from '@ngrx/store';
//import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import * as PermissionActions from '../actions/permissions.actions';
import { createSelector } from 'reselect';

export interface PermissionState {
    domain: Object,
    concept: Object,
    subconcept: Object,
    nanoskill: Object,
    question: Object,
    domainerror: string | null
    concepterror: string | null
    subconcepterror: string | null
    nanoskillerror: string | null
    questionerror: string | null
}

const initialState: PermissionState = {
    domain: null,
    concept: null,
    subconcept: null,
    nanoskill: null,
    question: null,
    domainerror: null,
    concepterror:  null,
    subconcepterror: null,
    nanoskillerror: null,
    questionerror: null
}



export function PermissionReducer(state = initialState, action: PermissionActions.Actions): PermissionState {

    switch(action.type){
            case PermissionActions.LOAD_PERMISSION_DOMAIN:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    })
                   }            
            case PermissionActions.LOAD_PERMISSION_DOMAIN_SUCCESS:
                      {
                        return Object.assign({}, state, {
                            domain: action.payload,
                          loaded: true,
                          loading: false,
                          })
                      }

            case PermissionActions.LOAD_PERMISSION_DOMAIN_FAILURE:
                     {
                         return Object.assign({}, state, {
                          domain: undefined,
                          loading: false,
                          error: action.payload._body
                     })
                     }

            case PermissionActions.EDIT_PERMISSION_DOMAIN:
                    {
                        return Object.assign({}, state, {
                          loading: true,
                          domainerror: undefined
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_DOMAIN_FAILURE:
                    {
                        return Object.assign({}, state, {
                          domain: undefined,
                          loading: false,
                          domainerror: action.payload._body
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_DOMAIN_SUCCESS:
                    {
                        return Object.assign({}, state, {
                          loading: false,
                          domainerror: action.payload._body,

                     })
                     }


            case PermissionActions.LOAD_PERMISSION_CONCEPT:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    })
                   }            
            case PermissionActions.LOAD_PERMISSION_CONCEPT_SUCCESS:
                      {
                        return Object.assign({}, state, {
                            concept : action.payload,
                          loaded: true,
                          loading: false,
                          })
                      }

            case PermissionActions.LOAD_PERMISSION_CONCEPT_FAILURE:
                     {
                         return Object.assign({}, state, {
                          concept: undefined,
                          loading: false,
                          error: action.payload._body
                     })
                     }

            case PermissionActions.EDIT_PERMISSION_CONCEPT:
                    {
                        return Object.assign({}, state, {
                          loading: true,
                          domainerror: undefined
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_CONCEPT_FAILURE:
                    {
                        return Object.assign({}, state, {
                          concept: undefined,
                          loading: false,
                          domainerror: action.payload._body
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_CONCEPT_SUCCESS:
                    {
                        return Object.assign({}, state, {
                          loading: false,
                          concepterror: action.payload._body,

                     })
                     }





            case PermissionActions.LOAD_PERMISSION_SUBCONCEPT:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    })
                   }            
            case PermissionActions.LOAD_PERMISSION_SUBCONCEPT_SUCCESS:
                      {
                        return Object.assign({}, state, {
                            subconcept : action.payload,
                          loaded: true,
                          loading: false,
                          })
                      }

            case PermissionActions.LOAD_PERMISSION_SUBCONCEPT_FAILURE:
                     {
                         return Object.assign({}, state, {
                          subconcept: undefined,
                          loading: false,
                          error: action.payload._body
                     })
                     }

            case PermissionActions.EDIT_PERMISSION_SUBCONCEPT:
                    {
                        return Object.assign({}, state, {
                          loading: true,
                          subconcepterror: undefined
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_SUBCONCEPT_FAILURE:
                    {
                        return Object.assign({}, state, {
                          subconcept: undefined,
                          loading: false,
                          subconcepterror: action.payload._body
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_SUBCONCEPT_SUCCESS:
                    {
                        return Object.assign({}, state, {
                          loading: false,
                          subconcepterror: action.payload._body,

                     })
                     }





            case PermissionActions.LOAD_PERMISSION_NANOSKILL:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    })
                   }            
            case PermissionActions.LOAD_PERMISSION_NANOSKILL_SUCCESS:
                      {
                        return Object.assign({}, state, {
                            nanoskill : action.payload,
                          loaded: true,
                          loading: false,
                          })
                      }

            case PermissionActions.LOAD_PERMISSION_NANOSKILL_FAILURE:
                     {
                         return Object.assign({}, state, {
                          nanoskill: undefined,
                          loading: false,
                          error: action.payload._body
                     })
                     }

            case PermissionActions.EDIT_PERMISSION_NANOSKILL:
                    {
                        return Object.assign({}, state, {
                          loading: true,
                          nanoskillerror: undefined
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_NANOSKILL_FAILURE:
                    {
                        return Object.assign({}, state, {
                          nanoskill: undefined,
                          loading: false,
                          nanoskillerror: action.payload._body
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_NANOSKILL_SUCCESS:
                    {
                        return Object.assign({}, state, {
                          loading: false,
                          nanoskillerror: action.payload._body,

                     })
                     }


            case PermissionActions.LOAD_PERMISSION_QUESTION:
                   { 
                       return Object.assign({}, state, {
                        loading: true,
                        error: undefined,
                        loaded: false    
                    })
                   }            
            case PermissionActions.LOAD_PERMISSION_QUESTION_SUCCESS:
                      {
                        return Object.assign({}, state, {
                            question : action.payload,
                          loaded: true,
                          loading: false,
                          })
                      }

            case PermissionActions.LOAD_PERMISSION_QUESTION_FAILURE:
                     {
                         return Object.assign({}, state, {
                          question: undefined,
                          loading: false,
                          error: action.payload._body
                     })
                     }

            case PermissionActions.EDIT_PERMISSION_QUESTION:
                    {
                        return Object.assign({}, state, {
                          loading: true,
                          questionerror: undefined
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_QUESTION_FAILURE:
                    {
                        return Object.assign({}, state, {
                          nanoskill: undefined,
                          loading: false,
                          questionerror: action.payload._body
                     })
                    }
            case PermissionActions.EDIT_PERMISSION_QUESTION_SUCCESS:
                    {
                        return Object.assign({}, state, {
                          loading: false,
                          questionerror: action.payload._body,

                     })
                     }

            default:
                return state


    }
}



//This will select the list of ids of all the users
//This will select the dictionary of id: Permission
export const PermissionDomain = (state: PermissionState) => state.domain
export const PermissionDomainError = (state: PermissionState) => state.domainerror

export const PermissionConcept = (state: PermissionState) => state.concept
export const PermissionConceptError = (state: PermissionState) => state.concepterror

export const PermissionSubconcept = (state: PermissionState) => state.subconcept
export const PermissionSubconceptError = (state: PermissionState) => state.subconcepterror

export const PermissionNanoskill = (state: PermissionState) => state.nanoskill
export const PermissionNanoskillError = (state: PermissionState) => state.nanoskillerror

export const PermissionQuestion = (state: PermissionState) => state.domain
export const PermissionQuestionError = (state: PermissionState) => state.questionerror




//Return list of users
/* export const getAllPermissions = createSelector(getPermissions, getPermissionsId, (entities, ids) => {
  return ids.map(id => entities[id]);
  
}); */


//select selectPermissionId

