import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  elegantForm: FormGroup;

  constructor(public fb: FormBuilder,public authenticationService: AuthenticationService) {
    this.elegantForm = fb.group({
      elegantFormEmailEx: ['', [Validators.required, Validators.email]],
      elegantFormPasswordEx: ['', Validators.required],
      elegantFormFirstName: ['', Validators.required],
      elegantFormLastName: [''],
      elegantFormConfirmPasswordEx:['', Validators.required]
    },{
      validator: this.passwordConfirming
    });
   }
    onSubmit() {
      console.log(this.elegantForm);
      var email= this.elegantForm.value['elegantFormEmailEx'];
      var password = this.elegantForm.value['elegantFormEmailEx'];
      this.authenticationService.SignUp(email, password);
       }
       googleLogin(event: Event){
        this.authenticationService.googleAuthLogin();
       }
       facebookLogin(){
         this.authenticationService.facebookAuthLogin();
       }
       
  ngOnInit(): void {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('elegantFormPasswordEx').value !== c.get('elegantFormConfirmPasswordEx').value) {
        return {invalid: true};
    }
}

}
