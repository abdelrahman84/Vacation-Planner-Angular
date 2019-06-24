import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import { AngularFirestore } from '@angular/fire/firestore';
import { firestore } from 'firebase';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-current-vacations',
  templateUrl: './current-vacations.component.html',
  styleUrls: ['./current-vacations.component.css']
})
export class CurrentVacationsComponent implements OnInit {
   
  userDoc;
  
  constructor(
    public authService: AuthService,
    public afs: AngularFirestore
  ) { }

  ngOnInit() {
    this.authService.getCurrentUser().then((userID: string) => {
      //here you can use the id to get the users firestore doc 
      this.afs.collection('users').doc(userID).valueChanges()
      .subscribe(userFirestoreDoc => { // remember to subscribe
        this.userDoc = userFirestoreDoc;
      })
    }).catch(nullID => {
      //when there is not a current user
      this.userDoc = null
    }) 
  

  }

}
