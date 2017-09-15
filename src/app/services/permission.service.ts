import { UserModel } from '../models/user.model';
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx'
import { ReplaySubject } from 'rxjs';


@Injectable()
export class PermissionService {
    private DOMAIN_PERMISSIONS = 'http://localhost:8000/domainpermissions'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  

    DomainPermission(payload){
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("module_id", payload.module_id)

        let headers = new Headers(this.headerContent);
        //let options = new RequestOptions({headers});   
        let options = new RequestOptions({search: params});   
        var url = this.DOMAIN_PERMISSIONS
         return this.http.get(url, options)
                .map(res => res.json()["data"])
      }


    EditDomainPermission(payload){
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("target_user_id", payload.target_user_id)
        params.set("parent_id", payload.parent_id)
        params.set("module_id", payload.module_id)

        console.log(params)
        let headers = new Headers(this.headerContent);
        //let options = new RequestOptions({headers});   
        let options = new RequestOptions({search: params});   
        var url = this.DOMAIN_PERMISSIONS
         return this.http.post(url, JSON.stringify(payload))
                .map(res => res.json()["data"])
      }


}