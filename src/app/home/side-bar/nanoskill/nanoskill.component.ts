import { Component, OnInit, OnDestroy,  Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import {NanoskillModel} from "./nanoskill.model"
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import {NanoskillStore} from "./nanoskill.store"
import {NANOSKILLS_ACTIONS} from "./nanoskill.actions";
import {NanoskillService} from "./nanoskill.service";

@Component({
  selector: 'app-nanoskill',
  templateUrl: './nanoskill.component.html',
  styleUrls: ['./nanoskill.component.css'], 
  //changeDetection: ChangeDetectionStrategy.OnPush
})
export class NanoskillComponent implements OnInit, OnDestroy {

   public nanoskills: Observable<Array<NanoskillModel>>;
      constructor(private store: Store<NanoskillStore>, private service: NanoskillService,) { 

          this.nanoskills = service.nanoskills;
          service.loaditems();
      }

    ngOnInit() {
   
  };

  ngOnDestroy(){

  };

  delete(nanoskill) {
    this.store.dispatch({
      type: NANOSKILLS_ACTIONS.DELETE_NANOSKILL,
      payload: nanoskill,
    })
  }

  addUser(){
    console.log("Add user form has been created");
    
  }
     submitForm(value: any){
      
  }


}
