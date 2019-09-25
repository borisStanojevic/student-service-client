import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  Form,
  FormGroup,
  FormControl,
  Validators,
  FormArray
} from "@angular/forms";
import { StudentService } from "../services/student.service";
import { AppError } from "../common/app-error";
import { BadInput } from "./../common/bad-input";
import { CourseService } from "./../services/course.service";
import { CourseLecturingService } from "../services/course-lecturing.service";

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  private allCourses: any[] = [];
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private courseLecturingService: CourseLecturingService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      id: ["", [], []],
      naturalId: [
        "",
        [
          Validators.required,
          Validators.pattern("[a-zA-Z]{2}-[\\d]{2}-[\\d]{2}")
        ],
        []
      ],
      email: ["", [Validators.required], []],
      password: ["", [Validators.required], []],
      firstName: ["", [Validators.required], []],
      lastName: ["", [Validators.required], []],
      address: ["", [], []],
      phoneNumber: ["", [], []],

      courses: formBuilder.array([]),

      courseToAdd: ["", [], []]
    });
  }

  get id() {
    return this.form.get("id");
  }
  get naturalId() {
    return this.form.get("naturalId");
  }
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  get firstName() {
    return this.form.get("firstName");
  }
  get lastName() {
    return this.form.get("lastName");
  }
  get address() {
    return this.form.get("address");
  }
  get phoneNumber() {
    return this.form.get("phoneNumber");
  }

  get courses() {
    return this.form.get("courses") as FormArray;
  }
  get courseToAdd() {
    return this.form.get("courseToAdd");
  }

  onAddCourse() {
    const courseLecturing = this.allCourses.find(
      course => course.course.naturalId === this.courseToAdd.value
    );
    const { id: courseLecturingId } = courseLecturing;
    const {
      naturalId: courseNaturalId,
      name: courseName
    } = courseLecturing.course;
    const {
      firstName: lecturerFirstName,
      lastName: lecturerLastName
    } = courseLecturing.lecturer;
    this.courses.push(
      this.formBuilder.group({
        courseLecturingId,
        courseNaturalId,
        courseName,
        lecturerFirstName,
        lecturerLastName
      })
    );
    this.courseToAdd.setValue("");
  }

  onRemoveCourse(course: FormControl) {
    const index = this.courses.controls.indexOf(course);
    this.courses.removeAt(index);
  }

  onSave() {
    //Ako hocemo da validiraamo na submit
    // Object.keys(this.form.controls).forEach(field => { // {1}
    //   const control = this.form.get(field);            // {2}
    //   control.markAsTouched({ onlySelf: true });       // {3}
    // });
    //i u tempalete-u iznad recimo submit dugmeta dodati div sa form.errors
    //gdje ce se prikazati sve greske

    // const student = delete student.lecturerToAdd;
    // course.lecturers = [{ id: 1 }, { id: 2 }];

    const student = this.form.value;
    delete student.courseToAdd;

    if (!student.address) student.address = null;
    if (!student.phoneNumber) student.phoneNumber = null;

    const courseLecturingIds = student.courses.map(
      course => course.courseLecturingId
    );
    delete student.courses;
    student.courseLecturingIds = courseLecturingIds;

    alert(JSON.stringify(student));

    if (student.id === "new") {
      delete student.id;

      this.studentService.create(student).subscribe(
        addedStudent => {
          this.router.navigate(["/students"]);
        },
        (error: AppError) => {
          alert(JSON.stringify(error));
        }
      );
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id.setValue(params.get("id"));
    });

    this.courseLecturingService
      .getAll()
      .subscribe(
        courses => (this.allCourses = courses),
        (error: AppError) => alert(JSON.stringify(error))
      );

    const id = this.id.value;

    if (this.id.value !== "new") {
      this.password.clearValidators();
      this.password.updateValueAndValidity();
    }

    if (id !== "new") {
      this.studentService
        .getById(id)
        .subscribe(
          student => this.form.patchValue(student),
          (error: AppError) => alert(JSON.stringify(error))
        );

      this.studentService.getCoursesAttending(id).subscribe(courses => {
        courses.map(
          course => {
            const { id: courseLecturingId } = course;
            const {
              naturalId: courseNaturalId,
              name: courseName
            } = course.course;
            const {
              firstName: lecturerFirstName,
              lastName: lecturerLastName
            } = course.lecturer;
            this.courses.push(
              this.formBuilder.group({
                courseLecturingId,
                courseNaturalId,
                courseName,
                lecturerFirstName,
                lecturerLastName
              })
            );
          },
          (error: AppError) => alert(JSON.stringify(error))
        );
      });
    }
  }
}
