import { Component, OnInit } from "@angular/core";
import { AuthService } from "./../services/auth.service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { AppError } from "./../common/app-error";
import {
  setAuthenticatedUser,
  getAuthenticatedUser,
  unauthenticateUser
} from "./../common/util/auth-util";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  private form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      email: ["", [Validators.required], []],
      password: ["", [Validators.required], []]
    });
  }

  get email() {
    return this.form.get("email");
  }
  get password() {
    return this.form.get("password");
  }

  onSubmit() {
    const credentials = this.form.value;

    this.authService.create(credentials).subscribe(
      response => {
        setAuthenticatedUser(response.token);
        window.location.replace("/profiles/me");
      },
      (error: AppError) => {
        alert("Invalid email/password.");
      }
    );
  }

  ngOnInit() {}
}
