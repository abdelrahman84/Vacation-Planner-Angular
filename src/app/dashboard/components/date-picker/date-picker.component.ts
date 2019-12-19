import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {NgbDate, NgbCalendar, NgbDateStruct} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
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
export class DatePickerComponent implements OnInit {

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

  constructor(private calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);      
    this.DiffDate=this.calcDaysDiff();
   }

  ngOnInit() {
  }

  onDateSelection(date: NgbDate) {
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
