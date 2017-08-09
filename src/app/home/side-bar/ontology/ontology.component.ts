import { observable } from 'rxjs/symbol/observable';
import { Observable } from 'rxjs/Rx';
import { JQueryStyleEventEmitter } from 'rxjs/observable/FromEventObservable';
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {DomainModel, ConceptModel} from "./ontology.models";
import {OntologyService} from "./ontology.service"
import { Store } from '@ngrx/store';
import {ApplicationStore} from "../../../app.store"
import{ONTOLOGY_ACTIONS} from "./ontology.actions"

@Component({
  selector: 'app-domain',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.css']
})
export class OntologyComponent implements OnInit {

    public domains: Observable<Array<DomainModel>>;
    public concepts: Observable<Array<ConceptModel>>;
    public globalDomain: DomainModel;
    public globalConcept: ConceptModel;
    constructor(private store: Store<ApplicationStore>, private service: OntologyService, domains: Observable<any>) {
        this.domains = store.select("domains");
        /*
        this.concepts = store.select(state=> state.concepts.concept_id)
                        .filter(this.globalDomain.domain_id)
        */
        //this.concepts = store.select("concepts")
    }
          
    ngOnInit() {
  }

    _addConcept(domain: DomainModel){
        console.log(domain)
        this.globalDomain = domain;
    }

    _submitDomain(domain: DomainModel){
        console.log(domain)
        this.service.createDomain(domain)
        this.store.dispatch({type: ONTOLOGY_ACTIONS.LOAD_DOMAIN})

    }

    _submitConcept(concept: ConceptModel){
        console.log(concept)
        this.service.createConcept(concept)
        this.store.dispatch({type: ONTOLOGY_ACTIONS.LOAD_CONCEPT})

    }

    _editDomain(domain: DomainModel){
        console.log(domain)
        this.service.editDomain(domain)
        this.store.dispatch({type: ONTOLOGY_ACTIONS.LOAD_DOMAIN})
        

    }
   _deleteDomain(domain: DomainModel){
        console.log("Domain That needs to be deleted" + domain)
        this.service.deleteDomain(domain)
        this.store.dispatch({type: ONTOLOGY_ACTIONS.LOAD_DOMAIN})
        
    }


  

}