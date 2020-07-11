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
     this.authenticationService.facebookAuthLogin();
   }
   onSubmit() {
    console.log(this.elegantForm);
      var email= this.elegantForm.value['elegantFormEmailEx'];
      var password = this.elegantForm.value['elegantFormEmailEx'];
      this.authenticationService.SignIn(email, password);
   }
}
