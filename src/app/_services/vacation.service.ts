import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Vacation} from '../_models/vacation.model';
import { reject } from 'q';
import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class VacationService {


constructor(private firestore: AngularFirestore, private auth: AuthService) {

 } // Inject AngularFireDatabase dependency in constructor

vacation: Vacation;
userDoc;



getVacations(){
  return this.firestore.collection('users').doc(this.userDoc.uid).collection('vacations').snapshotChanges();
}


getAnnual(){
  return this.firestore.collection('vacationBalance').snapshotChanges();
}

getDisabeledDates(){
  return this.firestore.collection('disabeledDays').snapshotChanges();
}

}


