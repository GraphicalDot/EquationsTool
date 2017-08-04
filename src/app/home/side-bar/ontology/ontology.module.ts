import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OntologyComponent} from "./ontology.component";
import { Routes, RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { SubconceptComponent } from './subconcept/subconcept.component';
import { ConceptComponent } from './concept/concept.component';
import { NanoskillComponent } from './nanoskill/nanoskill.component';
import { DomainComponent } from './domain/domain.component';
import { DomainService} from './domain/domain.service';



@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    MaterializeModule, 
    FormsModule, 
    HttpModule
  ],
  declarations: [OntologyComponent, SubconceptComponent, ConceptComponent, NanoskillComponent, DomainComponent],
  exports: [OntologyComponent],
  providers: [DomainService]
})
export class OntologyModule { }
