import { observeOn } from 'rxjs/operator/observeOn';
import { toast } from 'angular2-materialize';

import { baseServeCommandOptions } from '@angular/cli/commands/serve';
import { Conditional } from '@angular/compiler';

import {DomainModel, ConceptModel} from '../../../../models/ontology.models' 
import { UserModel} from '../../../../models/user.model';
import {SubconceptModel} from '../../../../models/subconcept.model';
import {NanoskillModel} from '../../../../models/nanoskill.model';
import {QuestionModel} from '../../../../models/question.model';

import {State, Store} from "@ngrx/store"
import { Observable, ObservableInput } from 'rxjs/Observable';
import {ApplicationStore} from "../../../../app.store"
import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, ChangeDetectionStrategy, AfterViewInit } from '@angular/core';
import {MaterializeDirective} from "angular2-materialize";
import * as Materialize from 'angular2-materialize';
import * as fromRoot from '../../../../reducers';
import * as actions from '../../../../actions/question.actions';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { Validator } from 'codelyzer/walkerFactory/walkerFn';
declare var $:any;
import "jqueryui"

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})

/* 
So this is how it s works, Whenever a user clicks on the Edit question, A action is intiated with selected module option
Now when a user clicks on Add_option button a new acion is activated, adding an option with option number and
froala content. This action will be sent from the question editor component.

This component will then subscribe to this option and renders 


*/



 export class QuestionsComponent implements OnInit {
    public editorContent: any;

    public module_options: Array<string>
    public openAdd: boolean
    public openEdit: boolean
    public module: QuestionModel;
    public selectedParent: NanoskillModel
    public domains$: Observable<any>;
    public user: UserModel
    public nanoskills$: Observable<any>;
    public questions$: Observable<any>;
    public currentPage: number = 1;
    myForm : FormGroup;

    public options: Object
    public user$ 
    public subscriber_two 
    public pages: number[];
    public module_count$: Observable<number>;
    public selectedDomain: DomainModel
    public selectedConcept: ConceptModel
    public selectedSubconcept: SubconceptModel
    public selectedNanoskill: NanoskillModel
    private QuestionTypeData = []
    private QuestionTypeSettings = {}
    private question_type: string
    
    @Output() unfreezeontology = new EventEmitter<boolean>();

    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>, private fb: FormBuilder ) {
        //this.selected_domain = this.store.select("Selecteddomain")
        this.nanoskills$ = this.store.select(fromRoot.getNanoskills);
        this.questions$ = this.store.select(fromRoot.getQuestions);
        this.module_count$ = this.store.select(fromRoot.getQuestionCount)
        
       // this.selectedDomain$ = this.store.select(fromRoot.getSelectdDomainId) 

        this.myForm = this.fb.group({
            module_name: [''],
            description: ['',],
            question_text: [],
            options: this.fb.array([])
        });


    }
    
    addOption(): void {
        event.preventDefault()
        const arrayControl = <FormArray>this.myForm.controls['options'];
        let newGroup = this.fb.group({
            option_name: [''],
            /* Fill this in identically to the one in ngOnInit */

        });
        arrayControl.push(newGroup);
    }
    delInput(index: number): void {
        const arrayControl = <FormArray>this.myForm.controls['options'];
        arrayControl.removeAt(index);
        this.store.dispatch(new actions.Deletequestionoption({"index": index+1}))
        
    }


    ngOnInit(){
        this.QuestionTypeData = [{"id": 1, "itemName": "True/False"}, {"id": 2, "itemName": "Multiple Choice"}, 
                                {"id": 3, "itemName": "Fill In Blanks"}, 
                                {"id": 4, "itemName": "Drag N Drop"}, {"id": 5, "itemName": "Only Images"}, 
                                {"id": 6, "itemName": "Images N Text"}, {"id": 7, "itemName": "Only Text"}, 
                                {"id": 8, "itemName": "Tables"}, {"id": 9, "itemName": "Horizontal"}, 
                            
                            ]
 
        this.QuestionTypeSettings = { 
                                  singleSelection: true, 
                                  text:"Question Type",
                                  selectAllText:'Select All',
                                  //unSelectAllText:'UnSelect All',
                                  //enableSearchFilter: true,
                                 // classes:"myclass custom-class"
                                };            


        this.subscriber_two = this.store.select(fromRoot.getAuthenticatedUser)
        this.subscriber_two.subscribe(value => {
            this.user = value
        });

        this.store.select(fromRoot.getQuestionPages)
        .subscribe(value => {
            console.log(value)
            //this.pages = new Array(value);//create an empty array with length 45
            this.pages = Array(value).fill(0).map((e,i)=>i+1)

        });

        this.store.select(fromRoot.getSelectedNanoskill)
            .filter(value => value != undefined)
            .subscribe(value => {
            this.selectedParent = value;
            console.log(value)
            this.store.dispatch(new actions.Loadquestion({"parent_id": value.module_id, "user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": null}))

        });

        this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.user = value
        });


        this.store.select(fromRoot.getSelectedNanoskill)
            .subscribe(value => {
               this.selectedNanoskill = value
        });

       
                    

