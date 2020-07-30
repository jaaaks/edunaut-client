import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {Router} from '@angular/router';
import { AngularFireAuth } from "@angular/fire/auth";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  elegantForm: FormGroup;
    loading = false;
    showErrormessage=false;
    errorMessage="";

  constructor(public fb: FormBuilder,public authenticationService: AuthenticationService,public router:Router,public afauth:AngularFireAuth) {
    this.elegantForm = fb.group({
      elegantFormEmailEx: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      elegantFormPasswordEx: ['', Validators.required]
    });
  this.afauth.authState.subscribe(
    res => {
      if (res && res.uid) {
        console.log('user is logged in');
      } else {
        console.log('user not logged in');
      }
    });
  }


  ngOnInit(): void {
  }
  googleLogin(){
    this.authenticationService.googleAuthLogin().then(result=>{
      console.log(result);
      this.router.navigateByUrl('/');
    },err=>{
      console.log(err);
      this.showErrormessage=true;
      this.errorMessage=err.message;
    });
   }
   facebookLogin(){
     this.authenticationService.facebookAuthLogin().then(result=>{
      this.router.navigateByUrl('/');
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
            console.log('Successfully signed in!',res);
            this.loading=false;
            this.router.navigateByUrl('/');
            },
            msg=>{
              console.log('unsuccessful signed in!',msg);
              this.errorMessage=msg;
              this.loading=false;
              this.showErrormessage=true;
          })
  }
}
