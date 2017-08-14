import {Action} from "@ngrx/store"
import { UserModel } from '../models/user.model';







export const LOAD_USERS = "[Users] Load User"
export class Loadusers implements Action{
    readonly type = LOAD_USERS
    constructor(){}
}

export const LOAD_USERS_SUCCESS = "[Users] Load User Success"
export class Loaduserssuccess implements Action{
    readonly type = LOAD_USERS_SUCCESS
    constructor(public payload: any){}
}

export const LOAD_USERS_FAILURE = "[Users] Load User Failure"
export class Loadusersfailure implements Action{
    readonly type = LOAD_USERS_FAILURE
    constructor(public payload: any){}
}

export const GET_USER = "[Users] Get User"
export class Getuser implements Action{
    readonly type = GET_USER
    constructor(public payload: UserModel){}
}


export const GET_USER_SUCCESS = "[Users] Get User Success"
export class Getusersuccess implements Action{
    readonly type = GET_USER_SUCCESS
    constructor(public payload: UserModel){}
}

export const GET_USER_FAILURE = "[Users] Get User Failure"
export class Getuserfailure implements Action{
    readonly type = GET_USER_FAILURE
    constructor(public payload: string){}
}

export const ADD_USER = "[Users] Add User"
export class Adduser implements Action{
    readonly type = ADD_USER
    constructor(public payload: UserModel){
        console.log("Request received from actions for add user")
    }
}

export const ADD_USER_FAILURE = "[Users] Add User Failure"
export class Adduserfailure implements Action{
    readonly type = ADD_USER_FAILURE
    constructor(public payload: string){
        console.log("Request received from actions for add user failure")
        
    }
}

export const ADD_USER_SUCCESS = "[Users] Add User Success"
export class Addusersuccess implements Action{
    readonly type = ADD_USER_SUCCESS
    constructor(public payload: UserModel){
        console.log("Request received from actions for add user success")
    }
}


export const EDIT_USER = "[Users] Create User"
export class Edituser implements Action{
    readonly type = EDIT_USER
    constructor(public payload: UserModel){}
}

export const EDIT_USER_FAILURE = "[Users] Create User Failure"
export class Edituserfailure implements Action{
    readonly type = EDIT_USER_FAILURE
    constructor(public payload: string){}
}

export const EDIT_USER_SUCCESS = "[Users] Create User Success"
export class Editeusersuccess implements Action{
    readonly type = EDIT_USER_SUCCESS
    constructor(public payload: string){}
}



export const DELETE_USER = "[Users] Delete User"
export class Deleteuser implements Action{
    readonly type = DELETE_USER
    constructor(public payload: UserModel){}
}

export const DELETE_USER_FAILURE = "[Users] Delete User Failure"
export class Deleteuserfailure implements Action{
    readonly type = DELETE_USER_FAILURE
    constructor(public payload: string){}
}

export const DELETE_USER_SUCCESS = "[Users] Delete User Success"
export class Deleteusersuccess implements Action{
    readonly type = DELETE_USER_SUCCESS
    constructor(public payload: UserModel){}
}


export type Actions = Loadusers|
                        Loaduserssuccess|
                        Loadusersfailure|
                        
                        Getuser|
                        Getusersuccess|
                        Getuserfailure|

                        Adduser|
                        Addusersuccess|
                        Adduserfailure|
                        
                        Edituser|
                        Edituserfailure|
                        Editeusersuccess|

                        Deleteuser|
                        Deleteuserfailure|
                        Deleteusersuccess
