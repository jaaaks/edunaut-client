import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BookmarkedCoursesComponent } from './bookmarked-courses.component';

describe('BookmarkedCoursesComponent', () => {
  let component: BookmarkedCoursesComponent;
  let fixture: ComponentFixture<BookmarkedCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BookmarkedCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookmarkedCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
