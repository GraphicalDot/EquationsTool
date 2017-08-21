import { Observable } from 'rxjs/Rx';
import { JQueryStyleEventEmitter } from 'rxjs/observable/FromEventObservable';
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {DomainModel, ConceptModel} from "../../../models/ontology.models";
import {OntologyService} from "../../../services/ontology.service"
import { Store } from '@ngrx/store';
import {ApplicationStore} from "../../../app.store"
import * as OntologyActions from "../../../actions/ontology.actions"
import * as fromRoot from "../../../reducers"


@Component({
  selector: 'app-domain',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.css']
})
export class OntologyComponent implements OnInit {

    public domains: Observable<any>;
    public concepts: Observable<any>;
    //public concepts: Observable<Array<ConceptModel>>;
    //public globalDomain: Observable<DomainModel>;
    //public globalDomain: DomainModel;
    public globalConcept: ConceptModel;
    constructor(private store: Store<fromRoot.AppState>) {
        this.domains = this.store.select(fromRoot.getDomains);
        this.concepts = this.store.select(fromRoot.getConcepts);
        //this.globalDomain = store.select("Selecteddomain")
        /*
        this.concepts = store.select(state=> state.concepts.concept_id)
                        .filter(this.globalDomain.domain_id)
        */
        //this.concepts = store.select("concepts")
        //this.store.dispatch(new OntologyActions.Loaddomain())
        
    }
          
    ngOnInit() {
  }

    _addConcept(domain: DomainModel){
        console.log(domain)
        //this.globalDomain = domain
        this.store.dispatch(new OntologyActions.Selecteddomain(domain))
    }

    _submitDomain(domain: DomainModel){
        console.log(domain)
        this.store.dispatch(new OntologyActions.Adddomain(domain))

    }

    _submitConcept(concept: ConceptModel){
        console.log(concept)
        //this.service.addConcept(concept)
        this.store.dispatch(new OntologyActions.Addconcept(concept))

    }

    _editDomain(domain: DomainModel){
        console.log(domain)
        //this.service.editDomain(domain)
        //this.store.dispatch({type: ONTOLOGY_ACTIONS.LOAD_DOMAIN})
        

    }
   _deleteDomain(domain: DomainModel){
        console.log("Domain That needs to be deleted" + domain)
        this.store.dispatch(new OntologyActions.Deletedomain(domain))
        
    }


  

}