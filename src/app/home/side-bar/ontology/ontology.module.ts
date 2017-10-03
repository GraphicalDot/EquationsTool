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
import { PermissionsComponent } from './permissions/permissions.component';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';

import { FormsModule,  ReactiveFormsModule  } from '@angular/forms';
import "froala-editor/js/froala_editor.pkgd.min.js";

import { FroalaEditorModule, FroalaViewModule } from 'angular-froala-wysiwyg';

@NgModule({
  imports: [
    AngularMultiSelectModule,
    CommonModule, 
    RouterModule, 
    MaterializeModule, 
    FormsModule, 
    ReactiveFormsModule,
    HttpModule,
    NgxPaginationModule, 
    FroalaEditorModule.forRoot(), 
    FroalaViewModule.forRoot()
  ],
  declarations: [OntologyComponent, PermissionsComponent, SubconceptComponent, ConceptComponent, DomainComponent, NanoskillComponent, QuestionsComponent],
  exports: [OntologyComponent],
})
export class OntologyModule { }
