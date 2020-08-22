import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { OngoingCoursesComponent } from './ongoing-courses.component';

@NgModule({
  declarations: [OngoingCoursesComponent],
  imports: [
    CommonModule,
    NguCarouselModule
  ]
})
export class TileModule { }