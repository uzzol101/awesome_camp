import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-camp',
  templateUrl: './camp.component.html',
  styleUrls: ['./camp.component.css']
})
export class CampComponent implements OnInit {
  allCamp: Array < Object > ;
  constructor(private authService: AuthService) {}

  ngOnInit() {

    this.authService.getCamp().subscribe(data => {


      this.allCamp = data.reverse();

    });
  }

}
