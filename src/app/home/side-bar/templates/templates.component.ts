import { UserModel } from '../../../models/user.model';
import { Observable } from 'rxjs/Rx';
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
    public currentPage: number;

    public templates$: Observable<object>;
    public pages$: Observable<number>;
    public template_count$: Observable<number>;
    public loggedUser: UserModel;
    public nodes;
    public loading: boolean=false;  
    public addTemplateFlag: boolean=false;  
    public editTemplateFlag: boolean=false;  
      public options: ITreeOptions = {
        //displayField: 'name',
        //idField: 'uuid',
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
        animateExpand: true,
        //animateSpeed: 30,
        //animateAcceleration: 1.2
      }
 
      constructor(private store: Store<fromRoot.AppState>,) { 
            this.templates$ = this.store.select(fromRoot.getTemplates);
            this.pages$ = this.store.select(fromRoot.getTemplatePages)
            this.template_count$ = this.store.select(fromRoot.getTemplateCount)
                    this.store.select(fromRoot.getAuthenticatedUser)
                .subscribe(value => {
                  this.loggedUser = value
        });

      }

      ngAfterInit(){
      }

      ngOnInit() {
          this.store.dispatch(new actions.Loadtemplate({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": null}))

        
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
                    //So happy to find this bug, If you dont put JSON.parse and use just value
                    // It will show an error if you move one node to another, as it will
                    // Implies a state change and Store.freeze will not let you do it.
                    //Json.parse will create a new object.
                    this.nodes = JSON.parse(JSON.stringify(value));
                    //this.tree.treeModel.update() 
                    console.log(this.nodes)
            }) 
 


  }


       setState(state) {
         //(stateChange)="setState($event)"
         localStorage.treeState = this.nodes;
      }

      addTemplate(){
          this.store.dispatch(new actions.Loadtemplateskton())
          this.addTemplateFlag = true
        }

      deleteNode(node){
          console.log(node.index)
          this.nodes.splice(node.index, 1)
          this.tree.treeModel.update();
}

      onMoveNode($event) {
          console.log("Moved", $event.node.name, "to", $event.to.parent.name, "at index", $event.to.index);
          }

      addTemplateSubmit(value: any, event: Event){
          event.preventDefault()
          console.log(value)
          this.store.dispatch(new actions.Addtemplate({"template_name": value.template_name, 
          "board": value.board, "class": value.class, "description": value.description, "template": this.nodes}))

          //This flag closes the add form which have ontology in it
          this.addTemplateFlag = false

      }


      add(template){
        console.log(template)
      }

      delete(template){
        console.log(template)
        this.store.dispatch(new actions.Deletetemplate({"user_id": this.loggedUser.user_id, "template_id": template.template_id}))

      }

      pageTemplateChanged(input){
        console.log("changed nanoskill clicked")
        this.currentPage = input
        this.store.dispatch(new actions.Loadtemplate({"user_id": this.loggedUser.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadtemplate({"user_id": this.loggedUser.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

}
