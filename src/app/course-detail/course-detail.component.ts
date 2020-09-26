import { Component, OnInit, AfterViewChecked, ViewChild } from '@angular/core';
import { CourseDetailService } from '../services/course-detail.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { AngularFireAuth } from "@angular/fire/auth";
import { ActivatedRoute } from '@angular/router';
import { MessageService } from '../services/message.service';
import { MatDialog } from '@angular/material/dialog';
import { LoginComponent } from '../login/login.component';
import { EmailVerificationComponent } from '../email-verification/email-verification.component';
import { SeacrhServiceService } from '../services/seacrh-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserServiceService} from '../services/user-service.service';

@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {
  @ViewChild('basicModal1', { static: true }) demoBasic1: ModalDirective;
  @ViewChild('basicModal2', { static: true }) demoBasic2: ModalDirective;
  @ViewChild('basicModal3', { static: true }) demoBasic3: ModalDirective;
  @ViewChild('basicModal4', { static: true }) demoBasic4: ModalDirective;
  @ViewChild('basicModal5', { static: true }) demoBasic5: ModalDirective;
  @ViewChild('basicModal6', { static: true }) demoBasic6: ModalDirective;
  showAndHideModal() {
    this.demoBasic1.show();

    setTimeout(() => {
      this.demoBasic1.hide();
    }, 6000);
  }
  showAndHideModal1() {
    this.demoBasic2.show();

    setTimeout(() => {
      this.demoBasic2.hide();
    }, 6000);
  }
  showAndHideModal2() {
    this.demoBasic3.show();

    setTimeout(() => {
      this.demoBasic3.hide();
    }, 6000);
  }
  showAndHideModal3() {
    this.demoBasic4.show();

    setTimeout(() => {
      this.demoBasic4.hide();
    }, 6000);
  }
  showAndHideModal4() {
    this.demoBasic5.show();

    setTimeout(() => {
      this.demoBasic5.hide();
    }, 6000);
  }
  showAndHideModal5() {
    this.demoBasic6.show();

    setTimeout(() => {
      this.demoBasic6.hide();
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
  maxrid = 0;
  userProfile;
  userName;
  subdomain;
  total = 0;
  bookmark;
  isBookmark = false;
  isComplete = false;
  userData;
  res;
  isPost = false;
  professor: Array<{ name: String, ins: String, desc: String }>;
  count = 0;
  constructor(private userService: UserServiceService,private snackBar: MatSnackBar, private searchService: SeacrhServiceService, private dialog: MatDialog, private courseService: CourseDetailService, private route: ActivatedRoute, private afauth: AngularFireAuth, private messageService: MessageService) {
    this.afauth.authState.subscribe(
      res => {
        this.userId = res.uid;
        this.userData = res;
        this.userService.profileInformation(this.userId).subscribe(res => {
          this.userProfile = res;
          this.bookmark = this.userProfile.bookmarks.find(({ courseid }) => courseid === this.courseId);
          this.isBookmark= this.bookmark;
          if(this.isBookmark){
            if(this.bookmark.status == 1){
                this.isComplete = true;
            }
          }
          console.log(res);
          console.log(this.bookmark);
        })
      });
  }
  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.courseId = { ...params };
      this.courseId = this.courseId.params.cid;
    })
    this.courseService.getCourseById([this.courseId]).subscribe((data) => {
      console.log(data);
      this.course = data[0];
      this.isCourse = this.course.course_id;
      this.domain = this.course.course_field.split(', ');
      this.subdomain = this.course.course_subfield.split(', ');
      this.courseDomain = this.domain.concat(this.subdomain);
      console.log(this.courseDomain)
      console.log(data);
    })
    this.courseService.getReviewById(this.courseId).subscribe((data) => {
      console.log(data);
      this.reviews = data;
      this.reviewNo = this.reviews.length;
      this.total = 0;
      console.log(this.userId);
      for (var i = 0; i < this.reviewNo; i++) {
        this.total += this.reviews[i].rating;
        this.reviews[i].rdate = Date.parse(this.reviews[i].rdate);
        console.log(this.reviews[i].rdate);
        if(this.maxrid < this.reviews[i].rid){
          this.maxrid = this.reviews[i].rid;
        }
      }
      console.log(this.maxrid);
      this.averageReview = this.total / this.reviewNo;
      this.reviewTime();
    })


  }
  ngDoCheck(): void {
    if (this.count == 0) {
      if (this.userId && this.reviewNo) {
        this.isReview = this.reviews.find(({ id }) => id === this.userId);
        this.userReview = this.isReview.review;
        this.currentRate = this.isReview.rating;
        this.count++;
      }
    }
  }
  lowestRating() {
    this.reviews.sort(function (a, b) { return a.rating - b.rating });
  }
  reviewTime() {
    let curDate = Date.now();
    for (var i = 0; i < this.reviewNo; i++) {
      this.reviews[i].rdate = curDate - this.reviews[i].rdate;
      this.reviews[i].rdate = this.timeConversion(this.reviews[i].rdate);
    }
  }
  highestRating() {
    this.reviews.sort(function (a, b) { return b.rating - a.rating });
  }
  latestDate() {
    this.reviews.sort(function (a, b) { return b.rid - a.rid });
  }

  timeConversion(millisec) {

    var seconds = (millisec / 1000);

    var minutes = (millisec / (1000 * 60));

    var hours = (millisec / (1000 * 60 * 60));

    var days = (millisec / (1000 * 60 * 60 * 24));
    if (seconds < 60) {
      if (seconds < 2)
        return Math.trunc(seconds) + " second ago";
      return Math.trunc(seconds) + " seconds ago";
    } else if (minutes < 60) {
      if (minutes < 2)
        return Math.trunc(minutes) + " min ago";
      return Math.trunc(minutes) + " mins ago";
    } else if (hours < 24) {
      if (hours < 2)
        return Math.trunc(hours) + " hour ago";
      return Math.trunc(hours) + " hours ago";
    } else {
      if (days < 2)
        return Math.trunc(days) + " day ago";
      return Math.trunc(days) + " days ago";
    }
  }

  onPost(data) {
    if (this.userId) {
      if (this.currentRate < 1) {
        alert("Please rate this course.")
      }
      else {
        this.courseService.writeCourseReview(
          {
            courseid: this.courseId,
            review: data.review,
            rating: this.currentRate,
            userid: {
              uid: this.userId
            }
          }
        ).subscribe(res=>{
          this.userService.profileInformation(this.userId).subscribe(res=>
            {
              this.userName = res;
              this.userName = this.userName.firstname + " " +this.userName.lastname;
              this.maxrid++;
              this.reviewNo++;
              this.isReview = true;
              this.total = this.total+this.currentRate;
              this.averageReview = this.total/this.reviewNo;
              this.isPost = true;
              this.showAndHideModal1();
          this.reviews.push(
            {
              rid : this.maxrid,
              courseid : this.courseId,
              review: data.review,
              rating: this.currentRate,
              id: this.userId,
              name: this.userName,
              rdate: "Just Now",
              edited: false
            }
          )
            })
          
        });
      }
    }
    else {
      const dialogRef = this.dialog.open(LoginComponent, {
        height: '520px',
        minWidth: '411px',
        position: {
          top: '15vh',
        },
       
      }
      );
    }
  }

  onEdit(data) {
    if(this.isPost){
      alert("Please refresh the page to edit the review");
    }
    else{
    this.courseService.updateReview(
      {
        rid: this.isReview.rid,
        review: this.userReview,
        rating: this.currentRate
      }
    ).subscribe((res) => {
      this.showAndHideModal2();
      this.total =0;
      for(var j=0; j< this.reviewNo; j++){
        if(this.reviews[j].rid == this.isReview.rid){
          this.reviews[j].rating = this.currentRate;
          this.reviews[j].review = this.userReview;
          this.reviews[j].edited = true;
        }
        this.total += this.reviews[j].rating;
      }
      this.averageReview = this.total / this.reviewNo;
    });}
  }
  comparator() {
    console.log();
    this.messageService.addToCompare(this.course);
  }

  bookmarkCourse() {
    if (this.userId) {
      if (this.userData.emailVerified) {
        this.showAndHideModal3();
        this.searchService.bookMarkcourse(
          {
            courseid: this.courseId,
            status: 0,
            percentage: 0,
            userid: {
              uid: this.userId
            }
          }
        ).subscribe(data => {
          this.isBookmark= true;
          location.reload();
        }, err => {
          if (err = 'success') {
            this.showAndHideModal3();
            this.isBookmark = true;
            location.reload();
          }
        })
      } else {
        const dialogRef1 = this.dialog.open(EmailVerificationComponent, {
          height: '520px',
          minWidth: '411px',
          position: {
            top: '15vh',
          },

        }
        );
        this.userData.sendEmailVerification().then(result => {
          dialogRef1.close();
        },
          err => {
            console.log('not verified')
          })
      }
    }
    else {
      const dialogRef = this.dialog.open(LoginComponent, {
        height: '520px',
        minWidth: '411px',
        position: {
          top: '15vh',
        },
        disableClose: true
      }
      );
    }
  }

  completeCourse(){
    if (this.userId) {
      if (this.userData.emailVerified) {
        this.showAndHideModal4();
        if(!this.isBookmark){
        this.searchService.bookMarkcourse(
          {
            courseid: this.courseId,
            status: 1,
            percentage: 0,
            userid: {
              uid: this.userId
            }
          }
        ).subscribe(data => {
          this.isComplete= true;
          this.isBookmark= true;
          location.reload();
        }, err => {
          if (err = 'success') {
            this.showAndHideModal4();
            this.isComplete = true;
            this.isBookmark= true;
            location.reload();
          }
        })}
        else{
          this.courseService.courseComplete(
            {
              bid: this.bookmark.bid,
              status: 1
            }
          ).subscribe(
            res =>{
              console.log(res);
              this.isComplete = true;
            },
            err =>{
              if(err = 'Updated'){
                this.isComplete = true;
              }
            }
          )
        }
      } else {
        const dialogRef1 = this.dialog.open(EmailVerificationComponent, {
          height: '520px',
          minWidth: '411px',
          position: {
            top: '15vh',
          },

        }
        );
        this.userData.sendEmailVerification().then(result => {
          dialogRef1.close();
        },
          err => {
            console.log('not verified')
          })
      }
    }
    else {
      const dialogRef = this.dialog.open(LoginComponent, {
        height: '520px',
        minWidth: '411px',
        position: {
          top: '15vh',
        }
       
      }
      );
    }
  }

  removeBookmark(){
    this.userService.removeBookmark(this.courseId,this.userId).subscribe(
      res =>{
        this.res = res;
        console.log(this.res);
        if(this.res.status=='DELETED'){
          alert('Bookmark Removed');
          this.isBookmark = false;
          this.isComplete = false;
        }
        if(this.res.status=='ERROR'){
          alert('Bookmark not removed');
        }
      }
    );
  }

  removeComplete(){
    this.courseService.courseComplete(
      {
        bid: this.bookmark.bid,
        status: 0
      }
    ).subscribe(res =>{

    }
    ,err =>{
      if(err='Updated'){
        alert("Your course has been removed from completed.");
        this.isComplete = false;
      }
    })
  }
}

