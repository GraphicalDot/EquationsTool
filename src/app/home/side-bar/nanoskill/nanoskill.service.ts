import { NanoskillModule } from './nanoskill.module';
import { NgAnalyzedModules } from '@angular/compiler';
import { NanoskillRoutes } from './nanoskill.route';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers} from '@angular/http';
import {NanoskillModel} from "./nanoskill.model"
import {Observable} from "rxjs/Observable";
import {NanoskillStore} from "./nanoskill.store"
import {NANOSKILLS_ACTIONS} from "./nanoskill.actions";
import 'rxjs/Rx';

@Injectable()
export class NanoskillService {
  
  private USER_API_URL = 'http://localhost:8000/nanoskills'
  public nanoskills: Observable<Array<NanoskillModel>>;

  constructor(private store: Store<NanoskillStore>, private http: Http) {
      this.nanoskills = store.select("nanoskills")


   }

  public loaditems() {
    let headers = new Headers({"Authorization": localStorage.getItem('user_token'), "Access-Control-Allow-Headers": "X-Requested-With"});
    let options = new RequestOptions({headers});   
     this.http.get(this.USER_API_URL)
    .map(res => res.json()["data"])
    .map(payload => ({ type: NANOSKILLS_ACTIONS.LOAD_NANOSKILL, payload}))
    .subscribe(action => this.store.dispatch(action)) 
  
               }

  createItem(nanoskill: NanoskillModel) {
    this.http.post(this.USER_API_URL, JSON.stringify(nanoskill))
    .map(res => res.json()["data"])
    .map(payload => ({ type: NANOSKILLS_ACTIONS.ADD_NANOSKILL, payload }))
    .subscribe(action => this.store.dispatch(action))
  }

  editItem(nanoskill: NanoskillModel) {
     let headers = new Headers({'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')});
    let options = new RequestOptions({headers});
    var url = this.USER_API_URL + "/" + nanoskill.nanoskill_id
    this.http.put(url, JSON.stringify(nanoskill), options)
    .subscribe(action => this.store.dispatch({ type: NANOSKILLS_ACTIONS.EDIT_NANOSKILL, payload: nanoskill }));
}

  deleteItem(nanoskill: NanoskillModel) {
    var url = this.USER_API_URL + "/" + nanoskill.nanoskill_id
    this.http.delete(url)
    .subscribe(action => this.store.dispatch({ type: NANOSKILLS_ACTIONS.DELETE_NANOSKILL, payload: nanoskill }));
  }

  }
