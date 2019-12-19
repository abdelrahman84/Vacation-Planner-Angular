import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import { Vacation } from '../../_models/vacation.model'
import { RouterModule, Routes } from '@angular/router';
import { Router } from '@angular/router';
import { User } from '../../_models/user.model'
import { VacationService } from '../../_services/vacation.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { AuthService } from '../../_services/auth.service';
import { firestore } from 'firebase';
import { auth } from 'firebase/app';
import { Observable, of } from 'rxjs';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-submit-new-vacation',
  templateUrl: './submit-new-vacation.component.html',
  styleUrls: ['./submit-new-vacation.component.css']
})
export class SubmitNewVacationComponent {
  public isCollapsed = true;

  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(public calendar: NgbCalendar, public router: Router, 
    public afs: AngularFirestore, public vacationService: VacationService,
    public authService: AuthService, private afAuth: AngularFireAuth, private datePipe: DatePipe) { }

    selectToday() {
      this.model = this.calendar.getToday();
   }
  userDoc;
  annualVacation: number;
  CasualBalance: number;
  vacationBalance: number;
  public show:boolean = false;
  public buttonName:any = 'Show';
  public show1:boolean = false;
  public buttonName1:any = 'Show';
  public selectedVacationType;
  DiffDate=1;
  dateNow : Date = new Date();
  vacation: Vacation;
  vacations=[];
  VacationRef;
  startDate = this.calendar.getToday();
  endDate= this.calendar.getNext(this.calendar.getToday(), 'd', 1); 
  insideDates;
  

  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]

  ngOnInit() {
    this.authService.getCurrentUser().then((userID: string) => {
      //here you can use the id to get the users firestore doc 
      this.afs.collection('users').doc(userID).valueChanges()
      .subscribe(userFirestoreDoc => { // remember to subscribe
        this.userDoc = userFirestoreDoc;
      })
    }).catch(nullID => {
      //when there is not a current user
      this.userDoc = null
    }) 
  
  }

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd'); 
}
toggle() {
  this.show = !this.show;
 }

 toggle1() {
  this.show1 = !this.show1;
 }

 

 setDifference($event) {
  this.DiffDate = $event; 
}

setFromDate($event) {
  this.startDate = $event;
}

setEndDate($event) {
  this.endDate = $event;
}


getDates(start: NgbDate, end: NgbDate) {
  
  var inside = [];
  var currentDate = start;

  while (currentDate.before(end) || currentDate.equals(end)) {
    inside.push(currentDate);
    currentDate = this.calendar.getNext(currentDate,'d',1);
  }
  return inside;
}


decrement(){
  if (this.selectedVacationType=="Annual"){
    this.annualVacation=this.userDoc.AnnualBalance-this.DiffDate;
    alert('Annaul Vacation Submitted')
    this.vacationBalance=this.annualVacation+this.userDoc.CasualBalance;
    //@ts-ignore
    this.vacation = {NoOfDays: this.DiffDate,vacationType : this.selectedVacationType, SubmissionDate: this.dateNow,
    fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)};

    this.afs.collection('users').doc(this.userDoc.uid).collection('vacations').add(this.vacation);

    this.afs.collection('users').doc(this.userDoc.uid).update({AnnualBalance: this.annualVacation});

    this.afs.collection('users').doc(this.userDoc.uid).update({TotalBalance: this.vacationBalance});
    
    
    this.insideDates = this.getDates(this.startDate, this.endDate);

   
    for (let i in this.insideDates) {
      this.afs.collection('disabeledDays').add(JSON.parse(JSON.stringify((this.insideDates[i]))));
    }
   
   }
    else if (this.selectedVacationType=="Casual"){
    this.CasualBalance=this.userDoc.CasualBalance-this.DiffDate;
    alert('Casual Vacation Submitted')
    this.vacationBalance=this.userDoc.AnnualBalance+this.CasualBalance;
    //@ts-ignore
    this.vacation = {NoOfDays: this.DiffDate,vacationType : this.selectedVacationType, SubmissionDate: this.dateNow,
    fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)};

    this.afs.collection('users').doc(this.userDoc.uid).collection('vacations').add(this.vacation);

    this.afs.collection('users').doc(this.userDoc.uid).update({CasualBalance: this.CasualBalance});

    this.afs.collection('users').doc(this.userDoc.uid).update({TotalBalance: this.vacationBalance});
   
    this.insideDates = this.getDates(this.startDate, this.endDate);

  

    for (let i in this.insideDates) {
      this.afs.collection('disabeledDays').add(JSON.parse(JSON.stringify((this.insideDates[i]))));
    }
   
  }

    else {alert('Please Submit All Fields')

}
   
} 

}
