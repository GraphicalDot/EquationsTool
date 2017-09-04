import { baseServeCommandOptions } from '@angular/cli/commands/serve';
import { Conditional } from '@angular/compiler';
import { ConceptModel, DomainModel} from '../../../../models/ontology.models';
import { UserModel} from '../../../../models/user.model';
import {SubconceptModel} from '../../../../models/subconcept.model';
import {NanoskillModel} from '../../../../models/nanoskill.model';

import {State, Store} from "@ngrx/store"
import { Observable, ObservableInput } from 'rxjs/Observable';
import {ApplicationStore} from "../../../../app.store"
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from 'angular2-materialize';
import * as fromRoot from '../../../../reducers';
import * as actions from '../../../../actions/nanoskill.actions';
import {NgxPaginationModule} from 'ngx-pagination';

@Component({
  selector: 'app-nanoskill',
  templateUrl: './nanoskill.component.html',
  styleUrls: ['./nanoskill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NanoskillComponent implements OnInit, OnDestroy {

public openAdd: boolean
    public openEdit: boolean
    public module: NanoskillModel;
    public selectedParent: SubconceptModel
    public domains$: Observable<any>;
    public user: UserModel
    public nanoskills$: Observable<any>;
    public subconcepts$: Observable<any>;
    public currentNanoskillPage: number;

    public subscriber_one 
    public subscriber_two 
    public pages$: Observable<number>;
    public nanoskill_module_count$: Observable<number>;
    
    @Output() selectedNanoskill = new EventEmitter<NanoskillModel>();
    @Output() submitNanoskill = new EventEmitter<NanoskillModel>();
    @Output() editNanoskill = new EventEmitter<NanoskillModel>();
    @Output() deleteNanoskill = new EventEmitter<NanoskillModel>();
    

    
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>) {
        //this.selected_domain = this.store.select("Selecteddomain")
        this.nanoskills$ = this.store.select(fromRoot.getNanoskills);
        this.subconcepts$ = this.store.select(fromRoot.getSubConcepts);
        this.pages$ = this.store.select(fromRoot.getNanoskillPages)
        this.nanoskill_module_count$ = this.store.select(fromRoot.getNanoskillCount)

       // this.selectedDomain$ = this.store.select(fromRoot.getSelectdDomainId) 

    }

    ngOnInit(){
        this.subscriber_two = this.store.select(fromRoot.getAuthenticatedUser)
        this.subscriber_two.subscribe(value => {
            this.user = value
        });


        this.store.select(fromRoot.getSelectedSubConcept)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParent = value;
            this.store.dispatch(new actions.Loadnanoskill({"parent_id": value.module_id, "user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": null}))

        });

    };
        
    ngOnDestroy(){
        //this.subscriber_one.unsubscribe()
        //this.subscriber_two.unsubscribe()
    };
    select(module) {
        this.selectedNanoskill.emit(module);
    }
    delete(module) {
        this.deleteNanoskill.emit(module);
    }
    
    editModule(module){
      this.editNanoskill.emit(module);
    }
    
    //This is when a user clicks on the top add button in right of every module, 
    //A form will opened
    addModule(module){
        this.submitNanoskill.emit(module);
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

    pageNanoskillChanged(input){
        console.log("changed nanoskill clicked")
        this.currentNanoskillPage = input
        this.store.dispatch(new actions.Loadnanoskill({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadnanoskill({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }
}