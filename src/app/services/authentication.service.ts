import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Observable, combineLatest } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth, private router:Router) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  SignUp(email: string, password: string):any {

    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password);
       }
  googleAuthLogin() {
    var provider = new auth.GoogleAuthProvider();
    return this.angularFireAuth.signInWithPopup(provider);
   }
  facebookAuthLogin(){
    var provider = new auth.FacebookAuthProvider();
    return this.angularFireAuth.signInWithPopup(provider);
  }

  
  SignIn(email: string, password: string) :any{
    
   return  this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
       }

 
  SignOut() {
    this.angularFireAuth
        .signOut().then(res=>{
          console.log("something 1",res)
        }).catch(error=>
        {
          console.log("something 2")
        });
  }
 
 updateProfile(display){
  
    return this.angularFireAuth.currentUser.then((result)=>{
    result.updateProfile({displayName:display}).then(res=>{
      console.log(res);
    });
  });
  };
}