import { NgModule } from '@angular/core';

import { VariablefileDirective } from './variablefile.directive';

@NgModule({
    declarations: [
         VariablefileDirective
    ],
    exports: [
         VariablefileDirective
    ]
})
export class SharedModule{}