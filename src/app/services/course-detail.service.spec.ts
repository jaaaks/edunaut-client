import { TestBed } from '@angular/core/testing';

import { CourseDetailService } from './course-detail.service';

describe('CourseDetailService', () => {
  let service: CourseDetailService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CourseDetailService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
