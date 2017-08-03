import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() {}
  // chaeck for every field has filled up
  userValidation(user) {
    if (!user.name || !user.username || !user.email || !user.password) {
      console.log("Fill out all form field first");
      return false;
    } else {

      return true;
    }
  }
  // check all field before login
  loginValidator(user) {
    if (!user.username) {
      console.log("Enter your username");
      return false;
    } else if (!user.password) {
      console.log("Enter your password");
      return false;
    } else {
      return true;
    }
  }

  // new camp validator

  newCampValidator(newCamp) {
    if (!newCamp.name || !newCamp.image || !newCamp.description) {
      console.log("Fill out all form field first");
      return false;
    } else {

      return true;
    }
  }

}
