import { OntologyModule } from '../ontology.module';
import { baseServeCommandOptions } from '@angular/cli/commands/serve';
import { Conditional } from '@angular/compiler';
import { ConceptModel, DomainModel} from '../../../../models/ontology.models';
import { UserModel} from '../../../../models/user.model';
import {SubconceptModel} from '../../../../models/subconcept.model';
import {NgxPaginationModule} from 'ngx-pagination';

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
  styleUrls: ['./subconcept.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SubconceptComponent implements OnInit, OnDestroy {
    public openAdd: boolean
    public openEdit: boolean
    public module: SubconceptModel;
    public selectedParent: ConceptModel
    public user: UserModel
    public concepts$: Observable<any>;
    public subconcepts$: Observable<any>;
    public currentSubConceptPage: number;
    public subscriber_one 
    public subscriber_two 
    public pages$: Observable<number>;
    public subconcept_module_count$: Observable<number>;
    public subconcept: SubconceptModel
    @Output() selectedSubconcept = new EventEmitter<SubconceptModel>();
    @Output() submitSubconcept = new EventEmitter<SubconceptModel>();
    @Output() editSubconcept = new EventEmitter<SubconceptModel>();
    @Output() deleteSubconcept = new EventEmitter<SubconceptModel>();

    
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>) {
                        this.concepts$ = this.store.select(fromRoot.getConcepts);
                        this.subconcepts$ = this.store.select(fromRoot.getSubConcepts);
                        //this.user$ = this.store.select(fromRoot.getAuthenticatedUser) 
    //                    this.user$ = this.store.select(fromRoot.getAuthenticatedUser) 
                        this.pages$ = this.store.select(fromRoot.getSubconceptPages)
                        this.subconcept_module_count$ = this.store.select(fromRoot.getSubconceptCount)

}

    ngOnInit(){
        this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.user = value
        });

        
        this.store.select(fromRoot.getSelectedConcept)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParent = value;
            console.log(value)
            this.store.dispatch(new actions.Loadsubconcept({"parent_id": value.module_id, "user_id": this.user.user_id}))

        });

    };
    ngOnDestroy(){};
    selectSubconcept(subconcept: SubconceptModel) {
        this.selectedSubconcept.emit(subconcept);
    }
    delete(subconcept: SubconceptModel) {
        this.deleteSubconcept.emit(subconcept);
    }
    addDomain(){
      this.openAdd = true;    
    }
    submitForm(subconcept: SubconceptModel){
        var data = Object.assign({}, subconcept, {"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "username": this.user.username})
        this.openAdd = false;  
        this.submitSubconcept.emit(data);
    }
  
    edit(subconcept: SubconceptModel) {
      this.openEdit= true;    
      this.openAdd = false; //This will close the add new nanoskill form just to avoid confusion   
      this.subconcept = subconcept;
      this.editSubconcept.emit(subconcept);
    }

    pageDomainChanged(input){
        console.log("Domain changed clicked" + input)
        this.currentSubConceptPage = input
        this.store.dispatch(new actions.Loadsubconcept({"parent_id": this.selectedParent.module_id,"user_id": this.user.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadsubconcept({"parent_id": this.selectedParent.module_id,"user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

}