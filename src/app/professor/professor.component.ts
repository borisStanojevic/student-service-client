import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";
import { ProfessorService } from "../services/professor.service";
import { CourseService } from "../services/course.service";
import { AppError } from "../common/app-error";

enum Role {
  PROFESSOR = "Professor",
  ASSISTANT = "Assistant",
  DEMONSTRATOR = "Demonstrator"
}

@Component({
  selector: "app-professor",
  templateUrl: "./professor.component.html",
  styleUrls: ["./professor.component.css"]
})
export class ProfessorComponent implements OnInit {
  private allCourses: any[] = [];
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private lecturerService: ProfessorService,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = formBuilder.group({
      id: ["", [], []],
      firstName: ["", [Validators.required], []],
      lastName: ["", [Validators.required], []],
      email: ["", [Validators.required], []],
      password: ["", [Validators.required], []],
      lecturerRole: [Role.PROFESSOR, Validators.required, []],
      phoneNumber: ["", [], []],
      address: ["", [], []],

      courses: formBuilder.array([]),

      courseToAdd: ["", [], []]
    });
  }

  getRoles(): string[] {
    return Object.keys(Role).map(key => Role[key as string]);
  }

  get id() {
    return this.form.get("id");
  }
  get firstName() {
    return this.form.get("firstName");
  }
  get lastName() {
    return this.form.get("lastName");
  }
  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }
  get phoneNumber() {
    return this.form.get("phoneNumber");
  }
  get address() {
    return this.form.get("address");
  }
  get lecturerRole() {
    return this.form.get("lecturerRole");
  }
  get courses() {
    return this.form.get("courses") as FormArray;
  }
  get courseToAdd() {
    return this.form.get("courseToAdd");
  }

  onAddCourse() {
    const { id, naturalId, name } = this.allCourses.find(
      course => course.naturalId === this.courseToAdd.value
    );
    this.courses.push(this.formBuilder.group({ id, naturalId, name }));
    this.courseToAdd.setValue("");
  }

  onRemoveCourse(course: FormControl) {
    const index = this.courses.controls.indexOf(course);
    this.courses.removeAt(index);
  }

  onSave() {
    const lecturer = this.form.value;
    delete lecturer.courseToAdd;
    alert(JSON.stringify(lecturer));

    if (!lecturer.address) lecturer.address = null;
    if (!lecturer.phoneNumber) lecturer.phoneNumber = null;
    lecturer.lecturerRole = lecturer.lecturerRole.toUpperCase();
    lecturer.courses = lecturer.courses.map(course => course.id);

    if (lecturer.id === "new") {
      delete lecturer.id;

      this.lecturerService.create(lecturer).subscribe(
        addedLecturer => {
          this.router.navigate(["/lecturers"]);
        },
        (error: AppError) => {
          alert(JSON.stringify(error));
        }
      );
    } else {
      this.lecturerService.update(lecturer).subscribe(
        updatedLecturer => {
          this.router.navigate(["/lecturers"]);
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

    this.courseService
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
      this.lecturerService
        .getById(id)
        .subscribe(
          lecturer => this.form.patchValue(lecturer),
          (error: AppError) => alert(JSON.stringify(error))
        );

      this.lecturerService.getCoursesLecturing(id).subscribe(courses => {
        courses.map(
          course => {
            this.courses.push(this.formBuilder.group(course));
          },
          (error: AppError) => alert(JSON.stringify(error))
        );
      });
    }
  }
}
