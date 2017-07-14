import { Component, OnInit } from '@angular/core';
import { fabric } from 'fabric';


@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.css']
})
export class EditorComponent implements OnInit {
  canvas: any= null;
  constructor() { }

  ngOnInit() {
    console.log("This is the fabric Version = " +  fabric.version);
     this.canvas = new fabric.Canvas('fstage', {
        isDrawingMode: true,
        selection: true
      });
  }

}
