import { Component, OnInit } from '@angular/core';
import {NanoskillModel} from "./nanoskill.model"
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'app-nanoskill',
  templateUrl: './nanoskill.component.html',
  styleUrls: ['./nanoskill.component.css']
})
export class NanoskillComponent implements OnInit {

   public nanoskills: Observable<Array<NanoskillModel>>;

      constructor(private _store: Store<State<NanoskillModel>>) { 
          _store.select("nanoskills").subscribe(state => this.nanoskills= state)

      }

  ngOnInit() {
    this.userCreate = false;
  }


  addUser(){
    console.log("Add user form has been created");
    this.userCreate = true;
    
  }
     submitForm(value: any){
      
  }


}
