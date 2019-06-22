import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './components/user/user.component'
import { HomeComponent } from './components/home/home.component'
import { LoginComponent } from './components/login/login.component'
import { RegisterComponent } from './components/register/register.component'
import { AuthGuard } from './auth.guard';
import {VacationsListComponent} from './components/vacations-list/vacations-list.component'
import {MainComponent} from './components/main/main.component'

const routes: Routes = [
  {path: "",  redirectTo:'main', pathMatch:'full'},
  { path: 'main', component: MainComponent },
  { path: 'user', component: UserComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {path:'vacations', component: VacationsListComponent },
  { path: '**', redirectTo: '' },
  { path: 'notes', component: AuthGuard,  canActivate: [AuthGuard] }
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
