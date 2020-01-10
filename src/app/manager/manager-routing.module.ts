import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ManagerComponent} from './manager.component';
import {ManagerDashboardComponent} from './Components/manager-dashboard/manager-dashboard.component';

const routes: Routes = [

  {
    path: '',
    component: ManagerComponent,
    children: [
  {path: '', redirectTo: 'dashboard'},
 { path: 'dashboard', component: ManagerDashboardComponent },

    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManagerRoutingModule { }
