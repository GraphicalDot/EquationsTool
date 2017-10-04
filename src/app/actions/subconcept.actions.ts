import { Deleteconcept, Deleteconceptsuccess } from './ontology.actions';


import {Action} from "@ngrx/store"
import {SubconceptModel} from "../models/subconcept.model"


export type Actions = 
            Selectedsubconcept
            |Selectedsubconceptsuccess
            |Selectedsubconceptfailure

            |Setsubconceptparent
            |Setsubconceptparentfailure
            |Setsubconceptparentsuccess

            |Loadsubconcept
            |Loadsubconceptsuccess
            |Loadsubconceptfailure
            
            |Addsubconcept
            |Addsubconceptfailure
            |Addsubconceptsuccess
            
            |Getsubconcept
            |Getsubconceptsuccess
            |Getsubconceptfailure
            
            |Editsubconcept
            |Editsubconceptsuccess
            |Editsubconceptfailure
            
            |Deletesubconcept
            |Deletesubconceptsuccess
            |Deletesubconceptfailure

            | Allsubconcept
            | Allsubconceptsuccess
            |Allsubconceptfailure

export const ALL_SUBCONCEPT = "[Subconcepts] All Subconcept"
export class Allsubconcept implements Action{
    readonly type = ALL_SUBCONCEPT
    constructor(public payload: any){ console.log("All subconcepts called")}
}

export const ALL_SUBCONCEPT_SUCCESS = "[Subconcepts] All Subconcept Success"
export class Allsubconceptsuccess implements Action{
    readonly type = ALL_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}

export const ALL_SUBCONCEPT_FAILURE = "[Subconcepts] All Subconcept Failure"
export class Allsubconceptfailure implements Action{
    readonly type = ALL_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}




//**************** LOAD SubConcept
export const LOAD_SUBCONCEPT = "[Subconcepts] Load Subconcept"
export class Loadsubconcept implements Action{
    readonly type = LOAD_SUBCONCEPT
    constructor(public payload: any){}
}

export const LOAD_SUBCONCEPT_FAILURE = "[Subconcepts] Load Subconcept Failure"
export class Loadsubconceptfailure implements Action{
    readonly type = LOAD_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}

export const LOAD_SUBCONCEPT_SUCCESS = "[Subconcepts] Load Subconcept Success"
export class Loadsubconceptsuccess implements Action{
    readonly type = LOAD_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}


//**************** GET SubConcept
export const ADD_SUBCONCEPT = "[Subconcepts] Add Subconcept"
export class Addsubconcept implements Action{
    readonly type = ADD_SUBCONCEPT
    constructor(public payload: any){}
}


export const ADD_SUBCONCEPT_FAILURE = "[Subconcepts] Add Subconcept Failure"
export class Addsubconceptfailure implements Action{
    readonly type = ADD_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}

export const ADD_SUBCONCEPT_SUCCESS = "[Subconcepts] Add Subconcept Success"
export class Addsubconceptsuccess implements Action{
    readonly type = ADD_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}




//**************** GET SubConcept
export const GET_SUBCONCEPT = "[Subconcepts] Get Subconcept"
export class Getsubconcept implements Action{
    readonly type = GET_SUBCONCEPT
    constructor(public payload: any){}
}


export const GET_SUBCONCEPT_FAILURE = "[Subconcepts] Get Subconcept Failure"
export class Getsubconceptfailure implements Action{
    readonly type = GET_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}

export const GET_SUBCONCEPT_SUCCESS = "[Subconcepts] Get Subconcept Success"
export class Getsubconceptsuccess implements Action{
    readonly type = GET_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}

//**************** EDIT SubConcept
export const EDIT_SUBCONCEPT = "[Subconcepts] Edit Subconcept"
export class Editsubconcept implements Action{
    readonly type = EDIT_SUBCONCEPT
    constructor(public payload: any){}
}


export const EDIT_SUBCONCEPT_FAILURE = "[Subconcepts] Edit Subconcept Failure"
export class Editsubconceptfailure implements Action{
    readonly type = EDIT_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}

export const EDIT_SUBCONCEPT_SUCCESS = "[Subconcepts] Edit Subconcept Success"
export class Editsubconceptsuccess implements Action{
    readonly type = EDIT_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}

//**************** DELETE SubConcept
export const DELETE_SUBCONCEPT = "[Subconcepts] Delete Subconcept"
export class Deletesubconcept implements Action{
    readonly type = DELETE_SUBCONCEPT
    constructor(public payload: any){}
}


export const DELETE_SUBCONCEPT_FAILURE = "[Subconcepts] Delete Subconcept Failure"
export class Deletesubconceptfailure implements Action{
    readonly type = DELETE_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}

export const DELETE_SUBCONCEPT_SUCCESS = "[Subconcepts] Delete Subconcept Success"
export class Deletesubconceptsuccess implements Action{
    readonly type = DELETE_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}





export const SELECTED_SUBCONCEPT = "[Subconcepts] Selected Subconcept"
export class Selectedsubconcept implements Action{
    readonly type = SELECTED_SUBCONCEPT
    constructor(public payload: SubconceptModel){}
}

export const SELECTED_SUBCONCEPT_SUCCESS = "[Subconcepts] Selected Subconcept Success"
export class Selectedsubconceptsuccess implements Action{
    readonly type = SELECTED_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}

export const SELECTED_SUBCONCEPT_FAILURE = "[Subconcepts] Selected Subconcept Failure"
export class Selectedsubconceptfailure implements Action{
    readonly type = SELECTED_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}


export const SET_SUBCONCEPT_PARENT= "[Subconcepts] Set Subconcept Parent"
export class Setsubconceptparent implements Action{
    readonly type = SET_SUBCONCEPT_PARENT
    constructor(){}
}



export const SET_SUBCONCEPT_PARENT_FAILURE= "[Subconcepts] Set Subconcept Parent Failure"
export class Setsubconceptparentfailure implements Action{
    readonly type = SET_SUBCONCEPT_PARENT_FAILURE
    constructor(public payload: any){}
}



export const SET_SUBCONCEPT_PARENT_SUCCESS= "[Subconcepts] Set Subconcept Parent Success"
export class Setsubconceptparentsuccess implements Action{
    readonly type = SET_SUBCONCEPT_PARENT_SUCCESS
    constructor(public payload: any){}
}