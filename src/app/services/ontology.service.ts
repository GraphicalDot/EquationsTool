import { NgAnalyzedModules } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Http, Response, Request, RequestOptions, Headers} from '@angular/http';
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
  
    loadDomain_service(): Observable<DomainModel[]> {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});   
         return this.http.get(this.DOMAIN_API_URL, options)
                .map(res => res.json()["data"])
      }
  
    
    loadConcepts(): Observable<ConceptModel[]> {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});   
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
    editDomain(domain: DomainModel) {
        let headers = new Headers(this.headerContent);
        let options = new RequestOptions({headers});
        var url = this.DOMAIN_API_URL + "/" + domain.domain_id
        this.http.put(url, JSON.stringify(domain), options)
      //.subscribe(action => this.store.dispatch({ type: ONTOLOGY_ACTIONS.EDIT_DOMAIN, payload: domain }));
  }
  
    deleteDomain(domain: DomainModel) {
      let headers = new Headers(this.headerContent);
      let options = new RequestOptions({headers});
      console.log(domain.domain_id + "from the delet domain")
      var url = this.DOMAIN_API_URL + "/" + domain.domain_id
      return this.http.delete(url, options)
      .map(res => {res.json()["data"]})
      
    }
  
  }


