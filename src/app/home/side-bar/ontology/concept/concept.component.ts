import { toObservable } from '@angular/forms/src/validators';
import { OntologyModule } from '../ontology.module';
import { baseServeCommandOptions } from '@angular/cli/commands/serve';
import { Conditional } from '@angular/compiler';
import { ConceptModel, DomainModel} from '../../../../models/ontology.models';
import { UserModel} from '../../../../models/user.model';
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../../../../app.store"
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from 'angular2-materialize';
import * as fromRoot from '../../../../reducers';
import * as actions from '../../../../actions/ontology.actions';


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
    selectedDomain: DomainModel;
    //selected_domain: DomainModel;
    blooms= ["remembering", "understanding", "applyinging", "analyzing","synthesizing","evaluating"]
    //@Input() domain: Observable<DomainModel>;
    //@Input() domains: Array<DomainModel>;
    public domains$: Observable<any>;
    public user: UserModel
    public concepts$: Observable<any>;
    public currentPage: number

    public pages$: Observable<number>;    
    public module_count$: Observable<number>;    

    public subscriber_one 
    public subscriber_two 
    @Output() selectedConceptModule = new EventEmitter<ConceptModel>();
    @Output() submitConcept = new EventEmitter<ConceptModel>();
    @Output() editConcept = new EventEmitter<ConceptModel>();
    @Output() deleteConcept = new EventEmitter<ConceptModel>();

    
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>) {
        //this.selected_domain = this.store.select("Selecteddomain")
        this.domains$ = this.store.select(fromRoot.getDomains);
        this.concepts$ = this.store.select(fromRoot.getConcepts);
        this.pages$ = this.store.select(fromRoot.getConceptPages)
        this.module_count$ = this.store.select(fromRoot.getConceptCount)
       // this.selectedDomain$ = this.store.select(fromRoot.getSelectdDomainId) 

        this.pages$.subscribe((value) => console.log(value))
        this.module_count$.subscribe((value) => console.log(value))

    }

    ngOnInit(
    ){
        this.subscriber_one = this.store.select(fromRoot.getAuthenticatedUser)
        this.subscriber_one.subscribe(value => {
            this.user = value
        });


        this.store.select(fromRoot.getSelectedDomain)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedDomain = value;
            console.log(value)
            this.store.dispatch(new actions.Loadconcept({"parent_id": value.module_id, "user_id": this.user.user_id}))

        });

        console.log(this.selectedDomain)
    };
        
    ngOnDestroy(
    ){
        //this.subscriber_one.unsubscribe()
        //this.subscriber_two.unsubscribe()
    };
    selectModule(concept: ConceptModel) {
        this.selectedConceptModule.emit(concept);
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
    }


    pageConceptChanged(input){
        console.log(input)
        this.currentPage = input
        this.store.dispatch(new actions.Loadconcept({"parent_id": this.selectedDomain.module_id, "user_id": this.user.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadconcept({"parent_id": this.selectedDomain.module_id, "user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

}