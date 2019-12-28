import { Injectable } from '@angular/core'
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http'
import { Observable } from 'rxjs'


@Injectable({
  providedIn: 'root',
})
export class HeaderInterceptor implements HttpInterceptor {
  constructor() { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    /*     if (!!retrieveFromLocalStorage('currentUser')) {
          const currentUser = retrieveFromLocalStorage('currentUser');
          request = request.clone({
            setHeaders: {
              Authorization: `Bearer ${currentUser.token}`,
            },
          });
        } */
    var currentUser = localStorage.getItem('user')
    var token = localStorage.getItem('token')
    if (currentUser && token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      })
    }
   

    return next.handle(request)
  }
}
