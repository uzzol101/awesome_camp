import { Component, OnInit } from '@angular/core';
import { NgZone } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public user: Object;
  editMode: Boolean = false;
  zdata: any;
  // name: String;
  // username: String;
  // email: String;

  constructor(private zone: NgZone, private sharedService: SharedService, private authService: AuthService) {}

  ngOnInit() {
    // data loaded from local storage will not change until next login
    this.user = this.sharedService.getUser();


  }

  //user info /user/update/:id

  // user password /user/update_password/:id

  // update user information
  updateUserInfo(name, username, email) {
    // data to be found via req.body in server and will go to server
    let userInfo = {
      name: name,

      userId: this.user["_id"]
    };

    if (userInfo.name) {
      // this.userid is for authservice use only will not go to server
      this.authService.updateUserInfo(this.user["_id"], userInfo).subscribe(data => {
        // data will loose after page refresh
        this.user = data;
      });
      this.editMode = false;

    } else {
      console.log("please fill out all field");
    }
  }



  onEdit() {
    this.editMode = true;

  }
  onCancel() {
    this.editMode = false;
  }

}
