import {Action} from "@ngrx/store"
import {VariabletemplateModel} from "../models/variabletemplate.model"


export type Actions = 
            Selectedvariabletemplate
            |Selectedvariabletemplatesuccess
            |Selectedvariabletemplatefailure


            |Loadvariabletemplate
            |Loadvariabletemplatesuccess
            |Loadvariabletemplatefailure
            
            |Addvariabletemplate
            |Addvariabletemplatefailure
            |Addvariabletemplatesuccess
            
            |Getvariabletemplate
            |Getvariabletemplatesuccess
            |Getvariabletemplatefailure
            
            |Editvariabletemplate
            |Editvariabletemplatesuccess
            |Editvariabletemplatefailure
            
            |Deletevariabletemplate
            |Deletevariabletemplatesuccess
            |Deletevariabletemplatefailure
            
//**************** LOAD SubConcept










export const LOAD_VARIABLE_TEMPLATE = "[Variabletemplates] Load Variabletemplate"
export class Loadvariabletemplate implements Action{
    readonly type = LOAD_VARIABLE_TEMPLATE
    constructor(public payload: any){}
}

export const LOAD_VARIABLE_TEMPLATE_FAILURE = "[Variabletemplates] Load Variabletemplate Failure"
export class Loadvariabletemplatefailure implements Action{
    readonly type = LOAD_VARIABLE_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const LOAD_VARIABLE_TEMPLATE_SUCCESS = "[Variabletemplates] Load Variabletemplate Success"
export class Loadvariabletemplatesuccess implements Action{
    readonly type = LOAD_VARIABLE_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}


//**************** GET SubConcept
export const ADD_VARIABLE_TEMPLATE = "[Variabletemplates] Add Variabletemplate"
export class Addvariabletemplate implements Action{
    readonly type = ADD_VARIABLE_TEMPLATE
    constructor(public payload: any){}
}


export const ADD_VARIABLE_TEMPLATE_FAILURE = "[Variabletemplates] Add Variabletemplate Failure"
export class Addvariabletemplatefailure implements Action{
    readonly type = ADD_VARIABLE_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const ADD_VARIABLE_TEMPLATE_SUCCESS = "[Variabletemplates] Add Variabletemplate Success"
export class Addvariabletemplatesuccess implements Action{
    readonly type = ADD_VARIABLE_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}




//**************** GET SubConcept
export const GET_VARIABLE_TEMPLATE = "[Variabletemplates] Get Variabletemplate"
export class Getvariabletemplate implements Action{
    readonly type = GET_VARIABLE_TEMPLATE
    constructor(public payload: any){}
}


export const GET_VARIABLE_TEMPLATE_FAILURE = "[Variabletemplates] Get Variabletemplate Failure"
export class Getvariabletemplatefailure implements Action{
    readonly type = GET_VARIABLE_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const GET_VARIABLE_TEMPLATE_SUCCESS = "[Variabletemplates] Get Variabletemplate Success"
export class Getvariabletemplatesuccess implements Action{
    readonly type = GET_VARIABLE_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}

//**************** EDIT SubConcept
export const EDIT_VARIABLE_TEMPLATE = "[Variabletemplates] Edit Variabletemplate"
export class Editvariabletemplate implements Action{
    readonly type = EDIT_VARIABLE_TEMPLATE
    constructor(public payload: any){}
}


export const EDIT_VARIABLE_TEMPLATE_FAILURE = "[Variabletemplates] Edit Variabletemplate Failure"
export class Editvariabletemplatefailure implements Action{
    readonly type = EDIT_VARIABLE_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const EDIT_VARIABLE_TEMPLATE_SUCCESS = "[Variabletemplates] Edit Variabletemplate Success"
export class Editvariabletemplatesuccess implements Action{
    readonly type = EDIT_VARIABLE_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}

//**************** DELETE SubConcept
export const DELETE_VARIABLE_TEMPLATE = "[Variabletemplates] Delete Variabletemplate"
export class Deletevariabletemplate implements Action{
    readonly type = DELETE_VARIABLE_TEMPLATE
    constructor(public payload: any){}
}


export const DELETE_VARIABLE_TEMPLATE_FAILURE = "[Variabletemplates] Delete Variabletemplate Failure"
export class Deletevariabletemplatefailure implements Action{
    readonly type = DELETE_VARIABLE_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

export const DELETE_VARIABLE_TEMPLATE_SUCCESS = "[Variabletemplates] Delete Variabletemplate Success"
export class Deletevariabletemplatesuccess implements Action{
    readonly type = DELETE_VARIABLE_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}





export const SELECTED_VARIABLE_TEMPLATE = "[Variabletemplates] Selected Variabletemplate"
export class Selectedvariabletemplate implements Action{
    readonly type = SELECTED_VARIABLE_TEMPLATE
    constructor(public payload: VariabletemplateModel){}
}

export const SELECTED_VARIABLE_TEMPLATE_SUCCESS = "[Variabletemplates] Selected Variabletemplate Success"
export class Selectedvariabletemplatesuccess implements Action{
    readonly type = SELECTED_VARIABLE_TEMPLATE_SUCCESS
    constructor(public payload: any){}
}

export const SELECTED_VARIABLE_TEMPLATE_FAILURE = "[Variabletemplates] Selected Variabletemplate Failure"
export class Selectedvariabletemplatefailure implements Action{
    readonly type = SELECTED_VARIABLE_TEMPLATE_FAILURE
    constructor(public payload: any){}
}

