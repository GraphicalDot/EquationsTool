import {Action} from "@ngrx/store"



export const LOAD_PERMISSION_DOMAIN = "[Permission] Load Permission Domain"
export class Loadpermissiondomain implements Action{
    readonly type =  LOAD_PERMISSION_DOMAIN
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_DOMAIN_SUCCESS = "[Permission] Load Permission Domain Success"
export class Loadpermissiondomainsuccess implements Action{
    readonly type = LOAD_PERMISSION_DOMAIN_SUCCESS
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_DOMAIN_FAILURE = "[Permission] Load Permission Domain Failure"
export class Loadpermissiondomainfailure implements Action{
    readonly type = LOAD_PERMISSION_DOMAIN_FAILURE
    constructor(public payload: any){}
}


export const EDIT_PERMISSION_DOMAIN = "[Permission] Edit Permission Domain"
export class Editpermissiondomain implements Action{
    readonly type =  EDIT_PERMISSION_DOMAIN
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_DOMAIN_SUCCESS = "[Permission] Edit Permission Domain Success"
export class Editpermissiondomainsuccess implements Action{
    readonly type = EDIT_PERMISSION_DOMAIN_SUCCESS
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_DOMAIN_FAILURE = "[Permission] Edit Permission Domain Failure"
export class Editpermissiondomainfailure implements Action{
    readonly type = EDIT_PERMISSION_DOMAIN_FAILURE
    constructor(public payload: any){}
}


//------------------------Concept----------------------------------------//
export const LOAD_PERMISSION_CONCEPT = "[Permission] Load Permission Concept"
export class Loadpermissionconcept implements Action{
    readonly type =  LOAD_PERMISSION_CONCEPT
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_CONCEPT_SUCCESS = "[Permission] Load Permission Concept Success"
export class Loadpermissionconceptsuccess implements Action{
    readonly type = LOAD_PERMISSION_CONCEPT_SUCCESS
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_CONCEPT_FAILURE = "[Permission] Load Permission Concept Failure"
export class Loadpermissionconceptfailure implements Action{
    readonly type = LOAD_PERMISSION_CONCEPT_FAILURE
    constructor(public payload: any){}
}


export const EDIT_PERMISSION_CONCEPT = "[Permission] Edit Permission Concept"
export class Editpermissionconcept implements Action{
    readonly type =  EDIT_PERMISSION_CONCEPT
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_CONCEPT_SUCCESS = "[Permission] Edit Permission Concept Success"
export class Editpermissionconceptsuccess implements Action{
    readonly type = EDIT_PERMISSION_CONCEPT_SUCCESS
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_CONCEPT_FAILURE = "[Permission] Edit Permission Concept Failure"
export class Editpermissionconceptfailure implements Action{
    readonly type = EDIT_PERMISSION_CONCEPT_FAILURE
    constructor(public payload: any){}
}

//------------------------SubConcept----------------------------------------//
export const LOAD_PERMISSION_SUBCONCEPT = "[Permission] Load Permission Subconcept"
export class Loadpermissionsubconcept implements Action{
    readonly type =  LOAD_PERMISSION_SUBCONCEPT
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_SUBCONCEPT_SUCCESS = "[Permission] Load Permission Suboncept Success"
export class Loadpermissionsubconceptsuccess implements Action{
    readonly type = LOAD_PERMISSION_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_SUBCONCEPT_FAILURE = "[Permission] Load Permission Suboncept Failure"
export class Loadpermissionsubconceptfailure implements Action{
    readonly type = LOAD_PERMISSION_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}


export const EDIT_PERMISSION_SUBCONCEPT = "[Permission] Edit Permission Subconcept"
export class Editpermissionsubconcept implements Action{
    readonly type =  EDIT_PERMISSION_SUBCONCEPT
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_SUBCONCEPT_SUCCESS = "[Permission] Edit Permission Subconcept Success"
export class Editpermissionsubconceptsuccess implements Action{
    readonly type = EDIT_PERMISSION_SUBCONCEPT_SUCCESS
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_SUBCONCEPT_FAILURE = "[Permission] Edit Permission Subconcept Failure"
export class Editpermissionsubconceptfailure implements Action{
    readonly type = EDIT_PERMISSION_SUBCONCEPT_FAILURE
    constructor(public payload: any){}
}

//------------------------Nanoskill----------------------------------------//
export const LOAD_PERMISSION_NANOSKILL = "[Permission] Load Permission Nanoskill"
export class Loadpermissionnanoskill implements Action{
    readonly type =  LOAD_PERMISSION_NANOSKILL
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_NANOSKILL_SUCCESS = "[Permission] Load Permission Nanoskill Success"
export class Loadpermissionnanoskillsuccess implements Action{
    readonly type = LOAD_PERMISSION_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_NANOSKILL_FAILURE = "[Permission] Load Permission Nanoskill Failure"
export class Loadpermissionnanoskillfailure implements Action{
    readonly type = LOAD_PERMISSION_NANOSKILL_FAILURE
    constructor(public payload: any){}
}


export const EDIT_PERMISSION_NANOSKILL = "[Permission] Edit Permission Nanoskill"
export class Editpermissionnanoskill implements Action{
    readonly type =  EDIT_PERMISSION_NANOSKILL
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_NANOSKILL_SUCCESS = "[Permission] Edit Permission Nanoskill Success"
export class Editpermissionnanoskillsuccess implements Action{
    readonly type = EDIT_PERMISSION_NANOSKILL_SUCCESS
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_NANOSKILL_FAILURE = "[Permission] Edit Permission Nanoskill Failure"
export class Editpermissionnanoskillfailure implements Action{
    readonly type = EDIT_PERMISSION_NANOSKILL_FAILURE
    constructor(public payload: any){}
}


//------------------------Questions----------------------------------------//
export const LOAD_PERMISSION_QUESTION = "[Permission] Load Permission Question"
export class Loadpermissionquestion implements Action{
    readonly type =  LOAD_PERMISSION_QUESTION
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_QUESTION_SUCCESS = "[Permission] Load Permission Question Success"
export class Loadpermissionquestionsuccess implements Action{
    readonly type = LOAD_PERMISSION_QUESTION_SUCCESS
    constructor(public payload: any){}
}

export const LOAD_PERMISSION_QUESTION_FAILURE = "[Permission] Load Permission Question Failure"
export class Loadpermissionquestionfailure implements Action{
    readonly type = LOAD_PERMISSION_QUESTION_FAILURE
    constructor(public payload: any){}
}


export const EDIT_PERMISSION_QUESTION = "[Permission] Edit Permission Question"
export class Editpermissionquestion implements Action{
    readonly type =  EDIT_PERMISSION_QUESTION
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_QUESTION_SUCCESS = "[Permission] Edit Permission Question Success"
export class Editpermissionquestionsuccess implements Action{
    readonly type = EDIT_PERMISSION_QUESTION_SUCCESS
    constructor(public payload: any){}
}

export const EDIT_PERMISSION_QUESTION_FAILURE = "[Permission] Edit Permission Question Failure"
export class Editpermissionquestionfailure implements Action{
    readonly type = EDIT_PERMISSION_QUESTION_FAILURE
    constructor(public payload: any){}
}










export type Actions = 
                        Loadpermissiondomain|
                        Loadpermissiondomainsuccess|
                        Loadpermissiondomainfailure|
                        Editpermissiondomain|
                        Editpermissiondomainfailure|
                        Editpermissiondomainsuccess|

                        Loadpermissionconcept|
                        Loadpermissionconceptsuccess|
                        Loadpermissionconceptfailure|
                        Editpermissionconcept|
                        Editpermissionconceptfailure|
                        Editpermissionconceptsuccess|


                        Loadpermissionsubconcept|
                        Loadpermissionsubconceptsuccess|
                        Loadpermissionsubconceptfailure|
                        Editpermissionsubconcept|
                        Editpermissionsubconceptfailure|
                        Editpermissionsubconceptsuccess|


                        Loadpermissionnanoskill|
                        Loadpermissionnanoskillsuccess|
                        Loadpermissionnanoskillfailure|
                        Editpermissionnanoskill|
                        Editpermissionnanoskillfailure|
                        Editpermissionnanoskillsuccess|


                        Loadpermissionquestion|
                        Loadpermissionquestionsuccess|
                        Loadpermissionquestionfailure|
                        Editpermissionquestion|
                        Editpermissionquestionfailure|
                        Editpermissionquestionsuccess