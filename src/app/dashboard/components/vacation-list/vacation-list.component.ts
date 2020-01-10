import { Component, OnInit } from '@angular/core';
import {VacationService} from '../../../_services/vacation.service';
import {Vacation} from '../../../_models/vacation.model';

@Component({
  selector: 'app-vacation-list',
  templateUrl: './vacation-list.component.html',
  styleUrls: ['./vacation-list.component.css']
})
export class VacationListComponent implements OnInit {

   Vacations: Vacation[] = [];

  constructor(private vacationService: VacationService) { }

  ngOnInit() {
    return this.vacationService.getPendingVacations().subscribe(data => {
     this.Vacations = data.data;
    })
  }

}
