import { Component, OnInit,OnDestroy, ViewChild } from '@angular/core';
import { MessageService } from '../services/message.service';
import {ModalDirective} from 'angular-bootstrap-md';
import{Subscription} from 'rxjs';
import * as $ from 'jquery';
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
  currentRate1 = 4.4;
  current = false;
  show = false;
  subscription : Subscription;
  course;
  reviews: Array<{name: String, designation: String, rating: Number, desc: String, upvotes: Number}> = Array(
    {name: 'Anshul Kumar', designation: "Student, IIT Guwahati", rating: 3,desc: "This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.", upvotes: 100},
    {name: 'John Doe', designation: "Professor, Stanford University", rating: 4,desc: "This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.", upvotes: 100},
    {name: 'John Doe', designation: "Professor, Stanford University", rating: 4,desc: "This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.", upvotes: 100},
    {name: 'John Doe', designation: "Professor, Stanford University", rating: 4,desc: "This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.", upvotes: 100},
    {name: 'John Doe', designation: "Professor, Stanford University", rating: 4,desc: "This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.This course is one of the best course i have taken. The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested.", upvotes: 100},
  )
  constructor(private messageService: MessageService) { 
   this.subscription =  this.messageService.getCourseDetail().subscribe(message => {
      this.course = message.text;
      console.log(message.text);
  })
}
  ngOnInit(): void {
    $(".tog").click(function(){
      $(".tog").hide();
    });
  }

  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}

