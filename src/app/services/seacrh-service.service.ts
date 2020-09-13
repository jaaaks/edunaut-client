import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment} from "../../environments/environment"



@Injectable({
  providedIn: 'root'
})
export class SeacrhServiceService {
    resourceUrl= environment.resourceUrl;
    constructor(private httpClient:HttpClient) { }

  public getAllCourses(){
    return this.httpClient.get(`http://server-env.eba-zdwqv4a8.ap-south-1.elasticbeanstalk.com/edunaut/getallcourses`);
  }
  public getCourseByKeyWord(tag){
   
      var splitted = tag.split(" ");
      var searchKeyWords=splitted[0];
     
      for(var index=1;index<splitted.length;index++){
        searchKeyWords= searchKeyWords + " *"+tag[index]+"*";
      }
    return this.httpClient.get(this.resourceUrl+"/edunaut/getbykeyword/"+searchKeyWords);
    }

    public bookMarkcourse(bookMarkObject){
      return this.httpClient.put(this.resourceUrl+"/bookmark/add",bookMarkObject);
    }
}
