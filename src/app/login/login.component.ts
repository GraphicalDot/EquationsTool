import { Observable } from 'rxjs/Rx';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as UserActions from '../actions/users.actions';
import * as fromRoot from '../reducers';

import {State, Store} from "@ngrx/store"

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username: string;
  password: string;
  userid$: Observable<string>;
  constructor(private store: Store<fromRoot.AppState>) { 
            this.userid$ = this.store.select(fromRoot.getLoggedUserId) 
          }

  ngOnInit() {
  }

    onSubmit(data){
        this.store.dispatch(new UserActions.Loginuser(data))
    }
}
