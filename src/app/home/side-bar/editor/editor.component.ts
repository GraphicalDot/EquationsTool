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
    state_arr: any[]= [];
    removed_arr: any[] = [];
    ctx: any;
    isvalid = true;

    /* @Input() height: number = 500;
    @Input() width: number = 500;
    */
    //@ViewChild("mycanvas") Canvas: ElementRef; 
    constructor() {}

    ngOnInit() {
        this.canvas = new fabric.Canvas('fstage', {
            isDrawingMode: true,
            selection: true})

    
        //CReate a grid of lines on the canvas
        this.drawGrid()  
        
        this.canvas.on('path:created',(event) =>  {
            this.state_arr.push(event.path);
            console.log(this.state_arr.length); })

        //Getting context for 2d for the object this.canvas
        this.ctx = this.canvas.getContext('2d');
        



  }

    drawGrid(){
        var grid = 20;
        for (var i = 0; i < (1700 / grid); i++) {
            this.canvas.add(new fabric.Line([ i * grid, 0, i * grid, 1700], { stroke: '#ccc', selectable: false }));
            this.canvas.add(new fabric.Line([ 0, i * grid, 1700, i * grid], { stroke: '#ccc', selectable: false }))
          //this.canvas.onFpsUpdate = function(){console.log("hey") };
          }
      

    }

    undo() {
       /*  var lastItemIndex = (this.canvas.getObjects().length - 1);
        var item = this.canvas.item(lastItemIndex);
         */
        var item = this.state_arr.pop();
        if(item.get('type') === 'path') {
              this.canvas.remove(item);
              this.canvas.renderAll();
              this.removed_arr.push(item);
            }
        localStorage.setItem("canvas", JSON.stringify(this.state_arr))
         
        };
  
    redo() {
        if(this.removed_arr.length != 0){
            var item = this.removed_arr.pop();
            this.canvas.add(item)
            this.canvas.renderAll();
            this.state_arr.push(item)
        localStorage.setItem("canvas", JSON.stringify(this.state_arr))
            
        }
  }

    isValid(){
        return !this.removed_arr.length
    }

    clear(){
        this.canvas.clear();
        this.drawGrid();
        this.removed_arr = [];
        localStorage.removeItem("canvas")
        
    }
    download(){
        console.log('export image');
 if (!fabric.Canvas.supports('toDataURL')) {
  alert('This browser doesn\'t provide means to serialize canvas to an image');
}
else {
  window.open(this.canvas.toDataURL('png'));
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
