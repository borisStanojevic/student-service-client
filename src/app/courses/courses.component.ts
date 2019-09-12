import { Component, OnInit } from "@angular/core";
import { CourseService } from "../services/course.service";
import { AppError } from "../common/app-error";
import { NotFoundError } from "../common/not-found-error";
import { BadInput } from "./../common/bad-input";

@Component({
  selector: "app-courses",
  templateUrl: "./courses.component.html",
  styleUrls: ["./courses.component.css"]
})
export class CoursesComponent implements OnInit {
  private courses: any[] = [];

  constructor(private courseService: CourseService) {}

  ngOnInit() {
    this.courseService
      .getAll()
      .subscribe(
        courses => (this.courses = courses),
        (error: AppError) => alert(JSON.stringify(error))
      );
  }

  onDeleteCourse(course: any) {
    const index = this.courses.indexOf(course);
    this.courses.splice(index, 1);

    this.courseService.delete(course).subscribe(
      () => {},
      (error: AppError) => {
        this.courses.splice(index, 0, course);
        if (error instanceof NotFoundError)
          alert("This course has already been deleted");
        else alert("An unexpected error occured");
      }
    );
  }
}
