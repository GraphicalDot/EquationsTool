import { Selectedvariabletemplate } from '../actions/variabletemplate.actions';
import { ConceptState } from './concept.reducer';
import { ActionReducer, Action, State } from '@ngrx/store';
import {createSelector} from "reselect"
import * as actions from '../actions/variabletemplate.actions';
import {VariabletemplateModel} from "../models/variabletemplate.model"
import * as _ from "lodash";
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
                    selected_variabletemplate: action.payload,
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
                    loaded: false,   
                    })
                }

            case actions.ADD_VARIABLE_CATEGORY_IMAGES_FAILURE:
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })

            case actions.ADD_VARIABLE_CATEGORY_TEXT:
                return Object.assign({}, state, {
                            loaded: false,
                            loading: true,
                            error: undefined
                        })


            case actions.ADD_VARIABLE_CATEGORY_TEXT_FAILURE:
                return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })
                        

            case actions.ADD_VARIABLE_CATEGORY_TEXT_SUCCESS:
                    const t_variableId = action.payload.variable_id;
                    const t_categoryId = action.payload.category_id
                    let t_stateclone = _.cloneDeep(state);

                    
                    const t_variable = t_stateclone.selected_variabletemplate.variables.find((variable) => variable.variable_id === t_variableId)
                    const t_variableIndex  = t_stateclone.selected_variabletemplate.variables.findIndex((variable => variable.variable_id == t_variableId));

                    const t_category = t_variable.categories.find((category) => category.category_id == t_categoryId)
                    const t_categoryIndex  = t_variable.categories.findIndex((category => category.category_id == t_categoryId));

                    const t_updatedCategory = Object.assign({}, t_category, {
                                            text: action.payload.text

                    }) 

                    t_variable.categories[t_categoryIndex] = t_updatedCategory
                    
                    const t_variables = t_stateclone.selected_variabletemplate.variables
                    t_variables[t_variableIndex] = t_variable
                    
                    return Object.assign({}, state, {
                            selected_variabletemplate: Object.assign({}, state.selected_variabletemplate, 
                            {"variables": t_variables 
                            }),
                            loaded: true,
                            loading: false,
                            error: undefined
                        })
            


            case actions.ADD_VARIABLE_CATEGORY_IMAGES_SUCCESS:
                    const variableId = action.payload.variable_id;
                    const categoryId = action.payload.category_id
                    let stateclone = _.cloneDeep(state);

                    
                    const variable = stateclone.selected_variabletemplate.variables.find((variable) => variable.variable_id === variableId)
                    const variableIndex  = stateclone.selected_variabletemplate.variables.findIndex((variable => variable.variable_id == variableId));

                    const category = variable.categories.find((category) => category.category_id == categoryId)
                    const categoryIndex  = variable.categories.findIndex((category => category.category_id == categoryId));

                    const categoryImages = category.images


                    categoryImages.push({"url": action.payload.url, "image_name": action.payload.image_name, "key": action.payload.key})

                    
                    const updatedCategory = Object.assign({}, category, {
                                            images: categoryImages

                    }) 

                    variable.categories[categoryIndex] = updatedCategory
                    
                    const variables = stateclone.selected_variabletemplate.variables
                    variables[variableIndex] = variable
                    
                    return Object.assign({}, state, {
                            selected_variabletemplate: Object.assign({}, state.selected_variabletemplate, 
                            {"variables": variables 
                            }),
                            loaded: true,
                            loading: false,
                            error: undefined
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
                    const d_variableId = action.payload.variable_id;
                    const d_categoryId = action.payload.category_id
                    let d_stateclone = _.cloneDeep(state);

                    
                    const d_variable = d_stateclone.selected_variabletemplate.variables.find((variable) => variable.variable_id === d_variableId)
                    const d_variableIndex  = d_stateclone.selected_variabletemplate.variables.findIndex((variable => variable.variable_id == d_variableId));

                    const d_category = d_variable.categories.find((category) => category.category_id == d_categoryId)
                    const d_categoryIndex  = d_variable.categories.findIndex((category => category.category_id == d_categoryId));

                    const d_categoryImages = d_category.images.filter((images)=> images.key != action.payload.key)


                    const d_updatedCategory = Object.assign({}, d_category, {
                                            images: d_categoryImages

                    }) 

                    d_variable.categories[d_categoryIndex] = d_updatedCategory
                    
                    const d_variables = d_stateclone.selected_variabletemplate.variables
                    d_variables[d_variableIndex] = d_variable
                    
                    return Object.assign({}, state, {
                            selected_variabletemplate: Object.assign({}, state.selected_variabletemplate, 
                            {"variables": d_variables 
                            }),
                            loaded: true,
                            loading: false,
                        })




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
                 return Object.assign({}, state, {"variabletemplates": [...state.variabletemplates, action.payload.variabletemplate],
                                  "variabletemplate_ids": [...state.variabletemplate_ids, action.payload.variabletemplate_id],
                            loaded: true,
                            loading: false, 
                            error: undefined,
                            variabletemplate_count : state.variabletemplate_count +1

                                
                                })
            case actions.ADD_VARIABLE_TEMPLATE_FAILURE:
                 return Object.assign({}, state, {
                            loaded: true,
                            loading: false,
                            error: action.payload._body
                        })



            case actions.DELETE_VARIABLE_TEMPLATE_SUCCESS:
                        console.log(action.payload)
                        const idToRemove = action.payload;
                        const new_variables = state.variabletemplates.filter((variable) => variable.variabletemplate_id !== idToRemove)
                        const new_variable_ids = state.variabletemplate_ids;
                        delete new_variable_ids[idToRemove];
                        return Object.assign({}, state, {
                            variabletemplates: new_variables, 
                            loaded: true, 
                            loading: false, 
                            variabletemplate_ids: new_variable_ids, 
                            variabletemplate_count: state.variabletemplate_count -1});

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