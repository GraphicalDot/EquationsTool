import {QuestionModel} from '../models/question.model';
import {Injectable} from "@angular/core"
import {QuestionService} from "../services/question.service"
import * as actions from '../actions/question.actions';
import {Effect, Actions} from "@ngrx/effects"
import {Action} from "@ngrx/store"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { of } from 'rxjs/observable/of'




@Injectable()
export class QuestionEffects {

    constructor(private actions$: Actions, private service: QuestionService) {}

    @Effect() Selectedquestion$: Observable<Action> = this.actions$
        .ofType(actions.SELECTED_QUESTION)
        .map((action: actions.Selectedquestion) => action.payload)
        .map((payload: QuestionModel) => new actions.Selectedquestionsuccess(payload))

    @Effect() Clearallquestion$: Observable<Action> = this.actions$
        .ofType(actions.CLEAR_QUESTION)


   @Effect() Deletequestionoption$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_QUESTION_OPTION)
        .map((action: actions.Deletequestionoption) => action.payload)
        .map((payload: any) => new actions.Deletequestionoptionsuccess(payload))
        .catch(err => of(new actions.Deletequestionoptionfailure(err)))


   @Effect() Editquestionoption$: Observable<Action> = this.actions$
        .ofType(actions.EDIT_QUESTION_OPTION)
        .map((action: actions.Editquestionoption) => action.payload)
        .map((payload: any) => new actions.Editquestionoptionsuccess(payload))
        .catch(err => of(new actions.Editquestionoptionfailure(err)))



   @Effect() Addquestionoption$: Observable<Action> = this.actions$
        .ofType(actions.ADD_QUESTION_OPTION)
        .map((action: actions.Addquestionoption) => action.payload)
        .map((payload: any) => new actions.Addquestionoptionsuccess(payload))
        .catch(err => of(new actions.Addquestionoptionfailure(err)))



   @Effect() Addquestiontext$: Observable<Action> = this.actions$
        .ofType(actions.ADD_QUESTION_TEXT)
        .map((action: actions.Addquestiontext) => action.payload)
        .map((payload: any) => new actions.Addquestiontextsuccess(payload))
        .catch(err => of(new actions.Addquestiontextfailure(err)))


    
    @Effect() Editquestion$: Observable<Action> = this.actions$
        .ofType(actions.EDIT_QUESTION)
        .map((action: actions.Editquestion) => action.payload)
        .switchMap((payload) => 
              this.service.Editquestionservice(payload)
              .map((payload: QuestionModel) => new actions.Editquestionsuccess(payload))
              .catch(err => of(new actions.Editquestionfailure(err)))
        )

   
    @Effect() Loadquestion$: Observable<Action> = this.actions$
        .ofType(actions.LOAD_QUESTION)
         .map((action: actions.Loadquestion) => action.payload)
        .switchMap((payload) => 
              this.service.Loadquestionservice(payload)
              .map((concepts: QuestionModel[]) => new actions.Loadquestionsuccess(concepts))
              .catch(err => of(new actions.Loadquestionfailure(err)))
        )


    @Effect() Addquestion$: Observable<Action> = this.actions$
        .ofType(actions.ADD_QUESTION)
        .map((action: actions.Addquestion) => action.payload)
        .switchMap((payload) => 
              this.service.Addquestionservice(payload)
              .map((domain: QuestionModel) => new actions.Addquestionsuccess(domain))
              .catch(err => of(new actions.Addquestionfailure(err)))
        );

    @Effect() Deletequestion$: Observable<Action> = this.actions$
        .ofType(actions.DELETE_QUESTION)
        .map((action: actions.Deletequestion) => action.payload)
        .switchMap((payload) =>
              this.service.Deletequestionservice(payload)
              .map((msg) => new actions.Deletequestionsuccess(msg))
              .catch(err => of(new actions.Deletequestionfailure(err)))
        );


}