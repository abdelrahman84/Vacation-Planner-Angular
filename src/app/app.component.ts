    import { Component, OnInit} from '@angular/core';
    import {FormControl} from '@angular/forms';
    import {NgbDate, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
    import { Vacation } from './vacation.model';
    import { RouterModule, Routes } from '@angular/router';
    import { Router } from '@angular/router';
    import { AuthenticationService } from './_services';
    import { User } from './user.model';
    import {UserProfileComponent } from './user-profile/user-profile.component'
    import {VacationService} from './_services/vacation.service';
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

  public isCollapsed = false;

  
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar, private router: Router, private authenticationService: AuthenticationService, 
    private firestore: AngularFirestore, private vacationService: VacationService, private datePipe: DatePipe,
    public auth: AuthService, private afAuth: AngularFireAuth
    ) {

  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
  title = 'VacationPlannerAngular';
  
  annualVacation=15;
  CasualBalance=6;
  vacationBalance= 21;
  public show:boolean = false;
  public buttonName:any = 'Show';
  public selectedVacationType;
  DiffDate=1;
  dateNow : Date = new Date();
  vacation: Vacation;
  vacations=[];
  VacationRef;
  startDate = this.calendar.getToday();
  endDate= this.calendar.getNext(this.calendar.getToday(), 'd', 1); 
  insideDates;
  userDoc;
  
 
  
  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]

  ngOnInit () { 

    //this.getVacations();

    this.auth.getCurrentUser().then((userID: string) => {
      //here you can use the id to get the users firestore doc 
      this.firestore.collection('users').doc(userID).valueChanges()
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

   //getVacations(){
    //this.firestore.collection('users').doc('9AS5XoeulDC6KVln5Ohd').get().subscribe(value => {
      //const data = value.data();
      //this.VacationRef = data;
    //});
   //}


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
      this.annualVacation=this.annualVacation-this.DiffDate;
      alert('Annaul Vacation Submitted')
      this.vacationBalance=this.annualVacation+this.CasualBalance;
      
      this.vacation = {NoOfDays: this.DiffDate,vacationType : this.selectedVacationType, SubmissionDate: this.dateNow,
      fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)};

      this.firestore.collection('users').doc(this.userDoc.uid).collection('vacations').add(this.vacation);

      this.firestore.collection('users').doc(this.userDoc.uid).update({AnnualBalance: this.annualVacation});

      this.firestore.collection('users').doc(this.userDoc.uid).update({TotalBalance: this.vacationBalance});
      
      
      this.insideDates = this.getDates(this.startDate, this.endDate);

     

    
      for (let i in this.insideDates) {
        this.firestore.collection('disabeledDays').add(JSON.parse(JSON.stringify((this.insideDates[i]))));
      }
     
     }
      else if (this.selectedVacationType=="Casual"){
      this.CasualBalance=this.CasualBalance-this.DiffDate;
      alert('Casual Vacation Submitted')
      this.vacationBalance=this.annualVacation+this.CasualBalance;

      this.vacation = {NoOfDays: this.DiffDate,vacationType : this.selectedVacationType, SubmissionDate: this.dateNow,
      fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)};

      this.firestore.collection('users').doc(this.userDoc.uid).collection('vacations').add(this.vacation);

      this.firestore.collection('users').doc(this.userDoc.uid).update({CasualBalance: this.CasualBalance});

      this.firestore.collection('users').doc(this.userDoc.uid).update({TotalBalance: this.vacationBalance});
     
      this.insideDates = this.getDates(this.startDate, this.endDate);

    

      for (let i in this.insideDates) {
        this.firestore.collection('disabeledDays').add(JSON.parse(JSON.stringify((this.insideDates[i]))));
      }
     
    }

      else {alert('Please Submit All Fields')
  
  }
     
  } 



}


