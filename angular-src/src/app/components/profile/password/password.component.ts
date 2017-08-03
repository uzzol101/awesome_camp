import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { SharedService } from '../../../services/shared.service';


@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  password: String;
  rPassword: String;

  constructor(private router: Router, private authService: AuthService, private sharedService: SharedService) {}

  ngOnInit() {

  }

  comparePassword() {
    if (!this.password) {
      console.log("please enter password to change");
      return false;
    } else {
      if (this.password === this.rPassword) {

        return true;
      } else {
        console.log("password do not match");
        return false;
      }
    }

  }

  changePassword() {
    let password = {
      password: this.password
    };
    if (this.comparePassword()) {

      let userId = this.sharedService.getUser();
      this.authService.changePassword(userId._id, password)
        .subscribe(data => {

        });



      localStorage.clear();
      this.router.navigate(["/login"]);

      this.password = "";
      this.rPassword = "";

      // this.router.navigate([/])


    }


  }

}
