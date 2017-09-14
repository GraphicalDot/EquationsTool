

import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";


import { HomeComponent } from './home/home.component';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { EditorComponent } from './home/side-bar/editor/editor.component';
import { UsersComponent } from './home/side-bar/users/users.component';
import { MaterializeModule } from 'angular2-materialize';
import { GradesComponent } from './home/side-bar/grades/grades.component';
import { UserprofileComponent } from './home/side-bar/userprofile/userprofile.component';
import { VariablesComponent } from './home/side-bar/variables/variables.component';
import { TemplatesComponent } from './home/side-bar/templates/templates.component';
import {OntologyComponent} from "./home/side-bar/ontology/ontology.component";
import {LoginComponent} from "./login/login.component"
import { AuthenticatedGuard } from "./authentication.guard";


const routes: Routes = 
[{ path: 'login', component: LoginComponent},
{ path: 'home', component: HomeComponent,     canActivate: [AuthenticatedGuard],

children: [
{ path: 'editor', component: EditorComponent},
{ path: 'users', component: UsersComponent},
{ path: 'variables', component: VariablesComponent},
{ path: 'templates', component: TemplatesComponent},
{ path: 'ontology', component: OntologyComponent},
{path: 'userprofile', component: UserprofileComponent}

]}
]


@NgModule({
  exports: [
    RouterModule
  ],
  imports: [
    RouterModule.forRoot(routes)
  ]
})
export class AppRoutingModule { }