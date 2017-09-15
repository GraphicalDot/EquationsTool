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
import * as Permissionactions from '../../../../actions/permissions.actions'
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';

@Component({
    selector: 'app-concept',
    templateUrl: './concept.component.html',
    styleUrls: ['./concept.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush

})
export class ConceptComponent implements OnInit {
    public permission_module: ConceptModel // This will be selected when a user clicks on +permissions
    public addPermissionFlag: boolean = false
    public loggedUser: UserModel;
    public permission$: Observable<any>
    public targeted_user_id: string
    public selectedParentModule: DomainModel
    public users$: Observable<UserModel[]>


    public moduleCreate: boolean
    public moduleEdit: boolean
    public module: ConceptModel;
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
        this.users$ = this.store.select(fromRoot.getUsers);
        this.permission$ = this.store.select(fromRoot.getDomainPermission)

        this.pages$.subscribe((value) => console.log(value))
        this.module_count$.subscribe((value) => console.log(value))
        this.permission$ = this.store.select(fromRoot.getConceptPermission)

    }

    ngOnInit(
    ){
        this.store.select(fromRoot.getAuthenticatedUser)
        .subscribe(value => {
            this.loggedUser = value
        });


        this.store.select(fromRoot.getSelectedDomain)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParentModule = value;
            console.log(value)
            this.store.dispatch(new actions.Loadconcept({"parent_id": value.module_id, "user_id": this.loggedUser.user_id}))

        });

        this.store.select(fromRoot.getConceptPermissionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })
            

    };
        
    ngOnDestroy(
    ){
        //this.subscriber_one.unsubscribe()
        //this.subscriber_two.unsubscribe()
    };



    deleteModule(module) {
        this.deleteConcept.emit(module);
    }

    //This is when a user clicks ont he red button on the top, which will open a new form to create a new module
    addModule(){
      this.moduleCreate = true;    
    }
    

    //This will be called when a user clicks on the add children: Add subconcpts button
    selectModule(module) {
        console.log("This is the module which got selected")
        this.selectedConceptModule.emit(module);
    }

    submitForm(module: ConceptModel){
        this.moduleCreate = false;  
        this.submitConcept.emit(module);
    }

    
    editModule(module) {
      this.moduleEdit= true;    
      this.moduleCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.module = module;
    }

    //When user clicks on submit after editing the module
    editModuleSubmit(module){
      this.editConcept.emit(module);
    }


    pageConceptChanged(input){
        console.log(input)
        this.currentPage = input
        this.store.dispatch(new actions.Loadconcept({"parent_id": this.selectedParentModule.module_id, "user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadconcept({"parent_id": this.selectedParentModule.module_id, "user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

    
    addPermissions(module){
        this.permission_module = module
        console.log(this.permission_module)
        this.addPermissionFlag = true
        this.moduleCreate = false
        this.moduleEdit = false
        if (this.targeted_user_id){
            //var aPromise = this.service.DomainPermission({"user_id": this.targeted_user_id, "module_id": this.permission_domain.module_id, "skip": 0, "limit": 15}).toPromise()
            this.store.dispatch(new Permissionactions.Loadpermissionconcept({"user_id": this.targeted_user_id, 
                                                                                "url": "conceptpermissions",
                                                                                "module_id": this.permission_module.module_id, 
                                                                                "skip": 0, 
                                                                                "limit": 15}))
        }
        }
    
    onUserChange(value){
        this.targeted_user_id = value
        this.store.dispatch(new Permissionactions.Loadpermissionconcept({"user_id": this.targeted_user_id, 
                                                                        "url": "conceptpermissions",
                                                                        "module_id": this.permission_module.module_id, 
                                                                        "skip": 0, 
                                                                        "limit": 15}))
    
    }

    submitPermissions(value){
        console.log(value)
        this.store.dispatch(new Permissionactions.Editpermissionconcept({"user_id": this.loggedUser.user_id, 
                                                    "target_user_id": this.targeted_user_id,
                                                    "parent_id": this.selectedParentModule.module_id,
                                                    "url": "conceptpermissions",
                                                    "module_id": this.permission_module.module_id,
                                                    "permission": value}))
    }



}