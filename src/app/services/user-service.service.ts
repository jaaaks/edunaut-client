import { Injectable } from '@angular/core';
import  { environment} from "../../environments/environment"
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserServiceService {

  url = environment.resourceUrl;
  constructor(private http: HttpClient) { }

  public profileInformation(tog){

  
    return this.http.get('https://edunaut-backend-api.herokuapp.com/user/'+tog);
  }  

  public updateProfile(update){
    console.log(update);
    return this.http.put('https://edunaut-backend-api.herokuapp.com/user/update',update)
    
  }
  
  public removeBookmark(cid,uid){
    return this.http.delete('https://edunaut-backend-api.herokuapp.com/bookmark/deleteByCidAndUid/'+cid+'/'+uid);
  }
}
