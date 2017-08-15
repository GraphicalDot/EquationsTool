import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import {DomainModel} from "../../../../models/ontology.models"
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import * as fromRoot from "../../../../reducers"
 

/*
Intend to use normalizer to make things easier for ngrx store
for example nested objects like
    id
    title
        author:{}
        comments:[
                id:
                content
                    commentrator:
                        id
                        name

        ]

inour case, the nested objects will be like
domains:
    concepts:
        suconcepts:
            nanoskills

*/

@Component({
  selector: 'app-childdomain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DomainComponent implements OnInit, OnDestroy {
    public domainCreate: boolean
    public domainEdit: boolean
    public domain: DomainModel;
    domains: Observable<any>;
    @Output() switchToConcept = new EventEmitter<DomainModel>();
    @Output() submitDomain = new EventEmitter<DomainModel>();
    @Output() editDomain = new EventEmitter<DomainModel>();
    @Output() deleteDomain = new EventEmitter<DomainModel>();
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>) {
                        this.domains = this.store.select(fromRoot.getDomains);


    }

    ngOnInit(){};
    ngOnDestroy(){};
    addConcept(domain: DomainModel) {
        this.switchToConcept.emit(domain);
    }
    delete(domain) {
        this.deleteDomain.emit(domain);
    }
    addDomain(){
      this.domainCreate = true;    
    }
    submitForm(domain:DomainModel){
        this.domainCreate = false;  
        this.submitDomain.emit(domain);
    }
  
    edit(domain) {
      this.domainEdit= true;    
      this.domainCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.domain = domain;
      this.editDomain.emit(domain);
    }
}