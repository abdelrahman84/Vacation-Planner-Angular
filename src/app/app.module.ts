import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbdDatepickerRange } from './datepicker-range';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatDatepickerModule, MatInputModule,MatNativeDateModule} from '@angular/material';
import { UserComponent } from './user/user.component';






@NgModule({
  declarations: [
    AppComponent, NgbdDatepickerRange, UserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, ReactiveFormsModule, HttpClientModule, NgbModule, BrowserAnimationsModule,
    MatDatepickerModule, MatInputModule,MatNativeDateModule
  ],
  providers: [NgbdDatepickerRange],
  bootstrap: [AppComponent]
})
export class AppModule { }