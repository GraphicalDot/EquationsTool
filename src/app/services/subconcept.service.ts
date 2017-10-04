import { Loadconcept } from '../actions/ontology.actions';
import { SubconceptModel } from '../models/subconcept.model';
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx';

@Injectable()
export class SubconceptService {
    private SUBCONCEPT_API_URL = 'http://localhost:8000/subconcepts'
    private AllSUBCONCEPT = 'http://localhost:8000/allsubconcepts'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  
    Loadsubconceptservice(payload): Observable<SubconceptModel[]> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("parent_id", payload.parent_id)
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("search_text", payload.search_text)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        var url = this.SUBCONCEPT_API_URL
         return this.http.get(url, options)
                .map(res => res.json()["data"])
      }
  
    
    Addsubconceptservice(payload): Observable<SubconceptModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.SUBCONCEPT_API_URL, JSON.stringify(payload.module))
          .map(res => res.json()["data"])
    }
  
  
  
    Editsubconceptservice(payload):  Observable<SubconceptModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.SUBCONCEPT_API_URL, JSON.stringify(payload.module))
      .map(res => res.json()["data"])
      
    }

    Deletesubconceptservice(payload):  Observable<SubconceptModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.delete(this.SUBCONCEPT_API_URL, JSON.stringify(payload.module))
      .map(res => res.json()["data"])
      
  
  }
    Allsubconcept(): Observable<SubconceptModel> {
        return this.http.get(this.AllSUBCONCEPT)
          .map(res => res.json()["data"])
    }


}
