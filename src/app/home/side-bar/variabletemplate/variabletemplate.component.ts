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
    public nodes;
    public loading: boolean=false;  
    public addVariabletemplateFlag: boolean=false;  
    public editVariabletemplateFlag: boolean=false;  
    public variablecategories = null
    public variable_value: VariableModel

    constructor(private store: Store<fromRoot.AppState>) { 
        this.variables$ = this.store.select(fromRoot.getVariables);

         this.variabletemplates$ = this.store.select(fromRoot.getVariabletemplates);
         this.pages$ = this.store.select(fromRoot.getVariabletemplatePages)
         this.variabletemplate_count$ = this.store.select(fromRoot.getVariabletemplateCount)
            
          this.store.select(fromRoot.getAuthenticatedUser)
                .subscribe(value => {
                  this.loggedUser = value
            });
          this.store.dispatch(new actions.Loadvariabletemplate({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": null}))
          }


    ngOnInit() {

        
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

    onChange(value){
        console.log(value.categories)
        this.variablecategories = value.categories
        console.log(this.variable_value)                      
    }

    addVariabletemplate(){
          this.addVariabletemplateFlag = true
          this.editVariabletemplateFlag = true
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
