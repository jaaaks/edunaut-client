import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";

@Component({
  selector: 'app-right-course',
  templateUrl: './right-course.component.html',
  styleUrls: ['./right-course.component.scss']
})
export class RightCourseComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  arts= false;
  business= false;
  cs= false;
  dataScience = false;
  health = false;
  it = false;
  language = false;
  math = false;
  pd = false;
  science = false;
  socialScience = false; 
  loggedin = false;

  constructor(private _formBuilder: FormBuilder, private afauth:AngularFireAuth) {
    this.afauth.authState.subscribe(
      res => {
        if(res && res.uid){
        this.loggedin = true;}
      });
  }

  ngOnInit() {
    this.firstFormGroup = this._formBuilder.group({
      
    });
    this.secondFormGroup = this._formBuilder.group({
      
    });
    this.thirdFormGroup = this._formBuilder.group({
      
    });
    this.fourthFormGroup = this._formBuilder.group({
      
    });
  }
}
