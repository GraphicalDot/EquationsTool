import { Component, OnInit, AfterContentInit, AfterViewInit, ElementRef,Renderer, ViewChild, Input} from '@angular/core';
import { fabric } from 'fabric';

/* ngOnInit() is called after ngOnChanges() was called the first time. ngOnChanges() is called every time inputs
 are updated by change detection.

ngAfterViewInit() is called after the view is initially rendered. This is why @ViewChild() depends on it.
 You can't access view members before they are rendered.
 */


 @Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  //styles: [':host {display: block; border: solid 1px red; width: 100%; height: 100%}']
  
})



export class EditorComponent implements AfterViewInit, AfterContentInit,  OnInit {
  canvas: any= null;
  height: number;
  width: number ;
  /* @Input() height: number = 500;
  @Input() width: number = 500;
  */
  //@ViewChild("mycanvas") Canvas: ElementRef; 
   constructor() {
       
  }

  ngOnInit() {
     this.canvas = new fabric.Canvas('fstage', {
        isDrawingMode: true,
        selection: true
      });
      this.height = 1000
      this.width = 1000  
    
      var grid = 20;
       for (var i = 0; i < (1700 / grid); i++) {
          this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1700], { stroke: '#ccc', selectable: false }));
          this.canvas.add(new fabric.Line([ 0, i * grid, 1700, i * grid], { stroke: '#ccc', selectable: false }))
      console.log("Hagga man");
      this.canvas.onFpsUpdate = function(){console.log("hey") };
      this.canvas.on('path:created', function(event) {
    
})
  } 

  }
   /* @HostListener('window:resize')
    resize() {
        this.width = window.innerWidth;
        this.height = window.innerHeight;
        this.render();
    }
 */
    ngAfterViewInit() {
        }

  ngAfterContentInit(){
      console.log('After content Init');
  };



}
