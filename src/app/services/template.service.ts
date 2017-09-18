import { Loadconcept } from '../actions/ontology.actions';
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx';

@Injectable()
export class TemplateService {
    private API_URL = 'http://localhost:8000/templates'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  
    Loadtemplateservice(payload): Observable<object> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("parent_id", payload.parent_id)
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("search_text", payload.search_text)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        var url = this.API_URL
         return this.http.get(url, options)
                .map(res => res.json()["data"])
      }
  
    
    Addtemplateservice(payload): Observable<object> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.API_URL, JSON.stringify(payload.module))
          .map(res => res.json()["data"])
    }

    Gettemplateservice(payload):  Observable<object> {
        let params = new URLSearchParams();
        params.set("user_id", payload.template_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.get(this.API_URL)
      .map(res => res.json()["data"])
      
    }

    Loadtemplatesktonservice():  Observable<object> {
        return this.http.get(this.API_URL)
      .map(res => res.json()["data"])
      
    }



  
    Edittemplateservice(payload):  Observable<object> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.API_URL, JSON.stringify(payload.module))
      .map(res => res.json()["data"])
      
    }

    Deletetemplateservice(payload):  Observable<object> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("module_id", payload.module_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        console.log(params)
        console.log(options)
        return this.http.delete(this.API_URL, options)
          .map(res => res.json()["data"])
      
  
  }
}
