import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { Routes, RouterModule } from '@angular/router';
import { UrlResolver } from '@angular/compiler';
import { SideBarComponent } from './home/side-bar/side-bar.component';
import { NavBarComponent } from './home/nav-bar/nav-bar.component';
import { EditorComponent } from './home/side-bar/editor/editor.component';

const routes: Routes = 
[
{ path: 'home', component: HomeComponent, 
children: [
{ path: 'editor', component: EditorComponent}
]}
]

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SideBarComponent,
    NavBarComponent,
    EditorComponent
  ],
  imports: [
    BrowserModule, 
    FormsModule,
    HttpModule,
          RouterModule.forRoot(routes, { useHash: true })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
