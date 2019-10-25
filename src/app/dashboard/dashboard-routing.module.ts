import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


import { CurrentVacationsComponent } from './components/current-vacations/current-vacations.component';

import { SubmitNewVacationComponent } from './components/submit-new-vacation/submit-new-vacation.component';

import { VacationListComponent } from './components/vacation-list/vacation-list.component';
import { DashboardComponent } from './dashboard.component';

const routes: Routes = [


    {
      path: 'dashboard',
      component: DashboardComponent,
      children: [
    {path: '', redirectTo: 'currentVacations'},
   { path: 'currentVacations', component: CurrentVacationsComponent },
   { path: 'sumbitnewvacation', component: SubmitNewVacationComponent },
   { path: 'vacationslist', component: VacationListComponent }
      ]
    }
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
})
export class DashboardRoutingModule {}