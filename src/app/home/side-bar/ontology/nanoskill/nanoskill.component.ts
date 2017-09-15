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
import * as Permissionactions from '../../../../actions/permissions.actions'
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';


@Component({
  selector: 'app-nanoskill',
  templateUrl: './nanoskill.component.html',
  styleUrls: ['./nanoskill.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class NanoskillComponent implements OnInit, OnDestroy {

    public permission_module: NanoskillModel // This will be selected when a user clicks on +permissions
    public addPermissionFlag: boolean = false
    public loggedUser: UserModel;
    public permission$: Observable<any>
    public targeted_user_id: string
    public selectedParentModule: SubconceptModel
    public users$: Observable<UserModel[]>

    public moduleCreate: boolean
    public moduleEdit: boolean
    public module: NanoskillModel;
    public domains$: Observable<any>;
    public user: UserModel
    public nanoskills$: Observable<any>;
    public subconcepts$: Observable<any>;
    public currentPage: number;

    public pages$: Observable<number>;
    public module_count$: Observable<number>;
    
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
        this.module_count$ = this.store.select(fromRoot.getNanoskillCount)
        this.permission$ = this.store.select(fromRoot.getNanoskillPermission)
        this.users$ = this.store.select(fromRoot.getUsers);
       // this.selectedDomain$ = this.store.select(fromRoot.getSelectdDomainId) 

    }

    ngOnInit(){
        this.store.select(fromRoot.getAuthenticatedUser)
        .subscribe(value => {
            this.loggedUser = value
        });


        this.store.select(fromRoot.getSelectedSubConcept)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParentModule = value;
            this.store.dispatch(new actions.Loadnanoskill({"parent_id": value.module_id, "user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": null}))

        });

        this.store.select(fromRoot.getNanoskillPermissionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })


    };
        
    ngOnDestroy(){
        //this.subscriber_one.unsubscribe()
        //this.subscriber_two.unsubscribe()
    };
    selectModule(module) {
        this.selectedNanoskill.emit(module);
    }
    delete(module) {
        this.deleteNanoskill.emit(module);
    }
    
    editModuleSubmit(module){
      this.editNanoskill.emit(module);
    }
    
    //This is when a user clicks on the top add button in right of every module, 
    //A form will opened
    submitForm(module){
        this.submitNanoskill.emit(module);
    }

    addModule(module){
        this.moduleCreate= true
        this.moduleEdit = false
    }
    
    editModule(module) {
      this.moduleEdit= true;    
      this.moduleCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.module = module;
    }

    pageNanoskillChanged(input){
        console.log("changed nanoskill clicked")
        this.currentPage = input
        this.store.dispatch(new actions.Loadnanoskill({"parent_id": this.selectedParentModule.module_id, "user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadnanoskill({"parent_id": this.selectedParentModule.module_id, "user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

        
    addPermissions(module){
        this.permission_module = module
        console.log(this.permission_module)
        this.addPermissionFlag = true
        this.moduleCreate = false
        this.moduleEdit = false
        if (this.targeted_user_id){
            //var aPromise = this.service.DomainPermission({"user_id": this.targeted_user_id, "module_id": this.permission_domain.module_id, "skip": 0, "limit": 15}).toPromise()
            this.store.dispatch(new Permissionactions.Loadpermissionnanoskill({"user_id": this.targeted_user_id, 
                                                                                "url": "nanoskillpermissions",
                                                                                "module_id": this.permission_module.module_id, 
                                                                                "skip": 0, 
                                                                                "limit": 15}))
        }
        }
    
    onUserChange(value){
        this.targeted_user_id = value
        this.store.dispatch(new Permissionactions.Loadpermissionnanoskill({"user_id": this.targeted_user_id, 
                                                                        "url": "nanoskillpermissions",
                                                                        "module_id": this.permission_module.module_id, 
                                                                        "skip": 0, 
                                                                        "limit": 15}))
    
    }

    submitPermissions(value){
        console.log(value)
        this.store.dispatch(new Permissionactions.Editpermissionnanoskill({"user_id": this.loggedUser.user_id, 
                                                    "target_user_id": this.targeted_user_id,
                                                    "parent_id": this.selectedParentModule.module_id,
                                                    "url": "nanoskillpermissions",
                                                    "module_id": this.permission_module.module_id,
                                                    "permission": value}))
    }

}