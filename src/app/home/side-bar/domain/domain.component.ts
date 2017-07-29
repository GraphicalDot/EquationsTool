import { JQueryStyleEventEmitter } from 'rxjs/observable/FromEventObservable';
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";

@Component({
  selector: 'app-domain',
  templateUrl: './domain.component.html',
  styleUrls: ['./domain.component.css']
})
export class DomainComponent implements OnInit {
  
    selectOptions: Array<any>;
    constructor() { }

    ngOnInit() {
      this.selectOptions = [{"name": "One", "value": 1}, {"name": "Two", "value": 2}]
  }


}