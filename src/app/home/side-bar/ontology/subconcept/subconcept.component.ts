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
import * as _ from 'lodash';


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
    public module;
    public concepts$: Observable<any>;
    public subconcepts$: Observable<any>;
    public currentPage: number = 1 ;
    public subscriber_one 
    public subscriber_two 
    public pages: number[];
    public module_count$: Observable<number>;
    public subconcept: SubconceptModel

    private subconcepts
    private loading: boolean;
    private preReqModulesOtherDomainsSettings = {};
    private preReqModulesSettings= {}
    private bloomTaxonomySettings = {}
    private difficultySettings = {}
                            
    private dropdownList =  [];
    private bloomTaxonomyData = [];
    private difficultyData = [];

    private allsubconcepts = []
    private prereq_modules_all_parents = []
    private prereq_modules = []
    private difficulty
    private bloom_taxonomy = []
    private module_name: string 
    private module_id: string

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
                        this.module_count$ = this.store.select(fromRoot.getSubconceptCount)
                        this.permission$ = this.store.select(fromRoot.getSubconceptPermission)
                        this.users$ = this.store.select(fromRoot.getUsers);

}

    ngOnInit(){

        this.bloomTaxonomyData = [{"id": 1, "itemName": "Applying"}, {"id": 2, "itemName": "Analyzing"}, 
                        {"id": 3, "itemName": "Evaluating"}, {"id": 4, "itemName": "Synthesizing"}, 
                        {"id": 5, "itemName": "Comprehending"}, {"id": 6, "itemName": "Remembering"} ]

    
        this.difficultyData = [{"id": 1, "itemName": "First"}, {"id": 2, "itemName": "Second"}, 
                        {"id": 3, "itemName": "Third"}, 
                        {"id": 4, "itemName": "Fourth"}, {"id": 6, "itemName": "Fifth"} ]

        this.preReqModulesOtherDomainsSettings = { 
                            singleSelection: false, 
                            text:"Prequisite Subconcepts  Other Concepts",
                            selectAllText:'Select All',
                            //unSelectAllText:'UnSelect All',
                            //enableSearchFilter: true,
                            // classes:"myclass custom-class"
                        };            
        this.preReqModulesSettings = { 
                            singleSelection: false, 
                            text:"Prerequisite Subconcepts",
                            //selectAllText:'Select All',
                            //unSelectAllText:'UnSelect All',
                            //classes:"myclass custom-class"
                        };         

        this.bloomTaxonomySettings = { 
                            singleSelection: false, 
                            text:"Blooms Taxonomy",
                            //selectAllText:'Select All',
                            //unSelectAllText:'UnSelect All',
                            //classes:"myclass custom-class"
                        };         
        
        this.difficultySettings = { 
                            singleSelection: true, 
                            text:"Difficulty Level",
                            //selectAllText:'Select All',
                            //unSelectAllText:'UnSelect All',
                            //classes:"myclass custom-class"
                        }; 
        
        
        this.store.select(fromRoot.getSubconceptPages)
        .subscribe(value => {
            console.log(value)
            //this.pages = new Array(value);//create an empty array with length 45
            this.pages = Array(value).fill(0).map((e,i)=>i+1)

        });

        this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.loggedUser = value
        });

        this.store.select(fromRoot.getAllSubconcepts)
        .subscribe(value => {
            this.allsubconcepts = value.map((object)=> {
                return {"id": object.module_id, "itemName": object.module_name }
            })
        });


        this.store.select(fromRoot.getSubConcepts)
        .subscribe(value => {

            this.subconcepts = value.map((object)=> {
                return {"id": object.module_id, "itemName": object.module_name }
            })
        }
    );
        
        this.store.select(fromRoot.getSelectedConcept)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParentModule = value;
            console.log(value)
            this.store.dispatch(new actions.Loadsubconcept({"parent_id": value.module_id, "user_id": this.loggedUser.user_id}))
            this.store.dispatch(new actions.Allsubconcept({"parent_id": this.selectedParentModule.module_id}))
            this.prereq_modules = []
        });

        this.store.select(fromRoot.getSubconceptPermissionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })

        this.store.select(fromRoot.getSubconceptError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

        this.store.select(fromRoot.getSubconceptMessage)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })
        
        this.store.select(fromRoot.getSubconceptLoading)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.loading = value
            })


    };
    ngOnDestroy(){};
    selectModule(subconcept: SubconceptModel) {
        this.selectedSubconcept.emit(subconcept);
    }

    deleteModule(module) {
        this.deleteSubconcept.emit(module);
        this.prereq_modules = []
        this.prereq_modules_all_parents = []
    }

    addModule(){
        this.moduleCreate = true;   
        this.moduleEdit = false
 
    }

    modify_data(data){
        return data.map((object)=> {
            return {"module_id": object.id, "module_name": object.itemName}
        })
    }

    convert_data(data){
        return data.map((object)=> {
            return {"id": object.module_id, "itemName": object.module_name}
        })
    }

    submitForm(module: SubconceptModel){
        event.preventDefault()
        this.moduleCreate = false;  
        
        var data = Object.assign({}, module, {"prereq_modules_all_parents": this.modify_data(this.prereq_modules_all_parents), 
                                        "prereq_modules": this.modify_data(this.prereq_modules), 
                                        "difficulty": this.modify_data(this.difficulty), 
                                        "bloom_taxonomy": this.modify_data(this.bloom_taxonomy)                                      
                })

        this.prereq_modules = []
        this.prereq_modules_all_parents = [] 
        this.submitSubconcept.emit(data);
    }

    submitEditForm(module: SubconceptModel){
        event.preventDefault()
        var data = Object.assign({}, this.module, {"prereq_modules_all_parents": this.modify_data(this.module.prereq_modules_all_parents), 
                                        "prereq_modules": this.modify_data(this.module.prereq_modules), 
                                        "difficulty": this.modify_data(this.module.difficulty), 
                                        "bloom_taxonomy": this.modify_data(this.module.bloom_taxonomy)                                      
                })

        console.log(data)
      this.editSubconcept.emit(data);
    }
  
   editModule(module) {
      this.moduleEdit= true;    
      this.moduleCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.module = module;
      console.log("Edit clicked")
      console.log(module)
      this.module =  _.cloneDeep(module);
      var taxonomy = this.module.bloom_taxonomy
      var difficulty = this.module.difficulty
      var prereq_modules_all_parents = this.module.prereq_modules_all_parents
      var prereq_modules = this.module.prereq_modules
      this.module.bloom_taxonomy = this.convert_data(taxonomy)
      this.module.difficulty = this.convert_data(difficulty)
      this.module.prereq_modules_all_parents = this.convert_data(prereq_modules_all_parents)
      this.module.prereq_modules = this.convert_data(prereq_modules)

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