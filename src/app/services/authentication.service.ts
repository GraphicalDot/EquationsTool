import { Injectable } from "@angular/core";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/throw";
import {UserModel, LoginData} from "../models/user.model";
import { Http, Response, Request, RequestOptions, Headers} from '@angular/http';

export class AuthenticationService {

    private _authenticated = false;

    private AUTHENTICATION_API = 'http://localhost:8000/login'
    constructor(private http: Http) {
    }

    authentication(data: any): Observable<any> {
        return this.http.post(this.AUTHENTICATION_API, JSON.stringify(data))
          .map(res => res.json()["data"])
    }

}