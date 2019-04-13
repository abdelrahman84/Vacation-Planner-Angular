import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { RegisterComponent } from './register';
import { AuthGuard } from './_guards';
import {VacationsListComponent} from './vacations-list/vacations-list.component'




const routes: Routes = [
  {path: 'user', component:UserComponent, pathMatch:'full'},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'vacations', component: VacationsListComponent },
  { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(routes);

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    scrollPositionRestoration: 'enabled', // Add options right here
  }
    )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
