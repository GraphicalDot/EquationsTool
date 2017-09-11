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


@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush

})
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
    public currentQPage: number;
    myForm : FormGroup;

    public options: Object = {
                                beforeUpload: function (e, editor, images) {
                                },
                              charCounterCount: true,
                              // Set the image upload parameter.
                              imageUploadParam: 'image_data',
                      
                              // Set the image upload URL.
                              imageUploadURL: 'http://localhost:8000/uploadimage',
                      
                              // Additional upload params.
                              imageUploadParams: {user_id: 'my_editor', "module_id": ""},
                      
                              // Set request type.
                              imageUploadMethod: 'POST',
                      
                              // Set max image size to 5MB.
                              imageMaxSize: 5 * 1024 * 1024,
                      
                              // Allow to upload PNG and JPG.
                              imageAllowedTypes: ['jpeg', 'jpg', 'png'],
                              events: {
                                  'froalaEditor.initialized': function() {
                                      console.log('initialized');
                                    },
                                'froalaEditor.image.beforeUpload': function (e, editor, images){
                                        var reader = new FileReader();
                                        reader.addEventListener("load", function () {
                                            console.log(reader.result);
                                        }, false);
                                        if (images[0]) {
                                            var data = reader.readAsDataURL(images[0]);
                                            console.log(data[1])
                                            return data[1]
                                        }
                                    }
                                }
                           
                            };
    public user$ 
    public subscriber_two 
    public pages$: Observable<number>;
    public module_count$: Observable<number>;
    public selectedDomain: DomainModel
    public selectedConcept: ConceptModel
    public selectedSubconcept: SubconceptModel
    public selectedNanoskill: NanoskillModel
    @Output() unfreezeontology = new EventEmitter<boolean>();

    //constructor(private store: Store<ApplicationStore>, private service: DomainService,) { 
    constructor(private store: Store<fromRoot.AppState>, private fb: FormBuilder ) {
        //this.selected_domain = this.store.select("Selecteddomain")
        this.nanoskills$ = this.store.select(fromRoot.getNanoskills);
        this.questions$ = this.store.select(fromRoot.getQuestions);
        this.pages$ = this.store.select(fromRoot.getQuestionPages)
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
        const arrayControl = <FormArray>this.myForm.controls['options'];
        let newGroup = this.fb.group({
            option_name: [''],
            option_order: [''],
            option_text: [''],
            option_image :['']
            /* Fill this in identically to the one in ngOnInit */

        });
        arrayControl.push(newGroup);
    }
    delInput(index: number): void {
        const arrayControl = <FormArray>this.myForm.controls['options'];
        arrayControl.removeAt(index);
    }


    ngOnInit(){
        this.subscriber_two = this.store.select(fromRoot.getAuthenticatedUser)
        this.subscriber_two.subscribe(value => {
            this.user = value
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

        this.store.select(fromRoot.getSelectedNanoskill)
            .subscribe(value => {
               this.selectedNanoskill = value
        });

        
        this.store.select(fromRoot.getSelectedQuestion)
            .subscribe(value => {
               this.module = value
            });

        this.store.select(fromRoot.getQuestionError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast("ERROR: "+ value, 4000);
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
      
    }
    
    //This is when a user clicks on the top add button in right of every module, 
    //A form will opened
    addQuestion(module){
        console.log(this.myForm.value)
        console.log(this.editorContent)
    }

    unfreezeOntology(){
        this.unfreezeontology.emit(false)
    }

    addModuleButton(module){
        this.openAdd= true
        this.openEdit = false
    }
    
    deleteOption(option){

        this.store.dispatch(new actions.Deletequestionoption(option))
}

    edit(question: QuestionModel) {
      this.openEdit= true;    
      this.openAdd = false; //This will close the add new nanoskill form just to avoid confusion   
      this.store.dispatch(new actions.Selectedquestion(question))
    }
    change(newValue) {
      Materialize.toast('child select', 2000)
    }

    pageNanoskillChanged(input){
        console.log("changed nanoskill clicked")
        this.currentQPage = input
        this.store.dispatch(new actions.Loadquestion({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 15*(input-1), "limit": 15, "search_text": null}))
    
    }

    search_text_changed(search_text){
        this.store.dispatch(new actions.Loadquestion({"parent_id": this.selectedParent.module_id, "user_id": this.user.user_id, "skip": 0, "limit": 15, "search_text": search_text}))
    }

}