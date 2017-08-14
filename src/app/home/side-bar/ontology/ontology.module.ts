import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OntologyComponent} from "./ontology.component";
import { Routes, RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { SubconceptComponent } from './subconcept/subconcept.component';
import { ConceptComponent } from './concept/concept.component';
import { DomainComponent } from './domain/domain.component';
import {OntologyService} from "./ontology.service";


@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    MaterializeModule, 
    FormsModule, 
    HttpModule
  ],
  declarations: [OntologyComponent, SubconceptComponent, ConceptComponent, DomainComponent],
  exports: [OntologyComponent],
  providers: [OntologyService]
})
export class OntologyModule { }
