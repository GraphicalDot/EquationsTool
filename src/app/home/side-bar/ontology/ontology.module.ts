import { QuestionsComponent } from './questions/questions.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {OntologyComponent} from "./ontology.component";
import { Routes, RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { HttpModule, JsonpModule } from '@angular/http';
import { SubconceptComponent } from './subconcept/subconcept.component';
import { ConceptComponent } from './concept/concept.component';
import { DomainComponent } from './domain/domain.component';
import { NanoskillComponent } from './nanoskill/nanoskill.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';


@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    MaterializeModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule, 
  ],
  declarations: [OntologyComponent, SubconceptComponent, ConceptComponent, DomainComponent, NanoskillComponent, QuestionsComponent],
  exports: [OntologyComponent],
})
export class OntologyModule { }
