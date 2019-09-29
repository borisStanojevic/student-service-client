import { Component, OnInit, AfterViewInit } from "@angular/core";
import { ProfessorService } from "./../services/professor.service";
import { getAuthToken, getAuthenticatedUser } from "../common/util/auth-util";
import { AppError } from "../common/app-error";
import { StudentService } from "../services/student.service";

@Component({
  selector: "app-lecturer-courses",
  templateUrl: "./lecturer-courses.component.html",
  styleUrls: ["./lecturer-courses.component.css"]
})
export class LecturerCoursesComponent implements OnInit {
  private myCourses: any[] = [];
  constructor(
    private lecturerService: ProfessorService,
    private studentService: StudentService
  ) {}

  onGradeStudent(studentCourseAttendanceId: number) {
    do {
      var grade = parseInt(prompt("Please enter the grade", "").trim());
    } while (isNaN(grade) || grade > 10 || grade < 5);

    this.studentService
      .gradeStudent(getAuthToken(), studentCourseAttendanceId, grade)
      .subscribe(
        () => {
          this.lecturerService
            .getMyCourses(getAuthToken())
            .subscribe(courses => {
              this.myCourses = courses;
              console.log(JSON.stringify(courses));
              (error: AppError) => {
                alert(JSON.stringify(error));
              };
            });
        },
        (error: AppError) => {
          alert(JSON.stringify(error));
        }
      );
  }

  ngOnInit() {
    if (!getAuthenticatedUser()) return null;
    if (getAuthenticatedUser().role !== "LECTURER") return;

    this.lecturerService.getMyCourses(getAuthToken()).subscribe(courses => {
      this.myCourses = courses;
      console.log(JSON.stringify(courses));
      (error: AppError) => {
        alert(JSON.stringify(error));
      };
    });
  }
}
