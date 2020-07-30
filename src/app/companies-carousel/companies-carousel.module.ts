import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { CompaniesCarouselComponent } from './companies-carousel.component';

@NgModule({
  declarations: [CompaniesCarouselComponent],
  imports: [
    CommonModule,
    NguCarouselModule
  ]
})
export class TileModule { }