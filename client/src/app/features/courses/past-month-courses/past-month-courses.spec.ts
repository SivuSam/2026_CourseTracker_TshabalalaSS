import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PastMonthCourses } from './past-month-courses';

describe('PastMonthCourses', () => {
  let component: PastMonthCourses;
  let fixture: ComponentFixture<PastMonthCourses>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PastMonthCourses]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PastMonthCourses);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
