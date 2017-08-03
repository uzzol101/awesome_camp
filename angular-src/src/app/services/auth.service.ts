import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from "rxjs/Observable";
import "rxjs/add/operator/map";
interface Mydata {

}
@Injectable()
export class AuthService {
  authToken: any;
  public headers: any;
  // set the http headers
  setHeader() {
    this.loadToken();
    this.headers = new HttpHeaders().set("Content-Type", "application/json");
  }
  // = new HttpHeaders().set("Authorization", this.authToken);


  constructor(private http: HttpClient) {
    //this.userInfo();
  }

  // send request to backend api where user is user info to be registered in db
  userRegistration(user) {
    return this.http.post("http://localhost:3000/register", user, { headers: this.headers }).map((data: any) => {
      return data;
    });
  }

  userLogin(user) {
    return this.http.post("http://localhost:3000/login", user, { headers: this.headers }).map((data: any) => {

      return data;
    });
  }
  loadToken() {
    this.authToken = JSON.parse(localStorage.getItem('token'));


  }

  // gett all camp data
  getCamp() {
    // set the header 
    this.setHeader();

    return this.http.get("http://localhost:3000/camp/all", { headers: this.headers }).map((data: any) => {
      return data;
    });
  }


  // store data to localStorage. this will avail data to any component
  setStorage(token, user) {
    localStorage.setItem('token', JSON.stringify(token));
    localStorage.setItem('user', JSON.stringify(user));
  }


  //  CHANGE USER INFO

  // update user information
  updateUserInfo(userId, userInfo) {
    console.log(userId);
    return this.http.put("http://localhost:3000/user/update/" + userId, userInfo, { headers: this.headers }).map((data: any) => {
      return data;
    });
  }


  // change user password
  changePassword(userId, password) {
    return this.http.put("http://localhost:3000/user/update_password/" + userId, password).map((data: any) => {
      return data;
    });

  }



}
