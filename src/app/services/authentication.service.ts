import { Injectable } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import { auth } from 'firebase/app';
import { Observable, combineLatest } from 'rxjs';
import { Router } from '@angular/router'

@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  

  constructor(private angularFireAuth: AngularFireAuth, private router:Router) {
  
  }

  /* Sign up */
  SignUp(email: string, password: string):any {
  
    return this.angularFireAuth
      .createUserWithEmailAndPassword(email, password);
  
 }
  googleAuthLogin(persitance) :any{
    var pers;
    if(persitance==='local'){
      pers=auth.Auth.Persistence.LOCAL;
    }
    else{  pers=auth.Auth.Persistence.SESSION;}
    var provider = new auth.GoogleAuthProvider();
    var promise = new Promise((resolve,reject)=>{
      this.angularFireAuth.setPersistence(pers).then(result=>{
         this.angularFireAuth.signInWithPopup(provider).then(res=>{
          localStorage.setItem('token', res.user.refreshToken);
         resolve(res);
         },
         error=>{
           reject(error);
            });
        },
        err=>{
          reject(err);
        });
        
      });
      return promise;
   }
  facebookAuthLogin(persitance):any{
    var pers;
    if(persitance==='local'){
      pers=auth.Auth.Persistence.LOCAL;
    }
    else  {
      pers=auth.Auth.Persistence.SESSION;
    }

    var provider = new auth.FacebookAuthProvider();
    var promise = new Promise((resolve,reject)=>{
    this.angularFireAuth.setPersistence(pers).then(result=>{
     this.angularFireAuth.signInWithPopup(provider).then(
       res=>{
        localStorage.setItem('token', res.user.refreshToken);
        localStorage.setItem('id', res.user.uid);
         resolve(res);
       },
       err=>{
            reject(err);
       }
     );
  },
   error=>{
    reject('not successfull');
   });
  });
}

  
  SignIn(email: string, password: string,persistance:string) :any{
    var pers;
    if(persistance==='local'){
      pers=auth.Auth.Persistence.LOCAL;
    }
    else { pers=auth.Auth.Persistence.SESSION;
    }
    var promise = new Promise((resolve,reject)=>{
      this.angularFireAuth.setPersistence(pers).then(result=>{
    
          this.angularFireAuth
           .signInWithEmailAndPassword(email, password).then(
             res=>{
              localStorage.setItem('token', res.user.refreshToken);
              localStorage.setItem('id', res.user.uid);
               resolve(res.user);
             },
             err=>{
               reject(err.message);
             }
           );
            },
            error=>{
             reject(error.message);
            });
    });
      return promise;
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