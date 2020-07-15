import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';


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

  constructor(public fb: FormBuilder,public authenticationService: AuthenticationService) {
    this.elegantForm = fb.group({
      elegantFormEmailEx: ['', [Validators.required, Validators.email]],
      elegantFormPasswordEx: ['', Validators.required]
    });
  }


  ngOnInit(): void {
  }
  googleLogin(){
    this.authenticationService.googleAuthLogin();
   }
   facebookLogin(){
     this.authenticationService.SignOut();
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
            },
            msg=>{
              console.log('unsuccessful signed in!',msg);
              this.errorMessage=msg;
              this.loading=false;
              this.showErrormessage=true;
          })
  }
}
