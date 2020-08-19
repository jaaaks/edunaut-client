import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { AngularFireAuth } from "@angular/fire/auth";
import {Router} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
  public src="../../assets/prfilepic.svg"
   public photoUrl="";
   public isMenuCollapsed = true;
   public displayName="";
   public loggedIn=false;
   public searchParameter="";
  constructor(private wowService: NgwWowService,private afauth:AngularFireAuth,private router:Router,private messageService:MessageService) {
    this.afauth.authState.subscribe(
      res => {
        if (res && res.uid) {
          console.log('user is logged in',res);
          this.photoUrl=res.photoURL?res.photoURL:this.src;
          this.displayName=res.displayName;
          this.loggedIn=true;
        } else {
          console.log('user not logged in');
        }
      });
  }
   

  ngOnInit(): void {
  } 
  signOut(){
     this.afauth.signOut().then(res=>{
            this.loggedIn=false;
            this.photoUrl="";
            this.displayName= "";
            window.location.reload();
     })
  }
  goToLogin(){
  this.router.navigateByUrl("/register");
  }
  sendMessage(): void {
    this.messageService.sendMessage(this.searchParameter);
    this.router.navigateByUrl("/find");

}

}
