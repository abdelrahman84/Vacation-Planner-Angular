import { Component, OnInit } from '@angular/core';
import {VacationService} from '../../_services/vacation.service';
import { Vacation } from '../../_models/vacation.model';
import { AngularFirestore } from '@angular/fire/firestore';
import { DatePipe } from '@angular/common';
import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from '../../_services/auth.service';


@Component({
  selector: 'app-vacations-list',
  templateUrl: './vacations-list.component.html',
  styleUrls: ['./vacations-list.component.css']
})
export class VacationsListComponent implements OnInit {
  
  list: Vacation[];
  
 
  constructor(private vacationService: VacationService, private afs: AngularFirestore, private datePipe: DatePipe, public authService: AuthService) { }

  ngOnInit() {

   this.vacationService.getVacations().subscribe(actionArray => {
      this.list = actionArray.map(item => { 
        return {
        ...item.payload.doc.data()
        } as Vacation;
      })

    });
}
}
