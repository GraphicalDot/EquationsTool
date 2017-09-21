import { VariableModel } from '../../../models/variable.model';
import {UserModel} from "../../../models/user.model"
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromRoot from '../../../reducers';
import * as actions from '../../../actions/variable.actions';
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';
import {State, Store} from "@ngrx/store"
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Validator } from 'codelyzer/walkerFactory/walkerFn';

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
    public myForm : FormGroup;
    public editForm : FormGroup;
    

    constructor(private store: Store<fromRoot.AppState>,private fb: FormBuilder) { 
            this.variables$ = this.store.select(fromRoot.getVariables);
            this.pages$ = this.store.select(fromRoot.getVariablePages)
            this.variable_count$ = this.store.select(fromRoot.getVariableCount)
                    this.store.select(fromRoot.getAuthenticatedUser)
                .subscribe(value => {
                  this.loggedUser = value
        });

        this.myForm = this.fb.group({
            variable_name: [''],
            description: ['',],
            identifier: [],
            data_type: [],
            categories: this.fb.array([])
        });

        this.editForm = this.fb.group({
            variable_name: [''],
            variable_id: [''],
            indian_time: [''],
            username: [''],
            creation_approval: [''],
            description: ['',],
            identifier: [],
            data_type: [],
            categories: this.fb.array([])
        });


      }

    //This method will be called when a user clicks to add new categories to a particular variable
    addVariableCategory(event: Event): void {
        event.preventDefault()
        const arrayControl = <FormArray>this.myForm.controls['categories'];
        let newGroup = this.fb.group({
            category_name: [''],
            category_identifier: [''],
            category_description: ['']
        });
        arrayControl.push(newGroup);
    }
    
    editVariableCategory(event: Event): void {
        event.preventDefault()
        const arrayControl = <FormArray>this.editForm.controls['categories'];
        let newGroup = this.fb.group({
            category_name: [''],
            category_identifier: [''],
            category_description: ['']
        });
        arrayControl.push(newGroup);
    }




    delCategory(index: number): void {
        const arrayControl = <FormArray>this.myForm.controls['categories'];
        arrayControl.removeAt(index);
    }


    delEditCategory(index: number): void {
        const arrayControl = <FormArray>this.myForm.controls['categories'];
        arrayControl.removeAt(index);
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
          this.editVariableFlag = false
        }


      addVariableSubmit(value: any, event: Event){
          event.preventDefault()
          console.log(value)
          var data = Object.assign({}, value, {"user_id": this.loggedUser.user_id})
          console.log(data)
          this.store.dispatch(new actions.Addvariable(data))

          //This flag closes the add form which have ontology in it
          this.addVariableFlag = false

      }

      delete(variable){
        console.log(variable)
        this.store.dispatch(new actions.Deletevariable({"user_id": this.loggedUser.user_id, "variable_id": variable.variable_id}))

      }

      edit(variable){
        console.log(variable)
        this.editVariableFlag = true
        this.addVariableFlag = false
        this.editForm.setValue(variable)

      }



      pageVariableChanged(input){
        this.currentPage = input
        this.store.dispatch(new actions.Loadvariable({"user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadvariable({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }


}
