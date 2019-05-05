import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {Vacation} from '../vacation.model';
import { reject } from 'q';
import { map }from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VacationService {


  constructor(private firestore: AngularFirestore) { } // Inject AngularFireDatabase dependency in constructor



vacation: Vacation;

getVacations(){
  // return this.firestore.collection('vacations').snapshotChanges();

  return this.firestore.collection('vacations').snapshotChanges().pipe(
    map(actions => actions.map(a => {
      const data : Vacation = Object.assign(new Vacation,a.payload.doc.data());
      const deleteVacation = ()=>{a.payload.doc.ref.delete()};
      const id = a.payload.doc.id;
      return { id, ...data, deleteVacation };
    }))
  );
}

getAnnual(){
  return this.firestore.collection('vacationBalance').snapshotChanges();
}

getDisabeledDates(){
  return this.firestore.collection('disabeledDays').snapshotChanges();
}

}


