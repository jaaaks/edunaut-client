import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import  { environment} from "../../environments/environment"
import { Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SeacrhServiceService {
    resourceUrl= environment.resourceUrl;
    constructor(private httpClient:HttpClient) { }

  public getAllCourses(){
    return this.httpClient.get(`http://server-env.eba-zdwqv4a8.ap-south-1.elasticbeanstalk.com/edunaut/getallcourses`);
  }
  public getCourseByKeyWord(tag:string,pageNo:any,pageSize:any):Observable<any>{
    tag= tag.toLowerCase();
      var splitted = tag.split(" ");
      var searchKeyWords="";
     
      for(var index=0;index<splitted.length;index++){
        searchKeyWords= searchKeyWords + "*"+splitted[index]+"*; ";
      }
   
    return this.httpClient.get(this.resourceUrl+"/edunaut/getbykeyword/"+searchKeyWords+"/"+pageNo+"/"+pageSize);
    }

    public bookMarkcourse(bookMarkObject){
      return this.httpClient.put(this.resourceUrl+"/bookmark/add",bookMarkObject);
    }
    public getBookmarkedCourses(courselist){
      return this.httpClient.get(this.resourceUrl+"/edunaut/course",{observe:courselist});
    }
    public getFilteredCourses(courseList,pageNo,pageSize){
      return this.httpClient.post(this.resourceUrl+"/edunaut/filter/" + pageNo + "/" + pageSize,courseList);
    }
}
