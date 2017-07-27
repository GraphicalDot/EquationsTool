import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DomainComponent} from "./domain.component";
import { Routes, RouterModule } from '@angular/router';
import { MaterializeModule } from 'angular2-materialize';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { SubconceptComponent } from './subconcept/subconcept.component';
import { ConceptComponent } from './concept/concept.component';
import { NanoskillComponent } from './nanoskill/nanoskill.component';



@NgModule({
  imports: [
    CommonModule, 
    RouterModule, 
    MaterializeModule, 
    FormsModule, 
    HttpModule
  ],
  declarations: [DomainComponent, SubconceptComponent, ConceptComponent, NanoskillComponent],
  exports: [DomainComponent]
})
export class DomainModule { }
