import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompaniesCarouselComponent } from './companies-carousel.component';

describe('CompaniesCarouselComponent', () => {
  let component: CompaniesCarouselComponent;
  let fixture: ComponentFixture<CompaniesCarouselComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompaniesCarouselComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompaniesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
