import { ConceptComponent } from './home/side-bar/ontology/concept/concept.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import {Headers, Http, HttpModule, BaseRequestOptions, RequestOptions} from '@angular/http';

import {HashLocationStrategy, LocationStrategy} from "@angular/common";

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UrlResolver } from '@angular/compiler';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { EditorComponent } from './home/side-bar/editor/editor.component';
import { UsersComponent } from './home/side-bar/users/users.component';
import { QuestionsComponent } from './home/side-bar/questions/questions.component';
import { MaterializeModule } from 'angular2-materialize';
import { GradesComponent } from './home/side-bar/grades/grades.component';
import { Grade } from './home/side-bar/grades/grades.model';


import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';
import { VariablesComponent } from './home/side-bar/variables/variables.component';
import { PermissionsComponent } from './home/side-bar/permissions/permissions.component';
import { TemplatesComponent } from './home/side-bar/templates/templates.component';
import {NanoskillModule} from "./home/side-bar/nanoskill/nanoskill.module";
import {NanoskillComponent} from "./home/side-bar/nanoskill/nanoskill.component";

import {OntologyModule} from "./home/side-bar/ontology/ontology.module";
import {OntologyComponent} from "./home/side-bar/ontology/ontology.component";


import { NanoskillReducer } from "./home/side-bar/nanoskill/nanoskill.reducer";
import {OntologyReducer} from "./home/side-bar/ontology/ontology.reducer";
import {ConceptReducer} from "./home/side-bar/ontology/concept.reducer";


const routes: Routes = 
[
{ path: 'home', component: HomeComponent, 
children: [
{ path: 'editor', component: EditorComponent},
{ path: 'users', component: UsersComponent},
{ path: 'questions', component: QuestionsComponent},
{ path: 'permissions', component: PermissionsComponent},
{ path: 'variables', component: VariablesComponent},
{ path: 'templates', component: TemplatesComponent},
{ path: 'ontology', component: OntologyComponent},


]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideBarComponent,
    NavBarComponent,
    EditorComponent,
    UsersComponent,
    QuestionsComponent,
    GradesComponent,
    VariablesComponent,
    PermissionsComponent,
    TemplatesComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    MaterializeModule,
    NanoskillModule,
    OntologyModule,
    RouterModule.forRoot(routes, {useHash: true}),
    StoreModule.provideStore({domains: OntologyReducer, concepts: ConceptReducer})
    /* StoreDevtoolsModule.instrumentStore({
      monitor: useLogMonitor({
        visible: false,
        position: 'right'
      })
    }), */
   // StoreLogMonitorModule


  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
