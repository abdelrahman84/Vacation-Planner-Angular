import { Component, OnInit } from '@angular/core';
import {AuthService} from '../../../_services/auth.service';

@Component({
  selector: 'app-current-vacations',
  templateUrl: './current-vacations.component.html',
  styleUrls: ['./current-vacations.component.css']
})
export class CurrentVacationsComponent implements OnInit {

  user

  constructor(private auth: AuthService) { }

  ngOnInit() {
    this.user = this.auth.getUser();

      //console.log(this.user)
  }

}
