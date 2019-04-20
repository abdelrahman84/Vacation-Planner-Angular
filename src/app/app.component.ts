    import { Component, OnInit} from '@angular/core';
    import {FormControl} from '@angular/forms';
    import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
    import { Vacation } from './vacation.model';
    import { RouterModule, Routes } from '@angular/router';
    import { Router } from '@angular/router';
    import { AuthenticationService } from './_services';
    import { User } from './_models';
    import {VacationService} from './_services/vacation.service';
    import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
    import { AngularFirestore } from '@angular/fire/firestore';
    import { DatePipe } from '@angular/common';

    

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  public isCollapsed = false;

  currentUser: User;
  
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar, private router: Router, private authenticationService: AuthenticationService, 
    private firestore: AngularFirestore, private vacationService: VacationService, private datePipe: DatePipe
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
  vacationBalance= this.annualVacation+ this.CasualBalance;
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
  


  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]

  ngOnInit () { 

     
    this.getVacations();
    
}

  transformDate(date) {
    this.datePipe.transform(date, 'yyyy-MM-dd'); 
  }

  toggle() {
    this.show = !this.show;
   }

   getVacations(){
    this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').get().subscribe(value => {
      const data = value.data();
      this.VacationRef = data;
    });
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

 

  decrement(){
    if (this.selectedVacationType=="Annual"){
      this.annualVacation=this.annualVacation-this.DiffDate;
      alert('Annaul Vacation Submitted')
      this.vacationBalance=this.annualVacation+this.CasualBalance;
      
      this.vacation = {NoOfDays: this.DiffDate,vacationType : this.selectedVacationType, SubmissionDate: this.dateNow,
      fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)};
      this.firestore.collection('vacations').add(this.vacation);

      this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({Annual: this.annualVacation});

      this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({TotalVacations: this.vacationBalance});

      this.getVacations();
     
    }
    else if (this.selectedVacationType=="Casual"){
  this.CasualBalance=this.CasualBalance-this.DiffDate;
      alert('Casual Vacation Submitted')
      this.vacationBalance=this.annualVacation+this.CasualBalance;

      this.vacation = {NoOfDays: this.DiffDate,vacationType : this.selectedVacationType, SubmissionDate: this.dateNow,
      fromDate: JSON.stringify(this.startDate), endDate: JSON.stringify(this.endDate)};
      this.firestore.collection('vacations').add(this.vacation);

      this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({Casual: this.CasualBalance});
      this.firestore.collection('vacationBalance').doc('B2TKfIoz1jrJJ954jZ9z').update({TotalVacations: this.vacationBalance});

      this.getVacations();
     
    
    }

      else {alert('Please Submit All Fields')
  
  }
     
  } 

  

}


