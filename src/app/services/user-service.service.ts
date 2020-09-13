import { Injectable } from '@angular/core';
import  { environment} from "../../environments/environment"
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = environment.resourceUrl;
  constructor(private http: HttpClient) { }

  public userInformation(tog){

  
    return this.http.get('https://edunaut-backend-api.herokuapp.com/user/'+tog);
  }  

  public  sampleCourse(){
    return this.http.get(this.url+'/edunaut/getbykeyword/web');
  }
}
