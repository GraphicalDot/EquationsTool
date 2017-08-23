
import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import { UserModel } from '../../../models/user.model';
import { UsersEffects } from '../../../effects/users.effects';
//import {ApplicationStore} from "../../../app.store"
import * as UserActions from '../../../actions/users.actions';
import * as fromRoot from "../../../reducers"

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
export class UsersComponent implements OnInit {
  userCreate: boolean;
  userEdit: boolean;
  user: UserModel ;
  users$: Observable<any>;
  constructor(private store: Store<fromRoot.AppState>) { 
            //this.users$.subscribe((user) => console.log(user))
            this.users$ = this.store.select(fromRoot.getUsers);
    //this.store.dispatch(new UserActions.Loadusers())

  }
                                                                                                           
  ngOnInit() {
    this.userCreate = false;
    //this.store.dispatch(new UserActions.Loadusers())
    
  }


  addUser(){
    console.log("Add user form has been created");
    this.userCreate = true;
    this.userEdit= false;    

  }
  
  addUserSubmit(user: UserModel){
        this.store.dispatch(new UserActions.Adduser(user))
  	    console.log("request Completed for adding user");
      }

  editUserSubmit(user: UserModel){
        this.store.dispatch(new UserActions.Edituser(user))
        this.userEdit= false;    
        
  }
  
  deleteUser(user: UserModel){
        this.store.dispatch(new UserActions.Deleteuser(user))
    
  }

  editUser(user: UserModel){
      this.userCreate = false;
      this.userEdit= true;    
      this.user = user
  }

}
