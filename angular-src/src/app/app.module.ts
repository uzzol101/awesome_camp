import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
// routes
import { AppRoutingModule } from './app.routing.module';

// Service
import { ValidateService } from './services/validate.service';
import { AuthService } from './services/auth.service';
import { SharedService } from './services/shared.service';
import { CampService } from './services/camp-service/camp.service';
import { ProfileComponent } from './components/profile/profile.component';

// modules
import { CampModule } from './components/camp/camp.module';


import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CommentComponent } from './components/comment/comment.component';
import { HomeComponent } from './components/home/home.component';
import { PasswordComponent } from './components/profile/password/password.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    RegisterComponent,
    LoginComponent,
    CommentComponent,
    ProfileComponent,
    HomeComponent,
    PasswordComponent

  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    CampModule,
    AppRoutingModule
  ],
  providers: [ValidateService, AuthService, SharedService, CampService],
  bootstrap: [AppComponent]
})
export class AppModule {}
