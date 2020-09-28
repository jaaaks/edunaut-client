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
  
 {name: 'Anirudh Gupta', hobbies:'Loves playing Badminton and E-sports', designation: 'Revenue',images: 'assets/aboutus/Anirudh.png',link: 'https://www.linkedin.com/in/guptaanirudh'},
 {name: 'Anshul Kumar', hobbies:'Likes to play Sports and Cooking', designation:'Tech', images: 'assets/aboutus/Anshul.png', link: 'https://www.linkedin.com/in/anshul-kumar007'},
 {name: 'Anupriya Gupta', hobbies: 'Loves reading Fiction and playing Ukulele',designation:'Experience',images:'assets/aboutus/Anupriya.png', link: 'https://in.linkedin.com/in/anupriya0028'},
 {name: 'Harsh Sinha', hobbies: 'Likes playing Sports and do Gaming',designation:'Tech',images:'assets/aboutus/Harsh.png', link: 'https://www.linkedin.com/in/harsh4723/'},
 {name: 'Itti Joseph', hobbies: 'Likes to play Piano and Reading',designation:'Experience',images:'assets/aboutus/Itti.png', link: 'https://in.linkedin.com/in/itti-joseph-9987a9179'},
 {name: 'Pragnya Ramjee', hobbies: 'Loves doing cryptic crosswords and climbing trees',designation:'Content',images:'assets/aboutus/Pragnya.png', link: 'https://www.linkedin.com/in/pragnyaramjee/'},
 {name: 'Prakhar Kothari', hobbies: 'Loves Playing Ukulele and Reading',designation:'Experience',images:'assets/aboutus/Prakhar.png', link: 'https://www.linkedin.com/in/prakhar-kothari-5b971217a/'},
 {name: 'Priyanshu Kumar Sinha', hobbies: 'Loves Playing Cricket and Guitar',designation:'Tech',images:'assets/aboutus/Priyanshu.png', link: 'https://www.linkedin.com/in/pks53'},
 {name: 'Sangeet Chandaliya', hobbies: 'Loves Playing Chess and Sudoku',designation:'Content',images:'assets/aboutus/Sangeet.png', link: 'https://www.linkedin.com/in/sang-chan/'},
 {name: 'Saurav Kumar', hobbies: 'Likes Driving and playing Badminton',designation:'Tech',images:'assets/aboutus/Saurav.png', link: 'https://www.linkedin.com/in/kumar-saurav305'},
 {name: 'Shambhavi Das', hobbies: 'Loves Reading and making  different Art',designation:'Marketing',images:'assets/aboutus/Shambhavi.png', link: 'https://www.linkedin.com/in/shambhavi-das/'},
 {name: 'Vishak Regu', hobbies: 'Loves Reading and watching Sports',designation:'Marketing',images:'assets/aboutus/Vishak.png', link: 'https://www.linkedin.com/in/vishakr'},
 {name: 'Vishwaprasanna H', hobbies: 'Loves playing Mridangam and Volleyball',designation:'Experience',images:'assets/aboutus/Vishwaprasanna.png', link: 'https://www.linkedin.com/in/vishwaprasanna'},
 {name: 'Akhilendra Reddy', hobbies:'Pro Gamer and a Master of Chess', designation: 'Revenue',images: 'assets/aboutus/Akhilendra.png',link: 'linkedin.com/in/akhilendra-reddy-322591181'},
 {name: 'Kuldeep Roy', hobbies:'Loves playing football and basketball', designation: 'Content',images: 'assets/aboutus/Kuldeep.png',link: 'https://www.linkedin.com/in/kuldeep-roy-b15a80129'},
 {name: 'Harshit Garg', hobbies:'Stock trader and plays Cricket', designation: 'Revenue',images: 'assets/aboutus/Harshit.png',link: 'https://www.linkedin.com/in/harshit-garg-28798612b'},
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
