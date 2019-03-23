import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent implements OnInit {

  @Input() public title: string;
  @Input() public isUserLoggedIn: boolean;

  constructor() { }

  ngOnInit() {
  }

}
