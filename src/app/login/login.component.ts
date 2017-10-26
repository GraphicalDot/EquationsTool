import { ObservableInput } from 'rxjs/Observable';
import { isAuthenticated } from '../reducers';
import { Observable, Observer } from 'rxjs/Rx';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as AuthenticateActions from '../actions/authentication.actions';
import * as fromRoot from '../reducers';
import {UserModel} from "../models/user.model"
import { go } from "@ngrx/router-store";
import {State, Store} from "@ngrx/store"
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {
  public username: string;
  public password: string;
  public userid$: Observable<UserModel>;
  public authError$: Observable<string>;
  public isAuthenticated$: Observable<boolean>
  private alive: boolean =  true
  constructor(private store: Store<fromRoot.AppState>) { 
            this.userid$ = this.store.select(fromRoot.getAuthenticatedUser) 
            this.isAuthenticated$ = this.store.select(fromRoot.isAuthenticated)
            this.authError$ = this.store.select(fromRoot.getAuthenticationError)
          
          }

  ngOnInit() {

          //On successful login, The authentication state in authetication.reducer.ts will
          //set autheticate flag into the state as true, which we are subscribing to, here.
          //If the login is successful the user will be redirected to the homapgae of the 
          //application

          /* The TakeWhile mirrors the source Observable until such time as some condition you 
          specify becomes false, at which point TakeWhile stops mirroring the source Observable 
          and terminates its own Observable.
          */
          this.store.select(isAuthenticated)
            .takeWhile(() => this.alive)
            .filter(authenticated => authenticated)
            .subscribe(value => {
            console.log("Authenticated value" + value)
          this.store.dispatch(go("/home"));
        });
        
        
  }

  ngOnDestroy(){

    this.alive = false
  }
  
  onSubmit(data){
    this.store.dispatch(new AuthenticateActions.AuthenticateAction(data))
  }

}
