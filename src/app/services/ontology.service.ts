import { UserModel } from '../models/user.model';
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {DomainModel, ConceptModel} from "../models/ontology.models"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import {ONTOLOGY_ACTIONS} from "../actions/ontology.actions";
import 'rxjs/Rx';

@Injectable()
export class OntologyService {
    private DOMAIN_API_URL = 'http://localhost:8000/domains'
    private CONCEPT_API_URL = 'http://localhost:8000/concepts'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  
    loadDomain_service(user_id: string): Observable<DomainModel[]> {
        let params = new URLSearchParams();
        params.set("user_id", user_id)

        let headers = new Headers(this.headerContent);
        //let options = new RequestOptions({headers});   
        let options = new RequestOptions({search: params});   
        var url = this.DOMAIN_API_URL 
         return this.http.get(url, options)
                .map(res => res.json()["data"])
      }
  
    
    loadConcepts(payload): Observable<ConceptModel[]> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("parent_id", payload.parent_id)
        console.log("payload from loadconcepts" + payload.parent_id)
        let headers = new Headers(this.headerContent);
        //let options = new RequestOptions({headers});   
        let options = new RequestOptions({search: params});   
        return this.http.get(this.CONCEPT_API_URL, options)
            .map(res => res.json()["data"])
      }
  
    
    addConcept(concept: ConceptModel): Observable<ConceptModel> {
        return this.http.post(this.CONCEPT_API_URL, JSON.stringify(concept))
          .map(res => res.json()["data"])
    }
  
  
  
    addDomain(domain: DomainModel):  Observable<DomainModel> {
        return this.http.post(this.DOMAIN_API_URL, JSON.stringify(domain))
      .map(res => res.json()["data"])
      
    }
  
    //This is not working, Please change the backend for it to function
    editDomain(domain: DomainModel, ) {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});
        var url = this.DOMAIN_API_URL + "/" + domain.module_id
        this.http.put(url, JSON.stringify(domain), options)
      //.subscribe(action => this.store.dispatch({ type: ONTOLOGY_ACTIONS.EDIT_DOMAIN, payload: domain }));
  }
  
    deleteDomain(payload) {

      let params = new URLSearchParams();
      params.set("user_id", payload.user.user_id)

      let headers = new Headers(this.headerContent);
        //let options = new RequestOptions({headers});   
        let options = new RequestOptions({search: params});  
      console.log(payload.domain.module_id + "from the delet domain")
      var url = this.DOMAIN_API_URL + "/"+ payload.domain.module_id
      return this.http.delete(url, options)
      .map(res => {res.json()["data"]})
      
    }
  
  }


