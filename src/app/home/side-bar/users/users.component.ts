import { Validator } from 'codelyzer/walkerFactory/walkerFn';
import { toast } from 'angular2-materialize';

import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import {State, Store} from "@ngrx/store"
import {Observable} from "rxjs/Observable";
import { UserModel } from '../../../models/user.model';
import { UsersEffects } from '../../../effects/users.effects';
//import {ApplicationStore} from "../../../app.store"
import * as UserActions from '../../../actions/users.actions';
import * as fromRoot from '../../../reducers';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
    openform: boolean;
    userModuleCount$: Observable<number>;
    currentUserPage$: Observable<number>;
    public currentPage: number =1  //this is the current page number that we will get from the ngxpagination

    changePassword: boolean = false //Flag to control change password functionality, Its value 
                              // Will be true only when a user clicks on change password button
    edit: boolean;
    add: boolean;
    user: UserModel ;
    actionUser: UserModel;
    users$: Observable<any>;
    user_type: string = ""
    complexForm : FormGroup;
    user_types= ["r1", "r2", "admin", "superadmin", "general", "r3"];
    create_domains = [true, false]
    public pages: number[];

    constructor(private store: Store<fromRoot.AppState>, fb: FormBuilder ) {
       this.store.select(fromRoot.getAuthenticatedUser)
            .subscribe(value => {
            console.log("Authenticated user" + value.user_id)
            this.actionUser = value
        });


        this.store.select(fromRoot.getUserError)
          .filter((value) => value !== undefined && value !== null ) 
          .subscribe(value =>{
            toast("ERROR: "+ value, 4000);
          })

        this.store.select(fromRoot.getUserPages)
          .subscribe(value => {
            console.log(value)
            //this.pages = new Array(value);//create an empty array with length 45
            this.pages = Array(value).fill(0).map((e,i)=>i+1)

        });


    this.complexForm = fb.group({
      first_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      last_name: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(24)]],
      email: ['', [Validators.required, Validators.email]],
      phone_number: ['', [Validators.required, Validators.pattern]],
      password: ['', [Validators.required]],
      confirm_password: ['', [Validators.required]],
      user_type: ['', [Validators.required]],
     create_domain : [false],
      username: ['', [Validators.required]],
      user_secret: ['', [Validators.required]],
      create_variable: [false],
      create_variabletemplate: [false,],
      create_template: [false, ]
      

    }, {validator: this.checkIfMatchingPasswords('password', 'confirm_password')});

    this.complexForm.valueChanges
      .subscribe(data => this.onValueChanged(data));
    this.onValueChanged(); // (re)set validation messages now

    // Here we are using the FormBuilder to build out our form.
  
            //this.users$.subscribe((user) => console.log(user))
            this.users$ = this.store.select(fromRoot.getUsers);
            this.currentUserPage$ = this.store.select(fromRoot.getUserPages);
            this.userModuleCount$ = this.store.select(fromRoot.getUserCount);
    //this.store.dispatch(new UserActions.Loadusers())

}

  
checkIfMatchingPasswords(passwordKey: string, passwordConfirmationKey: string) {
          return (group: FormGroup) => {
            let passwordInput = group.controls[passwordKey],
                passwordConfirmationInput = group.controls[passwordConfirmationKey];
            if (passwordInput.value !== passwordConfirmationInput.value) {
              //return passwordConfirmationInput.setErrors(this.formErrors["confirm_password"]["MatchPassword"])
              return passwordConfirmationInput.setErrors({notEquivalent: true})
            }
            else {
                return passwordConfirmationInput.setErrors(null);
            }
          }
        }

  onValueChanged(data?: any) {
    if (!this.complexForm) { return; }
    const form = this.complexForm;
    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);
      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }
  formErrors = {
    'first_name': '',
    'last_name': '',
    'username': '',
    'email': '',
    'phone_number': '',
    'password': '',
    'confirm_password': '',
   'user_secret': '', 
   'user_type': '',
   'create_domain': '',
   'create_variable': '',
   'create_template': '',
   'create_variabletemplate': ''
  
  };

  validationMessages = {
    'first_name': {
      'required':      'First Name is required.',
      'minlength':     'First Name must be at least 4 characters long.',
      'maxlength':     'First Name cannot be more than 24 characters long.',
    },
    
    'last_name': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name mthis.user.create_variableust be at least 4 characters long.',
      'maxlength':     'Last cannot be more than 24 characters long.',
    },

      'username': {
      'required':      'Last Name is required.',
      'minlength':     'Last Name must be at least 4 characters long.',
      'maxlength':     'Last cannot be more than 24 characters long.',
    },
    'email': {
      'required': 'Email is required.',
      'email': "Pleae enter a valid meail id"
    },


    'phone_number': {
      'required': 'Phone number is required.'
    },
    
    'password': {
      'required': 'Password is required.'
    },

    'confirm_password': {
      'required': 'Confirm is required.',
      "notEquivalent": "Password Do not match"
    },

     'superadmin': {
      'required': 'user_type is required.'
       
     },


     'user_secret': {
      'required': 'user_secret is required.'
       
     },
   'create_domain': {'required': 'Create Domain permissions are required'},
   'create_variable': {'required': 'Create Variable permissions are required'},
   'create_template': {'required': 'Create Template permissions are required'},
   'create_variabletemplate': {'required': 'Create Variable Template permissions are required'}
  }

                                                                                                 
  ngOnInit() {
    this.openform = false;
    this.store.dispatch(new UserActions.Loadusers({"skip": 0, "limit": 1000, "search_text": null, "user_id": this.actionUser.user_id}))
    
  }

  addUser(){
    console.log("Add user form has been created");
    this.openform = true;
    this.edit= false;    
    this.add= true
  }
  
  formsubmit(user: UserModel){
    console.log(user)  
    if(this.add){ 
        console.log("add user submit")
        this.store.dispatch(new UserActions.Adduser(user))
      }
    else{
        console.log("Edit user submit")
        var data = Object.assign({}, user, {"user_id": this.user.user_id})
        console.log(data)
        this.store.dispatch(new UserActions.Edituser(data))
    }
      
    }
  
  deleteUser(user: UserModel){
        console.log(user)
        console.log(this.actionUser)
        this.store.dispatch(new UserActions.Deleteuser({"user_id": user.user_id, "action_user_id": this.actionUser.user_id }))
    
  }

  changePasswordEvent(){
      event.preventDefault()
      this.edit = false

      this.complexForm.patchValue({
        password: "",
        confirm_password: "",
});

  }

  editUser(user: UserModel){
      this.openform = true;
      this.user = user
      this.edit= true;    
      this.add=false
      console.log(this.user)
      this.complexForm.setValue({
          first_name: this.user.first_name,
          last_name: this.user.last_name,
          email:  this.user.email,
          phone_number: this.user.phone_number,
          password: this.user.password,
          confirm_password: this.user.password,
          user_type: this.user.user_type,
          user_secret: null,
          create_domain : this.user.create_domain,
          username: this.user.username,
          create_variable: this.user.create_variable,
          create_template : this.user.create_template,
          create_variabletemplate: this.user.create_variabletemplate
      })

      this.user_type = user.user_type
  }



      pageChanged(input){
        console.log("Page Chnged clicked")
        this.currentPage = input
        this.store.dispatch(new UserActions.Loadusers({"skip": 15*(input-1), "limit": 15, "search_text": null, "user_id": this.actionUser.user_id }))
    
    }
    

    search_text_changed(search_text){
        this.store.dispatch(new UserActions.Loadusers({ "skip": 0, "limit": 15, "search_text": search_text, "user_id": this.actionUser.user_id }))
        this.openform = false
      }
}
