import { Loadconcept } from '../actions/ontology.actions';
import { QuestionModel } from '../models/question.model';
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx';

@Injectable()
export class QuestionService {
    private QUESTION_API_URL = 'http://localhost:8000/questions'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  
    Loadquestionservice(payload): Observable<QuestionModel[]> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("parent_id", payload.parent_id)
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("search_text", payload.search_text)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        var url = this.QUESTION_API_URL
         return this.http.get(url, options)
                .map(res => res.json()["data"])
      }
  
    
    Addquestionservice(payload): Observable<QuestionModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.QUESTION_API_URL, JSON.stringify(payload.module))
          .map(res => res.json()["data"])
    }
  
  
  
    Editquestionservice(payload):  Observable<QuestionModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user.user_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.post(this.QUESTION_API_URL, JSON.stringify(payload.module))
      .map(res => res.json()["data"])
      
    }

    Deletequestionservice(payload):  Observable<QuestionModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("module_id", payload.module_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.delete(this.QUESTION_API_URL, options)
      .map(res => res.json()["data"])
      
  
  }
}
