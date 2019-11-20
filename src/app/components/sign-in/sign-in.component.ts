import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup } from '@angular/forms';
@Component({
selector: 'app-sign-in',
templateUrl: './sign-in.component.html',
styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

    loginForm: FormGroup

constructor(
public authService: AuthService, private fb: FormBuilder
) { 
    this.loginForm = fb.group({
        email: null,
        password: null,
       

    });
}
ngOnInit() { }

login() {
    return this.authService.login(this.loginForm.value);
  }
}