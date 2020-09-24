import { Injectable } from '@angular/core';
import  { environment} from "../../environments/environment"
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class CourseDetailService {

  url = environment.resourceUrl;
  constructor(private http: HttpClient) { }

  public writeCourseReview(review){
    return this.http.put(this.url+"/review/add",review);
  }
  public getCourseById(courseId){
    return this.http.post(this.url+"/edunaut/courses",courseId);
  }
  public getReviewById(courseId){
    return this.http.get(this.url+"/review/getreview/"+courseId);
  }
  public updateReview(review){
    return this.http.put(this.url+"/review/update",review);
  }
  public contactUS(bod){
    return this.http.post(this.url+"/contactus/sendmail",bod).subscribe(res => console.log(res));
  }
  public courseComplete(bid){
    return this.http.put(this.url+"/bookmark/update",bid);
  }
}

