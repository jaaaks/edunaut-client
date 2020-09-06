import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RelevantCoursesComponent } from './relevant-courses.component';

describe('RelevantCoursesComponent', () => {
  let component: RelevantCoursesComponent;
  let fixture: ComponentFixture<RelevantCoursesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RelevantCoursesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RelevantCoursesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
