import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject
} from "@angular/fire/database";
import { Vacation } from "../_models/vacation.model";
import { reject } from "q";
import { AuthService } from "../_services/auth.service";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { Observable, throwError } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class VacationService {
  resourceURL = environment.baseUrl;

  constructor(
    public afs: AngularFirestore,
    public auth: AuthService,
    private http: HttpClient
  ) {
    this.auth
      .getCurrentUser()
      .then((userID: string) => {
        //here you can use the id to get the users firestore doc
        this.afs
          .collection("users")
          .doc(userID)
          .valueChanges()
          .subscribe(userFirestoreDoc => {
            // remember to subscribe
            this.userDoc = userFirestoreDoc;
          });
      })
      .catch(nullID => {
        //when there is not a current user
        this.userDoc = null;
      });
  } // Inject AngularFireDatabase dependency in constructor

  vacation: Vacation;
  userDoc;

  submitNewVacation(fromDate, endDate, NoOfDays, vacationType) {
    return this.http
      .post(`${this.resourceURL}/submitnewvacation`, {
        fromDate: fromDate,
        endDate: endDate,
        NoOfDays: NoOfDays,
        vacationType: vacationType
      })
      .subscribe(
        data => console.log(data),
        error => console.log("error", error)
      );
  }

  getVacations() {
    return this.afs
      .collection("users")
      .doc(this.userDoc.uid)
      .collection("vacations")
      .snapshotChanges();
  }

  getAnnual() {
    return this.afs.collection("vacationBalance").snapshotChanges();
  }

  getDisabeledDates() {
    return this.afs.collection("disabeledDays").snapshotChanges();
  }

  getPendingVacations(): Observable<any> {
    return this.http.get<any>(`${this.resourceURL}/getuserpendingvacations`).pipe(
      map(
        data => {
          return data;
        },
        catchError(error => {
          return throwError(error);
        })
      )
    );
  }
}
