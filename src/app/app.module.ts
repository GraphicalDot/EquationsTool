import { ApplicationStore } from './app.store';
import { ConceptComponent } from './home/side-bar/ontology/concept/concept.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {EffectsModule} from '@ngrx/effects';
import { FormsModule } from '@angular/forms';
import {Headers, Http, HttpModule, BaseRequestOptions, RequestOptions} from '@angular/http';
import {HashLocationStrategy, LocationStrategy} from "@angular/common";
import { routerReducer, RouterStoreModule } from '@ngrx/router-store';
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
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';



import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
//import {StoreLogMonitorModule, useLogMonitor} from '@ngrx/store-log-monitor';
import { VariablesComponent } from './home/side-bar/variables/variables.component';
import { PermissionsComponent } from './home/side-bar/permissions/permissions.component';
import { TemplatesComponent } from './home/side-bar/templates/templates.component';

import {OntologyModule} from "./home/side-bar/ontology/ontology.module";
import {OntologyComponent} from "./home/side-bar/ontology/ontology.component";
import {OntologyEffects} from "./effects/ontology.effects";
import {OntologyService} from "./services/ontology.service";

import {DomainReducer} from "./reducers/domain.reducer";
import {ConceptReducer} from "./reducers/concept.reducer";
import { combineReducers } from '@ngrx/store';
import { UserprofileComponent } from './home/side-bar/userprofile/userprofile.component';
import { storeFreeze } from 'ngrx-store-freeze';
import {UsersReducer} from "./reducers/users.reducer"
import {UsersService} from "./services/users.service"
import {UsersEffects} from "./effects/users.effects"
import {reducer} from "./reducers";
import { LoginComponent } from './login/login.component'
/**
 * storeFreeze prevents state from being mutated. When mutation occurs, an
 * exception will be thrown. This is useful during development mode to
 * ensure that none of the reducers accidentally mutates the state.
 */
//);

//Very good tutorial http://brianflove.com/2017/04/10/angular-reactive-authentication/

const routes: Routes = 
[
{ path: 'login', component: LoginComponent},
 { path: 'home', component: HomeComponent, 
    children: [
      { path: 'editor', component: EditorComponent},
      { path: 'users', component: UsersComponent},
      { path: 'questions', component: QuestionsComponent},
      { path: 'permissions', component: PermissionsComponent},
      { path: 'variables', component: VariablesComponent},
      { path: 'templates', component: TemplatesComponent},
      { path: 'ontology', component: OntologyComponent},
      {path: 'userprofile', component: UserprofileComponent}

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
    TemplatesComponent,
    UserprofileComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
    MaterializeModule,
    OntologyModule,
    RouterModule.forRoot(routes, {useHash: true}),
    StoreModule.provideStore(reducer),
        EffectsModule.run(OntologyEffects),
        EffectsModule.run(UsersEffects),
            RouterStoreModule.connectRouter(),

    //EffectsModule.runAfterBootstrap(UsersEffects),
    StoreDevtoolsModule.instrumentStore(), 
  ],
  providers: [UsersService, OntologyService, BrowserAnimationsModule],
  bootstrap: [AppComponent],
})
export class AppModule { }
