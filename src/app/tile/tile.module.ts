import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NguCarouselModule } from '@ngu/carousel';

import { TileComponent } from './tile.component';

@NgModule({
  declarations: [TileComponent],
  imports: [
    CommonModule,
    NguCarouselModule
  ]
})
export class TileModule { }