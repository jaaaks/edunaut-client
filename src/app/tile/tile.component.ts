import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { interval, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { slider } from './slide-animation';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TileComponent implements OnInit {

  images = ['assets/bg.jpg', 'assets/car.png', 'assets/canberra.jpg', 'assets/holi.jpg', 'assets/udemy.png', 'assets/bg.jpg', 'assets/car.png', 'assets/canberra.jpg', 'assets/holi.jpg', 'assets/udemy.png'];

  public carouselTileItems$: Observable<number[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 2, sm: 2, md: 4, lg: 5, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: { timing: 15000 },
    animation: 'lazy'
  };
  tempData: any[];

  constructor() { }

  ngOnInit() {
    this.tempData = [];

    this.carouselTileItems$ = interval(20).pipe(
      startWith(-1),
      take(10),
      map(val => {
        const data = (this.tempData = [
          ...this.tempData,
          this.images[val + 1]
        ]);
        return data;
      })
    );
  }

}

