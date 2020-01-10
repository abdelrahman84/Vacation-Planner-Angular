import { Injectable, NgZone } from '@angular/core';
import { User } from '../_models/user.model';
import { auth } from 'firebase/app';
import { AngularFireAuth } from "@angular/fire/auth";
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Router } from "@angular/router";
import {HttpClient} from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  userData: any; // Save logged in user data
  userDoc;
  resourceURL = environment.baseUrl;

  private iss = {
    login: `${this.resourceURL}/login`,
    signup: `${this.resourceURL}/signup`
  }

  public logged = new BehaviorSubject <boolean> (this.loggedIn());

  authState = this.logged.asObservable();

  changeAuthStatus (value: boolean) {
    this.logged.next(value);
  }

  constructor(
    public afs: AngularFirestore,   // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone,// NgZone service to remove outside scope warning
    private http:HttpClient
  ) {
    /* Saving user data in localstorage when 
    logged in and setting up null when logged out */
    // this.afAuth.authState.subscribe(user => {
    //   if (user) {
    //     this.userData = user;
    //     localStorage.setItem('user', JSON.stringify(this.userData));
    //     JSON.parse(localStorage.getItem('user'));

    //     this.getCurrentUser().then((userID: string) => {
    //       //here you can use the id to get the users firestore doc 
    //       this.afs.collection('users').doc(userID).valueChanges()
    //         .subscribe(userFirestoreDoc => { // remember to subscribe
    //           this.userDoc = userFirestoreDoc;
    //         })
    //     }).catch(nullID => {
    //       //when there is not a current user
    //       this.userDoc = null
    //     })


    //   } else {
    //     localStorage.setItem('user', null);
    //     JSON.parse(localStorage.getItem('user'));
    //   }
    // })
  }

  

  

  // // Sign in with email/password
  // SignIn(email, password) {
  //   return this.afAuth.auth.signInWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       });
  //       this.SetUserData(result.user);
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  loggedIn() {
    return this.isValid(); 
  }

  isValid() {
    const token = this.getToken();

    if (token) {
  
      const payload = this.payload(token);
        
       if (payload) {
         return Object.values(this.iss).indexOf(payload.iss) > -1 ? true : false;
       }
    }
    return false;
  }

  payload(token) {
    const payload = token.split('.')[1];
    return this.decode(payload);
  }

  decode(payload) {
    return JSON.parse(atob(payload));
  }

  getToken() {

    return localStorage.getItem('token');
  }

  getUser() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Sign up with email/password
  // SignUp(email, password) {
  //   return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
  //     .then((result) => {
  //       /* Call the SendVerificaitonMail() function when new user sign 
  //       up and returns promise */
  //       this.SendVerificationMail();
  //       this.SetUserData1(result.user);
  //     }).catch((error) => {
  //       window.alert(error.message)
  //     })
  // }

  signup(data){
    return this.http.post(`${this.resourceURL}/signup`, data).subscribe(
      data => this.handleToken(data),
      error => console.log('error', error),
    )
  }

  signupManager(data){
    return this.http.post(`${this.resourceURL}/manager/signupmanager`, data).subscribe(
      data => this.handleTokenAdmin(data),
      error => console.log('error', error)
    )
  }

  login(data) {
    return this.http.post(`${this.resourceURL}/login`, data).subscribe(
      data => this.handleToken(data),
      error => console.log('error', error)
    )
  }

  adminLogin(data) {
    return this.http.post(`${this.resourceURL}/manager/adminlogin`, data).subscribe(
      data => {
        if 
        //@ts-ignore
        (data.response === 'error') {
          //@ts-ignore
          console.log(data.message)} else {
        this.handleTokenAdmin(data)}},
      error => console.log('error', error)
    )
  }

  isAuthenticated(): boolean {
    return localStorage.getItem('token') != null;
  }

  handleToken(data) {
    this.setToken(data);
    //this.changeAuthStatus(true);
    this.router.navigateByUrl('/app/dashboard');
  }

  handleTokenAdmin(data) {
    this.setTokenAdmin(data);
    //this.changeAuthStatus(true);
    this.router.navigateByUrl('/manager/dashboard');
  }


  setToken(data) {

   
      localStorage.setItem('token', data.access_token);
     localStorage.setItem('user',JSON.stringify(data.user))
    
  }

  setTokenAdmin(data) {
    localStorage.setItem('token', data.result.access_token);
     localStorage.setItem('user',JSON.stringify(data.result.user))
  }


  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification()
      .then(() => {
        this.router.navigate(['verify-email-address']);
      })
  }

  // Reset Forggot password
  ForgotPassword(passwordResetEmail) {
    return this.afAuth.auth.sendPasswordResetEmail(passwordResetEmail)
      .then(() => {
        window.alert('Password reset email sent, check your inbox.');
      }).catch((error) => {
        window.alert(error)
      })
  }

  // Returns true when user is looged in and email is verified
  // get isLoggedIn(): boolean {
  //   const user = JSON.parse(localStorage.getItem('user'));
  //   return (user !== null && user.emailVerified !== false) ? true : false;
  // }

  // Sign in with Google
  // GoogleAuth() {
  //   return this.AuthLogin(new auth.GoogleAuthProvider());
  // }

  // Auth logic to run auth providers
  // AuthLogin(provider) {
  //   return this.afAuth.auth.signInWithPopup(provider)
  //     .then((result) => {
  //       this.ngZone.run(() => {
  //         this.router.navigate(['dashboard']);
  //       })
  //       this.SetUserData(result.user);
  //     }).catch((error) => {
  //       window.alert(error)
  //     })
  // }

  /* Setting up user data when sign in with username/password, 
  sign up with username/password and sign in with social auth  
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  // SetUserData(user) {
  //   var userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
  //   var userData2: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //     TotalBalance: this.userDoc.TotalBalance,
  //     AnnualBalance: this.userDoc.AnnualBalance,
  //     CasualBalance: this.userDoc.CasualBalance
  //   }

  //   var userData1: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //     TotalBalance: 21,
  //     AnnualBalance: 15,
  //     CasualBalance: 6
  //   }
  //   if (this.userDoc) {
  //     return userRef.set(userData2, {
  //       merge: true
  //     })
  //   } else {
  //     return userRef.set(userData1, {
  //       merge: true
  //     })
  //   }

  // }

  // SetUserData1(user) {
  //   var userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);


  //   var userData: User = {
  //     uid: user.uid,
  //     email: user.email,
  //     displayName: user.displayName,
  //     photoURL: user.photoURL,
  //     emailVerified: user.emailVerified,
  //     TotalBalance: 21,
  //     AnnualBalance: 15,
  //     CasualBalance: 6
  //   }

  //   return userRef.set(userData, {
  //     merge: true
  //   })
  // }



  // Sign out 
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    })
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

  removeToken() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  logout(){
    //this.changeAuthStatus(false);
    this.removeToken();
    this.router.navigateByUrl('/sign-in');
    
  }

}