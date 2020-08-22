import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OngoingCoursesComponent } from './ongoing-courses.component';

describe('OngoingCoursesComponent', () => {
  let component: OngoingCoursesComponent;
  let fixture: ComponentFixture<OngoingCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OngoingCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OngoingCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
