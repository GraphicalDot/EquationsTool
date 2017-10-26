import { Component, OnInit } from '@angular/core';
import {State, Store} from "@ngrx/store"
import * as fromRoot from '../reducers';
import { UserModel } from '../models/user.model';

import * as UserActions from '../actions/users.actions';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private actionUser: UserModel
  constructor(private store: Store<fromRoot.AppState>) { 
      this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.actionUser = value
        });

  }

  ngOnInit() {

    this.store.dispatch(new UserActions.Loadusers({"skip": 0, "limit": 1000, "search_text": null, "user_id": this.actionUser.user_id}))

  }



}
