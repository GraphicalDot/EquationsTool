import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers} from '@angular/http';
import {DomainModel} from "./ontology.models"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../../../app.store"
import {ONTOLOGY_ACTIONS} from "./ontology.actions";
import 'rxjs/Rx';

@Injectable()
export class OntologyService {
  
  private DOMAIN_API_URL = 'http://localhost:8000/domains'
  public domains: Observable<Array<DomainModel>>;

  constructor(private store: Store<ApplicationStore>, private http: Http) {
      this.domains = store.select("domains")
      console.log("constructor called");


   }

  public loaditems() {
    let headers = new Headers({"Authorization": localStorage.getItem('user_token')});
    let options = new RequestOptions({headers});   
     this.http.get(this.DOMAIN_API_URL, options)
    .map(res => res.json()["data"])
    .map(payload => ({ type: ONTOLOGY_ACTIONS.LOAD_DOMAIN, payload}))
    .subscribe(action => this.store.dispatch(action)) 
  
               }

  createDomain(domain: DomainModel) {
    this.http.post(this.DOMAIN_API_URL, JSON.stringify(domain))
    .map(res => res.json()["data"])
    .map(payload => ({ type: ONTOLOGY_ACTIONS.ADD_DOMAIN, payload }))
    .subscribe(action => this.store.dispatch(action))
  }

  //This is not working, Please change the backend for it to function
  editDomain(domain: DomainModel) {
    console.log("Put Request has been clicked")
    let headers = new Headers({'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')});
    let options = new RequestOptions({headers});
    var url = this.DOMAIN_API_URL + "/" + domain.domain_id
    this.http.put(url, JSON.stringify(domain), options)
    .subscribe(action => this.store.dispatch({ type: ONTOLOGY_ACTIONS.EDIT_DOMAIN, payload: domain }));
}

  deleteDomain(domain: DomainModel) {
    let headers = new Headers({'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')});
    let options = new RequestOptions({headers});
    var url = this.DOMAIN_API_URL + "/" + domain.domain_id
    this.http.delete(url, options)
    .subscribe(
          action =>  {this.store.dispatch({ type: ONTOLOGY_ACTIONS.DELETE_DOMAIN, payload: domain})
                      console.log(`$(nanoskill)` + "deleted")
                    }, 
          error => console.log(error)
          
  
      );
  }
}


