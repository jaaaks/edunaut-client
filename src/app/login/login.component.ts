import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {ProfileService} from '../services/profile.service'
import {Router} from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";
import { VirtualTimeScheduler, observable } from 'rxjs';
import {MatFormFieldModule} from '@angular/material/form-field';

import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogRef} from '@angular/material/dialog';
import  { environment} from "../../environments/environment"


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    elegantForm: FormGroup;
    signUpForm:FormGroup;
    loading = false;
    showErrormessage=false;
    errorMessage="";
    isSignUp=false;
    hide = true;
    profile={uid:"",firstname:"",lastname:"",email:"",phoneno:"",bio:""};
  constructor(public fb: FormBuilder,public authenticationService: AuthenticationService,public router:Router,public afauth:AngularFireAuth,
    private dialogRef:MatDialogRef<LoginComponent>, private pfs:ProfileService) {
    this.elegantForm = fb.group({
      elegantFormEmailEx: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      elegantFormPasswordEx: ['', Validators.required]
    });
    this.signUpForm = fb.group({
      signUpFormEmail: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      signUpFormPassword: ['', Validators.required],
      signUpFormName:  ['', Validators.required]
    });
    
  this.afauth.authState.subscribe(
    res => {
      if (res && res.uid) {
        console.log('user is logged in');
      
 } else {
        console.log('user not logged in');
      }
    });
    dialogRef.disableClose = true;
  }


  ngOnInit(): void {
  }
  googleLogin(){
    this.authenticationService.googleAuthLogin().then(res=>{
      localStorage.setItem('token', res.user.refreshToken);
      localStorage.setItem('id', res.user.uid);
      this.dialogRef.close('success');
    },err=>{
      console.log(err);
      this.showErrormessage=true;
      this.errorMessage=err.message;
    });
   }
   facebookLogin(){
     this.authenticationService.facebookAuthLogin().then(res=>{
      localStorage.setItem('token', res.user.refreshToken);
      localStorage.setItem('id', res.user.uid);
      this.dialogRef.close('success');
     },err=>{
      this.showErrormessage=true;
      this.errorMessage=err.message;
     });
   }
   onSubmit() {
    console.log(this.elegantForm);
      var email= this.elegantForm.value['elegantFormEmailEx'];
      var password = this.elegantForm.value['elegantFormPasswordEx'];
      
      this.loading= true;
      this.authenticationService.SignIn(email, password)
        .then(res => {
            localStorage.setItem('token', res.user.refreshToken);
            localStorage.setItem('id', res.user.uid);
            this.dialogRef.close('success');
            this.loading=false;
        },
            msg=>{
              console.log('unsuccessful signed in!',msg);
              this.errorMessage=msg;
              this.loading=false;
              this.showErrormessage=true;
          })
  }

  signUp(){
       var email  = this.signUpForm.value['signUpFormEmail'];
       var password = this.signUpForm.value['signUpFormPassword'];
       var name = this.signUpForm.value['signUpFormName'];
       this.authenticationService.SignUp(email, password).then(
        res=>{
          console.log("sign up successful",res);
          this.afauth.currentUser.then(
            res=>{
              var verified=false;
              res.sendEmailVerification().then(success=>{
                this.profile.uid=res.uid;
                this.profile.email = res.email;
                verified=true;
                localStorage.setItem('token',res.refreshToken);
                this.pfs.saveProfile(this.profile);
                this.loading=false;
              },
              error=>{
                res.delete();
              })
              setTimeout(() => {
                res.delete();
              }, 30000000);
            }
          )
         
         },
        err=>{
          console.log("sign up not successful",err);
          this.showErrormessage=true;
          this.errorMessage=err.message;
          this.loading=false;
        }
      );
       }
  
  showPass(){
  this.hide =!this.hide;
  }
}
