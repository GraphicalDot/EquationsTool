import { JQueryStyleEventEmitter } from 'rxjs/observable/FromEventObservable';
import { Component, OnInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";

@Component({
  selector: 'app-domain',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.css']
})
export class OntologyComponent implements OnInit {
  
    selectOptions: Array<any>;
    constructor() { }

    ngOnInit() {
      this.selectOptions = [{"name": "One", "value": 1}, {"name": "Two", "value": 2}]
  }


}