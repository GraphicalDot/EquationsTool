import {Action} from "@ngrx/store"
import {DomainModel} from "./ontology.models"



export const ONTOLOGY_ACTIONS = {
    LOAD_DOMAIN: "LOAD_DOMAIN",
    ADD_DOMAIN: "ADD_DOMAIN",
    DELETE_DOMAIN: "DELETE_DOMAIN",
    EDIT_DOMAIN: "EDIT_DOMAIN",


    LOAD_CONCEPT: "LOAD_CONCEPT",
    ADD_CONCEPT: "ADD_CONCEPT",
    DELETE_CONCEPT: "DELETE_CONCEPT",
    EDIT_CONCEPT: "EDIT_CONCEPT",

    LOAD_SUB_CONCEPT: "LOAD_SUB_CONCEPT",
    ADD_SUB_CONCEPT: "ADD_SUB_CONCEPT",
    DELETE_SUB_CONCEPT: "DELETE_SUB_CONCEPT",
    EDIT_SUB_CONCEPT: "EDIT_SUB_CONCEPT",

    LOAD_NANOSKILL: "LOAD_NANOSKILL",
    ADD_NANOSKILL: "ADD_NANOSKILL",
    DELETE_NANOSKILL: "DELETE_NANOSKILL",
    EDIT_NANOSKILL: "EDIT_NANOSKILL",
}

export const LOAD_DOMAIN = "[Domains] Load Domain"
export const LOAD_DOMAIN_SUCCESS = "[Domains] Load Domain Success"
export const LOAD_DOMAIN_FAILURE = "[Domains] Load Domain Failure"

export const ADD_DOMAIN = "[Domains] Add Domain"
export const ADD_DOMAIN_SUCCESS = "[Domains] Add Domain Success"
export const ADD_DOMAIN_FAILURE = "[Domains] Add Domain Failure"

export const DELETE_DOMAIN = "[Domains] Delete Domain"
export const DELETE_DOMAIN_SUCCESS = "[Domains] Delete Domain Success"
export const DELETE_DOMAIN_FAILURE = "[Domains] Delete Domain Failure"

export const EDIT_DOMAIN = "[Domains] Edit Domain"
export const EDIT_DOMAIN_SUCCESS = "[Domains] Edit Domain Success"

export const EDIT_DOMAIN_FAILURE = "[Domains] Edit Domain Failure"

export class Loaddomain implements Action{
    readonly type = LOAD_DOMAIN
    constructor(){}
}



export class Loaddomainsuccess implements Action{
    readonly type = LOAD_DOMAIN_SUCCESS
    constructor(){}
}


export class Loaddomainfailure implements Action{
    readonly type = LOAD_DOMAIN_FAILURE
    constructor(){}
}




export class Adddomain implements Action{
    readonly type = ADD_DOMAIN
    constructor(public payload: DomainModel){}
}

export class Adddomainsuccess implements Action{
    readonly type = ADD_DOMAIN_SUCCESS
    constructor(public payload: DomainModel){}
}

export class Adddomainfailure implements Action{
    readonly type = ADD_DOMAIN_FAILURE
    constructor(public payload: DomainModel){}
}



export class Deletedomain implements Action{
    readonly type = DELETE_DOMAIN
    constructor(public payload: DomainModel){}
}

export class Deletedomainsuccess implements Action{
    readonly type = DELETE_DOMAIN_SUCCESS
    constructor(public payload: DomainModel){}
}

export class Deletedomainfailure implements Action{
    readonly type = DELETE_DOMAIN_FAILURE
    constructor(public payload: DomainModel){}
}



export class Editdomain implements Action{
    readonly type = EDIT_DOMAIN
    constructor(public payload: DomainModel){}
}

export class Editdomainsuccess implements Action{
    readonly type = EDIT_DOMAIN_SUCCESS
    constructor(public payload: DomainModel){}
}

export class Editdomainfailure implements Action{
    readonly type = EDIT_DOMAIN_FAILURE
    constructor(public payload: DomainModel){}
}


export type Actions = Loaddomain|
                        Loaddomainsuccess|
                        Loaddomainsuccess|
                        Adddomain|
                        Adddomainsuccess|
                        Adddomainfailure|
                        Deletedomain|
                        Deletedomainsuccess|
                        Deletedomainfailure|
                        Editdomain|
                        Editdomainsuccess|
                        Editdomainsuccess

