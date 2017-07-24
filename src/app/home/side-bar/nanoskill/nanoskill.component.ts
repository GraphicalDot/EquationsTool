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
    public nanoskillCreate: boolean
    public nanoskillEdit: boolean
    public nanoskills: Observable<Array<NanoskillModel>>;
    public nanoskill: any;
    
    constructor(private store: Store<NanoskillStore>, private service: NanoskillService,) { 

          this.nanoskills = service.nanoskills;
          service.loaditems();
      }

    ngOnInit() {
   
  };

  ngOnDestroy(){

  };

  delete(nanoskill) {
      this.service.deleteItem(nanoskill);
  }

  addUser(value: any){
    this.nanoskillCreate = true;    
    
  }
     submitForm(nanoskill){
      this.service.createItem(nanoskill);
      this.nanoskillCreate = false;  
  }
  
  edit(nanoskill) {
      this.nanoskillEdit= true;    
      this.nanoskillCreate = false; //This will close the add new nanoskill form just to avoid confusion   
      this.nanoskill = nanoskill;
    }

  submitEdit() {
    console.log(this.nanoskill)
    this.service.editItem(this.nanoskill);


  }


}
