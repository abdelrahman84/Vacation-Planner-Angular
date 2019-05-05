    import { Component, OnInit} from '@angular/core';
    import {FormControl} from '@angular/forms';
    import {NgbDate, NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
    import { Vacation } from './vacation.model';
    import { RouterModule, Routes } from '@angular/router';
    import { Router } from '@angular/router';
    import { AuthenticationService } from './_services';
    import { User } from './_models';
    import {VacationService} from './_services/vacation.service';
    import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
    import { AngularFirestore } from '@angular/fire/firestore';
    import { DatePipe } from '@angular/common';
    import { AuthService } from './_services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  public isCollapsed = false;

  currentUser: User;

  model: NgbDateStruct;
  date: { year: number, month: number };

  constructor(private calendar: NgbCalendar, private router: Router, private authenticationService: AuthenticationService, 
    private firestore: AngularFirestore, private vacationService: VacationService, private datePipe: DatePipe,
    public auth: AuthService
    ) {

    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }

  logout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }

  selectToday() {
    this.model = this.calendar.getToday();
  }
  title = 'VacationPlannerAngular';
  
  annualVacation=15;
  CasualBalance=6;
  vacationBalance= this.annualVacation-this.CasualBalance;
  public show:boolean = false;
  public buttonName:any = 'Show';
  public selectedVacationType;
  DiffDate = 1;
  dateNow: Date = new Date();
  vacation: Vacation;
  vacations = [];
  VacationRef = {};
  startDate = this.calendar.getToday();
  endDate = this.calendar.getNext(this.calendar.getToday(), 'd', 1);
  insideDates;

  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]

  ngOnInit() {

    this.getVacations();

  }

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd');
  }

  toggle() {
    this.show = !this.show;
  }

  getVacations() {
    // this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').get().subscribe(value => {
    //   const data = value.data();
    //   this.VacationRef = data;
    // });

    // you dont need to save the balance in a different collection, so you won't keep track of it everywhere, 

    this.firestore.collection('vacations', ref => ref.where('vacationType', '==', 'Annual')).valueChanges().subscribe(vacations => {
      this.VacationRef.Annual = vacations.length;
    })

    this.firestore.collection('vacations', ref => ref.where('vacationType', '==', 'Casual')).valueChanges().subscribe(vacations => {
      this.VacationRef.Casual = vacations.length;
    })
    this.firestore.collection('vacations').valueChanges().subscribe(vacations => {
      this.VacationRef.TotalVacations = vacations.length;
    })
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

  // moved to datepicker-range.ts
  // getDates(start: NgbDate, end: NgbDate) {

  //   var inside = [];
  //   var currentDate = start;

  //   while (currentDate.before(end) || currentDate.equals(end)) {
  //     inside.push(currentDate);
  //     currentDate = this.calendar.getNext(currentDate, 'd', 1);
  //   }
  //   return inside;
  // }



  decrement() {

    this.vacation = {
      NoOfDays: this.DiffDate, vacationType: this.selectedVacationType, SubmissionDate: this.dateNow,
      fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)
    };
    this.firestore.collection('vacations').add(this.vacation);

    // no need for the if/else
    
    if (this.selectedVacationType == "Annual") {
      // this.annualVacation -= this.DiffDate;
      alert('Annaul Vacation Submitted')
      // this.vacationBalance=this.annualVacation+this.CasualBalance;

      // this.vacation = {
      //   NoOfDays: this.DiffDate, vacationType: this.selectedVacationType, SubmissionDate: this.dateNow,
      //   fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)
      // };
      // this.firestore.collection('vacations').add(this.vacation);

      // now you dont need to update those
      // this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({Annual: this.annualVacation});

      // this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({TotalVacations: this.vacationBalance});

      // this.insideDates = this.getDates(this.startDate, this.endDate);

      // this.getVacations();


      // for (let i in this.insideDates) {
      //   this.firestore.collection('disabeledDays').add(JSON.parse(JSON.stringify((this.insideDates[i]))));
      // }

    }
    else if (this.selectedVacationType == "Casual") {
      // this.CasualBalance = this.CasualBalance - this.DiffDate;
      alert('Casual Vacation Submitted')
      // this.vacationBalance=this.annualVacation+this.CasualBalance;

      // this.vacation = {
      //   NoOfDays: this.DiffDate, vacationType: this.selectedVacationType, SubmissionDate: this.dateNow,
      //   fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)
      // };
      // this.firestore.collection('vacations').add(this.vacation);

      // this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({Casual: this.CasualBalance});
      // this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({TotalVacations: this.vacationBalance});


      // this.insideDates = this.getDates(this.startDate, this.endDate);

      // this.getVacations();
      //now we don't need to update disabled days anymore
      // for (let i in this.insideDates) {
      //   this.firestore.collection('disabeledDays').add(JSON.parse(JSON.stringify((this.insideDates[i]))));
      // }

    }

    else {
      alert('Please Submit All Fields')

    }

  }


}


