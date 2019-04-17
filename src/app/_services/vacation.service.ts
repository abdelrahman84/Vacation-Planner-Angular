import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Vacation} from '../vacation.model';
import { reject } from 'q';


@Injectable({
  providedIn: 'root'
})
export class VacationService {


  constructor(private firestore: AngularFirestore) { } // Inject AngularFireDatabase dependency in constructor



vacation: Vacation;

getVacations(){
  return this.firestore.collection('vacations').snapshotChanges();
}

getAnnual(){
  return this.firestore.collection('vacationBalance').snapshotChanges();
}

}


