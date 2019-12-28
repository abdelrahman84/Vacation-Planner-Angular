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

    selectedRole

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
            casualBalance: 6,
            manager_id: null
    
        });
    }
    ngOnInit() { }

    signup() {
        if (this.selectedRole === 'staff') {
        this.authService.signup(this.signupForm.value);
        } else if (this.selectedRole === 'manager') {
         this.authService.signupManager(this.signupForm.value);   
        }
    }

    changeRole(input) {
        if (input === 'manager') {
            this.selectedRole = 'manager'
        }
        else if (input === 'staff') {
            this.selectedRole = 'staff'
        }
    }
}