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
  selector: 'app-team',
  templateUrl: './team.component.html',
  styleUrls: ['./team.component.scss'],
  animations: [slider],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TeamComponent implements OnInit {

 information: Array<{name: String, hobbies: String, designation: String, images: String, link: String}> = Array(
 {name: 'Anirudh Gupta', hobbies:'Loves playing Badminton and E-sports', designation: 'Revenue',images: 'assets/aboutus/Anirudh.jpg',link: 'https://www.linkedin.com/in/guptaanirudh'},
 {name: 'Anshul Kumar', hobbies:'Likes to play Sports and Cooking', designation:'Tech', images: 'assets/aboutus/Anshul.jpg', link: 'https://www.linkedin.com/in/anshul-kumar007'},
 {name: 'Anupriya Gupta', hobbies: 'Loves reading Fiction and playing Ukulele',designation:'Experience',images:'assets/aboutus/Anupriya.jpg', link: 'https://in.linkedin.com/in/anupriya0028'},
 {name: 'Harsh Sinha', hobbies: 'Likes playing Sports and do Gaming',designation:'Tech',images:'assets/aboutus/Harsh.jpg', link: 'https://www.linkedin.com/in/harsh4723/'},
 {name: 'Itti Joseph', hobbies: 'Likes to play Piano and Reading',designation:'Experience',images:'assets/aboutus/Itti.jpg', link: 'https://in.linkedin.com/in/itti-joseph-9987a9179'},
 {name: 'Pragnya Ramjee', hobbies: 'Loves doing cryptic crosswords and climbing trees',designation:'Content',images:'assets/aboutus/Pragnya.jpg', link: 'https://www.linkedin.com/in/pragnyaramjee/'},
 {name: 'Prakhar Kothari', hobbies: 'Loves Playing Ukulele and Reading',designation:'Experience',images:'assets/aboutus/Prakhar.jpg', link: 'https://www.linkedin.com/in/prakhar-kothari-5b971217a/'},
 {name: 'Priyanshu Kumar Sinha', hobbies: 'Loves Playing Cricket and Guitar',designation:'Tech',images:'assets/aboutus/Priyanshu.jpg', link: 'https://www.linkedin.com/in/pks53'},
 {name: 'Sangeet Chandaliya', hobbies: 'Loves Playing Chess and Sudoku',designation:'Content',images:'assets/aboutus/Sangeet.jpg', link: 'https://www.linkedin.com/in/sang-chan/'},
 {name: 'Saurav Kumar', hobbies: 'Likes Driving and playing Badminton',designation:'Tech',images:'assets/aboutus/Saurav.jpg', link: 'https://www.linkedin.com/in/kumar-saurav305'},
 {name: 'Shambhavi Das', hobbies: 'Loves Reading and making  different Art',designation:'Marketing',images:'assets/aboutus/Shambhavi.jpg', link: 'https://www.linkedin.com/in/shambhavi-das/'},
 {name: 'Vishak Regu', hobbies: 'Loves Reading and watching Sports',designation:'Marketing',images:'assets/aboutus/Vishak.jpg', link: 'https://www.linkedin.com/in/vishakr'},
 {name: 'Vishwaprasanna H', hobbies: 'Loves playing Mridangam and Volleyball',designation:'Experience',images:'assets/aboutus/Vishwaprasanna.jpg', link: 'https://www.linkedin.com/in/vishwaprasanna'},
 );

  public carouselTileItems$: Observable<number[]>;
  public carouselTileConfig: NguCarouselConfig = {
    grid: { xs: 1, sm: 2, md: 3, lg: 4, all: 0 },
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
      take(this.information.length),
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
