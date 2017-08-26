import { Observable } from 'rxjs/Rx';
import { JQueryStyleEventEmitter } from 'rxjs/observable/FromEventObservable';
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import {DomainModel, ConceptModel} from "../../../models/ontology.models";
import {UserModel} from "../../../models/user.model";
import {SubconceptModel} from "../../../models/subconcept.model";
import {NanoskillModel} from  "../../../models/nanoskill.model";

import { Store } from '@ngrx/store';
import {ApplicationStore} from "../../../app.store"
import * as OntologyActions from "../../../actions/ontology.actions"
import * as fromRoot from "../../../reducers"
import * as Subconceptactions from "../../../actions/subconcept.actions"
import * as Nanoskillactions from "../../../actions/nanoskill.actions"


@Component({
  selector: 'app-domain',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.css'],
changeDetection: ChangeDetectionStrategy.OnPush

})
export class OntologyComponent implements OnInit {

    public domains: Observable<any>;
    public concepts: Observable<any>;
    public user: UserModel
    public selectedDomain: DomainModel;
    public selectedConcept: ConceptModel;
    public selectedSubconcept: SubconceptModel;
    public selectedNanoskill: string;
    
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
          this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.user = value
        });


        this.store.select(fromRoot.getSelectedDomain)
            .subscribe(value => {
                console.log(value)
                this.selectedDomain = value
        });

        this.store.select(fromRoot.getSelectedConcept)
            .subscribe(value => {
            this.selectedConcept = value
        });

        this.store.select(fromRoot.getSelectedSubConcept)
            .subscribe(value => {
            this.selectedSubconcept = value
        });

    }

    _selectedDomain(domain: DomainModel){
        console.log("This is what received in ontology compoenent" + domain.module_id)
        //this.globalDomain = domain
        
        this.store.dispatch(new OntologyActions.Selecteddomain(domain))
        this.store.dispatch(new OntologyActions.Setconceptparentsuccess(this.selectedDomain.module_id))
        
    }

    _selectedConcept(concept: ConceptModel){
        console.log(this.selectedConcept)

        //this.globalDomain = domain
        
        this.store.dispatch(new OntologyActions.Selectedconcept(concept))
        this.store.dispatch(new Subconceptactions.Setsubconceptparentsuccess(this.selectedConcept.module_id))
        
    }

    _selectedSubconcept(subconcept: SubconceptModel){
        console.log(this.selectedConcept)

        //this.globalDomain = domain
        
        this.store.dispatch(new Subconceptactions.Selectedsubconcept(subconcept))
        this.store.dispatch(new Nanoskillactions.Setnanoskillparentsuccess(this.selectedConcept.module_id))
        
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

    _submitNanoskill(nanoskill: NanoskillModel){
        console.log(nanoskill)
        //this.service.addConcept(concept)
        this.store.dispatch(new Subconceptactions.Addsubconcept(nanoskill))

    }

    _submitSubConcept(subconcept: SubconceptModel){
        console.log(subconcept)
        //this.service.addConcept(concept)
        this.store.dispatch(new Subconceptactions.Addsubconcept(subconcept))

    }


    _editDomain(domain: DomainModel){
        console.log(domain)
        //this.service.editDomain(domain)
        this.store.dispatch(new OntologyActions.Editdomain({"domain": domain, "user": this.user}))
    }


   _deleteDomain(domain: DomainModel){
        console.log("Domain That needs to be deleted" + domain)
        this.store.dispatch(new OntologyActions.Deletedomain({"domain": domain, "user": this.user}))
        
    }


  

}