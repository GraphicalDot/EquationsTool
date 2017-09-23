import { Selectedvariabletemplate } from '../actions/variabletemplate.actions';
import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import {createSelector} from "reselect"
import * as actions from '../actions/variabletemplate.actions';
import {VariabletemplateModel} from "../models/variabletemplate.model"

//Selected variable template will in the template reducer
export interface VariabletemplateState {
    variabletemplate_ids: Array<string>,
    variabletemplates: VariabletemplateModel[],
    selected_variabletemplate: VariabletemplateModel,
    loading: boolean| null,
    loaded: boolean| null,
    error?: string,
    pages?: number,
    variabletemplate_count?: number
}
// In the beginng when the app starts, All variables with their catgeories and their empty data will be update to selected_variabletemplate
// So when a user opens the add button, This data will be rendered i.e empty images for every category. 
//Lets say user is trying to create a variabletemplate, its goingto huge and we cannot submit the shole data in one go.
//So every time a user uploads an image or set of images under one category of a variable, a api call will be made 
// and the reponse will be the url of the image on s3 with metadata of variable name and category id and name.
//Same happend swhen aa user deltes an image or set of images, An api call will be made to delete the image.

// Now when a user updates an image to a particular category, An action called as ADD_CATEGORY_IMAGE will be called with payload as
//Image or images data, the reponse will be the url return from the server.
//Now a reducer will act on this action, and in selected_variabletemplate upates this image data under the specified category.

// The component will listen to this event and subscribe to this change, Now the data that will be shown into the html, 
// Will be rendered from the url 

const initialState: VariabletemplateState = {
    variabletemplate_ids: [],
    variabletemplates: [],
    selected_variabletemplate: null,
    loading: false,
    loaded: false, 
    error: null,
    pages: null,
    variabletemplate_count: null
}



