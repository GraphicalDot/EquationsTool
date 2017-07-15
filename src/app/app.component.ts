import { Component } from '@angular/core';
import {Router, Routes} from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'app';
  userData: any;
  constructor(private router: Router){
    			this.userData = localStorage.getItem('user_token');
			    console.log(this.userData);


  }

  ngOnInit(){
      if(this.userData == null) {
    	 			console.log("No user found")
    				this.router.navigate(["/home/editor"])
    			
    		}else{
    			//this.router.navigate(["/register"])
					console.log("User has been found");
    			this.router.navigate(["/home/editor"])
					
    		}


  }
}
