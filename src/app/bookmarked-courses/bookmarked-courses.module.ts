import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { BookmarkedCoursesComponent } from './bookmarked-courses.component';

@NgModule({
  declarations: [BookmarkedCoursesComponent],
  imports: [
    CommonModule,
    NguCarouselModule
  ]
})
export class TileModule { }