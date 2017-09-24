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
  public textvalues
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
                .debounceTime(1000)
                .subscribe((value: VariabletemplateModel) => {
                    if (this.variable != undefined){
                      let selectedvariable: VariableModel = value.variables.find((variable) => variable.variable_id == this.variable.variable_id)
                    let selectedcategory: CategoryModel = selectedvariable.categories.find((category) => category.category_id == this.category.category_id)
                    this.images = selectedcategory.images
                    this.textvalues = selectedcategory.text
                  }



                  });

              this.store.select(fromRoot.getVariabletemplateError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

          console.log(this.textvalues) 
  }

  textValuesChanged(value){
        event.preventDefault()
            this.store.dispatch(new actions.Addvariablecategorytext({"variable_id": this.variable.variable_id, "category_id": this.category.category_id, "text": value}))
    }

  ngOnInit() {
        }

  onAction(value){
        event.preventDefault()
        this.store.dispatch(new actions.Addvariablecategoryimages({"variable_id": this.variable.variable_id, "category_id": this.category.category_id, 
                                                    "image": value.file, "user_id": this.loggedUser.user_id}))
        this.ng2FileInputService.reset(this.myFileInputIdentifier);
            }

    imageClick(image){
      event.preventDefault()
      this.store.dispatch(new actions.Deletevariablecategoryimages({"variable_id": this.variable.variable_id, "category_id": this.category.category_id,
        "key": image.key, "image_name": image.image_name } ))

    }

}
