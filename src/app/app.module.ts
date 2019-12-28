import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgbdDatepickerRange } from './components/datepicker/datepicker-range'
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import bootstrap from "bootstrap";
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {VacationService} from './_services/vacation.service';
import { VacationsListComponent } from './components/vacations-list/vacations-list.component';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import {Vacation} from './_models/vacation.model';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {AuthService } from './_services/auth.service';

import * as moment from 'moment';
import { AdminSignInComponent } from './components/admin-sign-in/admin-sign-in.component';

  

@NgModule({
  declarations: [
    AppComponent, NgbdDatepickerRange, VacationsListComponent, SignInComponent, SignUpComponent, ForgotPasswordComponent, VerifyEmailComponent, AdminSignInComponent,
    
      
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, BrowserAnimationsModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule,
    AppRoutingModule
  ],
  exports : [NgbdDatepickerRange],
  providers: [NgbdDatepickerRange, AuthService, DatePipe, VacationService, Vacation],
  bootstrap: [AppComponent]
})
export class AppModule { }