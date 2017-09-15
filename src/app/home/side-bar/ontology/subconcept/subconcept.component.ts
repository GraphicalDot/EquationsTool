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
import * as Permissionactions from '../../../../actions/permissions.actions'
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-subconcept',
  templateUrl: './subconcept.component.html',
  styleUrls: ['./subconcept.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class SubconceptComponent implements OnInit, OnDestroy {
    public permission_module: SubconceptModel // This will be selected when a user clicks on +permissions
    public addPermissionFlag: boolean = false
    public loggedUser: UserModel;
    public permission$: Observable<any>
    public targeted_user_id: string
    public selectedParentModule: ConceptModel
    public users$: Observable<UserModel[]>
    public user: UserModel

    public moduleCreate: boolean
    public moduleEdit: boolean
    public module: SubconceptModel;
    public concepts$: Observable<any>;
    public subconcepts$: Observable<any>;
    public currentPage: number;
    public subscriber_one 
    public subscriber_two 
    public pages$: Observable<number>;
    public module_count$: Observable<number>;
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
                        this.module_count$ = this.store.select(fromRoot.getSubconceptCount)
                        this.permission$ = this.store.select(fromRoot.getSubconceptPermission)
                        this.users$ = this.store.select(fromRoot.getUsers);

}

    ngOnInit(){
        this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.loggedUser = value
        });

        
        this.store.select(fromRoot.getSelectedConcept)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParentModule = value;
            console.log(value)
            this.store.dispatch(new actions.Loadsubconcept({"parent_id": value.module_id, "user_id": this.loggedUser.user_id}))

        });

        this.store.select(fromRoot.getSubconceptPermissionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })

    };
    ngOnDestroy(){};
    selectModule(subconcept: SubconceptModel) {
        this.selectedSubconcept.emit(subconcept);
    }

    deleteModule(module) {
        this.deleteSubconcept.emit(module);
    }

    addModule(){
      this.moduleCreate = true;    
    }
    submitForm(module: SubconceptModel){
        var data = Object.assign({}, module, {"parent_id": this.selectedParentModule.module_id, "user_id": this.loggedUser.user_id, "username": this.loggedUser.username})
        this.moduleCreate= false;  
        this.submitSubconcept.emit(data);
    }
  
    editModule(module: SubconceptModel) {
      this.moduleEdit= true;    
      this.moduleCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.subconcept = module;
    }

    editModuleSubmit(module){
      this.editSubconcept.emit(module);
    }

    pageSubconceptChanged(input){
        this.currentPage = input
        this.store.dispatch(new actions.Loadsubconcept({"parent_id": this.selectedParentModule.module_id,"user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadsubconcept({"parent_id": this.selectedParentModule.module_id,"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

    
    addPermissions(module){
        this.permission_module = module
        console.log(this.permission_module)
        this.addPermissionFlag = true
        this.moduleCreate = false
        this.moduleEdit = false
        if (this.targeted_user_id){
            //var aPromise = this.service.DomainPermission({"user_id": this.targeted_user_id, "module_id": this.permission_domain.module_id, "skip": 0, "limit": 15}).toPromise()
            this.store.dispatch(new Permissionactions.Loadpermissionsubconcept({"user_id": this.targeted_user_id, 
                                                                                "url": "subconceptpermissions",
                                                                                "module_id": this.permission_module.module_id, 
                                                                                "skip": 0, 
                                                                                "limit": 15}))
        }
        }
    
    onUserChange(value){
        this.targeted_user_id = value
        this.store.dispatch(new Permissionactions.Loadpermissionsubconcept({"user_id": this.targeted_user_id, 
                                                                        "url": "subconceptpermissions",
                                                                        "module_id": this.permission_module.module_id, 
                                                                        "skip": 0, 
                                                                        "limit": 15}))
    
    }

    submitPermissions(value){
        console.log(value)
        this.store.dispatch(new Permissionactions.Editpermissionsubconcept({"user_id": this.loggedUser.user_id, 
                                                    "target_user_id": this.targeted_user_id,
                                                    "parent_id": this.selectedParentModule.module_id,
                                                    "url": "subconceptpermissions",
                                                    "module_id": this.permission_module.module_id,
                                                    "permission": value}))
    }

}