import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {UserModel, LoginData} from "../models/user.model"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx';
@Injectable()
export class UsersService {
    private DOMAIN_API_URL = 'http://localhost:8000/users'
    private USER_API = 'http://localhost:8000/login'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {
    }
  
  
    loginUser(data: any): Observable<LoginData> {
        return this.http.post(this.USER_API, JSON.stringify(data))
          .map(res => res.json()["data"])
    }
  
    
    loadUsers(payload: any): Observable<Array<UserModel>> {
      console.log(payload)
      let params = new URLSearchParams();
      params.set("skip", payload.skip)
      params.set("limit", payload.limit)
      params.set("search_text", payload.search_text)
      params.set("user_id", payload.user_id)

      console.log(params)
      let headers = new Headers(this.headerContent);
      let options = new RequestOptions({search: params}); 
        return this.http.get(this.DOMAIN_API_URL, options)
            .map(res => res.json()["data"])
            
      }
  
    
    addUser(user: UserModel): Observable<UserModel> {
        return this.http.post(this.DOMAIN_API_URL, JSON.stringify(user))
          .map(res => res.json()["data"])
    }
  
  
  
    getUser(object: UserModel):  Observable<UserModel> {
        var url = this.DOMAIN_API_URL + "/" + object.user_id
        return this.http.get(this.DOMAIN_API_URL, JSON.stringify(object))
      .map(res => res.json()["data"])
      
    }
  
    //This is not working, Please change the backend for it to function
    editUser(object: UserModel): Observable<UserModel> {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});
        var url = this.DOMAIN_API_URL + "/" + object.user_id
        return this.http.put(url, JSON.stringify(object), options)
          .map(res => res.json()["data"])
  }
  
    deleteUser(payload: any): Observable<UserModel>{
      console.log(payload.user_id)
      let params = new URLSearchParams();
      params.set("user_id", payload.user_id)
      params.set("action_user_id", payload.action_user_id)
      console.log(params)
      let headers = new Headers(this.headerContent);
      let options = new RequestOptions({search: params}); 
      console.log(options)  
      return this.http.delete(this.DOMAIN_API_URL, options)
                  .map(res => res.json()["data"])


  }
}
