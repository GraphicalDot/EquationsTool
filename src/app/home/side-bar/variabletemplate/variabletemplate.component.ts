import { variable } from '@angular/compiler/src/output/output_ast';
import { UserModel } from '../../../models/user.model';
import { Observable } from 'rxjs/Rx';
import { Component, OnInit, ViewChild } from '@angular/core';
import * as fromRoot from '../../../reducers';
import * as actions from '../../../actions/variabletemplate.actions';
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';
import {State, Store} from "@ngrx/store"
import {VariabletemplateModel} from '../../../models/variabletemplate.model'
import {VariableModel} from '../../../models/variable.model'

import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';

@Component({
  selector: 'app-variabletemplate',

  templateUrl: './variabletemplate.component.html',
  styleUrls: ['./variabletemplate.component.css']
})
export class VariabletemplateComponent implements OnInit {
    public currentPage: number;
    public variables$: Observable<object>;
    public variabletemplates$: Observable<VariabletemplateModel[]>;

    //This is when a user clicks on edit template button, An api call will be made to get
    // The whole template and then stored in  selected_variabletemplate  of the variabletemplate state.
    // The form for edit will then be sybscribed to this variable

    public selectedvariabletemplate: VariabletemplateModel;
    public pages$: Observable<number>;
    public variabletemplate_count$: Observable<number>;
    public loggedUser: UserModel;
    public images;
    public loading: boolean=false;  
    public addVariabletemplateFlag: boolean=false;  
    public editVariabletemplateFlag: boolean=false;  
    public variablecategories = null
    public variable_value: VariableModel

    constructor(private store: Store<fromRoot.AppState>, private ng2FileInputService: Ng2FileInputService) { 
        //On nitialization, The Selectedvariabletemplate action is achieved, 
        // Which changes the variabletemplate state and enters variables under selectedvariabletemplate
        // This happens because whenever we try to uload imgaes under a specific category, a new action Addvariablecategoryimage
        //is sent, which adds the image url of s3 sent by the server to the catgeory images variable, 
        // As the variables variable in template is subscribed to the selectedvariabletemplate, this url will be shown into this.
        //When a user is done editing the template, He enters the submit, The whole template is taken out of selectedtemplatevariable
        //sent to the server and a new action of type Selectedvariabletemplate with empty variables is pushed again.
        this.variables$ = this.store.select(fromRoot.getVariables);

         this.variabletemplates$ = this.store.select(fromRoot.getVariabletemplates);
         this.pages$ = this.store.select(fromRoot.getVariabletemplatePages)
         this.variabletemplate_count$ = this.store.select(fromRoot.getVariabletemplateCount)
            
          this.store.select(fromRoot.getAuthenticatedUser)
                .subscribe(value => {
                  this.loggedUser = value
            });
        
          this.store.select(fromRoot.getVariables)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
            this.store.dispatch(new actions.Selectedvariabletemplate({"variables": value}))
            })

        this.store.dispatch(new actions.Loadvariabletemplate({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": null}))
          this.store.select(fromRoot.getVariabletemplateError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

          this.store.select(fromRoot.getVariabletemplateLoading)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.loading = value
            })

          
          
          this.store.select(fromRoot.getSelectedVariabletemplate)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.selectedvariabletemplate = value
            })
         }


    ngOnInit() {
        }

    onChange(value){
        console.log(value.categories)
        this.variablecategories = value.categories
        console.log(this.variable_value)                      
    }

    addVariabletemplate(){
          this.addVariabletemplateFlag = true
          this.editVariabletemplateFlag = true
        }

    onAction(value, variable, category){
        event.preventDefault()
        console.log(event)
        console.log(variable)
        console.log(category)
        /*     export enum Ng2FileInputAction{
        Removed=0,
        Added= 1,
        InvalidDenied = 2,
        CouldNotRemove = 3,
        CouldNotAdd = 4,
                }
         id: //the file input's id that emits the action (useful if you use the service and handle multiple file inputs, see below)
        currentFiles: //list of the current files
        action: //see Enum below
        file: //the file that caused the action */
        if(value.action===Ng2FileInputAction.Removed){
            console.log("This has been removed")
            this.store.dispatch(new actions.Deletevariablecategoryimages({"variable_id": variable.variable_id, "category_id": category.category_id, 
                                                    "image": value.file, "user_id": this.loggedUser.user_id}))
            }
    
        else{
            this.store.dispatch(new actions.Addvariablecategoryimages({"variable_id": variable.variable_id, "category_id": category.category_id, 
                                                    "image": value.file, "user_id": this.loggedUser.user_id}))
                                                }
            this.ng2FileInputService.remove(variable.variable_id+category.category_id, value.file);

            
            }

    categorySubmit(value: any, event: Event, variable_id: string, category_name: string){
          event.preventDefault()
          console.log(value)
          console.log(variable_id)
          console.log(category_name)
         /*  this.store.dispatch(new actions.Addvariabletemplate({"template_name": value.template_name, 
          "board": value.board, "class": value.class, "description": value.description, "template": this.nodes}))

          //This flag closes the add form which have ontology in it
          this.addVariabletemplateFlag = false
 */
      }


    add(template){
        console.log(template)
      }

    delete(template){
        this.store.dispatch(new actions.Deletevariabletemplate({"user_id": this.loggedUser.user_id, "template_id": template.template_id}))

      }

      pageTemplateChanged(input){
        console.log("changed nanoskill clicked")
        this.currentPage = input
        this.store.dispatch(new actions.Loadvariabletemplate({"user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadvariabletemplate({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }




}
