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
import * as _ from 'lodash';


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
    public domains$: Observable<any>;
    public user: UserModel
    public nanoskills$: Observable<any>;
    public subconcepts$: Observable<any>;
    public currentPage: number =1 

    public module;
    public pages: number[];
    public module_count$: Observable<number>;

    private nanoskills
    private loading: boolean;
    private preReqModulesOtherDomainsSettings = {};
    private preReqModulesSettings= {}
    private bloomTaxonomySettings = {}
    private difficultySettings = {}
    private skipnanoskillsSettings = {}
    
    private dropdownList =  [];
    private bloomTaxonomyData = [];
    private difficultyData = [];

    private allnanoskills = []
    private prereq_modules_all_parents = []
    private prereq_modules = []
    private difficulty = []
    private bloom_taxonomy = []
    private skip_nanoskills = []
    
    @Output() selectedNanoskill = new EventEmitter<NanoskillModel>();
    @Output() submitNanoskill = new EventEmitter<NanoskillModel>();
    @Output() editNanoskill = new EventEmitter<NanoskillModel>();
    @Output() deleteNanoskill = new EventEmitter<NanoskillModel>();
    

    
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>) {
        //this.selected_domain = this.store.select("Selecteddomain")
        this.nanoskills$ = this.store.select(fromRoot.getNanoskills);
        this.subconcepts$ = this.store.select(fromRoot.getSubConcepts);
        this.module_count$ = this.store.select(fromRoot.getNanoskillCount)
        this.permission$ = this.store.select(fromRoot.getNanoskillPermission)
        this.users$ = this.store.select(fromRoot.getUsers);
       // this.selectedDomain$ = this.store.select(fromRoot.getSelectdDomainId) 

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
                            text:"Prequisite Nanoskills  Other Subconcepts",
                            selectAllText:'Select All',
                            //unSelectAllText:'UnSelect All',
                            //enableSearchFilter: true,
                            // classes:"myclass custom-class"
                        };            
        this.preReqModulesSettings = { 
                            singleSelection: false, 
                            text:"Prerequisite Nanoskills",
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


        this.skipnanoskillsSettings = { 
                            singleSelection: true, 
                            text:"Nanoskills that can be skipped",
                        };        


        this.store.select(fromRoot.getAuthenticatedUser)
        .subscribe(value => {
            this.loggedUser = value
        });

        this.store.select(fromRoot.getAllNanoskills)
        .subscribe(value => {
            this.allnanoskills = value.map((object)=> {
                return {"id": object.module_id, "itemName": object.module_name }
            })
        });

        this.store.select(fromRoot.getNanoskillPages)
        .subscribe(value => {
            console.log(value)
            //this.pages = new Array(value);//create an empty array with length 45
            this.pages = Array(value).fill(0).map((e,i)=>i+1)

        });

        this.store.select(fromRoot.getNanoskills)
        .subscribe(value => {

            this.nanoskills = value.map((object)=> {
                return {"id": object.module_id, "itemName": object.module_name }
            })


        }
    );


        this.store.select(fromRoot.getSelectedSubConcept)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParentModule = value;
            this.store.dispatch(new actions.Loadnanoskill({"parent_id": value.module_id, "user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": null}))
            this.store.dispatch(new actions.Allnanoskill({"parent_id": this.selectedParentModule.module_id}))
            this.prereq_modules = []
        });

        this.store.select(fromRoot.getNanoskillPermissionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })

        this.store.select(fromRoot.getNanoskillError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

        this.store.select(fromRoot.getNanoskillMessage)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })
        
        this.store.select(fromRoot.getNanoskillLoading)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.loading = value
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
        this.prereq_modules = []
        this.prereq_modules_all_parents = []
    }
    
    editModuleSubmit(module){
    }
    
    submitEditForm(module){
        event.preventDefault()
        var data = Object.assign({}, this.module, {"prereq_modules_all_parents": this.modify_data(this.module.prereq_modules_all_parents), 
                                        "prereq_modules": this.modify_data(this.module.prereq_modules), 
                                        "difficulty": this.modify_data(this.module.difficulty), 
                                        "bloom_taxonomy": this.modify_data(this.module.bloom_taxonomy)                                      
                })

        console.log(data)
        this.editNanoskill.emit(data);
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
    //This is when a user clicks on the top add button in right of every module, 
    //A form will opened

    submitForm(module){
        this.moduleCreate = false;
        
        var data = Object.assign({}, module, {"prereq_modules_all_parents": this.modify_data(this.prereq_modules_all_parents), 
                                        "prereq_modules": this.modify_data(this.prereq_modules), 
                                        "difficulty": this.modify_data(this.difficulty), 
                                        "bloom_taxonomy": this.modify_data(this.bloom_taxonomy), 
                                        "skip_nanoskills": this.modify_data(this.skip_nanoskills),
                                                                             
                })

        this.submitNanoskill.emit(data);
        this.prereq_modules = []
        this.prereq_modules_all_parents = []
    }

    addModule(module){
        this.moduleCreate= true
        this.moduleEdit = false
    }
    
   editModule(module) {
      this.moduleEdit= true;    
      this.moduleCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.module = module;
      this.module =  _.cloneDeep(module);
      var taxonomy = this.module.bloom_taxonomy
      var difficulty = this.module.difficulty
      var prereq_modules_all_parents = this.module.prereq_modules_all_parents
      var prereq_modules = this.module.prereq_modules
      var skip_nanoskills = this.module.skip_nanoskills

      this.module.bloom_taxonomy = this.convert_data(taxonomy)
      this.module.difficulty = this.convert_data(difficulty)
      this.module.prereq_modules_all_parents = this.convert_data(prereq_modules_all_parents)
      this.module.prereq_modules = this.convert_data(prereq_modules)
      this.module.skip_nanoskills = this.convert_data(skip_nanoskills)

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