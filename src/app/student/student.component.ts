import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  Form,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { StudentService } from "../services/student.service";
import { AppError } from "../common/app-error";
import { BadInput } from "./../common/bad-input";

let student = {
  id: "69",
  naturalId: "SF82016",
  email: "m@g.com",
  firstName: "First",
  lastName: "Last",
  address: "Somewehre 75B",
  phoneNumber: "225-883"
};

@Component({
  selector: "app-student",
  templateUrl: "./student.component.html",
  styleUrls: ["./student.component.css"]
})
export class StudentComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private studentService: StudentService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      //property: new FormControl("", [Validators.required], [])
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
      phoneNumber: ["", [], []]
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
    if (student.address) student.address = null;
    if (student.phoneNumber) student.phoneNumber = null;
    if (student.id === "new") {
      delete student.id;

      this.studentService.create(student).subscribe(
        addedStudent => {
          this.router.navigate(["/students"]);
        },
        (error: AppError) => {
          if (error instanceof BadInput) alert("Bad request");
          else alert("Un unexpected error occured");
        }
      );
    }
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.id.setValue(params.get("id"));
    });

    if (this.id.value !== "new") {
      this.password.clearValidators();
      this.password.updateValueAndValidity();
    }

    const id = this.id.value;

    if (id !== "new") {
      this.studentService
        .getById(id)
        .subscribe(
          student => this.form.patchValue(student),
          (error: AppError) => alert(JSON.stringify(error))
        );
    }
  }
}
