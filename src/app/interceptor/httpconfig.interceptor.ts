import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { AngularFireAuth } from "@angular/fire/auth";
import  { environment} from "../../environments/environment"


@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {

    public token:string;
    constructor(private afauth:AngularFireAuth) { 
      
    }
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
         this.token= localStorage.getItem('token')
        if (this.token) {
            request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + this.token) });
        }
        if (!request.headers.has('Content-Type')) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json') });
        }
  
        request = request.clone({ headers: request.headers.set('Accept', 'application/json') });
       
    return next.handle(request).pipe(
        map((event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
                console.log('event--->>>', event);
            }
            return event;
        }));
     

      }
}