import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-ontology',
  templateUrl: './ontology.component.html',
  styleUrls: ['./ontology.component.css']
})
export class OntologyComponent implements OnInit {
  userCreate = false;
   roles: Array<Object> = ["Admin", "reviewer_one", "reviewer_two", "reviewer_three", "validator"
      ];
  constructor() { }

  ngOnInit() {
  }
addUser(){
    console.log("Add user form has been created");
    this.userCreate = true;
    
  }
     submitForm(value: any){
  	    console.log(value);
  	    console.log("gadhe");
/*         this.signinService.getUser(value.username, value.password)
                 .subscribe(
                       data => {if(data.error)
                            this.errorMessage = data.message;
                            else {
                              console.log(data.token)
                              localStorage.setItem('user_token', data.token)
                            }
                      
                      },
                       error =>  this.errorMessage = <any>error);
      
 */  }

}
