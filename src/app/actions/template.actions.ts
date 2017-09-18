import { Deleteconcept, Deleteconceptsuccess } from './ontology.actions';


import {Action} from "@ngrx/store"


export type Actions = 

            |Loadtemplate
            |Loadtemplatesuccess
            |Loadtemplatefailure
            
            |Addtemplate
            |Addtemplatefailure
            |Addtemplatesuccess
            
            |Gettemplate
            |Gettemplatesuccess
            |Gettemplatefailure
            
            |Edittemplate
            |Edittemplatesuccess
            |Edittemplatefailure
            
            |Deletetemplate
            |Deletetemplatesuccess
            |Deletetemplatefailure
 
            | Templateerror
//**************** LOAD SubConcept


export const TEMPLATE_ERROR = "[Templates] Template Error"
export class Templateerror implements Action{
    readonly type = TEMPLATE_ERROR
    constructor(public payload: any= null){}
}





export const LOAD_TEMPLATE = "[Templates] Load Template"
export class Loadtemplate implements Action{
    readonly type = LOAD_TEMPLATE
    constructor(public payload: any){}
}

export const LOAD_TEMPLATE_FAILURE = "[Templates] Load Template Failure"
export class Loadtemplatefailure implements Action{
    readonly type = LOAD_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const LOAD_TEMPLATE_SUCCESS = "[Templates] Load Template Success"
export class Loadtemplatesuccess implements Action{
    readonly type = LOAD_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}


//**************** GET SubConcept
export const ADD_TEMPLATE = "[Templates] Add Template"
export class Addtemplate implements Action{
    readonly type = ADD_TEMPLATE
    constructor(public payload: any){}
}


export const ADD_TEMPLATE_FAILURE = "[Templates] Add Template Failure"
export class Addtemplatefailure implements Action{
    readonly type = ADD_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const ADD_TEMPLATE_SUCCESS = "[Templates] Add Template Success"
export class Addtemplatesuccess implements Action{
    readonly type = ADD_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}




//**************** GET SubConcept
export const GET_TEMPLATE = "[Templates] Get Template"
export class Gettemplate implements Action{
    readonly type = GET_TEMPLATE
    constructor(public payload: any){}
}


export const GET_TEMPLATE_FAILURE = "[Templates] Get Template Failure"
export class Gettemplatefailure implements Action{
    readonly type = GET_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const GET_TEMPLATE_SUCCESS = "[Templates] Get Template Success"
export class Gettemplatesuccess implements Action{
    readonly type = GET_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}

//**************** EDIT SubConcept
export const EDIT_TEMPLATE = "[Templates] Edit Template"
export class Edittemplate implements Action{
    readonly type = EDIT_TEMPLATE
    constructor(public payload: any){}
}


export const EDIT_TEMPLATE_FAILURE = "[Templates] Edit Template Failure"
export class Edittemplatefailure implements Action{
    readonly type = EDIT_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const EDIT_TEMPLATE_SUCCESS = "[Templates] Edit Template Success"
export class Edittemplatesuccess implements Action{
    readonly type = EDIT_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}

//**************** DELETE SubConcept
export const DELETE_TEMPLATE = "[Templates] Delete Template"
export class Deletetemplate implements Action{
    readonly type = DELETE_TEMPLATE
    constructor(public payload: any){}
}


export const DELETE_TEMPLATE_FAILURE = "[Templates] Delete Template Failure"
export class Deletetemplatefailure implements Action{
    readonly type = DELETE_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const DELETE_TEMPLATE_SUCCESS = "[Templates] Delete Template Success"
export class Deletetemplatesuccess implements Action{
    readonly type = DELETE_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}





