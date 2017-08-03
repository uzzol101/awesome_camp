import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { SharedService } from '../../services/shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: Object;
  constructor(private authService: AuthService, private sharedService: SharedService, private router: Router) {}

  ngOnInit() {
      this.sharedService.subject.subscribe(data => {
   this.user = data;
 });
 this.user = this.sharedService.getUser();

  }

// logout
  onLogout() {
    this.user = null;
    localStorage.clear();
    this.router.navigate(["/login"]);

  }



}
