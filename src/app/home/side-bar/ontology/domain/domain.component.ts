import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import {DomainModel} from "../ontology.models"
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../../../../app.store"
 

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
    @Input() domains: DomainModel[];
    @Output() switchToConcept = new EventEmitter<DomainModel>();
    @Output() submitDomain = new EventEmitter<DomainModel>();
    @Output() editDomain = new EventEmitter<DomainModel>();
    @Output() deleteDomain = new EventEmitter<DomainModel>();
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor() {}

    ngOnInit(){};
    ngOnDestroy(){};
    shiftTab(domain: DomainModel) {
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