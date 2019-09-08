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
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      //property: new FormControl("", [Validators.required], [])
      id: ["", [], []],
      naturalId: ["", [Validators.required], []],
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
    alert(JSON.stringify(this.form.value));
    //Ako hocemo da validiraamo na submit
    // Object.keys(this.form.controls).forEach(field => { // {1}
    //   const control = this.form.get(field);            // {2}
    //   control.markAsTouched({ onlySelf: true });       // {3}
    // });
    //i u tempalete-u iznad recimo submit dugmeta dodati div sa form.errors
    //gdje ce se prikazati sve greske
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // student.id = params.get("id");
      this.id.setValue(params.get("id"));
    });

    // this.form.patchValue(student);
  }
}
