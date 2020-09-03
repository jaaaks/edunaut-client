import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
@Component({
  selector: 'app-course-detail',
  templateUrl: './course-detail.component.html',
  styleUrls: ['./course-detail.component.scss']
})
export class CourseDetailComponent implements OnInit {

  show = false;
  constructor() { }

  ngOnInit(): void {
    $(".tog").click(function(){
      $(".tog").hide();
    });
  }

}

