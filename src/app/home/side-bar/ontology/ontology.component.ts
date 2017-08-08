import { Observable } from 'rxjs/Rx';
import { JQueryStyleEventEmitter } from 'rxjs/observable/FromEventObservable';
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {DomainModel} from "./ontology.models";
import {OntologyService} from "./ontology.service"
import { Store } from '@ngrx/store';
import {ApplicationStore} from "../../../app.store"

@Component({
  selector: 'app-domain',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.css']
})
export class OntologyComponent implements OnInit {

    public domains: Observable<Array<DomainModel>>;

    public globalDomain: DomainModel;
    constructor(private store: Store<ApplicationStore>, private service: OntologyService) {
        this.domains = service.domains;
        service.loaditems();
    }
          
    ngOnInit() {
  }

    domainChange(domain: DomainModel){
        console.log(domain)
        this.globalDomain = domain;
        console.log("This somain has been chosen")
    }

    _submitDomain(domain: DomainModel){
        console.log(domain)
        this.service.createDomain(domain)

    }
    _editDomain(domain: DomainModel){
        console.log(domain)
        this.service.editDomain(domain)

    }
   _deleteDomain(domain: DomainModel){
        console.log("Domain That needs to be deleted" + domain)
        this.service.deleteDomain(domain)

    }

  

}