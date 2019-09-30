import { Component, OnInit } from "@angular/core";
import {
  getAuthenticatedUser,
  getAuthToken,
  unauthenticateUser
} from "../common/util/auth-util";
import { StudentService } from "../services/student.service";
import { AppError } from "./../common/app-error";
import { Conflict } from "./../common/conflict";

@Component({
  selector: "app-student-courses",
  templateUrl: "./student-courses.component.html",
  styleUrls: ["./student-courses.component.css"]
})
export class StudentCoursesComponent implements OnInit {
  private authenticatedStudent: any;
  private credit: number;
  private myCourses: any[] = [];
  private myCoursesDisplayed: any[] = [];
  private currentCoursesStatusFilter = "ALL";

  constructor(private studentService: StudentService) {
    this.authenticatedStudent = getAuthenticatedUser();
  }

  getCoursesCount(status) {
    return this.myCourses.reduce(
      (total, x) => (x.status === status ? total + 1 : total),
      0
    );
  }

  onFilterCourses(status) {
    if (["PASSED", "NOT_PASSED", "APPLIED"].includes(status)) {
      if (this.currentCoursesStatusFilter === status) {
        this.myCoursesDisplayed = this.myCourses;
        this.currentCoursesStatusFilter = "ALL";
        return;
      } else {
        this.currentCoursesStatusFilter = status;
      }
      this.myCoursesDisplayed = this.myCourses.filter(
        course => course.status === status
      );
    } else {
      this.myCoursesDisplayed = this.myCourses;
      this.currentCoursesStatusFilter = "ALL";
    }
  }

  onApplyForExam(myCourse: any) {
    const index = this.myCourses.indexOf(myCourse);
    const previousStatus = myCourse.status;
    this.myCourses[index].status = "APPLIED";

    this.studentService.applyForExam(getAuthToken(), myCourse.id).subscribe(
      () => {
        this.credit -= 200;
        alert(`Succesfully applied for ${myCourse.name} - exam.`);
      },
      (error: AppError) => {
        this.myCourses[index].status = previousStatus;
        if (error instanceof Conflict) alert("Not enough credit.");
        else alert("Something went wrong.");
      }
    );
  }

  onUnapplyForExam(myCourse: any) {
    const index = this.myCourses.indexOf(myCourse);
    const previousStatus = myCourse.status;
    this.myCourses[index].status = "NOT_PASSED";

    this.studentService.unapplyForExam(getAuthToken(), myCourse.id).subscribe(
      () => {
        this.credit += 200;
      },
      (error: AppError) => {
        this.myCourses[index].status = previousStatus;
        if (error instanceof Conflict) alert("Not enough credit.");
        else alert("Something went wrong.");
      }
    );
  }

  ngOnInit() {
    if (!this.authenticatedStudent) return null;
    if (this.authenticatedStudent.role !== "STUDENT") return;

    this.studentService.getMyCourses(getAuthToken()).subscribe(response => {
      this.credit = response.credit;
      this.myCourses = response.courses;
      this.myCoursesDisplayed = response.courses;
      (error: AppError) => {
        alert(error);
      };
    });
  }
}
