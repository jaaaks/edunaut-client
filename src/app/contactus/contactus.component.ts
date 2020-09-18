import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import {CourseDetailService} from '../services/course-detail.service';
@Component({
  selector: 'app-contactus',
  templateUrl: './contactus.component.html',
  styleUrls: ['./contactus.component.scss']
})
export class ContactusComponent implements OnInit {
  name;
  email;
  subject;
  message;
  constructor(private service: CourseDetailService) { }

  ngOnInit(): void {
  }
  sendMail(){
    console.log("called");
    this.service.contactUS({
      name: "Anshul",
      email: "war@gmail.com",
      subject: "Testing from client side",
      message: "Just Do it"
    })
  }
}
