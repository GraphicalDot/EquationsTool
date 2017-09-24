import { Deletevariablecategoryimages } from '../actions/variabletemplate.actions';
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
    private IMAGE_URL = 'http://localhost:8000/variabletemplatesimages'
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
        return this.http.put(this.API_URL, JSON.stringify(payload))
      .map(res => res.json()["data"])
      
    }

    Deletevariabletemplateservice(payload):  Observable<VariableModel> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("variabletemplate_id", payload.variabletemplate_id)
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.delete(this.API_URL, options)
          .map(res => res.json()["data"])
  }

    Deletevariablecategoryimages(payload):  Observable<VariableModel> {
        let params = new URLSearchParams();
        params.set("variable_id", payload.variable_id)
        params.set("category_id", payload.category_id)
        params.set("user_id", payload.user_id)
        params.set("key", payload.key)
        
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({search: params});   
        return this.http.delete(this.IMAGE_URL, options)
          .map(res => res.json()["data"])
  }

    
    Addvariablecategoryimages(payload):  Observable<string> {
/*         let params = new URLSearchParams();
        params.set("variable_id", payload.variable_id)
        params.set("category_id", payload.category_id)
        params.set("user_id", payload.user_id)

        let formData: FormData = new FormData();  
        formData.append('files', payload.image, payload.image.name);
        
        let headers = new Headers();
        headers.set('Content-Type', 'application/octet-stream');
        headers.set('Upload-Content-Type', payload.image.type)
        //headers.set('Content-Type', payload.image.type);
        headers.set("Authorization", payload.user_id)
        headers.set('Content-Type', undefined)
         let options = new RequestOptions({headers: headers});   
        console.log(payload.image)
        var xhr = new XMLHttpRequest;
        xhr.open('POST', this.IMAGE_URL, true);
        xhr.send(formData); 

        return this.http.post(this.IMAGE_URL, formData, options)
          .map(res => res.json()["data"])
        */

        return Observable.fromPromise(new Promise((resolve, reject) => {
        let formData: FormData = new FormData();  
        formData.append('image_data', payload.image, payload.image.name);
        formData.append('user_id', payload.user_id)
         formData.append('category_id', payload.category_id)
        let xhr = new XMLHttpRequest()
        xhr.onreadystatechange = function () {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.response)["data"])
                } else {
                    reject(xhr.response)
                }
            }
        }
        
        var url = this.IMAGE_URL +"?category_id=" + encodeURIComponent(payload.category_id) + "&user_id=" + encodeURIComponent(payload.user_id) + "&variable_id=" + encodeURIComponent(payload.variable_id)
        xhr.open("POST", url, true)
        
        xhr.send(formData)
    }));

            } 
  
}