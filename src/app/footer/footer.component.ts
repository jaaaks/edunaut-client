import { Component, OnInit } from '@angular/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { WavesModule, TableModule } from 'angular-bootstrap-md';
import { MessageService } from '../services/message.service';
import { CommonModule } from "@angular/common";
import { ProfileService } from '../services/profile.service'
import { AngularFireAuth } from '@angular/fire/auth';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { BottomSheetComponent } from '../bottom-sheet/bottom-sheet.component';


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  panelOpenState = false;
  isCompare = false;
  currentRate = 0;
  elements: any = [
    { id: 'Course Rating', first: 'Mark', second: 'Otto', third: '@mdo' },
    { id: 'University/Course Creator', first: 'Jacob', second: 'Thornton', third: '@fat' },
    { id: 'Certificate', first: 'Larry', second: 'the Bird', handle: '@twitter' },
    { id: 'Fee', first: 'Larry', second: 'the Bird', handle: '@twitter' },
    { id: 'Course Provider', first: 'Larry', second: 'the Bird', handle: '@twitter' },
    { id: 'Level of Difficulty', first: 'Larry', second: 'the Bird', handle: '@twitter' }
    // {id: 'Pre- requisites', first: 'Larry', second: 'the Bird', handle: '@twitter'}
  ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
  public userData: any;
  public user: any;
  isLoggedIn: boolean = false;
  constructor(private messageService: MessageService, private pfs: ProfileService, private afauth: AngularFireAuth, private bottomShet: MatBottomSheet) { }
  public courseList = [];
  ngOnInit(): void {
    this.messageService.getCourses().subscribe(data => {
      if (this.courseList.length === 4) {
        return;
      }
      var filteredCourse = this.courseList.filter(course => {
        return course.course_id === data.course_id;
      })
      if (filteredCourse.length === 0) {
        this.courseList.push(data);
      }
      if (this.courseList.length === 4) {
      this.panelOpenState=true;
      }
    })

    this.afauth.authState.subscribe(
      res => {
        if (res && res.uid) {
          console.log('user is logged in');
          this.isLoggedIn = true;
          this.userData = res;
          this.pfs.getProfile(res.uid).subscribe(data => {
            this.user = data;

          })
        } else {
          this.isLoggedIn = false;

        }
      },
      err => {
        this.isLoggedIn = false;
      });
  }
  open() {
    this.panelOpenState = !this.panelOpenState;
    this.isCompare = false;
  }
  close() {
    this.panelOpenState = !this.panelOpenState;
    this.isCompare = false;
  }
  compare() {
    this.isCompare = true;
    for (var i = 0; i < this.courseList.length; i++) {
      this.elements[i].rating = this.courseList[i].course_rating;
    }
  }
  showRating(i) {
    if (i === 0) {
      return true;
    }
    else {
      return false;
    }
  }
  showRating2(i) {
    if (i === 0) {
      return true;
    }
    else {
      return false;
    }
  }
  changeTextMethod(course) {
    course.change = true;
  }
  changeTextOutMethod(course) {
    course.change = false;
  }
  removeCourse(i) {
    this.courseList.splice(i, 1);
  }
  bookmarkAllowed() {
    var result = this.courseList.length > 1 ? false : true;
    return result;
  }
  clearAll() {
    this.courseList.splice(0, this.courseList.length);
  }

}
