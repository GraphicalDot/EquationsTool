import { Deleteconcept, Deleteconceptsuccess } from './ontology.actions';


import {Action} from "@ngrx/store"
import {VariableModel} from "../models/variable.model"


export type Actions = 
            Selectedvariable
            |Selectedvariablesuccess
            |Selectedvariablefailure


            |Loadvariable
            |Loadvariablesuccess
            |Loadvariablefailure
            
            |Addvariable
            |Addvariablefailure
            |Addvariablesuccess
            
            |Getvariable
            |Getvariablesuccess
            |Getvariablefailure
            
            |Editvariable
            |Editvariablesuccess
            |Editvariablefailure
            
            |Deletevariable
            |Deletevariablesuccess
            |Deletevariablefailure
            
//**************** LOAD SubConcept










export const LOAD_VARIABLE = "[Variables] Load Variable"
export class Loadvariable implements Action{
    readonly type = LOAD_VARIABLE
    constructor(public payload: any){}
}

export const LOAD_VARIABLE_FAILURE = "[Variables] Load Variable Failure"
export class Loadvariablefailure implements Action{
    readonly type = LOAD_VARIABLE_FAILURE
    constructor(public payload: any){}
}

export const LOAD_VARIABLE_SUCCESS = "[Variables] Load Variable Success"
export class Loadvariablesuccess implements Action{
    readonly type = LOAD_VARIABLE_SUCCESS
    constructor(public payload: any){}
}


//**************** GET SubConcept
export const ADD_VARIABLE = "[Variables] Add Variable"
export class Addvariable implements Action{
    readonly type = ADD_VARIABLE
    constructor(public payload: any){}
}


export const ADD_VARIABLE_FAILURE = "[Variables] Add Variable Failure"
export class Addvariablefailure implements Action{
    readonly type = ADD_VARIABLE_FAILURE
    constructor(public payload: any){}
}

export const ADD_VARIABLE_SUCCESS = "[Variables] Add Variable Success"
export class Addvariablesuccess implements Action{
    readonly type = ADD_VARIABLE_SUCCESS
    constructor(public payload: any){}
}




//**************** GET SubConcept
export const GET_VARIABLE = "[Variables] Get Variable"
export class Getvariable implements Action{
    readonly type = GET_VARIABLE
    constructor(public payload: any){}
}


export const GET_VARIABLE_FAILURE = "[Variables] Get Variable Failure"
export class Getvariablefailure implements Action{
    readonly type = GET_VARIABLE_FAILURE
    constructor(public payload: any){}
}

export const GET_VARIABLE_SUCCESS = "[Variables] Get Variable Success"
export class Getvariablesuccess implements Action{
    readonly type = GET_VARIABLE_SUCCESS
    constructor(public payload: any){}
}

//**************** EDIT SubConcept
export const EDIT_VARIABLE = "[Variables] Edit Variable"
export class Editvariable implements Action{
    readonly type = EDIT_VARIABLE
    constructor(public payload: any){}
}


export const EDIT_VARIABLE_FAILURE = "[Variables] Edit Variable Failure"
export class Editvariablefailure implements Action{
    readonly type = EDIT_VARIABLE_FAILURE
    constructor(public payload: any){}
}

export const EDIT_VARIABLE_SUCCESS = "[Variables] Edit Variable Success"
export class Editvariablesuccess implements Action{
    readonly type = EDIT_VARIABLE_SUCCESS
    constructor(public payload: any){}
}

//**************** DELETE SubConcept
export const DELETE_VARIABLE = "[Variables] Delete Variable"
export class Deletevariable implements Action{
    readonly type = DELETE_VARIABLE
    constructor(public payload: any){}
}


export const DELETE_VARIABLE_FAILURE = "[Variables] Delete Variable Failure"
export class Deletevariablefailure implements Action{
    readonly type = DELETE_VARIABLE_FAILURE
    constructor(public payload: any){}
}

export const DELETE_VARIABLE_SUCCESS = "[Variables] Delete Variable Success"
export class Deletevariablesuccess implements Action{
    readonly type = DELETE_VARIABLE_SUCCESS
    constructor(public payload: any){}
}





export const SELECTED_VARIABLE = "[Variables] Selected Variable"
export class Selectedvariable implements Action{
    readonly type = SELECTED_VARIABLE
    constructor(public payload: VariableModel){}
}

export const SELECTED_VARIABLE_SUCCESS = "[Variables] Selected Variable Success"
export class Selectedvariablesuccess implements Action{
    readonly type = SELECTED_VARIABLE_SUCCESS
    constructor(public payload: any){}
}

export const SELECTED_VARIABLE_FAILURE = "[Variables] Selected Variable Failure"
export class Selectedvariablefailure implements Action{
    readonly type = SELECTED_VARIABLE_FAILURE
    constructor(public payload: any){}
}

