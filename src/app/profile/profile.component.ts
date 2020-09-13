import { userError } from '@angular/compiler-cli/src/transformers/util';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {UserServiceService} from '../services/user-service.service';
import {ModalDirective} from 'angular-bootstrap-md';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  @ViewChild('basicModal1', { static: true }) demoBasic: ModalDirective;
  public uid; 
  public user;
  constructor(private afauth:AngularFireAuth, private userService : UserServiceService) { 
    this.afauth.authState.subscribe(res=>
      {
        this.getUserInformation(res.uid);
      })
  }

  ngOnInit(): void {
   
  }
  getUserInformation(id){
  this.userService.userInformation(id).subscribe((data) => {
    this.user= data;
    console.log(data);
    });
  }
}
