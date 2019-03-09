import {Component} from '@angular/core';
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
  DiffDate;
  enddate;
  startDate;
  

  constructor(calendar: NgbCalendar) {
    this.fromDate = calendar.getToday();
    this.toDate = calendar.getNext(calendar.getToday(), 'd', 10);  
        this.startDate=new Date (this.fromDate.year,this.fromDate.month,this.fromDate.day);
        this.enddate=new Date (this.toDate.year,this.toDate.month,this.toDate.day);
        this.DiffDate=Math.floor((Date.UTC(this.enddate.getFullYear(),this.enddate.getMonth(),this.enddate.getDate())-Date.UTC(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()) )/(1000 * 60 * 60 * 24));
  }

  onDateSelection(date: NgbDate) {
    if (!this.fromDate && !this.toDate) {
      this.fromDate = date;
      this.DiffDate=Math.floor((Date.UTC(this.enddate.getFullYear(),this.enddate.getMonth(),this.enddate.getDate())-Date.UTC(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()) )/(1000 * 60 * 60 * 24));
           
    } else if (this.fromDate && !this.toDate && date.after(this.fromDate)) {
      this.toDate = date;
      this.enddate=new Date (this.toDate.year,this.toDate.month,this.toDate.day);
      this.DiffDate=Math.floor((Date.UTC(this.enddate.getFullYear(),this.enddate.getMonth(),this.enddate.getDate())-Date.UTC(this.startDate.getFullYear(),this.startDate.getMonth(),this.startDate.getDate()) )/(1000 * 60 * 60 * 24));
      
      }
       else {
      this.toDate = null;
      this.fromDate = date;
      this.startDate=new Date (date.year,date.month,date.day);
   
    }
    
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
