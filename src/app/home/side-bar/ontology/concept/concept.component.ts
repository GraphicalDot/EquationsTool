import { observable } from 'rxjs/symbol/observable';
import { baseServeCommandOptions } from '@angular/cli/commands/serve';
import { Conditional } from '@angular/compiler';
import { ConceptModel, DomainModel, SubConceptModel } from '../ontology.models';
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../../../../app.store"
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from 'angular2-materialize';


@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss'],

    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ConceptComponent implements OnInit {
     model: string;
     domain_name: string;
     domain_id: number;
    modelChange = new EventEmitter();
    public conceptCreate: boolean
    public conceptEdit: boolean
    public concept: ConceptModel;
    selected_domain: Observable<DomainModel>;
    //selected_domain: DomainModel;
    blooms= ["remembering", "understanding", "applyinging", "analyzing","synthesizing","evaluating"]
    ifDomain: boolean = false;
    //@Input() domain: Observable<DomainModel>;
    //@Input() domains: Array<DomainModel>;
    domains: Observable<Array<DomainModel>>;
    concepts: Observable<Array<ConceptModel>>;
    @Output() addSubConceptHandler = new EventEmitter<ConceptModel>();
    @Output() submitConcept = new EventEmitter<ConceptModel>();
    @Output() editConcept = new EventEmitter<ConceptModel>();
    @Output() deleteConcept = new EventEmitter<ConceptModel>();

    
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<ApplicationStore>) {
        this.selected_domain = this.store.select("Selecteddomain")
        this.concepts = this.store.select("concepts")
        this.domains = this.store.select("domains")
    }

    ngOnInit(){
            if (this.selected_domain != undefined){
                this.ifDomain = true;
            }
    };
        
    ngOnDestroy(){};
    addSubConcept(concept: ConceptModel) {
        this.addSubConceptHandler.emit(concept);
    }
    delete(domain) {
        this.deleteConcept.emit(domain);
    }
    addDomain(){
      this.conceptCreate = true;    
    }
    submitForm(concept: ConceptModel){
        this.conceptCreate = false;  
        this.submitConcept.emit(concept);
    }
    addConcept(){
        this.conceptCreate = true;  
      
    }
  
    edit(concept) {
      this.conceptEdit= true;    
      this.conceptCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.concept = concept;
      this.editConcept.emit(concept);
    }
    change(newValue) {
      Materialize.toast('child select', 2000)
      this.model = newValue;
      this.modelChange.emit(newValue);
      console.log(this.selected_domain)
    }
}