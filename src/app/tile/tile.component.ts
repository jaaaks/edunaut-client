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

  information: Array<{name: String, images: String}> = Array(
    {name: 'Arts', images:'assets/homepage/Arts.png' },
    {name: 'CS', images:'assets/homepage/CS.png' },
    {name: 'Data Science', images:'assets/homepage/Data Science 3.png' },
    {name: 'Health', images:'assets/homepage/Health.png' },
    {name: 'IT', images:'assets/homepage/IT.png' },
    {name: 'Language', images:'assets/homepage/Language.png' },
    {name: 'Maths', images:'assets/homepage/Math.png' },
    {name: 'PD', images:'assets/homepage/Personal develpment.png' },
    {name: 'Science', images:'assets/homepage/Science.png' },
    {name: 'Social Science', images:'assets/homepage/social science.png' },
  )
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
      take(10),
      map(val => {
        const data = (this.tempData = [
          ...this.tempData,
          this.information[val + 1]
        ]);
        return data;
      })
    );
  }

}

