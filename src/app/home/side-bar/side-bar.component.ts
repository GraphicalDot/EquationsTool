import { Component, OnInit } from '@angular/core';
import { ObservableInput } from 'rxjs/Observable';
import { Observable, Observer } from 'rxjs/Rx';
import * as fromRoot from '../../reducers';
import { go } from "@ngrx/router-store";
import {State, Store} from "@ngrx/store"
import {UserModel} from "../../models/user.model"
import * as AuthenticateActions from '../../actions/authentication.actions';



@Component({
  selector: 'app-side-bar',
  templateUrl: './side-bar.component.html',
  styleUrls: ['./side-bar.component.css']
})
export class SideBarComponent implements OnInit {

  public firstName:string = ""
  public user$: Observable <UserModel>

  constructor(private store: Store<fromRoot.AppState>) { 
      this.user$ = this.store.select(fromRoot.getAuthenticatedUser) 
    }
  
    ngOnInit() {
  }

  logout(){
    console.log("Logout has been clicked")
    this.store.dispatch(new AuthenticateActions.SignOutAction())

  }  

}
