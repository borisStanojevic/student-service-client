import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  FormControl
} from "@angular/forms";

enum Role {
  PROFESSOR = "Professor",
  ASSISTANT = "Assistant",
  DEMONSTRATOR = "Demonstrator"
}

const courses = [
  { id: 1, naturalId: "CS101", name: "Computer Science 101" },
  { id: 2, naturalId: "CS50", name: "Introduction to Computer Science" },
  { id: 3, naturalId: "EE64", name: "Electrical Engineering And Circuits" }
];

const lecturer = {
  id: "",
  firstName: "Valentin",
  lastName: "Penca",
  email: "vp@ftn.ns",
  role: Role.ASSISTANT,
  courses: [
    { id: 3, naturalId: "EE64", name: "Electrical Engineering And Circuits" }
  ]
};

@Component({
  selector: "app-professor",
  templateUrl: "./professor.component.html",
  styleUrls: ["./professor.component.css"]
})
export class ProfessorComponent implements OnInit {
  private form: FormGroup;
  getRoles(): string[] {
    return Object.keys(Role).map(key => Role[key as string]);
  }

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = formBuilder.group({
      id: ["", [], []],
      firstName: ["", [Validators.required], []],
      lastName: ["", [Validators.required], []],
      email: ["", [Validators.required], []],
      phoneNumber: ["", [], []],
      role: [Role.PROFESSOR, Validators.required, []],
      courses: formBuilder.array([]),

      courseToAdd: ["", [], []]
    });
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
  get phoneNumber() {
    return this.form.get("phoneNumber");
  }
  get role() {
    return this.form.get("role");
  }
  get courses() {
    return this.form.get("courses") as FormArray;
  }
  get courseToAdd() {
    return this.form.get("courseToAdd");
  }

  onAddCourse() {
    const { id, naturalId, name } = courses.find(
      course => course.name === this.courseToAdd.value
    );
    this.courses.push(this.formBuilder.group({ id, naturalId, name }));
    this.courseToAdd.setValue("");
  }

  onRemoveCourse(course: FormControl) {
    const index = this.courses.controls.indexOf(course);
    this.courses.removeAt(index);
  }

  onSave() {
    const professor = this.form.value;
    delete professor.courseToAdd;
    alert(JSON.stringify(professor));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id.setValue(+params.get("id"));
    });
    this.courses.push(
      this.formBuilder.group(
        lecturer.courses.map(course => this.formBuilder.group({ course }))
      )
    );

    this.form.patchValue(lecturer);
  }
}
