import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-sign-in',
  templateUrl: './admin-sign-in.component.html',
  styleUrls: ['./admin-sign-in.component.css']
})
export class AdminSignInComponent implements OnInit {

  loginForm: FormGroup

  constructor(public authService: AuthService, private fb: FormBuilder) { this.loginForm = fb.group({
    email: null,
    password: null,
   

});}

  ngOnInit() {
  }

  login() {
    return this.authService.adminLogin(this.loginForm.value);
  }

}

