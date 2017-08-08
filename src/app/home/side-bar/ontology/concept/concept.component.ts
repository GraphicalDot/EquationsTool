import { Conditional } from '@angular/compiler';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { ConceptModel, DomainModel, SubConceptModel } from '../ontology.models';
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../../../../app.store"

@Component({
  selector: 'app-concept',
  templateUrl: './concept.component.html',
  styleUrls: ['./concept.component.scss']
})
export class ConceptComponent implements OnInit {

    public conceptCreate: boolean
    public conceptEdit: boolean
    public concept: ConceptModel;
    @Input() concepts: Array<ConceptModel>
    @Input() domain: DomainModel[];
    @Input() domains: Array<DomainModel>;
    @Output() addSubConceptHandler = new EventEmitter<ConceptModel>();
    @Output() submitConcept = new EventEmitter<ConceptModel>();
    @Output() editConcept = new EventEmitter<ConceptModel>();
    @Output() deleteConcept = new EventEmitter<ConceptModel>();
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor() {}

    ngOnInit(){};
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
}