import { Component, OnInit } from '@angular/core';
import { NgbDate, NgbDateStruct, NgbCalendar } from '@ng-bootstrap/ng-bootstrap';
import {VacationService} from '../../../_services/vacation.service';

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

  constructor(public calendar: NgbCalendar, public vacationService: VacationService) { }

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

    var sumbittedStartDate = new Date(this.startDate.year, this.startDate.month - 1, this.startDate.day +1);
    var sumbittedEndDate = new Date(this.endDate.year, this.endDate.month - 1, this.endDate.day+1);

 this.vacationService.submitNewVacation(sumbittedStartDate,sumbittedEndDate,this.DiffDate,this.selectedVacationType);
  }

}
