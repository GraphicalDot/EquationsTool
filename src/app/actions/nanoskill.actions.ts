import { Deleteconcept, Deleteconceptsuccess } from './ontology.actions';


import {Action} from "@ngrx/store"
import {NanoskillModel} from "../models/nanoskill.model"


export type Actions = 
            Selectednanoskill
            |Selectednanoskillsuccess
            |Selectednanoskillfailure

            |Setnanoskillparent
            |Setnanoskillparentfailure
            |Setnanoskillparentsuccess

            |Loadnanoskill
            |Loadnanoskillsuccess
            |Loadnanoskillfailure
            
            |Addnanoskill
            |Addnanoskillfailure
            |Addnanoskillsuccess
            
            |Getnanoskill
            |Getnanoskillsuccess
            |Getnanoskillfailure
            
            |Editnanoskill
            |Editnanoskillsuccess
            |Editnanoskillfailure
            
            |Deletenanoskill
            |Deletenanoskillsuccess
            |Deletenanoskillfailure

            |Clearnanoskill

            | Allnanoskill
            | Allnanoskillsuccess
            | Allnanoskillfailure

export const ALL_NANOSKILL = "[Nanoskills] All Nanoskill"
export class Allnanoskill implements Action{
    readonly type = ALL_NANOSKILL
    constructor(public payload: any){ }
}

export const ALL_NANOSKILL_SUCCESS = "[Nanoskills] All Nanoskill Success"
export class Allnanoskillsuccess implements Action{
    readonly type = ALL_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}

export const ALL_NANOSKILL_FAILURE = "[Nanoskills] All Nanoskill Failure"
export class Allnanoskillfailure implements Action{
    readonly type = ALL_NANOSKILL_FAILURE
    constructor(public payload: any){}
}



//**************** LOAD SubConcept
export const CLEAR_NANOSKILL = "[Nanoskills] Clear Nanoskill"
export class Clearnanoskill implements Action{
    readonly type = CLEAR_NANOSKILL
    constructor(){}
}


export const LOAD_NANOSKILL = "[Nanoskills] Load Nanoskill"
export class Loadnanoskill implements Action{
    readonly type = LOAD_NANOSKILL
    constructor(public payload: any){}
}

export const LOAD_NANOSKILL_FAILURE = "[Nanoskills] Load Nanoskill Failure"
export class Loadnanoskillfailure implements Action{
    readonly type = LOAD_NANOSKILL_FAILURE
    constructor(public payload: any){}
}

export const LOAD_NANOSKILL_SUCCESS = "[Nanoskills] Load Nanoskill Success"
export class Loadnanoskillsuccess implements Action{
    readonly type = LOAD_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}


//**************** GET SubConcept
export const ADD_NANOSKILL = "[Nanoskills] Add Nanoskill"
export class Addnanoskill implements Action{
    readonly type = ADD_NANOSKILL
    constructor(public payload: any){}
}


export const ADD_NANOSKILL_FAILURE = "[Nanoskills] Add Nanoskill Failure"
export class Addnanoskillfailure implements Action{
    readonly type = ADD_NANOSKILL_FAILURE
    constructor(public payload: any){}
}

export const ADD_NANOSKILL_SUCCESS = "[Nanoskills] Add Nanoskill Success"
export class Addnanoskillsuccess implements Action{
    readonly type = ADD_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}




//**************** GET SubConcept
export const GET_NANOSKILL = "[Nanoskills] Get Nanoskill"
export class Getnanoskill implements Action{
    readonly type = GET_NANOSKILL
    constructor(public payload: any){}
}


export const GET_NANOSKILL_FAILURE = "[Nanoskills] Get Nanoskill Failure"
export class Getnanoskillfailure implements Action{
    readonly type = GET_NANOSKILL_FAILURE
    constructor(public payload: any){}
}

export const GET_NANOSKILL_SUCCESS = "[Nanoskills] Get Nanoskill Success"
export class Getnanoskillsuccess implements Action{
    readonly type = GET_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}

//**************** EDIT SubConcept
export const EDIT_NANOSKILL = "[Nanoskills] Edit Nanoskill"
export class Editnanoskill implements Action{
    readonly type = EDIT_NANOSKILL
    constructor(public payload: any){}
}


export const EDIT_NANOSKILL_FAILURE = "[Nanoskills] Edit Nanoskill Failure"
export class Editnanoskillfailure implements Action{
    readonly type = EDIT_NANOSKILL_FAILURE
    constructor(public payload: any){}
}

export const EDIT_NANOSKILL_SUCCESS = "[Nanoskills] Edit Nanoskill Success"
export class Editnanoskillsuccess implements Action{
    readonly type = EDIT_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}

//**************** DELETE SubConcept
export const DELETE_NANOSKILL = "[Nanoskills] Delete Nanoskill"
export class Deletenanoskill implements Action{
    readonly type = DELETE_NANOSKILL
    constructor(public payload: any){}
}


export const DELETE_NANOSKILL_FAILURE = "[Nanoskills] Delete Nanoskill Failure"
export class Deletenanoskillfailure implements Action{
    readonly type = DELETE_NANOSKILL_FAILURE
    constructor(public payload: any){}
}

export const DELETE_NANOSKILL_SUCCESS = "[Nanoskills] Delete Nanoskill Success"
export class Deletenanoskillsuccess implements Action{
    readonly type = DELETE_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}





export const SELECTED_NANOSKILL = "[Nanoskills] Selected Nanoskill"
export class Selectednanoskill implements Action{
    readonly type = SELECTED_NANOSKILL
    constructor(public payload: NanoskillModel){}
}

export const SELECTED_NANOSKILL_SUCCESS = "[Nanoskills] Selected Nanoskill Success"
export class Selectednanoskillsuccess implements Action{
    readonly type = SELECTED_NANOSKILL_SUCCESS
    constructor(public payload: NanoskillModel){}
}

export const SELECTED_NANOSKILL_FAILURE = "[Nanoskills] Selected Nanoskill Failure"
export class Selectednanoskillfailure implements Action{
    readonly type = SELECTED_NANOSKILL_FAILURE
    constructor(public payload: any){}
}


export const SET_NANOSKILL_PARENT= "[Nanoskills] Set Nanoskill Parent"
export class Setnanoskillparent implements Action{
    readonly type = SET_NANOSKILL_PARENT
    constructor(){}
}



export const SET_NANOSKILL_PARENT_FAILURE= "[Nanoskills] Set Nanoskill Parent Failure"
export class Setnanoskillparentfailure implements Action{
    readonly type = SET_NANOSKILL_PARENT_FAILURE
    constructor(public payload: any){}
}



export const SET_NANOSKILL_PARENT_SUCCESS= "[Nanoskills] Set Nanoskill Parent Success"
export class Setnanoskillparentsuccess implements Action{
    readonly type = SET_NANOSKILL_PARENT_SUCCESS
    constructor(public payload: any){}
}