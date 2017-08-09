import { NanoskillStore } from './nanoskill.store';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NanoskillRoutes} from "./nanoskill.route";
import { Routes, RouterModule } from "@angular/router";
import {NanoskillComponent} from "./nanoskill.component";

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {NanoskillService} from "./nanoskill.service";
import {StoreModule} from "@ngrx/store"
import {NanoskillReducer} from "./nanoskill.reducer"



@NgModule({
  declarations: [NanoskillComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(NanoskillRoutes),
     StoreModule.provideStore({NanoskillReducer}),
  ],
    providers: [NanoskillService],
    exports: [RouterModule, NanoskillComponent],
})
export class NanoskillModule { }
