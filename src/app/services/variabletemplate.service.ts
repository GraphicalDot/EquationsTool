import { VariabletemplateModel } from '../models/variabletemplate.model';
import {VariableModel} from "../models/variable.model"
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx';

@Injectable()
export class VariabletemplateService {
    private API_URL = 'http://localhost:8000/variabletemplates'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  
    Loadvariabletemplateservice(payload): Observable<VariabletemplateModel[]> {
        console.log("A request has been made on the server")
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("search_text", payload.search_text)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        var url = this.API_URL
         return this.http.get(url, options)
                .map(res => res.json()["data"])
      }
  
    
    Addvariabletemplateservice(payload): Observable<VariableModel> {
        let params = new URLSearchParams();
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.API_URL, JSON.stringify(payload))
          .map(res => res.json()["data"])
    }
  
  
  
    Editvariabletemplateservice(payload):  Observable<VariableModel> {
        let params = new URLSearchParams();
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.API_URL, JSON.stringify(payload))
      .map(res => res.json()["data"])
      
    }

    Deletevariabletemplateservice(payload):  Observable<VariableModel> {
        let params = new URLSearchParams();
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.delete(this.API_URL, options)
          .map(res => res.json()["data"])
  }

  
}