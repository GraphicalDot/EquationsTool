import { Component, OnInit, OnDestroy } from '@angular/core';
import {DomainModel} from "./domain.model"
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import {ApplicationStore} from "../../../../app.store"
import {DOMAIN_ACTIONS} from "./domain.actions";
import {DomainService} from "./domain.service";



@Component({
  selector: 'app-childdomain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})

export class DomainComponent implements OnInit, OnDestroy {
    public domainCreate: boolean
    public domainEdit: boolean
    public domains: Observable<Array<DomainModel>>;
    public domain: DomainModel;
    
    constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 

          this.domains = service.domains;
          service.loaditems();
      }

    ngOnInit() {
   
  };

  ngOnDestroy(){

  };

  delete(domain) {
      this.service.deleteDomain(domain);
  }

  addDomain(){
    this.domainCreate = true;    
    
  }
     submitForm(domain:DomainModel){
      this.service.createDomain(domain);
      this.domainCreate = false;  
  }
  
  edit(domain) {
      this.domainEdit= true;    
      this.domainCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.domain = domain;

    }

  submitEdit(domain) {
    console.log(this.domain)
    this.service.editDomain(this.domain);


  }

  editDomain(domain){
      this.domainEdit= false;
      console.log(this.domain)
      console.log(domain)
      var condition = (this.domain === domain) 
      console.log(condition)
      //? this.service.editDomain(domain): console.log("Nothing changed")
      
    
  }

}