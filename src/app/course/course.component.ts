import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Observable } from "rxjs/Observable";
import "rxjs/add/observable/combineLatest";
import "rxjs/add/operator/map";
import "rxjs/add/operator/switchMap";
import {
  FormBuilder,
  FormGroup,
  Validators,
  FormArray,
  FormControl,
  AbstractControl
} from "@angular/forms";
import { LecturersValidators } from "./../common/validation/lecturers.validators";
import { CourseService } from "./../services/course.service";
import { AppError } from "./../common/app-error";
import { BadInput } from "./../common/bad-input";

enum LecturerRole {
  PROFESSOR = "Professor",
  ASSISTANT = "Assistant",
  DEMONSTRATOR = "Demonstrator"
}

const lecturers = [
  { id: 1, name: "John", role: LecturerRole.PROFESSOR },
  { id: 2, name: "Eric", role: LecturerRole.ASSISTANT },
  { id: 3, name: "Woo", role: LecturerRole.DEMONSTRATOR }
];

let course = {
  id: "69",
  naturalId: "CS101",
  name: "Computer Science 101",
  ects: "9",
  lecturers: [
    { id: 1, name: "John", role: LecturerRole.PROFESSOR },
    { id: 2, name: "Eric", role: LecturerRole.ASSISTANT },
    { id: 3, name: "Woo", role: LecturerRole.DEMONSTRATOR }
  ]
};

@Component({
  selector: "app-course",
  templateUrl: "./course.component.html",
  styleUrls: ["./course.component.css"]
})
export class CourseComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private courseService: CourseService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = formBuilder.group({
      id: ["", [], []],
      naturalId: [
        "",
        [Validators.required, Validators.pattern("^[A-Z0-9]{3,6}$")],
        []
      ],
      name: ["", [Validators.required], []],
      ects: [
        "",
        [Validators.required, Validators.min(1), Validators.max(25)],
        []
      ],
      lecturers: formBuilder.array([]),

      lecturerToAdd: ["", [], []]
    });
  }

  get id() {
    return this.form.get("id");
  }
  get naturalId() {
    return this.form.get("naturalId");
  }
  get name() {
    return this.form.get("name");
  }
  get ects() {
    return this.form.get("ects");
  }
  get lecturers() {
    return this.form.get("lecturers") as FormArray;
  }
  get lecturerToAdd() {
    return this.form.get("lecturerToAdd");
  }

  onAddLecturer() {
    const { id, name, role } = lecturers.find(
      l => l.name === this.lecturerToAdd.value
    );
    this.lecturers.push(this.formBuilder.group({ id, name, role }));
    this.lecturerToAdd.setValue("");
  }

  onRemoveLecturer(lecturer: FormControl) {
    const index = this.lecturers.controls.indexOf(lecturer);
    this.lecturers.removeAt(index);
  }

  onSave() {
    const course = this.form.value;
    delete course.lecturerToAdd;

    if (course.id === "") {
      delete course.id;

      this.courseService.create(course).subscribe(
        addedCourse => {
          this.router.navigate(["/courses"]);
        },
        (error: AppError) => {
          if (error instanceof BadInput) alert("Bad request");
          else alert("Un unexpected error occured");
        }
      );
    } else {
      this.courseService.update(course).subscribe(
        updatedCourse => {
          this.router.navigate(["/courses"]);
        },
        (error: AppError) => {
          if (error instanceof BadInput) alert("Bad request");
          else alert("Un unexpected error occured");
        }
      );
    }
  }

  ngOnInit() {
    let id;
    //Da bismo se subscribovali na vise observable-a (npr i parametre rute i parametre query-ja)
    // Observable.combineLatest([this.route.paramMap, this.route.queryParamMap])
    //   .switchMap(combined => {
    //     const id = combined[0].get("id");
    //     const orderBy = combined[1].get("orderBy");

    //     return this.service.getAll({ id, orderBy });
    //   })
    //   .subscribe(courses => (this.courses = courses));

    //paramMap Property koji nam daje sve parametre rute
    this.route.paramMap.subscribe(params => {
      //+ ispred string konvertuje u broj ako je broj
      id = params.get("id");
    });

    if (id !== "new") {
      const lecturersCanNotBeEmpty = (control: AbstractControl) => {
        if (this.lecturers.length === 0)
          return { lecturersCanNotBeEmpty: true };
      };
      this.lecturerToAdd.setValidators([lecturersCanNotBeEmpty]);
      this.lecturers.setValidators(Validators.required);
      this.lecturerToAdd.updateValueAndValidity();
      this.lecturers.updateValueAndValidity();
    }

    if (id !== "new") {
      this.courseService
        .getById(id)
        .subscribe(
          course => this.form.patchValue(course),
          (error: AppError) => console.log(JSON.stringify(error))
        );
    }
    // this.form.patchValue(course);
  }
}
