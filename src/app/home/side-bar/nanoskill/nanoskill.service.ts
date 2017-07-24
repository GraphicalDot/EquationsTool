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
  public nanoskills: Observable<Array<NanoskillModel>>;

  constructor(private store: Store<NanoskillStore>, private http: Http) {
      this.nanoskills = store.select("nanoskills")


   }

    private _serverError(err: any) {
        console.log('sever error:', err);  // debug
        if(err instanceof Response) {
          return Observable.throw(err.json().error || 'backend server error');
          // if you're using lite-server, use the following line
          // instead of the line above:
          //return Observable.throw(err.text() || 'backend server error');
        }
        return Observable.throw(err || 'backend server error');
    }
    private _request = new Request({
        method: "GET",
        // change url to "./data/data.junk" to generate an error
        url: this.USER_API_URL
    });
    // 


  public loaditems() {
    console.log("Entering into loaditems")
     this.http.request(this._request)
    .map(res => res.json()["data"])
    .map(payload => ({ type: NANOSKILLS_ACTIONS.LOAD_NANOSKILL, payload}))
    .subscribe(action => this.store.dispatch(action)) 
  
               }

  /*
  createItem(item: Item) {
    this.http.post(this.USER_API_URL, JSON.stringify(item), HEADER)
    .map(res => res.json())
    .map(payload => ({ type: 'CREATE_ITEM', payload }))
    .subscribe(action => this.store.dispatch(action));
}
  updateItem(item: Item) {
  this.http.put(`${BASE_URL}${item.id}`, JSON.stringify(item), HEADER)
    .subscribe(action => this.store.dispatch({ type: 'UPDATE_ITEM', payload: item }));
}
  */

  deleteItem(nanoskill: NanoskillModel) {
    console.log(nanoskill)
    var url = this.USER_API_URL + "/" + nanoskill.nanoskill_id
    this.http.delete(url)
    .subscribe(action => this.store.dispatch({ type: NANOSKILLS_ACTIONS.DELETE_NANOSKILL, payload: nanoskill }));
  }

  }
