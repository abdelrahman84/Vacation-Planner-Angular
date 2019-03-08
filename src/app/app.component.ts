import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'VacationPlannerAngular';
  
    // get the integer value in case it was stored as a string
    
    
  annualVacation=15;
  CasualBalance=6;
  vacationBalance=this.annualVacation+this.CasualBalance;
  public show:boolean = false;
  public buttonName:any = 'Show';
  public selectedVacationType;

  options = [
    { name: "Annual", value: 1 },
    { name: "Casual", value: 2 }
  ]

  ngOnInit () {  }

  toggle() {
    this.show = !this.show;
   }

  decrement(){
    if (this.selectedVacationType=="Annual"){
      this.annualVacation--;
      this.vacationBalance=this.annualVacation+this.CasualBalance;
    }
    else if (this.selectedVacationType=="Casual"){
      this.CasualBalance--;
      this.vacationBalance=this.annualVacation+this.CasualBalance;
    }

  }

}
