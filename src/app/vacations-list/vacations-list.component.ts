import { Component, OnInit } from '@angular/core';
import {VacationService} from 'src/app/_services/vacation.service'
import { Vacation } from 'src/app/vacation.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';

@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.css']
})
export class VacationsListComponent implements OnInit {
  
  list: Vacation[];
  constructor(private vacationService: VacationService, private firestore: AngularFirestore, private datePipe: DatePipe) { }

  ngOnInit() {

   this.vacationService.getVacations().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Vacation;
      })
    });
   
  }



}
