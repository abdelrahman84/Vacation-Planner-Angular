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
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {HeaderInterceptor} from '../interceptors/header.interceptor';
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import en from '@angular/common/locales/en';



@NgModule({
  declarations: [
    DashboardComponent,
    CurrentVacationsComponent,
    SubmitNewVacationComponent,
    VacationListComponent,
    DatePickerComponent,
    formatDate
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    FormsModule,
    NgbModule,
    NgZorroAntdModule
  ], 
  providers: [DatePickerComponent, DatePipe, formatDate, { provide: HTTP_INTERCEPTORS,
       useClass: HeaderInterceptor,
       multi: true
    }, { provide: NZ_I18N, useValue: en_US }],
})
export class DashboardModule { }
