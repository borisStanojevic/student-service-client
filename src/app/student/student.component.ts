import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import {
  FormBuilder,
  Form,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";

let student = {
  id: "69",
  studentId: "SF82016",
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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      //property: new FormControl("", [Validators.required], [])
      id: ["", [], []],
      studentId: ["", [Validators.required], []],
      email: ["", [Validators.required], []],
      password: ["", [Validators.required], []],
      firstName: ["", [Validators.required], []],
      lastName: ["", [Validators.required], []],
      address: ["", [], []],
      phoneNumber: ["", [], []]
    });

    if (this.id.value !== "new") {
      this.password.clearValidators();
      this.password.updateValueAndValidity();
    }
  }

  get id() {
    return this.form.get("id");
  }
  get studentId() {
    return this.form.get("studentId");
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
    alert(JSON.stringify(this.form.value));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // student.id = params.get("id");
      this.id.setValue(params.get("id"));
    });

    // this.form.patchValue(student);
  }
}
