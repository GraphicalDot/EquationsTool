import { Deleteconcept, Deleteconceptsuccess } from './ontology.actions';


import {Action} from "@ngrx/store"
import {QuestionModel} from "../models/question.model"


export type Actions = 
            Selectedquestion
            |Selectedquestionsuccess
            |Selectedquestionfailure

            |Setquestionparent
            |Setquestionparentfailure
            |Setquestionparentsuccess

            |Loadquestion
            |Loadquestionsuccess
            |Loadquestionfailure
            
            |Addquestion
            |Addquestionfailure
            |Addquestionsuccess
            
            |Getquestion
            |Getquestionsuccess
            |Getquestionfailure
            
            |Editquestion
            |Editquestionsuccess
            |Editquestionfailure
            
            |Deletequestion
            |Deletequestionsuccess
            |Deletequestionfailure
            
            |Clearquestion

//**************** LOAD SubConcept

export const CLEAR_QUESTION = "[Questions] Clear Question"
export class Clearquestion implements Action{
    readonly type = CLEAR_QUESTION
    constructor(public payload: any){}
}


export const LOAD_QUESTION = "[Questions] Load Question"
export class Loadquestion implements Action{
    readonly type = LOAD_QUESTION
    constructor(public payload: any){}
}

export const LOAD_QUESTION_FAILURE = "[Questions] Load Question Failure"
export class Loadquestionfailure implements Action{
    readonly type = LOAD_QUESTION_FAILURE
    constructor(public payload: any){}
}

export const LOAD_QUESTION_SUCCESS = "[Questions] Load Question Success"
export class Loadquestionsuccess implements Action{
    readonly type = LOAD_QUESTION_SUCCESS
    constructor(public payload: any){}
}


//**************** GET SubConcept
export const ADD_QUESTION = "[Questions] Add Question"
export class Addquestion implements Action{
    readonly type = ADD_QUESTION
    constructor(public payload: any){}
}


export const ADD_QUESTION_FAILURE = "[Questions] Add Question Failure"
export class Addquestionfailure implements Action{
    readonly type = ADD_QUESTION_FAILURE
    constructor(public payload: any){}
}

export const ADD_QUESTION_SUCCESS = "[Questions] Add Question Success"
export class Addquestionsuccess implements Action{
    readonly type = ADD_QUESTION_SUCCESS
    constructor(public payload: any){}
}




//**************** GET SubConcept
export const GET_QUESTION = "[Questions] Get Question"
export class Getquestion implements Action{
    readonly type = GET_QUESTION
    constructor(public payload: any){}
}


export const GET_QUESTION_FAILURE = "[Questions] Get Question Failure"
export class Getquestionfailure implements Action{
    readonly type = GET_QUESTION_FAILURE
    constructor(public payload: any){}
}

export const GET_QUESTION_SUCCESS = "[Questions] Get Question Success"
export class Getquestionsuccess implements Action{
    readonly type = GET_QUESTION_SUCCESS
    constructor(public payload: any){}
}

//**************** EDIT SubConcept
export const EDIT_QUESTION = "[Questions] Edit Question"
export class Editquestion implements Action{
    readonly type = EDIT_QUESTION
    constructor(public payload: any){}
}


export const EDIT_QUESTION_FAILURE = "[Questions] Edit Question Failure"
export class Editquestionfailure implements Action{
    readonly type = EDIT_QUESTION_FAILURE
    constructor(public payload: any){}
}

export const EDIT_QUESTION_SUCCESS = "[Questions] Edit Question Success"
export class Editquestionsuccess implements Action{
    readonly type = EDIT_QUESTION_SUCCESS
    constructor(public payload: any){}
}

//**************** DELETE SubConcept
export const DELETE_QUESTION = "[Questions] Delete Question"
export class Deletequestion implements Action{
    readonly type = DELETE_QUESTION
    constructor(public payload: any){}
}


export const DELETE_QUESTION_FAILURE = "[Questions] Delete Question Failure"
export class Deletequestionfailure implements Action{
    readonly type = DELETE_QUESTION_FAILURE
    constructor(public payload: any){}
}

export const DELETE_QUESTION_SUCCESS = "[Questions] Delete Question Success"
export class Deletequestionsuccess implements Action{
    readonly type = DELETE_QUESTION_SUCCESS
    constructor(public payload: any){}
}





export const SELECTED_QUESTION = "[Questions] Selected Question"
export class Selectedquestion implements Action{
    readonly type = SELECTED_QUESTION
    constructor(public payload: QuestionModel){}
}

export const SELECTED_QUESTION_SUCCESS = "[Questions] Selected Question Success"
export class Selectedquestionsuccess implements Action{
    readonly type = SELECTED_QUESTION_SUCCESS
    constructor(public payload: any){}
}

export const SELECTED_QUESTION_FAILURE = "[Questions] Selected Question Failure"
export class Selectedquestionfailure implements Action{
    readonly type = SELECTED_QUESTION_FAILURE
    constructor(public payload: any){}
}


export const SET_QUESTION_PARENT= "[Questions] Set Question Parent"
export class Setquestionparent implements Action{
    readonly type = SET_QUESTION_PARENT
    constructor(){}
}



export const SET_QUESTION_PARENT_FAILURE= "[Questions] Set Question Parent Failure"
export class Setquestionparentfailure implements Action{
    readonly type = SET_QUESTION_PARENT_FAILURE
    constructor(public payload: any){}
}



export const SET_QUESTION_PARENT_SUCCESS= "[Questions] Set Question Parent Success"
export class Setquestionparentsuccess implements Action{
    readonly type = SET_QUESTION_PARENT_SUCCESS
    constructor(public payload: any){}
}