/* 
        this.store.select(fromRoot.getSelectedDomain)
            .subscribe(value => {
                console.log(value)
                this.selectedDomain = value
        });

        this.store.select(fromRoot.getSelectedConcept)
            .subscribe(value => {
            this.selectedConcept = value
        });

        this.store.select(fromRoot.getSelectedSubConcept)
            .subscribe(value => {
            this.selectedSubconcept = value
        });
 */

        //Everytime a user clicks on Edit question, A event is sent to the store which updates 
        //selectedQuestion to the selecctedquestion for edit.        
        this.store.select(fromRoot.getSelectedQuestion)
            .subscribe(value => {
               this.module = value
            });

        this.store.select(fromRoot.getQuestionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast("ERROR: "+ value, 4000);
          })

        
        this.store.select(fromRoot.getQuestionMessage)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast(value, 4000);
          })
    };
        
    ngOnDestroy(){
        //this.subscriber_one.unsubscribe()
        //this.subscriber_two.unsubscribe()
    };

    delete(question: QuestionModel) {
        this.store.dispatch(new actions.Deletequestion({"module_id": question.module_id, "user_id": this.user.user_id}))
    }
    
    editModule(module){
        //Now getting this.module which is actually selectedModule which is selected Question.
        // Everything that is updated during edit is in Question selected module state.
        event.preventDefault()
        console.log(module)
        console.log(this.module)
        var data = Object.assign({}, this.module, {"description": module.description})

        this.store.dispatch(new actions.Editquestion({"module": data, "user": this.user}))
      
    }
    
    modify_data(data){
        return data.map((object)=> {
            return {"module_id": object.id, "module_name": object.itemName}
        })
    }
    //This is when a user clicks on the top add button in right of every module, 
    //A form will opened
    addQuestion(module){
        event.preventDefault()
        //this.service.addConcept(concept)
        var data = Object.assign({}, module, {"parent_id": this.selectedNanoskill.module_id, "user_id": this.user.user_id, "question_type": this.modify_data(this.question_type)})
        this.store.dispatch(new actions.Addquestion(data))
    }

    unfreezeOntology(){
        this.unfreezeontology.emit(false)
    }

    addModuleButton(module){
        this.openAdd= true
        this.openEdit = false
    }
    
    deleteOption(option){

}

    edit(question: QuestionModel) {
      this.openEdit= true;    
      this.openAdd = false; //This will close the add new nanoskill form just to avoid confusion   
      this.store.dispatch(new actions.Selectedquestion(question))
      console.log(question)
      this.editorContent = question.question_text
      console.log(this.editorContent)
    }


    pageChanged(input){
        console.log("changed nanoskill clicked")
        this.currentPage = input
        this.store.dispatch(new actions.Loadquestion({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadquestion({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

}