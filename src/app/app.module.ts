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
import { UserComponent } from './components/user/user.component'
import { RouterModule, Routes } from '@angular/router';
import bootstrap from "bootstrap";
import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { fakeBackendProvider } from './_helpers';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import {VacationService} from './_services/vacation.service';
import { VacationsListComponent } from './components/vacations-list/vacations-list.component';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import {Vacation} from './vacation.model';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { MainComponent } from './components/main/main.component';
  

@NgModule({
  declarations: [
    AppComponent, NgbdDatepickerRange, AlertComponent, UserComponent, HomeComponent, LoginComponent, RegisterComponent, VacationsListComponent, UserProfileComponent, MainComponent  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, BrowserAnimationsModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule, AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule, AngularFireAuthModule
  ],
  providers: [NgbdDatepickerRange,{ provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    fakeBackendProvider, VacationService, DatePipe, Vacation
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }