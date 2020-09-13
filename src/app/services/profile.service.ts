import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import  { environment} from "../../environments/environment"
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  url = environment.resourceUrl;
  public idTokeN:string;
  constructor(private afauth:AngularFireAuth,private http:HttpClient) { 
    this.afauth.idToken.subscribe(idToken=>{
      this.idTokeN= idToken;
  })
  }
  
  saveProfile(profile){
    return this.http.put(this.url + '/user/add',profile).subscribe(res=>{
      console.log(res);
    });
  }
  getProfile(id){
    return this.http.get(this.url+'/user/'+id);
  }
  sampleCourse(){
    return this.http.get(this.url+'/edunaut/getbykeyword/web')
  }
}