export function VariabletemplateReducer(state = initialState, action: actions.Actions): VariabletemplateState {

    switch(action.type){
            case actions.SELECTED_VARIABLE_TEMPLATE:
                {
                    
                    return Object.assign({}, state,{ 
                    loading: true,
                    error: undefined,
                    loaded: false   
                    })
                }

            case actions.SELECTED_VARIABLE_TEMPLATE_SUCCESS:
                {
                    
                    return Object.assign({}, state,{
                    selected_variabletemplate: {"variabletemplate_name": action.payload.variabletemplate_name, 
                                             "variabletemplate_id": action.payload.variabletemplate_id, 
                                             "variabletemplate_description": action.payload.description,
                                             "variables": action.payload.variables 
                                            }, 
                    loading: false,
                    error: undefined,
                    loaded: true 
                    })
                }

            case actions.SELECTED_VARIABLE_TEMPLATE_FAILURE:
                {
                    
                    return Object.assign({}, state,{ 
                    loading:false,
                    error: undefined,
                    loaded: true   
                    })
                }
            
            case actions.ADD_VARIABLE_CATEGORY_IMAGES:
                {
                    
                    return Object.assign({}, state,{ 
                    loading: true,
                    error: undefined,
                    loaded: false   
                    })
                }

            case actions.ADD_VARIABLE_CATEGORY_IMAGES_FAILURE:
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
            case actions.ADD_VARIABLE_CATEGORY_IMAGES_SUCCESS:
                    const variableId = action.payload.variable_id;
                    const categoryId = action.payload.category_id
                    const variable = state.selected_variabletemplate.variables.find((variable) => variable.variable_id === variableId)
                    const variableIndex  = state.selected_variabletemplate.variables.findIndex((variable => variable.variable_id == variableId));

                    const category = variable.categories.find((category) => category.category_id == categoryId)
                    const categoryIndex  = variable.categories.findIndex((category => category.category_id == categoryId));

                    const categoryImages = category.images

                    console.log("variable_id" + variableId)
                    console.log("category_id" + categoryId)
                    console.log("variable" + variable)
                    console.log("variableIndex" + variableIndex)
                    console.log("category" + category)
                    console.log("categoryIndex" + categoryIndex)
                    console.log("categoryImages" + categoryImages)

                    categoryImages.push({"url": action.payload.url, "image_name": action.payload.image_name})


                    console.log("UpdatedImages" +  categoryImages)
                    const updatedCategory = Object.assign({}, category, {
                                            images: categoryImages

                    }) 

                    variable.categories[categoryIndex] = updatedCategory
                    
                    const variables = state.selected_variabletemplate.variables
                    variables[variableIndex] = variable
                    
                    return Object.assign({}, state, {
                            selected_variabletemplate: Object.assign({}, state.selected_variabletemplate, 
                            {"variables": variables 
                            }),
                            loaded: true,
                            loading: false,
                        })
                                

            case actions.DELETE_VARIABLE_CATEGORY_IMAGES:
                {
                    return Object.assign({}, state,{ 
                    loading: true,
                    error: undefined,
                    loaded: false   
                    })
                }
            case actions.DELETE_VARIABLE_CATEGORY_IMAGES_FAILURE:
                 return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
            case actions.DELETE_VARIABLE_CATEGORY_IMAGES_SUCCESS:



            case actions.LOAD_VARIABLE_TEMPLATE:
                {
                    return Object.assign({}, state,{ 
                    loading: true,
                    error: undefined,
                    loaded: false   
                    })
                }
            case actions.LOAD_VARIABLE_TEMPLATE_SUCCESS:
                  {
                      return Object.assign({}, state, {
                        variabletemplate_ids: action.payload.variabletemplate_ids,
                        variabletemplates: action.payload.variabletemplates,
                        loaded: true,
                        loading: false,
                        pages: action.payload.pages,
                        variabletemplate_count: action.payload.variabletemplate_count
                      })
                }             
            case actions.LOAD_VARIABLE_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                          variabletemplate_ids: undefined,
                          variabletemplates: undefined,
                          loaded: true,
                          loading: false,
                          error: action.payload._body
                     })
                }
            
            case actions.ADD_VARIABLE_TEMPLATE:
                    {
                        return Object.assign({}, state, {
                             loading: true,
                            error: undefined,
                            loaded: false
                        })
                    }
            case actions.ADD_VARIABLE_TEMPLATE_SUCCESS:
                 return Object.assign({}, state, {"variabletemplates": [...state.variabletemplates, action.payload.template],
                                  "variabletemplate_ids": [...state.variabletemplate_ids, action.payload.template_id],
                            loaded: true,
                            loading: false
                                
                                })
            case actions.ADD_VARIABLE_TEMPLATE_FAILURE:
                 return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })



            case actions.DELETE_VARIABLE_TEMPLATE:
                        console.log(action.payload)
                        const idToRemove = action.payload;
                        const new_variables = state.variabletemplates.filter((variable) => variable.variabletemplate_id !== idToRemove)
                        const new_variable_ids = state.variabletemplate_ids;
                        delete new_variable_ids[idToRemove];
                        return Object.assign({}, state, {
                            variables: new_variables, 
                            loaded: true, 
                            loading: false, 
                            variable_ids: new_variable_ids, 
                            variable_count: state.variabletemplate_count -1});

            case actions.DELETE_VARIABLE_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.DELETE_VARIABLE_TEMPLATE:{

                        return Object.assign({}, state,{ 
                            loaded: false,
                            loading: true,
                        }
                    )
                    }

            case actions.GET_VARIABLE_TEMPLATE_SUCCESS:
                        return Object.assign({}, state, {
                            loaded: true, 
                            loading: false, 
                            selected_variabletemplate: action.payload
                        });

            case actions.GET_VARIABLE_TEMPLATE_FAILURE:
                {
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                }
            case actions.GET_VARIABLE_TEMPLATE:{

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
export const Getvariabletemplateids= (state: VariabletemplateState) => state.variabletemplate_ids

//This will select the dictionary of id: User
export const Getvariabletemplates = (state: VariabletemplateState) => state.variabletemplates
export const Getvariabletemplateerror = (state: VariabletemplateState) => state.error

//Return list of domains in a list format
//export const getAllDomains = createSelector(getDomains, getDomainIds, (entities, ids) => {
 // return ids.map(id => entities[id]);
//});


//select selectUserId
export const Getvariabletemplatepages = (state: VariabletemplateState) => state.pages;
export const Getvariabletemplatecount = (state: VariabletemplateState) => state.variabletemplate_count;
export const Getvariabletemplateloading = (state: VariabletemplateState) => state.loading;
export const Getselectedvariabletemplate = (state: VariabletemplateState) => state.selected_variabletemplate;

/* 
//Get SElected user from the selectedUserId
export const Getselectedsubconcept = createSelector(Getsubconcepts, Getselectedsubconceptid, (entities, selectedId) => {
  return entities[selectedId];
}); */