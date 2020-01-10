import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { AuthGuard } from "./_guards/auth.guard";
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { SecureInnerPagesGuard } from './_guards/secure-inner-pages.guard.ts.guard';
import { AdminSignInComponent } from './components/admin-sign-in/admin-sign-in.component';
const routes: Routes = [
{path: '', redirectTo: 'sign-in', pathMatch: 'full'},
{ path: 'sign-in', component: SignInComponent,canActivate: [AuthGuard]  },
{ path: 'register-user', component: SignUpComponent, canActivate: [AuthGuard]  },
{ path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [AuthGuard]  },
{ path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard]  },
{ path: 'adminlogin', component: AdminSignInComponent,canActivate: [AuthGuard]  },
{ path: 'app', loadChildren: './dashboard/dashboard.module#DashboardModule', canActivate: [SecureInnerPagesGuard]},
 {path: 'manager', loadChildren: './manager/manager.module#ManagerModule', canActivate: [SecureInnerPagesGuard] }

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
