import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy } from '@angular/core';
import {DomainModel} from "../../../../models/ontology.models"
import {UserModel} from "../../../../models/user.model"
import {State, Store} from "@ngrx/store"
import { Observable, ObservableInput } from 'rxjs/Observable';
import * as fromRoot from '../../../../reducers';
import * as actions from '../../../../actions/ontology.actions';
import {NgxPaginationModule} from 'ngx-pagination';


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
    public domainCreate: boolean
    public domainEdit: boolean
    public domain: DomainModel;
    public domains$ : Observable<any>;
    public user: UserModel
    public moduleType: "domain"
    public data
    public currentDomainPage: number
    public pages$: Observable<number>;
    public domain_count$: Observable<number>
    //public user$: Observable<UserModel>;
    @Output() selectedDomain = new EventEmitter<DomainModel>();
    @Output() submitDomain = new EventEmitter<DomainModel>();
    @Output() editDomain = new EventEmitter<DomainModel>();
    @Output() deleteDomain = new EventEmitter<DomainModel>();
    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>) {
                        this.domains$ = this.store.select(fromRoot.getDomains);
                        //this.user$ = this.store.select(fromRoot.getAuthenticatedUser) 
    //                    this.user$ = this.store.select(fromRoot.getAuthenticatedUser) 
                        this.pages$ = this.store.select(fromRoot.getDomainPages)
                        this.domain_count$ = this.store.select(fromRoot.getDomainCount)

}

    ngOnInit(){
        this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.user = value
        });



        this.store.dispatch(new actions.Loaddomain({"user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": null}))
    };
    ngOnDestroy(){};
    selectModule(domain: DomainModel) {
        console.log("This is the domain which was selecetd from domain componenet" + DomainModel)
        this.selectedDomain.emit(domain);
    }
    delete(domain) {
        this.deleteDomain.emit(domain);
    }
    addDomain(){
      this.domainCreate = true;    
    }
    submitForm(domain:DomainModel){
        this.data = Object.assign({}, domain, {"user_id": this.user.user_id, "username": this.user.username})
        this.domainCreate = false;  
        this.submitDomain.emit(this.data);
    }
  
    edit(domain) {
      this.domainEdit= true;    
      this.domainCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.domain = domain;
      this.editDomain.emit(domain);
    }

    pageDomainChanged(input){
        console.log(input)
        this.currentDomainPage = input
        this.store.dispatch(new actions.Loaddomain({"user_id": this.user.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loaddomain({"user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

}