import { PermissionsComponent } from '../permissions/permissions.component';
import { OntologyService } from '../../../../services/ontology.service';
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import {DomainModel} from "../../../../models/ontology.models"
import {UserModel} from "../../../../models/user.model"
import {State, Store} from "@ngrx/store"
import { Observable, ObservableInput } from 'rxjs/Observable';
import * as fromRoot from '../../../../reducers';
import * as actions from '../../../../actions/ontology.actions';
import * as Permissionactions from '../../../../actions/permissions.actions'
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';
import * as UserActions from '../../../../actions/users.actions';

/*
Intend to use normalizer to make things easier for ngrx store
for example nested objects like
    id
    title
        author:{}
        comments:[
                id:
                content
                    commentrator:
                        id
                        name

        ]

inour case, the nested objects will be like
domains:
    concepts:
        suconcepts:
            nanoskills

*/

@Component({
  selector: 'app-childdomain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css'], 
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class DomainComponent implements OnInit, OnDestroy {
    public permission_domain: DomainModel // This will be selected when a user clicks on +permissions
    public addPermissionFlag: boolean = false
    public loggedUser: UserModel;
    public permission$: Observable<any>
    public targeted_user_id: string
    
    
    public domainCreate: boolean
    public domainEdit: boolean
    public domain: DomainModel;
    public domains$ : Observable<any>;
    public user: UserModel
    public moduleType: "domain"
    public users$: Observable<UserModel[]>

    public data
    public currentDomainPage: number
    private currentPage: number = 1
    public pages$: Observable<number>;
    public pages: number[];
    public domain_count$: Observable<number>
    public loading: boolean = false

   //public user$: Observable<UserModel>;
   
    @Output() selectedDomain = new EventEmitter<DomainModel>();
    @Output() submitDomain = new EventEmitter<DomainModel>();
    @Output() editDomain = new EventEmitter<DomainModel>();
    @Output() deleteDomain = new EventEmitter<DomainModel>();
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>, private service: OntologyService) {
                        this.domains$ = this.store.select(fromRoot.getDomains);
                        //this.user$ = this.store.select(fromRoot.getAuthenticatedUser) 
    //                    this.user$ = this.store.select(fromRoot.getAuthenticatedUser) 
                        this.pages$ = this.store.select(fromRoot.getDomainPages)
                        this.domain_count$ = this.store.select(fromRoot.getDomainCount)
                        this.users$ = this.store.select(fromRoot.getUsers);
                        this.permission$ = this.store.select(fromRoot.getDomainPermission)

                    }

    ngOnInit(){
        this.store.select(fromRoot.getDomainPages)
        .subscribe(value => {
            //this.pages = new Array(value);//create an empty array with length 45
            this.pages = Array(value).fill(0).map((e,i)=>i+1)

        });


        this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.loggedUser = value
        });

        //This will subscribe to any error if there are any in response from the API's
        this.store.select(fromRoot.getDomainPermissionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })
          
        this.store.select(fromRoot.getDomainError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

        this.store.select(fromRoot.getDomainMessage)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })
        
        this.store.select(fromRoot.getDomainLoading)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.loading = value
            })

        this.store.dispatch(new actions.Loaddomain({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": null}))
        this.store.dispatch(new UserActions.Loadusers({"skip": 0, "limit": 1000, "search_text": null, "user_id": this.loggedUser.user_id, "filter_permission": true}))

    };
    ngOnDestroy(){};
    selectModule(domain: DomainModel) {
        this.selectedDomain.emit(domain);
    }
    
    domaindelete(domain) {
        this.addPermissionFlag = false

        this.deleteDomain.emit(domain);
    }

    //This is when a user clicks ont he red button on the top, which will open a new form to create a new module
    addDomain(){
      this.domainCreate = true;    
        this.addPermissionFlag = false        
      
    }
    submitForm(domain:DomainModel){
        this.data = Object.assign({}, domain, {"user_id": this.loggedUser.user_id, "username": this.loggedUser.username})
        this.domainCreate = false;  
        this.submitDomain.emit(this.data);
    }
  
    domainedit(domain) {
      this.domainEdit= true;    
      this.domainCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.domain = domain;
      //this.editDomain.emit(domain);
    }
    
    _editDomain(domain){
        event.preventDefault()
        console.log(domain)
        console.log(this.domain.description)

        var data = Object.assign({}, this.domain, domain)
        this.editDomain.emit(data)
        
    }

    pageDomainChanged(input){
        console.log("Domain changed clicked" + input)
        console.log(this.loggedUser.user_id)
        this.addPermissionFlag = false        
        this.currentPage = input
        console.log(this.currentDomainPage)
        this.store.dispatch(new actions.Loaddomain({"user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    }


    search_text_changed(search_text){
        this.store.dispatch(new actions.Loaddomain({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }


    addPermissions(domain){
        this.permission_domain = domain
        console.log(this.permission_domain)
        this.addPermissionFlag = true
        this.domainCreate = false
        this.domainEdit = false
        if (this.targeted_user_id){

            //var aPromise = this.service.DomainPermission({"user_id": this.targeted_user_id, "module_id": this.permission_domain.module_id, "skip": 0, "limit": 15}).toPromise()
            this.store.dispatch(new Permissionactions.Loadpermissiondomain({"user_id": this.targeted_user_id, 
                                                                                "url": "domainpermissions",
                                                                                "module_id": this.permission_domain.module_id, 
                                                                                "skip": 0, 
                                                                                "limit": 15}))
        }
        }
    
    onUserChange(value){
        this.targeted_user_id = value
        this.store.dispatch(new Permissionactions.Loadpermissiondomain({"user_id": this.targeted_user_id, 
                                                                        "url": "domainpermissions",
                                                                        "module_id": this.permission_domain.module_id, 
                                                                        "skip": 0, 
                                                                        "limit": 15}))
    
    }

    submitPermissions(value){
        console.log(value)
        this.store.dispatch(new Permissionactions.Editpermissiondomain({"user_id": this.loggedUser.user_id, 
                                                    "target_user_id": this.targeted_user_id,
                                                    "url": "domainpermissions",
                                                    "module_id": this.permission_domain.module_id,
                                                    "parent_id": null,
                                                    "permission": value}))
    }

    onCheckboxChange(domain){
        console.log(domain)
    }
}