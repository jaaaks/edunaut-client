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

  images = ['assets/homepage/coursera.png', 'assets/homepage/edx.png', 'assets/homepage/future-learn.png',
    'assets/homepage/the-great-courses.png', 'assets/homepage/pluralsight.png', 'assets/homepage/udemy.png', 'assets/homepage/open-learning1.png',
    'assets/homepage/udacity1.png', 'assets/homepage/skillshare4.png',  'assets/homepage/coggno.png', 'assets/homepage/lynda1.png',
    'assets/homepage/unlocked.jpg','assets/homepage/tuts+.png', 'assets/homepage/alison.png', 'assets/homepage/simplilearn.png', 'assets/homepage/openuniversity.png',
    'assets/homepage/kadenze.png', 'assets/homepage/mit.jpeg', 'assets/homepage/harvard.png', 'assets/homepage/treehouse.png', 'assets/homepage/open yale.png', 'assets/homepage/nptel.png',
    'assets/homepage/swayam.jpeg', 'assets/homepage/upgrad.png'];
    public courseprovider=[  
      'Coursera',
    'edX',
    'Future Learn',
    'The Great Courses',
    'Plural Sight',
    'Udemy',
    'Open Learning',
    'Udacity',
    'Skillshare',
    'Coggno',
    'Linked Learning',
    'Google Unlocked',
    'tuts+',
      'Alison',
  'Simplilearn',
  'Open university',
  'Kadenze',
   'MIT OCW',
   'HarvardX',
   'Treehouse',
   'Yale OCW',
 
  'NPTEL',
  'Swayam',
  'upGrad',
  'Canvas Network',
  'Datacamp',
 ];

  public carouselTileItems$: Observable<number[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 3, sm: 5, md: 6, lg: 9, all: 0 },
    speed: 250,
    point: {
      visible: true
    },
    touch: true,
    loop: true,
    interval: { timing: 15000 },

  };
  tempData: any[];

  constructor() { }

  ngOnInit() {
    this.tempData = [];

    this.carouselTileItems$ = interval(20).pipe(
      startWith(-1),
      take(this.images.length),
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
