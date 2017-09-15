import {Injectable} from "@angular/core"
import {PermissionService} from "../services/permission.service"
import * as PermissionActions from '../actions/permissions.actions';
import {Effect, Actions} from "@ngrx/effects"
import {Action} from "@ngrx/store"
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/startWith';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { of } from 'rxjs/observable/of';



@Injectable()
export class PermissionEffects {

    constructor(private actions$: Actions, private service: PermissionService) {}


    @Effect() Permissiondomains$: Observable<Action> = this.actions$
        .ofType(PermissionActions.LOAD_PERMISSION_DOMAIN)
        .map((action: PermissionActions.Loadpermissiondomain) => action.payload)
        .switchMap((payload) => 
              this.service.Permission(payload)
              .map((value) => new PermissionActions.Loadpermissiondomainsuccess(value))
              .catch(err => of(new PermissionActions.Loadpermissiondomainfailure(err)))
        )

    
    @Effect() EditPermissiondomain$: Observable<Action> = this.actions$
        .ofType(PermissionActions.EDIT_PERMISSION_DOMAIN)
        .map((action: PermissionActions.Editpermissiondomain) => action.payload)
        .switchMap((payload) => 
              this.service.EditPermission(payload)
              .map((value) => new PermissionActions.Editpermissiondomainsuccess(value))
              .catch(err => of(new PermissionActions.Editpermissiondomainfailure(err)))
        )


    @Effect() Permissionconcept$: Observable<Action> = this.actions$
        .ofType(PermissionActions.LOAD_PERMISSION_CONCEPT)
        .map((action: PermissionActions.Loadpermissionconcept) => action.payload)
        .switchMap((payload) => 
              this.service.Permission(payload)
              .map((value) => new PermissionActions.Loadpermissionconceptsuccess(value))
              .catch(err => of(new PermissionActions.Loadpermissionconceptfailure(err)))
        )

    
    @Effect() EditPermissionconcept$: Observable<Action> = this.actions$
        .ofType(PermissionActions.EDIT_PERMISSION_CONCEPT)
        .map((action: PermissionActions.Editpermissionconcept) => action.payload)
        .switchMap((payload) => 
              this.service.EditPermission(payload)
              .map((value) => new PermissionActions.Editpermissionconceptsuccess(value))
              .catch(err => of(new PermissionActions.Editpermissionconceptfailure(err)))
        )





    @Effect() Permissionsubconcept$: Observable<Action> = this.actions$
        .ofType(PermissionActions.LOAD_PERMISSION_SUBCONCEPT)
        .map((action: PermissionActions.Loadpermissionsubconcept) => action.payload)
        .switchMap((payload) => 
              this.service.Permission(payload)
              .map((value) => new PermissionActions.Loadpermissionsubconceptsuccess(value))
              .catch(err => of(new PermissionActions.Loadpermissionsubconceptfailure(err)))
        )

    
    @Effect() EditPermissionsubconcept$: Observable<Action> = this.actions$
        .ofType(PermissionActions.EDIT_PERMISSION_SUBCONCEPT)
        .map((action: PermissionActions.Editpermissionsubconcept) => action.payload)
        .switchMap((payload) => 
              this.service.EditPermission(payload)
              .map((value) => new PermissionActions.Editpermissionsubconceptsuccess(value))
              .catch(err => of(new PermissionActions.Editpermissionsubconceptfailure(err)))
        )




    @Effect() Permissionnanoskill$: Observable<Action> = this.actions$
        .ofType(PermissionActions.LOAD_PERMISSION_NANOSKILL)
        .map((action: PermissionActions.Loadpermissionnanoskill) => action.payload)
        .switchMap((payload) => 
              this.service.Permission(payload)
              .map((value) => new PermissionActions.Loadpermissionnanoskillsuccess(value))
              .catch(err => of(new PermissionActions.Loadpermissionnanoskillfailure(err)))
        )

    
    @Effect() EditPermissionnanoskill$: Observable<Action> = this.actions$
        .ofType(PermissionActions.EDIT_PERMISSION_NANOSKILL)
        .map((action: PermissionActions.Editpermissionnanoskill) => action.payload)
        .switchMap((payload) => 
              this.service.EditPermission(payload)
              .map((value) => new PermissionActions.Editpermissionnanoskillsuccess(value))
              .catch(err => of(new PermissionActions.Editpermissionnanoskillfailure(err)))
        )



    @Effect() Permissionquestion$: Observable<Action> = this.actions$
        .ofType(PermissionActions.LOAD_PERMISSION_QUESTION)
        .map((action: PermissionActions.Loadpermissionquestion) => action.payload)
        .switchMap((payload) => 
              this.service.Permission(payload)
              .map((value) => new PermissionActions.Loadpermissionquestionsuccess(value))
              .catch(err => of(new PermissionActions.Loadpermissionquestionfailure(err)))
        )

    
    @Effect() EditPermissionquestion$: Observable<Action> = this.actions$
        .ofType(PermissionActions.EDIT_PERMISSION_QUESTION)
        .map((action: PermissionActions.Editpermissionquestion) => action.payload)
        .switchMap((payload) => 
              this.service.EditPermission(payload)
              .map((value) => new PermissionActions.Editpermissionquestionsuccess(value))
              .catch(err => of(new PermissionActions.Editpermissionquestionfailure(err)))
        )


    }