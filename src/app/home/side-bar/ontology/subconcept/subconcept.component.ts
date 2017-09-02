import { OntologyModule } from '../ontology.module';
import { baseServeCommandOptions } from '@angular/cli/commands/serve';
import { Conditional } from '@angular/compiler';
import { ConceptModel, DomainModel} from '../../../../models/ontology.models';
import { UserModel} from '../../../../models/user.model';
import {SubconceptModel} from '../../../../models/subconcept.model';

import {State, Store} from "@ngrx/store"
import { Observable, ObservableInput } from 'rxjs/Observable';
import {ApplicationStore} from "../../../../app.store"
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from 'angular2-materialize';
import * as fromRoot from '../../../../reducers';
import * as actions from '../../../../actions/subconcept.actions';

@Component({
  selector: 'app-subconcept',
  templateUrl: './subconcept.component.html',
  styleUrls: ['./subconcept.component.scss']
})
export class SubconceptComponent implements OnInit {
    public openAdd: boolean
    public openEdit: boolean
    public module: SubconceptModel;
    public selectedParent: ConceptModel
    public domains$: Observable<any>;
    public user: UserModel
    public concepts$: Observable<any>;
    public subconcepts$: Observable<any>;
    public currentPage: number;
    public subscriber_one 
    public subscriber_two 
    public pages$: Observable<number>;
    public module_count$: Observable<number>;

    @Output() selectedModule = new EventEmitter<SubconceptModel>();
    @Output() submitSubconcept = new EventEmitter<SubconceptModel>();
    @Output() editSubconcept = new EventEmitter<SubconceptModel>();
    @Output() deleteSubconcept = new EventEmitter<SubconceptModel>();

    
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>) {
        //this.selected_domain = this.store.select("Selecteddomain")
        this.concepts$ = this.store.select(fromRoot.getConcepts);
        this.subconcepts$ = this.store.select(fromRoot.getSubConcepts);
        this.pages$ = this.store.select(fromRoot.getSubconceptPages)
        this.module_count$ = this.store.select(fromRoot.getSubconceptCount)
       // this.selectedDomain$ = this.store.select(fromRoot.getSelectdDomainId) 

    }

    ngOnInit(){
        this.subscriber_two = this.store.select(fromRoot.getAuthenticatedUser)
        this.subscriber_two.subscribe(value => {
            this.user = value
        });


        this.store.select(fromRoot.getSelectedConcept)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParent = value;
            console.log(value)
            this.store.dispatch(new actions.Loadsubconcept({"parent_id": value.module_id, "user_id": this.user.user_id}))

        });

        console.log(this.selectedParent)
    };
        
    ngOnDestroy(){
        //this.subscriber_one.unsubscribe()
        //this.subscriber_two.unsubscribe()
    };
    select(concept: SubconceptModel) {
        this.selectedModule.emit(concept);
    }
    delete(module) {
        this.deleteSubconcept.emit(module);
    }
    
    editModule(module){
      this.editSubconcept.emit(module);
        
    }
    
    //This is when a user clicks on the top add button in right of every module, 
    //A form will opened
    addModule(module){
        this.submitSubconcept.emit(module);

    }

    addModuleButton(module){
        this.openAdd= true
        this.openEdit = false
    }
    
    edit(module) {
      this.openEdit= true;    
      this.openAdd = false; //This will close the add new nanoskill form just to avoid confusion   
      this.module = module;
    }
    change(newValue) {
      Materialize.toast('child select', 2000)
    }
    
    pageConceptChanged(input){
        console.log(input)
        this.currentPage = input
        this.store.dispatch(new actions.Loadsubconcept({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadsubconcept({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }


}