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
              this.service.DomainPermission(payload)
              .map((value) => new PermissionActions.Loadpermissiondomainsuccess(value))
              .catch(err => of(new PermissionActions.Loadpermissiondomainfailure(err)))
        )

    
    @Effect() EditPermissiondomains$: Observable<Action> = this.actions$
        .ofType(PermissionActions.EDIT_PERMISSION_DOMAIN)
        .map((action: PermissionActions.Editpermissiondomain) => action.payload)
        .switchMap((payload) => 
              this.service.EditDomainPermission(payload)
              .map((value) => new PermissionActions.Editpermissiondomainsuccess(value))
              .catch(err => of(new PermissionActions.Editpermissiondomainfailure(err)))
        )



    }