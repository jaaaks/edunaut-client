import {
  ChangeDetectionStrategy,
  Component,
  OnInit
} from '@angular/core';
import { NguCarouselConfig } from '@ngu/carousel';
import { interval, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { slider } from '../tile/slide-animation';

@Component({
  selector: 'app-companies-carousel',
  templateUrl: './companies-carousel.component.html',
  styleUrls: ['./companies-carousel.component.scss'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CompaniesCarouselComponent implements OnInit {

  images = ['assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png', 'assets/udemy.png'];

  public carouselTileItems$: Observable<number[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 3, sm: 4, md: 6, lg: 9, all: 0 },
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
      take(15),
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
