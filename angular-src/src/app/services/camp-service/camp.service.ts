import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import "rxjs/add/operator/map";
@Injectable()
export class CampService {
  authToken: any;
  public headers: any;

  constructor(private http: HttpClient) {}

  // set the http headers
  setHeader() {
    this.loadToken();
    this.headers = new HttpHeaders().set("Authorization", this.authToken).set("Content-Type", "application/json");
  }
  addNewCamp(newCamp) {
    // call this fn to assign value to authToken from localstorage
    this.setHeader();
    // console.log(this.authToken);
    // this headers is required because this url  is protected using passport-jwt on server.

    return this.http.post("http://localhost:3000/camp/new", newCamp, { headers: this.headers }).map((data: any) => {

      return data;
    });

  }


  getCampDetails(id) {


    return this.http.get("http://localhost:3000/camp/details/" + id).map((data: any) => {
      return data
    });
  }


  updateCampDetails(value, id) {

    return this.http.put("http://localhost:3000/camp/update/" + id, value, { headers: this.headers }).map((data: any) => {
      return data;
    });
  }

  deleteCamp(id) {
    return this.http.delete("http://localhost:3000/camp/delete/" + id, { headers: this.headers }).map((data: any) => {
      return data;
    });
  }

  // load token from localstorage
  loadToken() {
    this.authToken = JSON.parse(localStorage.getItem('token'));
  }


  // ================ COMMENTS ==================
  // add new comments
  newComment(nc, id) {
    //  load the token from localstorage
    this.setHeader
();
    // require for jwt projected route

    return this.http.post("http://localhost:3000/camp/" + id + "/comment/new", nc, { headers: this.headers }).map((data: any) => {
      return data;
    });
  }

  // update comments
  updateComments(campId, commentId, updatedComment) {
    return this.http.put("http://localhost:3000/camp/" + campId + "/update_comment/" + commentId, updatedComment, { headers: this.headers }).map((data: any) => {
      return data;
    });
  }
  // delete comment
  deleteComments(campId, commentId) {
    return this.http.delete("http://localhost:3000/camp/" + campId + "/delete_comment/" + commentId).map((data: any) => {
      return data;
    });
  }



}
