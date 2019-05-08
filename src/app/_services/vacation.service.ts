import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Vacation} from '../vacation.model';
import { reject } from 'q';
import { AuthService } from '../_services/auth.service';


@Injectable({
  providedIn: 'root'
})
export class VacationService {


constructor(private firestore: AngularFirestore, private auth: AuthService) {

  this.auth.getCurrentUser().then((userID: string) => {
    //here you can use the id to get the users firestore doc 
    this.firestore.collection('users').doc(userID).valueChanges()
    .subscribe(userFirestoreDoc => { // remember to subscribe
      this.userDoc = userFirestoreDoc;
    })
  }).catch(nullID => {
    //when there is not a current user
    this.userDoc = null
  }) 
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


