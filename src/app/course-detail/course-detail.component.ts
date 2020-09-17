import { Component, OnInit,AfterViewChecked,ViewChild } from '@angular/core';
import { CourseDetailService } from '../services/course-detail.service';
import {ModalDirective} from 'angular-bootstrap-md';
import { AngularFireAuth } from "@angular/fire/auth";
import {ActivatedRoute} from '@angular/router';
import {MessageService} from '../services/message.service';
import {HttpParams} from '@angular/common/http';
import * as $ from 'jquery';
import { textChangeRangeIsUnchanged } from 'typescript';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  @ViewChild('basicModal1', { static: true }) demoBasic: ModalDirective;
  showAndHideModal() {
    this.demoBasic.show();

    setTimeout(() => {
      this.demoBasic.hide();
    }, 6000);
  }
  currentRate = 0;
  hovered = 0;
  current = false;
  show = false;
  courseId;
  course;
  isCourse;
  userId = "";
  reviews ;
  reviewNo;
  averageReview;
  isReview;
  userReview;
  courseDomain;
  domain;
  subdomain;
  count = 0;
  constructor(private courseService: CourseDetailService, private route: ActivatedRoute, private afauth:AngularFireAuth, private messageService:MessageService) { 
    this.afauth.authState.subscribe(
      res => {
        this.userId= res.uid;   
        
      });
}
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params)=>{
      this.courseId={...params};
      this.courseId = this.courseId.params.cid;
    })
    this.courseService.getCourseById([this.courseId]).subscribe((data)=>{
      
      this.course = data[0];
      this.isCourse = this.course.course_id;
      this.domain = this.course.course_field.split(', ');
      this.subdomain = this.course.course_subfield.split(', ');
      this.courseDomain = this.domain.concat(this.subdomain);
      console.log(this.courseDomain)
      console.log(data);
      })
    this.courseService.getReviewById(this.courseId).subscribe((data)=>{
      console.log(data);
      this.reviews = data;
      this.reviewNo = this.reviews.length;
      var total = 0;
      console.log(this.userId);
      for(var i = 0; i < this.reviewNo; i++) {
        total += this.reviews[i].rating;
        this.reviews[i].rdate= Date.parse(this.reviews[i].rdate);
        console.log(this.reviews[i].rdate);
    }
    this.averageReview = total/this.reviewNo; 
    this.reviewTime();
    })
    
    
  }
  ngDoCheck(): void{
    if(this.count ==0){if(this.userId && this.reviews.length){
    this.isReview = this.reviews.find(({id}) => id === this.userId);
    this.userReview = this.isReview.review;
    this.currentRate = this.isReview.rating;
    this.count++;
  }}
  }
  lowestRating(){
    this.reviews.sort(function(a,b){return a.rating - b.rating});
  }
  reviewTime(){
    let curDate = Date.now();
    for(var i = 0; i < this.reviewNo; i++){
      this.reviews[i].rdate = curDate - this.reviews[i].rdate;
      this.reviews[i].rdate = this.timeConversion(this.reviews[i].rdate);
    }
  }
  highestRating(){
    this.reviews.sort(function(a,b){return b.rating - a.rating});
  }
  latestDate(){
    this.reviews.sort(function(a,b){return b.rid - a.rid});
  }

  timeConversion(millisec) {

    var seconds = (millisec / 1000);

    var minutes = (millisec / (1000 * 60));

    var hours = (millisec / (1000 * 60 * 60));

    var days = (millisec / (1000 * 60 * 60 * 24));
    if (seconds < 60) {
      if(seconds<2)
        return   Math.trunc(seconds) + " second";
        return Math.trunc(seconds) + " seconds";
    } else if (minutes < 60) {
      if(minutes<2)
        return   Math.trunc(minutes) + " min";
        return  Math.trunc(minutes) + " mins";
    } else if (hours < 24) {
      if(hours<2)
        return   Math.trunc(hours) + " hour";
        return Math.trunc(hours) + " hours";
    } else {
      if(days<2)
        return   Math.trunc(days) + " day";
      return Math.trunc(days) + " days";
    }
}

  onPost(data){
    if(this.userId){
      if(this.currentRate<1){
        alert("Please rate this course.")
      }
      else{
    this.courseService.writeCourseReview(
      {
        courseid:this.courseId,
        review:data.review,
        rating:this.currentRate,
        userid:{
            uid: this.userId
        }
      }
    );}}
    else{
      alert("Please log in to give your review");
    }
  }

  onEdit(data){
    this.courseService.updateReview(
      {
        rid: this.isReview.rid,
        review: this.userReview,
        rating: this.currentRate
      }
    ).subscribe((res)=>{
      location.reload();
    });
  }
  comparator(){
    console.log();
   this.messageService.addToCompare(this.course);
  }
 
}

