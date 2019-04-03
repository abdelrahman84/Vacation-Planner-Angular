
    import { Component, OnInit} from '@angular/core';
    import {FormControl} from '@angular/forms';
    import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
    import { Vacation } from './vacation.model';
    import { RouterModule, Routes } from '@angular/router';
    import { Router } from '@angular/router';
    import { AuthenticationService } from './_services';
    import { User } from './_models';
    
    

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent {

  currentUser: User;
  
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar, private router: Router, private authenticationService: AuthenticationService) {

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
  vacationBalance=this.annualVacation+this.CasualBalance;
  public show:boolean = false;
  public buttonName:any = 'Show';
  public selectedVacationType;
  DiffDate=1;
  VacationInstance;
  dateNow : Date = new Date();
  vacations=[];
  

  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]

  ngOnInit () {  }

  toggle() {
    this.show = !this.show;
   }

   setDifference($event) {
    this.DiffDate = $event; 
  }

  decrement(){
    if (this.selectedVacationType=="Annual"){
      this.annualVacation=this.annualVacation-this.DiffDate;
      alert('Annaul Vacation Submitted')
      this.vacationBalance=this.annualVacation+this.CasualBalance;
      this.VacationInstance = new Vacation (this.DiffDate,this.selectedVacationType,this.dateNow);;
    this.vacations.push(this.VacationInstance);
    }
    else if (this.selectedVacationType=="Casual"){
  this.CasualBalance=this.CasualBalance-this.DiffDate;
      alert('Casual Vacation Submitted')
      this.vacationBalance=this.annualVacation+this.CasualBalance;
      this.VacationInstance = new Vacation (this.DiffDate,this.selectedVacationType,this.dateNow);;
    this.vacations.push(this.VacationInstance);
    }

    else {alert('Please Submit All Fields')
  
  }
     
  }

}


