import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators  } from '@angular/forms'; 
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userForm;

  constructor(private formBuilder: FormBuilder, private http: HttpClient) { }

  ngOnInit() {  
    this.userForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      lastName: ['',[Validators.required, Validators.pattern('^[a-zA-Z]+$')]],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(){
    if(this.userForm.valid){
      alert('User form is valid!!')
    } else {
      alert('User form is not valid!!')
    }
  }

}
