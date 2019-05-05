import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';
import { stringify } from '@angular/compiler/src/util';
import { AngularFirestore } from '@angular/fire/firestore';
import {VacationService} from '../_services/vacation.service';

@Component({
  selector: 'ngbd-datepicker-range',
  templateUrl: './datepicker-range.html',

  styles: [`
    .custom-day {
      text-align: center;
      padding: 0.185rem 0.25rem;
      display: inline-block;
      height: 2rem;
      width: 2rem;
    }
    .custom-day.focused {
      background-color: #e6e6e6;
    }
    .custom-day.range, .custom-day:hover {
      background-color: rgb(2, 117, 216);
      color: white;
    }
    .custom-day.faded {
      background-color: rgba(2, 117, 216, 0.5);
    }
    .custom-day.disabled{
      color: rgb(192,192,192);
      hover.text: "date already selected";
    }
    .tooltiptext {
      visibility: hidden;
    } 

    
  `]
})
export class NgbdDatepickerRange {    

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  DiffDate:number;
  startDate;
  endDate;
  disabledDates: NgbDateStruct[] = new Array();
  inside:  NgbDateStruct[] = new Array();
  
  

  @Output() dateDifferenceEvent  = new EventEmitter();

  @Output() FromDateEvent = new EventEmitter();

  @Output() EndDateEvent = new EventEmitter();

  constructor(private firestore: AngularFirestore, private vacationService: VacationService, private calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);      
    this.DiffDate=this.calcDaysDiff();   
   
  }

  getInsideDates(start: NgbDate, end: NgbDate) {

    var inside = [];
    var currentDate = start;

    while (currentDate.before(end) || currentDate.equals(end)) {
      inside.push(currentDate);
      currentDate = this.calendar.getNext(currentDate,'d',1);
    }
    return inside;
  }
  ngOnInit() {
    // no need for a different collection to track disabled days, better to calculate them, so you dont need
    //to keep track of them and updating everywhere
    this.vacationService.getVacations().subscribe(vacations => {
      
       for(var v of vacations){
        var from = NgbDate.from(JSON.parse(v.fromDate));
        var to = NgbDate.from(JSON.parse(v.endDate));
        var insideDates = this.getInsideDates(from,to);
        this.disabledDates = this.disabledDates.concat(insideDates); //add them all to one array
       }
     });

 }

  isDisabled = (date: NgbDateStruct, current: {month: number, year: number})=> {
    return this.disabledDates.find(x => NgbDate.from(x).equals(date))? true: false;
  }

  onDateSelection(date: NgbDate) {
    console.log('onDateSelection:', date);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.DiffDate = this.calcDaysDiff();
      this.FromDateEvent.emit(date);
      
  
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.DiffDate = this.calcDaysDiff();
      this.EndDateEvent.emit(date);  
    

    
    } 
    else {
      this.toDate = null;
      this.fromDate = date;
      this.FromDateEvent.emit(date);
      
    } 
  }
 
  private createDateFromNgbDate(ngbDate: NgbDate): Date {
    const date: Date = new Date(Date.UTC(ngbDate.year, ngbDate.month-1, ngbDate.day));  
    return date;
  }

  private calcDaysDiff(): number {
    
    const fromDate: Date = this.createDateFromNgbDate(this.fromDate);
    const toDate: Date = this.createDateFromNgbDate(this.toDate);  
    const daysDiff = Math.floor(Math.abs(<any>fromDate - <any>toDate) / (1000*60*60*24));
    this.dateDifferenceEvent.emit(daysDiff);
   
    return daysDiff;
  }

  isHovered(date: NgbDate) {
    
    return this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate);
  }

  isInside(date: NgbDate) {
    return date.after(this.fromDate) && date.before(this.toDate);
    
  }

  isRange(date: NgbDate) {
    return date.equals(this.fromDate) || date.equals(this.toDate) || this.isInside(date) || this.isHovered(date);
  }

}
