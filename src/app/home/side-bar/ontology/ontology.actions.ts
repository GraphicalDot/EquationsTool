import {Action} from "@ngrx/store"
import {DomainModel, ConceptModel} from "./ontology.models"


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



export const LOAD_CONCEPT = "[Concepts] Load Concept"
export const LOAD_CONCEPT_SUCCESS = "[Concepts] Load Concept Success"
export const LOAD_CONCEPT_FAILURE = "[Concepts] Load Concept Failure"

export const ADD_CONCEPT = "[Domains] Add Concept"
export const ADD_CONCEPT_SUCCESS = "[Concepts] Add Concept Success"
export const ADD_CONCEPT_FAILURE = "[Concepts] Add Concept Failure"

export const DELETE_CONCEPT = "[Concepts] Delete Concept"
export const DELETE_CONCEPT_SUCCESS = "[Concepts] Delete Concept Success"
export const DELETE_CONCEPT_FAILURE = "[Concepts] Delete Concept Failure"

export const EDIT_CONCEPT = "[Concepts] Edit Domain"
export const EDIT_CONCEPT_SUCCESS = "[Concepts] Edit Concept Success"
export const EDIT_CONCEPT_FAILURE = "[Concepts] Edit Concept Failure"

export class Loadconcept implements Action{
    readonly type = LOAD_CONCEPT
    constructor(){}
}
export class Loadconceptsuccess implements Action{
    readonly type = LOAD_CONCEPT_SUCCESS
    constructor(public payload: ConceptModel[]){}
}
export class Loadconceptfailure implements Action{
    readonly type = LOAD_CONCEPT_FAILURE
    constructor(public payload: any){}
}
export class Addconcept implements Action{
    readonly type = ADD_CONCEPT
    constructor(public payload: ConceptModel){}
}
export class Addconceptsuccess implements Action{
    readonly type = ADD_CONCEPT_SUCCESS
    constructor(public payload: ConceptModel){}
}
//Because the error given to this class will be of object or string
export class Addconceptfailure implements Action{
    readonly type = ADD_CONCEPT_FAILURE
    constructor(public payload: any){}
}
export class Deleteconcept implements Action{
    readonly type = DELETE_CONCEPT
    constructor(public payload: ConceptModel){}
}
export class Deleteconceptsuccess implements Action{
    readonly type = DELETE_CONCEPT_SUCCESS
    constructor(public payload: any){}
}
export class Deleteconceptfailure implements Action{
    readonly type = DELETE_CONCEPT_FAILURE
    constructor(public payload: any){}
}
export class Editconcept implements Action{
    readonly type = EDIT_CONCEPT
    constructor(public payload: ConceptModel){}
}
export class Editconceptsuccess implements Action{
    readonly type = EDIT_CONCEPT_SUCCESS
    constructor(public payload: ConceptModel){}
}
export class Editconceptfailure implements Action{
    readonly type = EDIT_CONCEPT_FAILURE
    constructor(public payload: ConceptModel){}
}




export class Loaddomain implements Action{
    readonly type = LOAD_DOMAIN
    constructor(){}
}
export class Loaddomainsuccess implements Action{
    readonly type = LOAD_DOMAIN_SUCCESS
    constructor(public payload: DomainModel[]){}
}
export class Loaddomainfailure implements Action{
    readonly type = LOAD_DOMAIN_FAILURE
    constructor(public payload: any){}
}
export class Adddomain implements Action{
    readonly type = ADD_DOMAIN
    constructor(public payload: DomainModel){}
}
export class Adddomainsuccess implements Action{
    readonly type = ADD_DOMAIN_SUCCESS
    constructor(public payload: DomainModel){}
}
//Because the error given to this class will be of object or string
export class Adddomainfailure implements Action{
    readonly type = ADD_DOMAIN_FAILURE
    constructor(public payload: any){}
}
export class Deletedomain implements Action{
    readonly type = DELETE_DOMAIN
    constructor(public payload: DomainModel){}
}
export class Deletedomainsuccess implements Action{
    readonly type = DELETE_DOMAIN_SUCCESS
    constructor(public payload: any){}
}
export class Deletedomainfailure implements Action{
    readonly type = DELETE_DOMAIN_FAILURE
    constructor(public payload: any){}
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
                        Loadconcept|

                        Loaddomainsuccess|
                        Loadconceptsuccess|

                        Loaddomainfailure|
                        Loadconceptfailure|

                        Adddomain|
                        Addconcept|

                        Adddomainsuccess|
                        Addconceptsuccess|

                        Adddomainfailure|
                        Addconceptfailure|

                        Deletedomain|
                        Deleteconcept|

                        Deletedomainsuccess|
                        Deleteconceptsuccess|

                        Deletedomainfailure|
                        Deleteconceptfailure|

                        Editdomain|
                        Editconcept|

                        Editdomainsuccess|
                        Editconceptsuccess|

                        Editdomainsuccess|
                        Editconceptsuccess
