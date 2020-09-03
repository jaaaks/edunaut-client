import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { ComicComponent } from './comic.component';

@NgModule({
  declarations: [ComicComponent],
  imports: [
    CommonModule,
    NguCarouselModule
  ]
})
export class TileModule { }