import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManagerRoutingModule } from './manager-routing.module';
import { ManagerDashboardComponent } from './Components/manager-dashboard/manager-dashboard.component';
import { ManagerComponent } from './manager.component';

@NgModule({
  declarations: [ManagerDashboardComponent, ManagerComponent],
  imports: [
    CommonModule,
    ManagerRoutingModule
  ]
})
export class ManagerModule { }
