import { Directive, Input } from '@angular/core';
import { TemplateRef, ViewContainerRef } from '@angular/core';


@Directive({ selector: '[variablefile]' })
export class VariablefileDirective {
    constructor(
              private templateRef: TemplateRef<any>,
                private viewContainer: ViewContainerRef
  ) { }


}



