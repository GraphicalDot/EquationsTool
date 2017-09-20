import { VariableModel } from '../../../models/variable.model';
import {UserModel} from "../../../models/user.model"
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromRoot from '../../../reducers';
import * as actions from '../../../actions/variable.actions';
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';
import {State, Store} from "@ngrx/store"


@Component({
  selector: 'app-variables',
  templateUrl: './variables.component.html',
  styleUrls: ['./variables.component.scss']
})
export class VariablesComponent implements OnInit {


     public currentPage: number;

    public variables$: Observable<VariableModel[]>;
    public pages$: Observable<number>;
    public variable_count$: Observable<number>;
    public loggedUser: UserModel;
    public nodes;
    public loading: boolean=false;  
    public addVariableFlag: boolean=false;  
    public editVariableFlag: boolean=false;   
      constructor(private store: Store<fromRoot.AppState>,) { 
            this.variables$ = this.store.select(fromRoot.getVariables);
            this.pages$ = this.store.select(fromRoot.getVariablePages)
            this.variable_count$ = this.store.select(fromRoot.getVariableCount)
                    this.store.select(fromRoot.getAuthenticatedUser)
                .subscribe(value => {
                  this.loggedUser = value
        });

      }

      ngAfterInit(){
      }

      ngOnInit() {
          this.store.dispatch(new actions.Loadvariable({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": null}))

        
          this.store.select(fromRoot.getVariableError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

          this.store.select(fromRoot.getVariableLoading)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.loading = value
            }) 
  }

      addVariable(){
          this.addVariableFlag = true
        }


      addVariableSubmit(value: any, event: Event){
          event.preventDefault()
          console.log(value)
          this.store.dispatch(new actions.Addvariable({"variable_name": value.variable_name, "user": this.loggedUser.user_id,
          "data_type": value.data_type, "description": value.description, "identifier": value.identifier}))

          //This flag closes the add form which have ontology in it
          this.addVariableFlag = false

      }


      add(template){
        console.log(template)
      }

      delete(variable){
        console.log(variable)
        this.store.dispatch(new actions.Deletevariable({"user_id": this.loggedUser.user_id, "variable_id": variable.template_id}))

      }

      pageVariableChanged(input){
        this.currentPage = input
        this.store.dispatch(new actions.Loadvariable({"user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadvariable({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }


}
