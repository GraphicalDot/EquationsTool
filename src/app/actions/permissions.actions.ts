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




export type Actions = 
                        Loadpermissiondomain|
                        Loadpermissiondomainsuccess|
                        Loadpermissiondomainfailure