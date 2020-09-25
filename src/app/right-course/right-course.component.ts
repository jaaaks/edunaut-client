import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AngularFireAuth } from "@angular/fire/auth";
import { LoginComponent } from '../login/login.component'; 
import {MatDialog} from '@angular/material/dialog';
import { MessageService } from '../services/message.service';
import {Router} from '@angular/router';


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

  constructor(private _formBuilder: FormBuilder, private afauth:AngularFireAuth,private _dialog:MatDialog,private messageService:MessageService,private router:Router) {
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
  courseSearch={
    course_field:"",
    course_dur:""
  }
  courseSelected(courseField){
  this.courseSearch.course_field=courseField;
   }
  
  duration(h){
    this.courseSearch.course_dur=h;
  }
  courseFee(bool){

  }
  calledLogin(){
    const dialogRef= this._dialog.open(LoginComponent,{
      maxHeight:'520px',
      minWidth:'411px',
      position:{
        top: '12vh',
         },
         disableClose: true
    });

     dialogRef.afterClosed().subscribe(res=>{
       if(res==='success'){
        this.messageService.sendMessage(this.courseSearch);
        this.router.navigate['/find']
       }
      
     })
  }

  setNext(){
    console.log('came in setNext')
    if(!this.loggedin){
      return ;
    }
    else{
      this.messageService.sendMessage(this.courseSearch);
      this.router.navigate(['/find'],{
        state:this.courseSearch
      })
    }
  }
}
