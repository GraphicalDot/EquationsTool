import { UserModel } from '../models/user.model';
import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers, URLSearchParams} from '@angular/http';
import {DomainModel, ConceptModel} from "../models/ontology.models"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../app.store"
import * as ONTOLOGY_ACTIONS from "../actions/ontology.actions";
import 'rxjs/Rx'
import { ReplaySubject } from 'rxjs';


@Injectable()
export class OntologyService {
    private DOMAIN_API_URL = 'http://localhost:8000/domains'
    private DOMAIN_PERMISSIONS = 'http://localhost:8000/domainpermissions'
    private CONCEPT_API_URL = 'http://localhost:8000/concepts'
    private ALL_CONCEPT = 'http://localhost:8000/allconcepts'
    private headerContent = {'Content-Type': 'application/json', "Authorization": localStorage.getItem('user_token')}
    constructor(private http: Http) {}
  
    loadDomain_service(payload): Observable<DomainModel[]> {
        let params = new URLSearchParams();
        params.set("user_id", payload.user_id)
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("search_text", payload.search_text)

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
        params.set("skip", payload.skip)
        params.set("limit", payload.limit)
        params.set("search_text", payload.search_text)
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
  
    allConcept(): Observable<ConceptModel> {
        return this.http.get(this.ALL_CONCEPT)
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
  
    Editconcept(payload) {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});
        return this.http.put(this.CONCEPT_API_URL, JSON.stringify(payload))
        .map(res => res.json()["data"])
      //.subscribe(action => this.store.dispatch({ type: ONTOLOGY_ACTIONS.EDIT_DOMAIN, payload: domain }));
  }


    deleteDomain(payload) {

      let params = new URLSearchParams();
      params.set("user_id", payload.user.user_id)
      params.set("module_id", payload.domain.module_id)

      let headers = new Headers(this.headerContent);
        //let options = new RequestOptions({headers});   
        let options = new RequestOptions({search: params});  
      var url = this.DOMAIN_API_URL
      return this.http.delete(url, options)
      .map(res => res.json()["data"])
      
    }

    deleteConcept(payload) {

      let params = new URLSearchParams();
      params.set("user_id", payload.user.user_id)
      params.set("module_id", payload.module.module_id)

      let headers = new Headers(this.headerContent);
        //let options = new RequestOptions({headers});   
        let options = new RequestOptions({search: params});  
      var url = this.CONCEPT_API_URL
      return this.http.delete(url, options)
      .map(res => res.json()["data"])
      
    }
  
  }


