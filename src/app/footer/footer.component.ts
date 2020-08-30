import { Component, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { WavesModule, TableModule } from 'angular-bootstrap-md';
import { MessageService } from '../services/message.service';
import { CommonModule } from "@angular/common";


@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  panelOpenState = false;
  isCompare =false;
  currentRate=0;
  elements: any = [
    {id: 'Course Rating', first: 'Mark', second: 'Otto', third: '@mdo'},
    {id: 'University/Course Creator', first: 'Jacob', second: 'Thornton', third: '@fat'},
    {id: 'Certificate', first: 'Larry', second: 'the Bird', handle: '@twitter'},
    {id: 'Fee', first: 'Larry', second: 'the Bird', handle: '@twitter'},
    {id: 'Course Provider', first: 'Larry', second: 'the Bird', handle: '@twitter'},
    {id: 'Level of Difficulty', first: 'Larry', second: 'the Bird', handle: '@twitter'},
    {id: 'Pre- requisites', first: 'Larry', second: 'the Bird', handle: '@twitter'}
 ];

  headElements = ['ID', 'First', 'Last', 'Handle'];
  constructor(private messageService:MessageService) { }
   public courseList=[];
  ngOnInit(): void {
    this.messageService.getCourses().subscribe(data=>{
       this.courseList.push(data);
       if(this.courseList.length==1){
         this.elements[0].first = data.course_rating;
         this.elements[1].first = data.course_university;
         this.elements[2].first = data.course_fee;
         this.elements[3].first = data.course_provider;
       }
       if(this.courseList.length==2){
        this.elements[0].second = data.course_rating;
        this.elements[1].second = data.course_university;
        this.elements[2].second = data.course_fee;
        this.elements[3].second = data.course_provider;
      }
      this.panelOpenState=true;
    })
  }
  open(){
    this.panelOpenState= !this.panelOpenState;
    this.isCompare=false;
  }
  close(){
    this.panelOpenState= !this.panelOpenState;
    this.isCompare=false;
  }
  compare (){
  this.isCompare=true;
   for(var i=0;i<this.courseList.length;i++){
     this.elements[i].rating= this.courseList[i].course_rating;
   }
  }
  showRating(i){
   if(i===0){
     return true;
   }
   else {
     return false;
   }
  }
  showRating2(i){
    if(i===0){
      return true;
    }
    else {
      return false;
    }
   }
   changeTextMethod(course){
     course.change=true;
   }
   changeTextOutMethod(course){
     course.change=false;
   }
   removeCourse(i){
     this.courseList.splice(i,1);
   }
   bookmarkAllowed(){
     var result= this.courseList.length>1? false:true;
     return result;
   }
   clearAll(){
    this.courseList.splice(0,this.courseList.length);
 }
}
