
    import { Component, OnInit, Input } from '@angular/core';
    import {FormControl} from '@angular/forms';
    import {NgbDateStruct, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
    import {NgbdDatepickerRange} from './datepicker-range';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {


 
  model: NgbDateStruct;
  date: {year: number, month: number};

  constructor(private calendar: NgbCalendar, private NgbdDatepickerRange: NgbdDatepickerRange) {
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
  
  
  

  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]

  ngOnInit () {  }

  toggle() {
    this.show = !this.show;
   }

  decrement(){
    if (this.selectedVacationType=="Annual"){
      this.annualVacation=this.annualVacation-this.NgbdDatepickerRange.DiffDate;
      this.vacationBalance=this.annualVacation+this.CasualBalance;
    }
    else if (this.selectedVacationType=="Casual"){
      this.CasualBalance=this.CasualBalance-this.NgbdDatepickerRange.DiffDate;
      this.vacationBalance=this.annualVacation+this.CasualBalance;
    }

  }

}


