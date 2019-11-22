import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
    selector: 'app-sign-up',
    templateUrl: './sign-up.component.html',
    styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

    
    signupForm: FormGroup

    constructor(
        public authService: AuthService, private fb: FormBuilder
    ) { 
         this.signupForm = fb.group({
            name: null,
            email: null,
            password: null,
            password_confirmation: null,
            totalBalance: 21,
            annualBalance: 15,
            casualBalance: 6
    
        });
    }
    ngOnInit() { }

    signup() {
        this.authService.signup(this.signupForm.value);
    }
}