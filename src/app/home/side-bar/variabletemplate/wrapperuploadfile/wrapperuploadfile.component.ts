import { Component, OnInit, ViewChild, Input, Output } from '@angular/core';
import * as fromRoot from '../../../../reducers';
import * as actions from '../../../../actions/variabletemplate.actions';
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';
import {State, Store} from "@ngrx/store"
import {VariabletemplateModel} from '../../../../models/variabletemplate.model'
import {VariableModel, CategoryModel, ImageModel} from '../../../../models/variable.model'
import {UserModel} from '../../../../models/user.model'
import { Ng2FileInputService, Ng2FileInputAction } from 'ng2-file-input';
import { Observable } from 'rxjs/Rx';


@Component({
  selector: 'app-wrapperuploadfile',
  templateUrl: './wrapperuploadfile.component.html',
  styleUrls: ['./wrapperuploadfile.component.css']
})
export class WrapperuploadfileComponent implements OnInit {
  public myid: "uniqueid"
  //public images: ImageModel[]
  private myFileInputIdentifier:string = "tHiS_Id_IS_sPeeCiAL";

  public loggedUser: UserModel
  @Input() variable: VariableModel
  @Input() category: CategoryModel
  @Input() images: ImageModel[]
  constructor(private store: Store<fromRoot.AppState>, private ng2FileInputService: Ng2FileInputService) { 
                
          this.store.select(fromRoot.getAuthenticatedUser)
                .subscribe(value => {
                  this.loggedUser = value
            });

          this.store.select(fromRoot.getSelectedVariabletemplate)
                              .filter((value) => value !== undefined && value !== null ) 
                .subscribe((value: VariabletemplateModel) => {
                    console.log("Entered into the subscriber")
                    console.log(value)
                    if (this.variable != undefined){
                    let selectedvariable: VariableModel = value.variables.find((variable) => variable.variable_id == this.variable.variable_id)
                    let selectedcategory: CategoryModel = selectedvariable.categories.find((category) => category.category_id == this.category.category_id)
                    this.images = selectedcategory.images
                    }
                  }); 
  }

  ngOnInit() {
        }

  onAction(value){
        event.preventDefault()
        console.log(event)
        console.log(this.variable)
        console.log(this.category)
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
            this.store.dispatch(new actions.Deletevariablecategoryimages({"variable_id": this.variable.variable_id, "category_id": this.category.category_id, 
                                                    "image": value.file, "user_id": this.loggedUser.user_id}))
            }
    
        else{
            console.log("Add images sent to the server")
            this.store.dispatch(new actions.Addvariablecategoryimages({"variable_id": this.variable.variable_id, "category_id": this.category.category_id, 
                                                    "image": value.file, "user_id": this.loggedUser.user_id}))
                                                }
            this.ng2FileInputService.reset(this.myFileInputIdentifier);
            
            }
    imageClick(image){
      event.preventDefault()
      console.log("This is the image" + Image)
      this.store.dispatch(new actions.Deletevariablecategoryimages({"variable_id": this.variable.variable_id, "category_id": this.category.category_id,
        "key": image.key, "image_name": image.image_name } ))

    }

}
