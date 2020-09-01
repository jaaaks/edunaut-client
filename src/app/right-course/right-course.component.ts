import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-right-course',
  templateUrl: './right-course.component.html',
  styleUrls: ['./right-course.component.scss']
})
export class RightCourseComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;
  fourthFormGroup: FormGroup;
  checked= true;
  indeterminate: false;

  constructor(private _formBuilder: FormBuilder) {}

  ngOnInit() {
   
  }
}
