import {VariableModel} from "../models/variable.model"
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx';

@Injectable()
export class VariableService {
    private VARIABLE_API_URL = 'http://localhost:8000/variables'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  
    Loadvariableservice(payload): Observable<VariableModel[]> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("search_text", payload.search_text)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        var url = this.VARIABLE_API_URL
         return this.http.get(url, options)
                .map(res => res.json()["data"])
      }
  
    
    Addvariableservice(payload): Observable<VariableModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.VARIABLE_API_URL, JSON.stringify(payload.module))
          .map(res => res.json()["data"])
    }
  
  
  
    Editvariableservice(payload):  Observable<VariableModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.VARIABLE_API_URL, JSON.stringify(payload.module))
      .map(res => res.json()["data"])
      
    }

    Deletevariableservice(payload):  Observable<VariableModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        console.log(params)
        console.log(options)
        return this.http.delete(this.VARIABLE_API_URL, options)
          .map(res => res.json()["data"])
  }

  
}