import { Component, OnInit, ViewChild } from '@angular/core';
import { TreeModule, TREE_ACTIONS, KEYS, IActionMapping, ITreeOptions } from 'angular-tree-component';
import * as fromRoot from '../../../reducers';
import * as actions from '../../../actions/template.actions';
import {NgxPaginationModule} from 'ngx-pagination';
import { toast } from 'angular2-materialize';
import {State, Store} from "@ngrx/store"
import { TreeComponent, TreeModel, TreeNode } from 'angular-tree-component';



@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.css']
})
export class TemplatesComponent implements OnInit {
    @ViewChild('tree') 
    public tree: TreeComponent;


    public nodes;
    public loading: boolean=false;  
      public options: ITreeOptions = {
        //displayField: 'name',
        //idField: 'id',
         /* actionMapping: {
          mouse: {
            dblClick: (tree, node, $event) => {
                if (node.hasChildren) TREE_ACTIONS.TOGGLE_EXPANDED(tree, node, $event);
                  console.log(node.children)    
              }

                  }
            },  */
       // nodeHeight: 100,
        allowDrag: true,
        allowDrop: true,
        //useVirtualScroll: true,
        //animateExpand: true,
        //animateSpeed: 30,
        //animateAcceleration: 1.2
      }
 
      constructor(private store: Store<fromRoot.AppState>,) { 


      }

      ngAfterInit(){
      }

      ngOnInit() {

        
          this.store.select(fromRoot.getTemplateError)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
              toast(value, 4000);
            })

          this.store.select(fromRoot.getTemplateLoading)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.loading = value
            })

          
             this.store.select(fromRoot.getTemplateSkton)
              .filter((value) => value !== undefined && value !== null ) 
              .subscribe(value =>{
                    this.nodes = value
                    this.tree.treeModel.update() 
                    
                    console.log(this.nodes)
            }) 
 


  }


       setState(state) {
         //(stateChange)="setState($event)"
         localStorage.treeState = JSON.stringify(state);
      }

      addTemplate(){
          this.store.dispatch(new actions.Loadtemplateskton())
      }
      
     
onMoveNode($event) {
  console.log(
    "Moved",
    $event.node.name,
    "to",
    $event.to.parent.name,
    "at index",
    $event.to.index);
}
}
