import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CampService } from '../../../services/camp-service/camp.service';
import { ValidateService } from '../../../services/validate.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {
  // must declare these variable first
  // these variable will interact with this components form value through [(ngModel)]
  private name: String;
  private image: String;
  private description: String;
  constructor(private campService: CampService, private validateService: ValidateService, private router: Router) {}

  ngOnInit() {}

  onNewCampSubmit() {
    // bring those [(ngModel)] variables here to be used inside this function
    let newCamp = {
      name: this.name,
      image: this.image,
      description: this.description
    };
    // make suer all field has been field out 
    if (this.validateService.newCampValidator(newCamp)) {
      // if so then make the api call to server
      this.campService.addNewCamp(newCamp).subscribe(data => {
        if (data.success) {
          console.log(data.msg);
        } else {
          console.log(data.msg);
          console.log(data);
        }
      });

      this.router.navigate(["/camp-all"]);

    }


  }
}
