import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {UserServiceService} from '../services/user-service.service';
import {ProfileService} from '../services/profile.service';
import {ModalDirective} from 'angular-bootstrap-md';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('basicModal1', { static: true }) demoBasic: ModalDirective;
  public profileData ;
  public profileId ;
  public currentUserid;
  firstname = "";
  lastname = "";
  bio = "";
  public sameUser = false;
  constructor(private afauth:AngularFireAuth, private userService : UserServiceService,private route: ActivatedRoute, private profileService: ProfileService) { 
    this.afauth.authState.subscribe(
      res => {
        this.currentUserid= res;
        
        console.log(res);
        if(this.profileId.params.uid==res.uid){
          this.sameUser = true;
        }
      });
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params)=>{
      this.profileId={...params};
    })
    this.getprofileInformation(this.profileId.params.uid);
   
  }
  onClickSubmit(data) {
    this.userService.updateProfile({
      uid: this.currentUserid.uid,
      firstname: data.firstname,
      lastname: data.lastname,
      email: this.currentUserid.email,
      phoneno: "",
      bio: data.bio
    }).subscribe((res)=>{
      this.firstname =  data.firstname;
      this.lastname = data.lastname;
      this.bio = data.bio;
    }),
    err=>{
      
    }
      ;
    
    }

  getprofileInformation(uid){
  this.userService.profileInformation(uid).subscribe((data) => {
    this.profileData= data;
    this.firstname = this.profileData.firstname;
    this.lastname = this.profileData.lastname;
    this.bio = this.profileData.bio;
    console.log(data);
    });
  }
}
