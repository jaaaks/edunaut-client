import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { CompletedCoursesComponent } from './completed-courses.component';

@NgModule({
  declarations: [CompletedCoursesComponent],
  imports: [
    CommonModule,
    NguCarouselModule
  ]
})
export class TileModule { }