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
  
  private DOMAIN_API_URL = 'http://localhost:8000/nanoskills'
  public nanoskills: Observable<Array<NanoskillModel>>;

  constructor(private store: Store<NanoskillStore>, private http: Http) {
      this.nanoskills = store.select("nanoskills")


   }

  public loaditems() {
    let headers = new Headers({"Authorization": localStorage.getItem('user_token')});
    let options = new RequestOptions({headers});   
     this.http.get(this.DOMAIN_API_URL, options)
    .map(res => res.json()["data"])
    .map(payload => ({ type: NANOSKILLS_ACTIONS.LOAD_NANOSKILL, payload}))
    .subscribe(action => this.store.dispatch(action)) 
  
               }

  createItem(nanoskill: NanoskillModel) {
    this.http.post(this.DOMAIN_API_URL, JSON.stringify(nanoskill))
    .map(res => res.json()["data"])
    .map(payload => ({ type: NANOSKILLS_ACTIONS.ADD_NANOSKILL, payload }))
    .subscribe(action => this.store.dispatch(action))
  }

  //This is not working, Please change the backend for it to function
  editItem(nanoskill: NanoskillModel) {
    let headers = new Headers({'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')});
    let options = new RequestOptions({headers});
    var url = this.DOMAIN_API_URL + "/" + nanoskill.nanoskill_id
    this.http.put(url, JSON.stringify(nanoskill), options)
    .subscribe(action => this.store.dispatch({ type: NANOSKILLS_ACTIONS.EDIT_NANOSKILL, payload: nanoskill }));
}

  deleteItem(nanoskill: NanoskillModel) {
    let headers = new Headers({'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')});
    let options = new RequestOptions({headers});
    var url = this.DOMAIN_API_URL + "/" + nanoskill.nanoskill_id
    this.http.delete(url, options)
    .subscribe(
          action =>  {this.store.dispatch({ type: NANOSKILLS_ACTIONS.DELETE_NANOSKILL, payload: nanoskill })
                      console.log(`$(nanoskill)` + "deleted")
                    }, 
          error => console.log(error)
          
  
      );
  }
}


