import {Component, Input, Output, EventEmitter} from '@angular/core';
import {NgbDate, NgbCalendar} from '@ng-bootstrap/ng-bootstrap';
import { stringify } from '@angular/compiler/src/util';

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
  `]
})
export class NgbdDatepickerRange {    

  hoveredDate: NgbDate;
  fromDate: NgbDate;
  toDate: NgbDate;
  DiffDate:number;
  @Output() dateDifferenceEvent  = new EventEmitter();
  

  

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 1);  
        
        this.DiffDate=this.calcDaysDiff();
  }

  onDateSelection(date: NgbDate) {
    console.log('onDateSelection:', date);
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.DiffDate = this.calcDaysDiff();
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.DiffDate = this.calcDaysDiff();
    } else {
      this.toDate = null;
      this.fromDate = date;
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
