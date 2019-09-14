import { TestBed, inject } from '@angular/core/testing';

import { CourseLecturingService } from './course-lecturing.service';

describe('CourseLecturingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseLecturingService]
    });
  });

  it('should be created', inject([CourseLecturingService], (service: CourseLecturingService) => {
    expect(service).toBeTruthy();
  }));
});
