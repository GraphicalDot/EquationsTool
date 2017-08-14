import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers} from '@angular/http';
import {UserModel} from "../models/user.model"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import 'rxjs/Rx';
@Injectable()
export class UsersService {
    private DOMAIN_API_URL = ''
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http, private api: string) {
        this.api = "http://localhost:8000/users"
    }
  
  
    
    loadUsers(): Observable<Array<UserModel>> {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});   
        return this.http.get(this.api, options)
            .map(res => res.json()["data"])
      }
  
    
    addUser(user: UserModel): Observable<UserModel> {
        console.log("sending request for addUser")
        return this.http.post(this.api, JSON.stringify(user))
          .map(res => res.json()["data"])
    }
  
  
  
    getUser(object: UserModel):  Observable<UserModel> {
        var url = this.api + "/" + object.user_id
        return this.http.get(this.api, JSON.stringify(object))
      .map(res => res.json()["data"])
      
    }
  
    //This is not working, Please change the backend for it to function
    editUser(object: UserModel): Observable<UserModel> {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});
        var url = this.api + "/" + object.user_id
        return this.http.put(url, JSON.stringify(object), options)
          .map(res => res.json()["data"])
  }
  
    deleteUser(object: UserModel): Observable<UserModel> {
      let headers = new Headers(this.headerContent);
      let options = new RequestOptions({headers});
      console.log(object.user_id + "from the delete user")
      var url = this.api + "/" + object.user_id
      return this.http.delete(url, options)
            .map(res => res.json()["data"])
      
    }
  
  }

