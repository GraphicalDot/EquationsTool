import { Component } from '@angular/core';
import {Router, Routes} from '@angular/router';
import { go, replace, search, show, back, forward } from '@ngrx/router-store';
import * as fromRoot from "./reducers";
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Rx"

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})




export class AppComponent {
  title = 'app';
  userData: any;
  user_id$: Observable<any>;
  constructor(private store: Store<fromRoot.AppState>){
          this.userData = localStorage.removeItem('user_token')
    			this.userData = localStorage.getItem('user_token');
          console.log(this.userData);
          this.user_id$ = this.store.select(fromRoot.getLoggedUserId)
          this.store.dispatch(go(['/login']));
          


  }

  ngOnInit(){
      /* if(this.userData == null) {
    	 			console.log("No user found")
    				this.router.navigate(["/login"])
    			
        }
      else{
    			//this.router.navigate(["/register"])
					console.log("User has been found");
    			this.router.navigate(["/home/editor"])
					
    		}
 */

  }
}
