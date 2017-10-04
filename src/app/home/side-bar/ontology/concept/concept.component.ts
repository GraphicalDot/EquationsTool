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
import * as _ from 'lodash';


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
    public module
    //selected_domain: DomainModel;
    blooms= ["remembering", "understanding", "applyinging", "analyzing","synthesizing","evaluating"]
    //@Input() domain: Observable<DomainModel>;
    //@Input() domains: Array<DomainModel>;
    public domains$: Observable<any>;
    public user: UserModel
    private concepts$: Observable<any>;
    public currentPage: number
    private pages$: Observable<number>;    
    private module_count$: Observable<number>;    
    private myConcepts
    private loading: boolean;
    private preReqModulesOtherDomainsSettings = {};
    private preReqModulesSettings= {}
    private bloomTaxonomySettings = {}
    private difficultySettings = {}
                            
    private dropdownList =  [];
    private bloomTaxonomyData = [];
    private difficultyData = [];

    private allconcepts = []
    private prereq_modules_all_parents = []
    private prereq_modules = []
    private difficulty
    private bloom_taxonomy = []
    private module_name: string 
    private module_id: string

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

    ngOnInit(){
            this.bloomTaxonomyData = [{"id": 1, "itemName": "Applying"}, {"id": 2, "itemName": "Analyzing"}, 
                                {"id": 3, "itemName": "Evaluating"}, {"id": 4, "itemName": "Synthesizing"}, 
                                {"id": 5, "itemName": "Comprehending"}, {"id": 6, "itemName": "Remembering"} ]

            this.difficultyData = [{"id": 1, "itemName": "First"}, {"id": 2, "itemName": "Second"}, 
                                {"id": 3, "itemName": "Third"}, 
                                {"id": 4, "itemName": "Fourth"}, {"id": 6, "itemName": "Fifth"} ]
 
                this.preReqModulesOtherDomainsSettings = { 
                                  singleSelection: false, 
                                  text:"Prequisite Concepts  Other Domains",
                                  selectAllText:'Select All',
                                  //unSelectAllText:'UnSelect All',
                                  //enableSearchFilter: true,
                                 // classes:"myclass custom-class"
                                };            
                this.preReqModulesSettings = { 
                                  singleSelection: false, 
                                  text:"Prerequisite Concepts",
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



        this.store.select(fromRoot.getAuthenticatedUser)
        .subscribe(value => {
            this.loggedUser = value
        });

        this.store.select(fromRoot.getAllConcepts)
        .subscribe(value => {
            this.allconcepts = value.map((object)=> {
                return {"id": object.module_id, "itemName": object.module_name }
            })
        });


        this.store.select(fromRoot.getConcepts)
        .subscribe(value => {

            this.myConcepts = value.map((object)=> {
                return {"id": object.module_id, "itemName": object.module_name }
            })
        }
    );


        this.store.select(fromRoot.getSelectedDomain)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParentModule = value;
            console.log(value)
            this.store.dispatch(new actions.Loadconcept({"parent_id": value.module_id, "user_id": this.loggedUser.user_id, "skip": 0, "limit": 1000}))
            //This will fetch all the modules irrespective of the parent_id, in this case irrespective of the parent domain id
            this.store.dispatch(new actions.Allconcept({"parent_id": this.selectedParentModule.module_id}))
            this.prereq_modules = []
        });

        this.store.select(fromRoot.getConceptPermissionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })
            
        
          
        this.store.select(fromRoot.getConceptError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

        this.store.select(fromRoot.getConceptMessage)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })
        
        this.store.select(fromRoot.getConceptLoading)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.loading = value
            })



    };
        
    ngOnDestroy(
    ){
        //this.subscriber_one.unsubscribe()
        //this.subscriber_two.unsubscribe()
    };



    deleteModule(module) {

        this.deleteConcept.emit(module);
        this.prereq_modules = []
        this.prereq_modules_all_parents = []
    }

    //This is when a user clicks ont he red button on the top, which will open a new form to create a new module
    addModule(){
      this.moduleCreate = true;   
      this.moduleEdit = false
    }
    

    //This will be called when a user clicks on the add children: Add subconcpts button
    selectModule(module) {
        this.selectedConceptModule.emit(module);
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


    submitForm(module: ConceptModel){
        this.moduleCreate = false;  
        
        var data = Object.assign({}, module, {"prereq_modules_all_parents": this.modify_data(this.prereq_modules_all_parents), 
                                        "prereq_modules": this.modify_data(this.prereq_modules), 
                                        "difficulty": this.modify_data(this.difficulty), 
                                        "bloom_taxonomy": this.modify_data(this.bloom_taxonomy)                                      
                })

        this.submitConcept.emit(data);
        this.prereq_modules = []
        this.prereq_modules_all_parents = []
    }

    submitEditForm(module: ConceptModel){
        event.preventDefault()
        var data = Object.assign({}, this.module, {"prereq_modules_all_parents": this.modify_data(this.module.prereq_modules_all_parents), 
                                        "prereq_modules": this.modify_data(this.module.prereq_modules), 
                                        "difficulty": this.modify_data(this.module.difficulty), 
                                        "bloom_taxonomy": this.modify_data(this.module.bloom_taxonomy)                                      
                })

        console.log(data)
        this.editConcept.emit(data);
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

    //When user clicks on submit after editing the module


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