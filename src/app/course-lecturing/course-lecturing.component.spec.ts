import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CourseLecturingComponent } from './course-lecturing.component';

describe('CourseLecturingComponent', () => {
  let component: CourseLecturingComponent;
  let fixture: ComponentFixture<CourseLecturingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CourseLecturingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CourseLecturingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
