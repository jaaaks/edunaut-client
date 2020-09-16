import {
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { MessageService } from '../services/message.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NguCarouselConfig } from '@ngu/carousel';
import { interval, Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';
import { slider } from '../tile/slide-animation';
import {ProfileService} from '../services/profile.service';
@Component({
  selector: 'app-bookmarked-courses',
  templateUrl: './bookmarked-courses.component.html',
  styleUrls: ['./bookmarked-courses.component.scss'],
  animations: [slider],
})
export class BookmarkedCoursesComponent {
  Coursera = 'assets/profile/coursera.png';
  edX = 'assets/profile/edx.png'
  public  coursedata ;
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
    animation: 'lazy'
  };
  tempData: any[];

  constructor(private profileService: ProfileService, private actRoute: ActivatedRoute, private messageService:MessageService, private router: Router ) {
    
   } 
  ngOnInit() : void{
    this.actRoute.data.subscribe(data => {
     this.coursedata = data.heroResolver.content;
     console.log(this.coursedata)
    });
 

    this.tempData = [];

    this.carouselTileItems$ = interval(20).pipe(
      startWith(-1),
      take(this.coursedata.length),
      map(val => {
        const data = (this.tempData = [
          ...this.tempData,
          this.coursedata[val + 1]
        ]);
        return data;

      })
    );
    }

    sendCourse(cid){
      this.router.navigate(['/course-detail'], { queryParams: { courseid: cid } });
    } 
    clearMessage():void{
      this.messageService.clearCourseDetail();
    }
}
