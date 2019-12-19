import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-submit-new-vacation',
  templateUrl: './submit-new-vacation.component.html',
  styleUrls: ['./submit-new-vacation.component.css']
})
export class SubmitNewVacationComponent implements OnInit {

  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]
   
  DiffDate = 1
  startDate = this.calendar.getToday();
  endDate= this.calendar.getNext(this.calendar.getToday(), 'd', 1); 
  selectedVacationType
  dateNow : Date = new Date();

  constructor(public calendar: NgbCalendar) { }

  ngOnInit() {
  }

  setFromDate($event) {
    this.startDate = $event;
  }
  
  setEndDate($event) {
    this.endDate = $event;
  }

  setDifference($event) {
    this.DiffDate = $event; 
  }

  submitNewVacation() {

 console.log(this.DiffDate,this.selectedVacationType, this.dateNow, this.startDate,this.endDate);
  }

}
