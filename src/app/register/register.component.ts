import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormArray,
  FormBuilder
} from "@angular/forms";
import { UsernameValidators } from "../common/validation/username.validators";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  form = new FormGroup({
    // account: new FormGroup({
    //   username: new FormControl(),
    //   password: new FormControl()
    // }),
    username: new FormControl(
      "",
      [
        Validators.required,
        Validators.minLength(6),
        UsernameValidators.cannotContainSpace
      ],
      [UsernameValidators.shouldBeUnique]
    ),
    password: new FormControl("", Validators.required),
    courses: new FormArray([])
  });

  get username() {
    return this.form.get("username");
  }

  get courses() {
    return this.form.get("courses") as FormArray;
  }

  // constructor(formBuilder: FormBuilder) {
  //   this.form = formBuilder.group({
  //     username: [
  //       "",
  //       [
  //         Validators.required,
  //         Validators.minLength(6),
  //         UsernameValidators.cannotContainSpace
  //       ],
  //       [UsernameValidators.shouldBeUnique]
  //     ],
  //     password: ["", Validators.required],
  //     courses: formBuilder.array([])
  //   });
  // }

  constructor() {}

  addCourse(course: HTMLInputElement) {
    this.courses.push(new FormControl(course.value));
    course.value = "";
  }

  removeCourse(course: FormControl) {
    const index = this.courses.controls.indexOf(course);
    this.courses.removeAt(index);
  }

  submit() {
    // const isValid = authService.login(this.form.value);
    // if (!isValid) {
    //   this.form.setErrors({ invalidLogin: true });
    // }
    //Ako hocemo da validiraamo na submit
    // Object.keys(this.form.controls).forEach(field => { // {1}
    //   const control = this.form.get(field);            // {2}
    //   control.markAsTouched({ onlySelf: true });       // {3}
    // });
    //i u tempalete-u iznad recimo submit dugmeta dodati div sa form.errors
    //gdje ce se prikazati sve greske
  }

  ngOnInit() {}
}
