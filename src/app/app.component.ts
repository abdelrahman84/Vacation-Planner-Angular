import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Vacation } from './vacation.model';
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { AuthenticationService } from './_services';
import { User } from './user.model';
import { UserProfileComponent } from './components/user-profile/user-profile.component'
import { VacationService } from './_services/vacation.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { AuthService } from './_services/auth.service';
import { firestore } from 'firebase';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {


  title = 'VacationPlannerAngular';



}


