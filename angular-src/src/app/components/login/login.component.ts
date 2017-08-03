import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  // must declare these variable first
  // these variable will interact with this components form value through [(ngModel)]
  private username: String;
  private password: String;


  constructor(private validateService: ValidateService, private authService: AuthService, private router: Router, private sharedService: SharedService) {



  }

  ngOnInit() {

  }


  onLoginSubmit() {
    // bring those [(ngModel)] variables here to be used inside this function
    let user = {
      username: this.username,
      password: this.password
    };
    // making sure  no field is blank by validator service
    if (this.validateService.loginValidator(user)) {
      // if all field are filed out make the api call for this user 
      this.authService.userLogin(user).subscribe(data => {
        if (data.success) {
          // data has jwt token and userinfo from the server
          console.log(data.msg);
          // pass data to be set on localstorage
          this.authService.setStorage(data.token, data.user)
          // pass the user data to be used in navbar will go through sharedService
          this.sharedService.shareData(data.user);
          // afer login navigate to this url
          this.router.navigate(['/camp-all']);
        } else {
          // returns error message from the server
          console.log(data.msg);
        }
      });
    }
  }


}
