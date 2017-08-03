import { Component, OnInit } from '@angular/core';
// ActivatedRoute, ParamMap are required to get neccessary info from url
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CampService } from '../../../services/camp-service/camp.service';
import { SharedService } from '../../../services/shared.service';

import "rxjs/add/operator/switchMap";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // specific camp that the user requested by its id
  campDetail: Object;
  editable: Boolean = false;
  isNew: Boolean = false;
  user: Object;
  // new camp variables
  name: String;
  image: String;
  description: String;

  // reset new input field empty
  a_commnent: String;


  constructor(private router: Router, private route: ActivatedRoute, private campService: CampService, private sharedService: SharedService) {}

  // call this method after any change like update new, this will update the ui instantly without reloading the page

  getCampDetails() {
    // get mongoose Object id from the url
    const id = this.route.snapshot.paramMap.get("id");
    // make api call using that id to find the id specific camp in server
    this.campService.getCampDetails(id).subscribe(details => {
      this.campDetail = details;
      // console.log(details);

    });
  }

  ngOnInit() {
    // get data when initialize the component
    this.getCampDetails();
    // user info getting data from two place
    // first try to load from login component
    this.sharedService.subject.subscribe(data => {
      this.user = data;
    });
    // 2nd  load from localStorage 
    this.user = this.sharedService.getUser();
  }

  // used in details section
  editMode() {
    this.editable = true;


  }
  cancel() {
    this.editable = false;

  }
  commentCancel() {
    this.isNew = false;

  }

  //check camp ownerShip

  checkCampOwner() {
    // if this.user present use its id or use false 

    if (this.campDetail["user"].id === ((this.user) ? this.user["_id"] : false)) {
      return true;
    } else {
      return false;
    }


  }

  // check comment Owner
  commentOwner() {
    return false;
  }


  // UPDATE

  // make sure object's key are same as mongoose models key to avoid validation error in mongodb database

  update(name, image, description) {

    let update = {
      name: name,
      image: image,
      description: description
    };

    this.editable = false;
    // api url @@/camp/update/:id@@
    //  :id ==   this.campDetail["_id"]
    this.campService.updateCampDetails(update, this.campDetail["_id"]).subscribe(data => {

      // go get the latest data from server 
      this.getCampDetails();


    });
    // reload winodow to see  change instantly

    // window.location.reload();
  }


  // DELETE


  deleteCamp() {
    // api url @@/camp/delete/:id@@
    //  :id ==   this.campDetail["_id"]

    this.campService.deleteCamp(this.campDetail["_id"]).subscribe(data => {
      if (data.success) {
        this.router.navigate(["/camp-all"]);
        // this.getCampDetails();

      }


    });


    // window.location.reload();
  }

  // show new comment field
  newComment() {
    this.isNew = true;
    this.a_commnent = " ";
    if(this.user){
      return true;
    }else{
      this.router.navigate(["/login"]);
    }
   
    
  }
  // submit new comment to db
  addComment(nComment) {
    // get user from localStorage.Need current user info to create new comment.
    var user = JSON.parse(localStorage.getItem('user'));
    // sending comment.user so we can get the value of user from req.body in express server
    let comment = {
      text: nComment,
      user: user
    };
    this.isNew = false;
   
    // api url is @@/camp/:id/comment/new@@
    // :id is the value of this.campDetail["_id"]
    this.campService.newComment(comment, this.campDetail["_id"]).subscribe(data => {

      this.getCampDetails();



    });
    console.log(comment.text);

    // this.nComment = "";
    // reload winodow to see  change instantly
    // window.location.reload();

  }



  //=============== COMMENT LIST =============
  isComEditMode: Boolean = false;
  matched: Number;
  cEditMode(index, value) {
    // get the value of index (or template variable i) and send it back to view to test the logic {(i !== matched)?true:false}
    this.matched = index;


  }

  // update /camp/:id/update_comment/:comment_id @@@@@ delete /camp/:id/delete_comment/:comment_id

  cancelComment() {
    // change the value of matched so it returns the test condition {(i !== matched)}  false 
    this.matched = null;
  }
  // update comment
  updateComment(comment, updated) {
    // send commentId to be used in db side will be found by req.body
    let updatedComment = {
      text: updated,
      commentId: comment._id
    };

    this.campService.updateComments(this.campDetail["_id"], comment["_id"], updatedComment).subscribe(data => {
      this.getCampDetails();
    });
    this.matched = null;
    // window.location.reload();

  }
  // delete comment
  deleteComment(comment) {
    this.campService.deleteComments(this.campDetail["_id"], comment["_id"]).subscribe(data => {
      this.getCampDetails();
    });

    // window.location.reload();

  }




}
