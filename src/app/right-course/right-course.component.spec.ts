import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RightCourseComponent } from './right-course.component';

describe('RightCourseComponent', () => {
  let component: RightCourseComponent;
  let fixture: ComponentFixture<RightCourseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RightCourseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RightCourseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
