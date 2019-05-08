import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user.model'; 
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<User>;
  userDoc;

  constructor(
        private afAuth: AngularFireAuth,
        private afs: AngularFirestore,
        private router: Router
  ) { 
    // Get the auth state, then fetch the Firestore user document or return null
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
          // Logged in
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          // Logged out
          return of(null);
        }
      })
    )

    this.getCurrentUser().then((userID: string) => {
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


  googleLogin() {
    const provider = new auth.GoogleAuthProvider()
    return this.oAuthLogin(provider);
  }

  private oAuthLogin(provider) {
    return this.afAuth.auth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`users/${user.uid}`);

    var data = { 
      uid: user.uid, 
      email: user.email, 
      displayName: user.displayName, 
      photoURL: user.photoURL,
      TotalBalance: 21,
      AnnualBalance: 15,
      CasualBalance: 6
    } 
    if (!this.userDoc) 
    { return userRef.set(data, { merge: true }) }
  }

  async signOut() {
    await this.afAuth.auth.signOut();
    this.router.navigate(['/']);
  }

  getCurrentUser(): Promise<string> {
    var promise = new Promise<string>((resolve, reject) => {
      this.afAuth.auth.onAuthStateChanged(returnedUser => {
        if (returnedUser) {
          resolve(returnedUser.uid);
        } else {
          reject(null);
        }
      });
    })
    return promise
  }
   
}
