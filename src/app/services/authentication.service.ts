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
    return this.angularFireAuth.signInWithPopup(provider)
    .then((result) => {
        console.log('You have been successfully logged in!')
    }).catch((error) => {
        console.log(error)
    })
  }
  facebookAuthLogin(){
    var provider = new auth.FacebookAuthProvider();
    return this.angularFireAuth.signInWithPopup(provider).then(function(result) {
      var token = result.credential;
  
      var user = result.user;
      console.log(token);
    
    }).catch(function(error) {
     
      var errorCode = error.code;
      var errorMessage = error.message;
      
      var email = error.email;
      
      var credential = error.credential;
    
    });
  }

  
  SignIn(email: string, password: string) :any{
    
   return  this.angularFireAuth
      .signInWithEmailAndPassword(email, password)
      // .then(res => {
      //   console.log('Successfully signed in!',res);
      //   return new Observable(observer=>{
      //     observer.next("successful");
      //   });
      //   },
      //   msg=>{
      //     console.log('Sign in unsuccessful!',msg);
      //     return new Observable(observer=>{
      //       observer.next("unsuccessful");
      //     });
      //   })
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

}