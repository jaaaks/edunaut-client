import { Component, OnInit } from '@angular/core';
import { NgwWowService } from 'ngx-wow';
import { AngularFireAuth } from "@angular/fire/auth";
import {Router, ActivatedRoute, ParamMap} from '@angular/router';
import {MatButtonModule} from '@angular/material/button';
import { MessageService } from '../services/message.service';
import {MatDialog} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import  { environment} from "../../environments/environment"

import { LoginComponent } from '../login/login.component';
import * as firebase from 'firebase/app'
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
   uid = "";
   public searchParameter="";
   public show=true;
   public userId:string;
   private user: Observable<firebase.User>;
  private localUrl= environment.localUrl;
  constructor(private wowService: NgwWowService,private afauth:AngularFireAuth,private router:Router,private messageService:MessageService,public dialog: MatDialog) {
  
      }
   

  ngOnInit(): void {
    this.afauth.authState.subscribe(
      res => {
        if (res && res.uid) {
          console.log('user is logged in',res);
          this.photoUrl=res.photoURL?res.photoURL:this.src;
          this.displayName=res.displayName;
          this.loggedIn=true;
          this.userId=res.uid;
          this.uid=res.uid;
        } else {
          console.log('user not logged in');
        }
      });
      this.messageService.getUser().subscribe(res=>{
        
      });
    
  } 
  signOut(){
     this.afauth.signOut().then(res=>{
            this.loggedIn=false;
            this.photoUrl="";
            this.displayName= "";
            window.location.reload();
     })
  }
 
  sendMessage(): void {
    window.location.href='find?search='+this.searchParameter;
 }
openDialog() {
  const dialogRef = this.dialog.open(LoginComponent,{
    maxHeight:'520px',
    minWidth:'411px',
    position:{
      top: '15vh',
       },
       disableClose: true
  }
  );

  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
  });
}

}
