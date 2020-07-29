import { Component, OnInit, HostListener} from '@angular/core';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  CAROUSEL_BREAKPOINT = 480;
  carouselDisplayMode = 'multiple';
  cards = [
   
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },
    {
      img: 'assets/udemy.png'
    },

  ];
  slides: any = [[]];
  chunk(arr, chunkSize) {
    let R = [];
    for (let i = 0, len = arr.length; i < len; i += chunkSize) {
      R.push(arr.slice(i, i + chunkSize));
    }
    return R;
  }
  ngOnInit() {
    this.slides = this.chunk(this.cards, 9);
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }
  @HostListener('window:resize')
  onWindowResize() {
    if (window.innerWidth <= this.CAROUSEL_BREAKPOINT) {
      this.carouselDisplayMode = 'single';
    } else {
      this.carouselDisplayMode = 'multiple';
    }
  }
}
