import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    // must declare these variable first
  // these variable will interact with this components form value through [(ngModel)]
  private name: String;
  private username: String;
  private email: String;
  private password: String;

  constructor(private validateService: ValidateService, private authService: AuthService) {}

  ngOnInit() {}

  onFormSubmit(isvalid) {
     // bring those [(ngModel)] variables here to be used inside this function
    let user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // making sure  no field is blank by validator service
    if (this.validateService.userValidation(user)) {
      // if all field are filed out make the api call for this user to be registered

      this.authService.userRegistration(user).subscribe(data => {
        if (data.success) {
          //returns success message from the api
          console.log(data.msg);
        } else {
          // returns error message from the api
          console.log(data.msg);
        }
      });
    }


  }



}
