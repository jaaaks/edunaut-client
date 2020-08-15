import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SeacrhServiceService {

  constructor(private httpClient:HttpClient) { }

  public getAllCourses(){
    return this.httpClient.get(`http://server-env.eba-zdwqv4a8.ap-south-1.elasticbeanstalk.com/edunaut/getallcourses`);
  }
  public getCourseByKeyWord(tag){
    return this.httpClient.get(`http://server-env.eba-zdwqv4a8.ap-south-1.elasticbeanstalk.com/edunaut/getbykeyword/`+tag);
}
}
