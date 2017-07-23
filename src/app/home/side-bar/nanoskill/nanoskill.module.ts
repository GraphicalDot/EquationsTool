import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NanoskillRoutes} from "./nanoskill.route";
import { Routes, RouterModule } from "@angular/router";
import {NanoskillComponent} from "./nanoskill.component";

import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

@NgModule({
  declarations: [NanoskillComponent],
  imports: [
    CommonModule,
    FormsModule,
    HttpModule, 
    RouterModule.forChild(NanoskillRoutes),
  ],
  
    exports: [RouterModule, NanoskillComponent],
})
export class NanoskillModule { }
