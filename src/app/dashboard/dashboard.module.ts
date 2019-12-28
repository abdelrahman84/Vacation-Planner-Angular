import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {DashboardComponent} from './dashboard.component'
import { CurrentVacationsComponent } from './components/current-vacations/current-vacations.component';

import { SubmitNewVacationComponent } from './components/submit-new-vacation/submit-new-vacation.component';

import { VacationListComponent } from './components/vacation-list/vacation-list.component';
import {DashboardRoutingModule} from './dashboard-routing.module'
import { FormsModule } from '@angular/forms';
import { DatePickerComponent } from './components/date-picker/date-picker.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {formatDate} from '../Pipes/dateFormat.pipe'
import { DatePipe } from '@angular/common';
import { AdminComponent } from './components/admin/admin.component';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from '../interceptors/header.interceptor';



@NgModule({
  declarations: [
    DashboardComponent,
    CurrentVacationsComponent,
    SubmitNewVacationComponent,
    VacationListComponent,
    DatePickerComponent,
    formatDate,
    AdminComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgbModule
  ], 
  providers: [DatePickerComponent, DatePipe, formatDate, { provide: HTTP_INTERCEPTORS,
       useClass: HeaderInterceptor,
       multi: true
    }],
})
export class DashboardModule { }
