import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from "./_guards/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import {VacationsListComponent} from './components/vacations-list/vacations-list.component'
import {MainComponent} from './components/main/main.component'
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SecureInnerPagesGuard } from './_guards/secure-inner-pages.guard.ts.guard';
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
{ path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
{ path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] }
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
