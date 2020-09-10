import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }
  private subject = new Subject<any>();
  private compareCourses = new Subject<any>();
  private sendFromLoginToListing= new Subject<any>();

    sendMessage(message: string) {
        this.subject.next({ text: message });
    }

    addToCompare(data){
      this.compareCourses.next(data);
    }
    loginToListing(data){
      this.sendFromLoginToListing.next(data);
    }
    getUser():Observable<any>{
      return this.sendFromLoginToListing.asObservable();
    }
    clearMessage() {
        this.subject.next();
    }
    getCourses():Observable<any>{
      return this.compareCourses.asObservable();
    }    
    getMessage(): Observable<any> {
        return this.subject.asObservable();
    }
}
