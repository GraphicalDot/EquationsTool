import { NanoskillModule } from './nanoskill.module';
import { NgAnalyzedModules } from '@angular/compiler';
import { NanoskillRoutes } from './nanoskill.route';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request} from '@angular/http';
import {NanoskillModel} from "./nanoskill.model"
import {Observable} from "rxjs/Observable";
import {NanoskillStore} from "./nanoskill.store"
import {NANOSKILLS_ACTIONS} from "./nanoskill.actions";
import 'rxjs/Rx';

@Injectable()
export class NanoskillService {
  
  private USER_API_URL = 'http://localhost:8000/nanoskills'
  private CHEADERS = { headers: new Headers({ 'Content-Type': 'application/json' }) };
  public nanoskills: Observable<Array<NanoskillModel>>;

  constructor(private store: Store<NanoskillStore>, private http: Http) {
      this.nanoskills = store.select("nanoskills")


   }

  public loaditems() {
    console.log("Entering into loaditems")
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
    var url = this.USER_API_URL + "/" + nanoskill.nanoskill_id
    this.http.put(url, JSON.stringify(nanoskill))
    .subscribe(action => this.store.dispatch({ type: NANOSKILLS_ACTIONS.EDIT_NANOSKILL, payload: nanoskill }));
}

  deleteItem(nanoskill: NanoskillModel) {
    console.log(nanoskill)
    var url = this.USER_API_URL + "/" + nanoskill.nanoskill_id
    this.http.delete(url)
    .subscribe(action => this.store.dispatch({ type: NANOSKILLS_ACTIONS.DELETE_NANOSKILL, payload: nanoskill }));
  }

  }
