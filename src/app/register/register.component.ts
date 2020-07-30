import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup,AbstractControl } from '@angular/forms';
import { AuthenticationService } from '../services/authentication.service';
import {Router} from '@angular/router';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  elegantForm: FormGroup;
  loading = false;
  showErrormessage=false;
  errorMessage=""
constructor(public fb: FormBuilder,public authenticationService: AuthenticationService,public router:Router) {
    this.elegantForm = fb.group({
      elegantFormEmailEx: ['', [Validators.required, Validators.email,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
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
      var password = this.elegantForm.value['elegantFormPasswordEx'];
      var display= this.elegantForm.value['elegantFormFirstName'];
      this.loading= true;
      console.log("loading")
      this.authenticationService.SignUp(email, password).then(
        res=>{
          console.log("sign up successful",res);
          this.loading=false;
          this.authenticationService.updateProfile(display).then( res=>{
            this.router.navigateByUrl('/');}
          );
          
        },
        err=>{
          console.log("sign up not successful",err);
          this.showErrormessage=true;
          this.errorMessage=err.message;
          this.loading=false;
        }
      );
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
       
  ngOnInit(): void {
  }

  passwordConfirming(c: AbstractControl): { invalid: boolean } {
    if (c.get('elegantFormPasswordEx').value !== c.get('elegantFormConfirmPasswordEx').value) {
        return {invalid: true};
    }
}

}
