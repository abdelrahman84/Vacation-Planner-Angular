import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component'
import { CurrentVacationsComponent } from './components/current-vacations/current-vacations.component';

import { SubmitNewVacationComponent } from './components/submit-new-vacation/submit-new-vacation.component';

import { VacationListComponent } from './components/vacation-list/vacation-list.component';
import {DashboardRoutingModule} from './dashboard-routing.module'


@NgModule({
  declarations: [
    DashboardComponent,
    CurrentVacationsComponent,
    SubmitNewVacationComponent,
    VacationListComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ], 
})
export class DashboardModule { }
