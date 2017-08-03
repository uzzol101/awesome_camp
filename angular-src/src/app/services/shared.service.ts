import { Injectable } from '@angular/core';
import "rxjs/add/operator/map";
import { Subject } from "rxjs/Subject";

@Injectable()
export class SharedService {
  // subscribe to this to recieve  data
  public subject = new Subject < any > ();
  constructor() {

  }

  // ==============  shareData() good side ========= avail data instantly after user login what local storage can't do.
  // ========== downside ========= loss data at page refresh
  // import data here to be share in other component
  // in this case used in login component to get data from 
  // data passed to navbar component
  shareData(data) {
    // this used to be get and pass data 
    // data will lose after page refresh
    this.subject.next(data);
  }

  // ======= local storage to avail data in view you need to refresh the page at least once
  // ======= data will available until user sign out

  getUser() {
    // get localStorage user data
    return JSON.parse(localStorage.getItem('user'));
  }



}
