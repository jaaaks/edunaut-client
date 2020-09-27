import {ActivatedRoute} from '@angular/router';
import { Component, OnInit, ViewChild, DoCheck } from '@angular/core';
import { AngularFireAuth } from "@angular/fire/auth";
import {UserServiceService} from '../services/user-service.service';
import {ModalDirective} from 'angular-bootstrap-md';
import { FormGroup, FormControl } from '@angular/forms';
import { MessageService } from '../services/message.service';
import {  Router } from '@angular/router';
import { NguCarouselConfig } from '@ngu/carousel';
import { interval, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { slider } from '../tile/slide-animation';
import {ProfileService} from '../services/profile.service';
import { CourseDetailService} from '../services/course-detail.service';


@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
  animations: [slider],
})
export class ProfileComponent implements OnInit {
  @ViewChild('basicModal1', { static: true }) demoBasic1: ModalDirective;
  showAndHideModal1() {
    this.demoBasic1.show();

    setTimeout(() => {
      this.demoBasic1.hide();
    }, 6000);
  }

  public profileData ;
  public profileId ;
  public currentUserid;
  firstname = "";
  lastname = "";
  bio = "";
  isCompleted = false;
  isBookmark = false;
  public sameUser = false;
  public coursedata;
  public bid;
  public completedata;
  public bookmarks= [0];
  public complete=[0];
  public uid;
  public tem;
  public carouselTileItems$: Observable<number[]>;
  public carouselTileItems1$: Observable<number[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 3, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: { timing: 15000 },
    
  };
  tempData: any[];
  tempData1: any[];

  constructor(private messageservice: MessageService,private courseService: CourseDetailService ,private afauth:AngularFireAuth, private userService : UserServiceService,private route: ActivatedRoute, private profileService: ProfileService, private router: Router) { 
    this.afauth.authState.subscribe(
      res => {
        this.currentUserid= res;
        this.uid = res.uid;
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
  carousel(){
    this.tempData1 = [];

    this.carouselTileItems1$ = interval(20).pipe(
      startWith(-1),
      take(this.coursedata.length),
      map(val => {
        const data = (this.tempData1 = [
          ...this.tempData1,
          this.coursedata[val + 1]
        ]);
        return data;

      })
    );
    if(this.bookmarks[0] != 0){
    this.isBookmark = true;}
  }

  completeCarousel(){
    this.tempData = [];

     this.carouselTileItems$ = interval(20).pipe(
      startWith(-1),
      take(this.completedata.length),
      map(val => {
        const data = (this.tempData = [
          ...this.tempData,
          this.completedata[val + 1]
        ]);
        return data;

      })
    );
    if(this.complete[0] != 0){
      this.isCompleted = true;}
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
      this.showAndHideModal1();
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
    console.log(data);
    this.firstname = this.profileData.firstname;
    this.lastname = this.profileData.lastname;
    this.bio = this.profileData.bio;
    var count =0;
    var count1=0;
    for(var i=0; i< this.profileData.bookmarks.length; i++ )
    {
      if(count==0 && this.profileData.bookmarks[i].courseid != null && this.profileData.bookmarks[i].status != 1){
        this.bookmarks[0] =(this.profileData.bookmarks[i].courseid);
        count++;
      }
      if(count>0 && this.profileData.bookmarks[i].courseid != null && this.profileData.bookmarks[i].status != 1){
        this.bookmarks.push(this.profileData.bookmarks[i].courseid);
      }
    }
    for(var j=0; j< this.profileData.bookmarks.length; j++ )
    {
      if(count1==0 && this.profileData.bookmarks[j].courseid != null && this.profileData.bookmarks[j].status == 1){
        this.complete[0] =(this.profileData.bookmarks[j].courseid);
        count1++;
      }
      if(count1>0 && this.profileData.bookmarks[j].courseid != null && this.profileData.bookmarks[j].status == 1){
        this.complete.push(this.profileData.bookmarks[j].courseid);
      }
    }
    this.getBookmarks(this.bookmarks);
    this.getComplete(this.complete);
    console.log(this.bookmarks);
    console.log(this.complete);
    console.log(data);
    });
  }

  getBookmarks(bookmarks){
    this.courseService.getCourseById(bookmarks).subscribe((data)=>{
      this.coursedata = data;
      console.log(this.coursedata);
      this.carousel();
    })
  }
  getComplete(bookmarks){
    this.courseService.getCourseById(bookmarks).subscribe((data)=>{
      this.completedata = data;
      console.log(this.completedata);
      this.completeCarousel();
    })
  }
  sendCourse(cid){
    this.router.navigate(['/course-detail'], { queryParams: { courseid: cid } });
  }  

  removeBookmark(item){
    this.userService.removeBookmark(item.course_id,this.uid).subscribe(
      res =>{
        this.tem = res;
        if(this.tem.status == "ERROR"){
          alert("Bookmark Not Removed");
        }
        if(this.tem.status == "DELETED"){
          alert("Bookmark is Removed");
          location.reload();
        }
      }
    );
  }

  onComplete(course){
    for(var i=0;i<this.profileData.bookmarks.length;i++){
      if(this.profileData.bookmarks[i].courseid == course.course_id){
        this.bid = this.profileData.bookmarks[i].bid;
        break;
      }
    }
    this.courseService.courseComplete({
      bid: this.bid,
      status: 1
    }).subscribe(data=>{},
      err =>{
        console.log(err);
        if(err.error.text =='Updated'){
          alert("Course added to completd row");
          location.reload();
        }
      })
  }

  
}
